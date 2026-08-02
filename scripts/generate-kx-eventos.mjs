// Genera src/content/kx-eventos/ a partir de 04 - Kx Autopoiesis/Patch Notes/ en la bóveda.
// El markdown de la bóveda es la fuente (append-only); esta colección es un espejo commiteado,
// mismo patrón que el snapshot del árbol de carpetas (ver Mapa de Pagina.md, 26.07.26).
// Correr de nuevo cada vez que el patch notes del mes en curso reciba una corrida nueva.
//
// Uso: node scripts/generate-kx-eventos.mjs

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const VAULT_PATCH_NOTES = resolve(__dirname, '..', '..', 'ground up kx vault', '04 - Kx Autopoiesis', 'Patch Notes');
const OUT_DIR = resolve(__dirname, '..', 'src', 'content', 'kx-eventos');

const DAY_RE = /^#### (\d{2}\.\d{2}\.\d{2})\s*$/;
const EVENT_RE = /^- `\[([a-zA-Z0-9-]+)\]` (creado|implementado|decidido|cambiado|calibrado|deprecado|abierto|cerrado) · (.+)$/;

function aa_mm_dd_to_iso(s) {
  const [aa, mm, dd] = s.split('.');
  return `20${aa}-${mm}-${dd}`;
}

function escapeYaml(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Sin bóveda se saltea en silencio, NO se falla: este script está colgado de
// `prebuild`, y el deploy de GitHub Actions clona solo el repo de la página.
// Ahí lo correcto es usar los archivos ya commiteados. El aviso es ruidoso a
// propósito para que un salteo local (por una ruta mal puesta) se note.
if (!existsSync(VAULT_PATCH_NOTES)) {
  console.warn(`kx-eventos: bóveda no encontrada en ${VAULT_PATCH_NOTES}. Se saltea y se usan los archivos commiteados.`);
  process.exit(0);
}

const files = readdirSync(VAULT_PATCH_NOTES).filter((f) => f.endsWith('.md')).sort();

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

let total = 0;

for (const file of files) {
  const text = readFileSync(join(VAULT_PATCH_NOTES, file), 'utf-8');
  const lines = text.split('\n');
  let currentDate = null;
  let seq = 0;

  for (const line of lines) {
    const dayMatch = line.match(DAY_RE);
    if (dayMatch) {
      currentDate = aa_mm_dd_to_iso(dayMatch[1]);
      seq = 0;
      continue;
    }
    const eventMatch = line.match(EVENT_RE);
    if (eventMatch && currentDate) {
      seq += 1;
      const [, area, verbo, texto] = eventMatch;
      const id = `${currentDate}-${String(seq).padStart(3, '0')}`;
      const frontmatter = [
        '---',
        `id: "${id}"`,
        `fecha: ${currentDate}`,
        `area: "${escapeYaml(area)}"`,
        `verbo: ${verbo}`,
        `texto: "${escapeYaml(texto.trim())}"`,
        `archivoOrigen: "${file}"`,
        '---',
        '',
      ].join('\n');
      writeFileSync(join(OUT_DIR, `${id}.md`), frontmatter);
      total += 1;
    }
  }
}

console.log(`kx-eventos: ${total} eventos generados desde ${files.length} archivo(s) de patch notes.`);
