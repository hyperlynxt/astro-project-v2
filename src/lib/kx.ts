// Espejo en código de la taxonomía autoritativa: `00 - Kx Core Module/CLAUDE.md` (en la bóveda).
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

// Las once áreas de 01 - Estructura. El orden es el de presentación.
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
