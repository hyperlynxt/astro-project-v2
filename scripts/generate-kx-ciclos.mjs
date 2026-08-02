// Genera src/content/kx-ciclos/ a partir de 04 - Kx Autopoiesis/Ciclo de Implementacion/.
//
// Tercer uso del mismo patrón (ver generate-kx-eventos.mjs y generate-kx-areas.mjs):
// el markdown de la bóveda es la FUENTE, la colección es un espejo commiteado.
//
// A diferencia de los otros dos, acá sí se extrae el cuerpo: la ida y vuelta en
// callouts [!teo]/[!ia] ES el contenido del ciclo, no una entrada de ítem que
// viva en otra colección.
//
// Uso: npm run gen:ciclos

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CICLOS = resolve(__dirname, '..', '..', 'ground up kx vault', '04 - Kx Autopoiesis', 'Ciclo de Implementacion');
const OUT_DIR = resolve(__dirname, '..', 'src', 'content', 'kx-ciclos');

function parseFrontmatter(texto) {
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, cuerpo: texto };
  const fm = {};
  for (const linea of m[1].split('\n')) {
    const kv = linea.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    fm[kv[1]] = v;
  }
  return { fm, cuerpo: m[2] };
}

// Los callouts de Obsidian: `> [!teo] 18:45` seguido de líneas `> texto`.
function extraerIdaYVuelta(cuerpo) {
  const lineas = cuerpo.split('\n');
  const entradas = [];
  let actual = null;
  for (const linea of lineas) {
    const head = linea.match(/^>\s*\[!(teo|ia)\]\s*(.*)$/i);
    if (head) {
      if (actual) entradas.push(actual);
      actual = { quien: head[1].toLowerCase(), marca: head[2].trim(), lineas: [] };
      continue;
    }
    if (actual && /^>/.test(linea)) {
      actual.lineas.push(linea.replace(/^>\s?/, ''));
      continue;
    }
    if (actual && !linea.trim()) { entradas.push(actual); actual = null; }
  }
  if (actual) entradas.push(actual);
  return entradas
    .map((e) => ({ quien: e.quien, marca: e.marca, texto: e.lineas.join(' ').trim() }))
    .filter((e) => e.texto);
}

// La sección de cierre, si cerrar-ciclo-implementacion ya corrió.
function extraerCierre(cuerpo) {
  const m = cuerpo.match(/^#### Cierre[^\n]*\n([\s\S]*)$/m);
  if (!m) return '';
  return m[1].trim().replace(/\n{3,}/g, '\n\n');
}

function bloqueYaml(clave, valor) {
  if (!valor || !valor.trim()) return `${clave}: ""`;
  const cuerpo = valor.split('\n').map((l) => (l.trim() ? `  ${l}` : '')).join('\n');
  return `${clave}: |-\n${cuerpo}`;
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// Sin bóveda se saltea, no se falla: corre en `prebuild` y el deploy de CI
// clona solo el repo de la página. Ver la nota en generate-kx-eventos.mjs.
if (!existsSync(CICLOS)) {
  console.warn(`kx-ciclos: carpeta no encontrada en ${CICLOS}. Se saltea y se usan los archivos commiteados.`);
  process.exit(0);
}

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const archivos = readdirSync(CICLOS).filter((f) => f.endsWith('.md') && f !== 'CLAUDE.md');
let n = 0;

for (const archivo of archivos) {
  const { fm, cuerpo } = parseFrontmatter(readFileSync(join(CICLOS, archivo), 'utf-8'));
  if (!fm.id) continue;

  const idaYVuelta = extraerIdaYVuelta(cuerpo);
  const cierre = extraerCierre(cuerpo);

  const arr = (v) => Array.isArray(v) ? v : (v ? [v] : []);

  const lineas = [
    '---',
    `id: "${esc(fm.id)}"`,
    `tema: "${esc(fm.tema || '')}"`,
    `estado_ciclo: ${fm.estado_ciclo || 'activo'}`,
    `fecha_inicio: ${fm.fecha_inicio}`,
    ...(fm.fecha_fin ? [`fecha_fin: ${fm.fecha_fin}`] : []),
    ...(fm.hora_inicio ? [`hora_inicio: "${esc(fm.hora_inicio)}"`] : []),
    `origen: [${arr(fm.origen).map((s) => `"${esc(s)}"`).join(', ')}]`,
    `produjo: [${arr(fm.produjo).map((s) => `"${esc(s)}"`).join(', ')}]`,
    idaYVuelta.length
      ? 'idaYVuelta:\n' + idaYVuelta.map((e) =>
          `  - quien: ${e.quien}\n    marca: "${esc(e.marca)}"\n    texto: "${esc(e.texto)}"`
        ).join('\n')
      : 'idaYVuelta: []',
    bloqueYaml('cierre', cierre),
    `actualizado: ${new Date().toISOString().slice(0, 10)}`,
    '---',
    '',
  ];

  writeFileSync(join(OUT_DIR, `${fm.id.toLowerCase()}.md`), lineas.join('\n'));
  n += 1;
}

console.log(`kx-ciclos: ${n} ciclos generados desde Ciclo de Implementacion/.`);
