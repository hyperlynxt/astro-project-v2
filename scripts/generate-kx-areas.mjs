// Genera src/content/kx-areas/ a partir de los once `Mapa de {área}.md` de
// 00 - Kx Atlas System/01 - Matriz/ en la bóveda.
//
// Mismo patrón que generate-kx-eventos.mjs: el markdown de la bóveda es la
// FUENTE, esta colección es un espejo commiteado que se regenera a pedido.
// Nunca al revés — si el .md y la colección divergen, gana el .md.
//
// Qué extrae, y qué NO:
//   SÍ  → las secciones de prosa del molde de cinco secciones (qué es esta
//         área, convenciones, decisiones fechadas, abierto, inventario).
//   NO  → las entradas `#####` de cada ítem. Esas vienen de las colecciones
//         kx-* como tarjetas, no como texto. Es la regla de dirección: el
//         archivo de la Matriz da el porqué, la colección da el qué.
//
// Uso: npm run gen:areas

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const MATRIZ = resolve(__dirname, '..', '..', 'ground up kx vault', '00 - Kx Atlas System', '01 - Matriz');
const OUT_DIR = resolve(__dirname, '..', 'src', 'content', 'kx-areas');

// slug -> { archivo, titulo, linea }. El orden es el de presentación en /kx/atlas/.
const AREAS = [
  { slug: 'modulos',       archivo: 'Mapa de Modulos.md',       titulo: 'Módulos',       linea: 'Los módulos del sistema y su relación.' },
  { slug: 'skills',        archivo: 'Mapa de Skills.md',        titulo: 'Skills',        linea: 'Catálogo, convenciones, arquitectura.' },
  { slug: 'flujos',        archivo: 'Mapa de Flujos.md',        titulo: 'Flujos',        linea: 'Los pipelines que recorren las instancias.' },
  { slug: 'instancias',    archivo: 'Mapa de Instancias.md',    titulo: 'Instancias',    linea: 'Unidades atómicas y los templates que las crean.' },
  { slug: 'cuadrantes',    archivo: 'Mapa de Cuadrantes.md',    titulo: 'Cuadrantes',    linea: 'El cuadrante como unidad estructural.' },
  { slug: 'integraciones', archivo: 'Mapa de Integraciones.md', titulo: 'Integraciones', linea: 'Sistema con sistema, y plugins que sostienen un pipeline.' },
  { slug: 'convenciones',  archivo: 'Mapa de Convenciones.md',  titulo: 'Convenciones',  linea: 'Naming, frontmatter, cómo se escribe cada cosa.' },
  { slug: 'taxonomia',     archivo: 'Mapa de Taxonomia.md',     titulo: 'Taxonomía',     linea: 'Ids, estados, tipos, terminología.' },
  { slug: 'capas',         archivo: 'Mapa de Capas.md',         titulo: 'Capas',         linea: 'La escalera: sistema, módulo, pieza, artefacto.' },
  { slug: 'pagina',        archivo: 'Mapa de Pagina.md',        titulo: 'Página',        linea: 'Qué colección alimenta qué vista.' },
  { slug: 'mapas',         archivo: 'Mapa de Mapas.md',         titulo: 'Mapas',         linea: 'Organigramas, cursogramas, árbol de carpetas.' },
];

// Corta el archivo en secciones de nivel #### , descartando las #####  de ítem.
function partirEnSecciones(texto) {
  const lineas = texto.split('\n');
  const secciones = [];
  let actual = null;
  for (const linea of lineas) {
    const h4 = linea.match(/^#### (.+)$/);
    if (h4) {
      if (actual) secciones.push(actual);
      actual = { titulo: h4[1].trim(), lineas: [] };
    } else if (actual) {
      actual.lineas.push(linea);
    }
  }
  if (actual) secciones.push(actual);
  return secciones;
}

// De la sección Decisiones, saca cada `##### {AA.MM.DD} · {título}`.
function extraerDecisiones(lineasSeccion) {
  const decisiones = [];
  let actual = null;
  for (const linea of lineasSeccion) {
    const h5 = linea.match(/^##### (\d{2}\.\d{2}\.\d{2}) · (.+)$/);
    if (h5) {
      if (actual) decisiones.push(actual);
      const [aa, mm, dd] = h5[1].split('.');
      actual = { fecha: `20${aa}-${mm}-${dd}`, titulo: h5[2].trim(), lineas: [] };
    } else if (actual) {
      actual.lineas.push(linea);
    }
  }
  if (actual) decisiones.push(actual);
  return decisiones;
}

// Saca las `#####` de ítem: su contenido vive en las colecciones, no acá.
//
// OJO: esto se aplica SOLO a la sección "Qué es esta área", que es donde el
// molde pone las entradas de ítem. En Convenciones, Abierto e Inventario los
// `#####` son contenido conceptual real (Mapa de Convenciones, Mapa de
// Taxonomia y Mapa de Capas son catálogos de ideas, no de objetos) y borrarlos
// vaciaría el archivo entero.
function sinItems(lineas) {
  const out = [];
  let saltando = false;
  for (const linea of lineas) {
    if (/^##### /.test(linea)) { saltando = true; continue; }
    if (saltando) continue;
    out.push(linea);
  }
  return out;
}

function limpiar(lineas) {
  return lineas.join('\n').replace(/^\s*\n+/, '').replace(/\n+\s*$/, '').replace(/\n{3,}/g, '\n\n');
}

// Bloque escalar YAML: literal (|-) con indentación de 2, seguro para markdown.
function bloqueYaml(clave, valor, indent = 0) {
  const pad = ' '.repeat(indent);
  if (!valor || !valor.trim()) return `${pad}${clave}: ""`;
  const cuerpo = valor.split('\n').map((l) => (l.trim() ? `${pad}  ${l}` : '')).join('\n');
  return `${pad}${clave}: |-\n${cuerpo}`;
}

function escapeYaml(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Sin bóveda se saltea, no se falla: corre en `prebuild` y el deploy de CI
// clona solo el repo de la página. Ver la nota en generate-kx-eventos.mjs.
if (!existsSync(MATRIZ)) {
  console.warn(`kx-areas: Matriz no encontrada en ${MATRIZ}. Se saltea y se usan los archivos commiteados.`);
  process.exit(0);
}

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const hoy = new Date().toISOString().slice(0, 10);
let generadas = 0;

for (const area of AREAS) {
  const ruta = join(MATRIZ, area.archivo);
  if (!existsSync(ruta)) {
    console.warn(`  aviso: falta ${area.archivo}, se saltea`);
    continue;
  }
  const texto = readFileSync(ruta, 'utf-8');
  const secciones = partirEnSecciones(texto);

  const buscar = (frag) => secciones.find((s) => s.titulo.toLowerCase().includes(frag));

  const queEsSec = buscar('qué es esta área');
  const convSec = buscar('convenciones');
  const decSec = buscar('decisiones');
  const abiertoSec = buscar('abierto');
  const invSec = buscar('inventario');

  const queEs = queEsSec ? limpiar(sinItems(queEsSec.lineas)) : '';
  const convenciones = convSec ? limpiar(convSec.lineas) : '';
  const abierto = abiertoSec ? limpiar(abiertoSec.lineas) : '';
  const inventario = invSec ? limpiar(invSec.lineas) : '';
  const decisiones = decSec ? extraerDecisiones(decSec.lineas) : [];

  const bloqueDecisiones = decisiones.length
    ? 'decisiones:\n' + decisiones.map((d) =>
        `  - fecha: ${d.fecha}\n    titulo: "${escapeYaml(d.titulo)}"\n${bloqueYaml('cuerpo', limpiar(d.lineas), 4)}`
      ).join('\n')
    : 'decisiones: []';

  const frontmatter = [
    '---',
    `id: "${area.slug}"`,
    `titulo: "${escapeYaml(area.titulo)}"`,
    `linea: "${escapeYaml(area.linea)}"`,
    `archivoBoveda: "01 - Matriz/${area.archivo}"`,
    bloqueYaml('queEs', queEs),
    bloqueYaml('convenciones', convenciones),
    bloqueYaml('abierto', abierto),
    bloqueYaml('inventario', inventario),
    bloqueDecisiones,
    `actualizado: ${hoy}`,
    '---',
    '',
  ].join('\n');

  writeFileSync(join(OUT_DIR, `${area.slug}.md`), frontmatter);
  generadas += 1;
}

console.log(`kx-areas: ${generadas} áreas generadas desde 01 - Matriz/.`);
