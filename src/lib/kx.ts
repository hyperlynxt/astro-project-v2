// Espejo en código de la taxonomía autoritativa: `00 - Kx Atlas System/CLAUDE.md` (en la bóveda).
// Si divergen, gana el CLAUDE.md: este archivo se actualiza para seguirlo, nunca al revés.

export const ESTADOS = ['idea', 'disenado', 'construyendo', 'activo', 'finalizado', 'pausado', 'deprecado'] as const;

export const ESTADO_META: Record<string, { label: string; color: string }> = {
  idea:         { label: 'idea',         color: '#8c8070' },
  disenado:     { label: 'diseñado',     color: '#9B7CC8' },
  construyendo: { label: 'construyendo', color: '#B08D57' },
  activo:       { label: 'live',         color: '#7BA08A' },
  finalizado:   { label: 'finalizado',   color: '#2A4747' },
  pausado:      { label: 'pausado',      color: '#B4BCC0' },
  deprecado:    { label: 'deprecado',    color: '#8c8070' },
};

export const ACTUAL_ESTADOS = ['construyendo', 'activo', 'finalizado', 'pausado', 'deprecado'];
export const VISION_ESTADOS = ['idea', 'disenado'];

export const TIPO_PIEZA_LABEL: Record<string, string> = {
  skill: 'skill',
  flujo: 'flujo',
  template: 'template',
  convencion: 'convención',
  integracion: 'integración',
};

// Las once áreas de 01 - Matriz. El orden es el de presentación.
export const AREAS = [
  { slug: 'modulos',       label: 'Módulos',       linea: 'Los módulos del sistema y su relación.' },
  { slug: 'capas',         label: 'Capas',         linea: 'La escalera: sistema, módulo, pieza, artefacto.' },
  { slug: 'skills',        label: 'Skills',        linea: 'Catálogo, convenciones, arquitectura.' },
  { slug: 'instancias',    label: 'Instancias',    linea: 'Unidades atómicas y los templates que las crean.' },
  { slug: 'flujos',        label: 'Flujos',        linea: 'Los pipelines que recorren las instancias.' },
  { slug: 'convenciones',  label: 'Convenciones',  linea: 'Naming, frontmatter, cómo se escribe cada cosa.' },
  { slug: 'taxonomia',     label: 'Taxonomía',     linea: 'Ids, estados, tipos, terminología.' },
  { slug: 'integraciones', label: 'Integraciones', linea: 'Sistema con sistema, y plugins que sostienen un pipeline.' },
  { slug: 'cuadrantes',    label: 'Cuadrantes',    linea: 'El cuadrante como unidad estructural.' },
  { slug: 'pagina',        label: 'Página',        linea: 'Qué colección alimenta qué vista.' },
  { slug: 'mapas',         label: 'Mapas',         linea: 'Organigramas, cursogramas, árbol de carpetas.' },
] as const;

export type AreaSlug = (typeof AREAS)[number]['slug'];

// El área de una pieza se DERIVA de su tipo. No hay campo `area` en kx-piezas, a propósito:
// evita que se desincronice de su propio tipo.
export const AREA_DE_TIPO_PIEZA: Record<string, AreaSlug> = {
  skill: 'skills',
  template: 'instancias',
  flujo: 'flujos',
  convencion: 'convenciones',
  integracion: 'integraciones',
};

export function areaDePieza(p: { data: { tipo: string } }): AreaSlug | null {
  return AREA_DE_TIPO_PIEZA[p.data.tipo] ?? null;
}

// Archivo de área correspondiente en la bóveda, solo para mostrar como referencia de texto
// (la bóveda no es navegable desde el sitio).
export const AREA_ARCHIVO_BOVEDA: Record<AreaSlug, string> = {
  modulos: '01 - Matriz/Mapa de Modulos.md',
  capas: '01 - Matriz/Mapa de Capas.md',
  skills: '01 - Matriz/Mapa de Skills.md',
  instancias: '01 - Matriz/Mapa de Instancias.md',
  flujos: '01 - Matriz/Mapa de Flujos.md',
  convenciones: '01 - Matriz/Mapa de Convenciones.md',
  taxonomia: '01 - Matriz/Mapa de Taxonomia.md',
  integraciones: '01 - Matriz/Mapa de Integraciones.md',
  cuadrantes: '01 - Matriz/Mapa de Cuadrantes.md',
  pagina: '01 - Matriz/Mapa de Pagina.md',
  mapas: '01 - Matriz/Mapa de Mapas.md',
};

// Fechas: los schemas usan z.date(), así que llegan como objetos Date.
// Formatear SIEMPRE con timeZone UTC: usar getMonth()/getDate() locales corre el día un huso.
export function fechaCorta(d: Date): string {
  const p = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return p.format(d);
}

export function diasDesde(d: Date): number {
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

export function ultimoMovimiento(...colecciones: Array<Array<{ data: { actualizado?: Date } }>>): Date | null {
  const fechas = colecciones.flat().map((o) => o.data.actualizado).filter(Boolean) as Date[];
  if (!fechas.length) return null;
  return new Date(Math.max(...fechas.map((f) => f.getTime())));
}

// ── design system: metadata de las cuatro rampas de taxonomía (KX-P22) ──
// Cada rampa tiene su propia variable CSS (kx-tokens.css), nunca comparte hue
// con otra rampa donde puedan aparecer juntas en la misma tarjeta.
export type Rampa = 'estado' | 'tipoPieza' | 'tipoTarea' | 'autoria' | 'estadoTarea';

export const ESTADO_PASTILLA: Record<string, { label: string; var: string }> = {
  idea:         { label: 'idea',         var: '--kx-estado-idea' },
  disenado:     { label: 'diseñado',     var: '--kx-estado-disenado' },
  construyendo: { label: 'construyendo', var: '--kx-estado-construyendo' },
  activo:       { label: 'activo',       var: '--kx-estado-activo' },
  finalizado:   { label: 'finalizado',   var: '--kx-estado-finalizado' },
  pausado:      { label: 'pausado',      var: '--kx-estado-pausado' },
  deprecado:    { label: 'deprecado',    var: '--kx-estado-deprecado' },
};

export const TIPO_PIEZA_PASTILLA: Record<string, { label: string; var: string }> = {
  skill:       { label: 'skill',       var: '--kx-pieza-skill' },
  flujo:       { label: 'flujo',       var: '--kx-pieza-flujo' },
  template:    { label: 'template',    var: '--kx-pieza-template' },
  convencion:  { label: 'convención',  var: '--kx-pieza-convencion' },
  integracion: { label: 'integración', var: '--kx-pieza-integracion' },
};

export const TIPO_TAREA_PASTILLA: Record<string, { label: string; var: string }> = {
  decidir:   { label: 'decidir',   var: '--kx-tarea-decidir' },
  pensar:    { label: 'pensar',    var: '--kx-tarea-pensar' },
  construir: { label: 'construir', var: '--kx-tarea-construir' },
  escribir:  { label: 'escribir',  var: '--kx-tarea-escribir' },
  aclarar:   { label: 'aclarar',   var: '--kx-tarea-aclarar' },
};

export const AUTORIA_PASTILLA: Record<string, { label: string; var: string }> = {
  teo:   { label: 'Teo', var: '--kx-autoria-teo' },
  ia:    { label: 'IA',  var: '--kx-autoria-ia' },
  mixta: { label: 'mixta', var: '--kx-autoria-mixta' },
};

export const ESTADO_TAREA_PASTILLA: Record<string, { label: string; var: string }> = {
  abierta:   { label: 'abierta',   var: '--kx-gold' },
  bloqueada: { label: 'bloqueada', var: '--kx-alert' },
  cerrada:   { label: 'cerrada',   var: '--kx-mint-deep' },
};

// ── prosa de la Matriz: markdown mínimo a HTML ──
// La colección kx-areas trae el texto crudo de los `Mapa de {área}.md`. Es un
// subconjunto acotado y conocido de markdown (negrita, código inline, itálica,
// listas, encabezados de nivel 5 y 6), así que no vale traer una librería.
// Si algún día la prosa de la Matriz necesita tablas o mermaid, esto se cambia
// por un renderer real — hoy esos viven solo en las entradas de ítem, que esta
// colección deliberadamente no extrae.
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
}

export function prosaAHtml(md: string): string {
  if (!md?.trim()) return '';
  const bloques = md.split(/\n\s*\n/);
  const out: string[] = [];
  for (const bloque of bloques) {
    const lineas = bloque.split('\n').filter((l) => l.trim());
    if (!lineas.length) continue;

    const h6 = lineas[0].match(/^###### (.+)$/);
    const h5 = lineas[0].match(/^##### (.+)$/);
    if (h5 || h6) {
      out.push(`<h4>${inline((h5 ?? h6)![1])}</h4>`);
      const resto = lineas.slice(1);
      if (resto.length) out.push(prosaAHtml(resto.join('\n')));
      continue;
    }

    if (lineas.every((l) => /^\s*[-*] /.test(l))) {
      const items = lineas.map((l) => `<li>${inline(l.replace(/^\s*[-*] /, ''))}</li>`).join('');
      out.push(`<ul>${items}</ul>`);
      continue;
    }

    if (lineas[0].startsWith('> ')) {
      out.push(`<blockquote>${inline(lineas.map((l) => l.replace(/^> ?/, '')).join(' '))}</blockquote>`);
      continue;
    }

    // Tablas y otros bloques que este renderer no cubre: se muestran monoespaciados,
    // sin intentar interpretarlos, para no perder información en silencio.
    if (lineas[0].trim().startsWith('|')) {
      out.push(`<pre class="kx-prosa-raw">${escapeHtml(lineas.join('\n'))}</pre>`);
      continue;
    }

    out.push(`<p>${inline(lineas.join(' '))}</p>`);
  }
  return out.join('\n');
}

// Qué colección alimenta las tarjetas de cada área de la Matriz.
// `null` = área conceptual: no cataloga objetos, solo prosa (Capas, Convenciones,
// Taxonomía, Mapas). Que no tengan tarjetas no es un hueco, es lo que son.
export const AREA_FUENTE: Record<string, { coleccion: string; filtroTipo?: string }[]> = {
  modulos: [{ coleccion: 'kxModulos' }],
  skills: [{ coleccion: 'kxPiezas', filtroTipo: 'skill' }],
  flujos: [{ coleccion: 'kxWorkflows' }, { coleccion: 'kxPiezas', filtroTipo: 'flujo' }],
  instancias: [{ coleccion: 'kxInstancias' }, { coleccion: 'kxPiezas', filtroTipo: 'template' }],
  cuadrantes: [{ coleccion: 'kxCuadrantes' }],
  integraciones: [{ coleccion: 'kxIntegraciones' }, { coleccion: 'kxPiezas', filtroTipo: 'integracion' }],
  convenciones: [{ coleccion: 'kxPiezas', filtroTipo: 'convencion' }],
  pagina: [{ coleccion: 'kxDocumentos' }],
  taxonomia: [],
  capas: [],
  mapas: [],
};

export const RAMPAS: Record<Rampa, Record<string, { label: string; var: string }>> = {
  estado: ESTADO_PASTILLA,
  tipoPieza: TIPO_PIEZA_PASTILLA,
  tipoTarea: TIPO_TAREA_PASTILLA,
  autoria: AUTORIA_PASTILLA,
  estadoTarea: ESTADO_TAREA_PASTILLA,
};
