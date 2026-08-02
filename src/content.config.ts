import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const definitions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/definitions' }),
  schema: z.object({
    title: z.string(),
    part_of_speech: z.string(),
    pronunciation: z.string().optional(),
    definition: z.string(),
    discipline: z.string().optional(),
    tags: z.array(z.string()),
    etymology: z.string().optional(),
    personal_note: z.string().optional(),
    rating: z.number().min(0).max(3),
    date_added: z.date(),
  }),
});

const concepts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/concepts' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    short_description: z.string(),
    discipline: z.string(),
    framework: z.string().optional(),
    tags: z.array(z.string()),
    origin: z.string(),
    rating: z.number().min(0).max(5),
    linked_notes: z.number(),
    field_note: z.string().optional(),
    notes_of_used: z.array(z.string()).optional(),
    related_concepts: z.array(z.string()).optional(),
    date_added: z.date(),
  }),
});

const quotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/quotes' }),
  schema: z.object({
    text: z.string(),
    author: z.string(),
    source: z.string().optional(),
    tags: z.array(z.string()),
    stars: z.number().min(0).max(3),
    summary: z.string().optional(),
    date_added: z.date(),
  }),
});

const linguisticTreats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/linguistic-treats' }),
  schema: z.object({
    word: z.string(),
    entry_type: z.enum(['word', 'phrase', 'suffix', 'prefix', 'wordplay']),
    definition: z.string(),
    note: z.string().optional(),
    tags: z.array(z.string()),
    stars: z.number().min(0).max(3),
    date_added: z.date(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    essay_number: z.number(),
    title: z.string(),
    date_published: z.date(),
    status: z.enum(['Draft', 'Open Loop', 'Published', 'Closed']),
    sections: z.array(z.string()).optional(),
    concepts_used: z.array(z.string()).optional(),
    notes_used: z.array(z.string()).optional(),
    disciplines_touched: z.array(z.string()),
    analytical_lens: z.string(),
    tags: z.array(z.string()),
    references: z.array(z.string()).optional(),
    follow_up_research: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    body: z.string().optional(),
    rating: z.number().min(0).max(3).optional(),
    date: z.date(),
    status: z.string().optional(),
    note_type: z.string().optional(),
    primary_discipline: z.string().optional(),
    sub_discipline: z.string().optional(),
    analytical_lens: z.string().optional(),
    concepts_used: z.union([z.array(z.string()), z.string()]).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const frameworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/frameworks' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    tags: z.array(z.string()),
    rating: z.number().min(0).max(5),
    related_concepts: z.array(z.string()).optional(),
    date_added: z.date(),
  }),
});

const contentNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/content-notes' }),
  schema: z.object({
    title: z.string(),
    creator_author: z.string(),
    platform: z.string(),
    link: z.string().url().optional(),
    date_published: z.date(),
    content_type: z.string(),
    discipline: z.string(),
    sub_discipline: z.string().optional(),
    tags: z.array(z.string()),
    rating: z.number().min(0).max(3).optional(),
    connected_content: z.array(z.string()).optional(),
    description: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

const researchDives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research-dives' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    rating: z.number().min(0).max(3),
    date: z.date(),
    tags: z.array(z.string()),
    source: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const ESTADOS = ['idea', 'disenado', 'construyendo', 'activo', 'finalizado', 'pausado', 'deprecado'] as const;

const kxModulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-modulos' }),
  schema: z.object({
    titulo: z.string(),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    // fechaInicio: cuándo el objeto entró al Atlas (estado más bajo).
    // fechaFin: cuándo pasó a `finalizado`. Las escribe la skill al cambiar
    // el estado, no se mantienen a mano. `actualizado` sigue siendo el último toque.
    fechaInicio: z.date().optional(),
    fechaFin: z.date().optional(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxAreas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-areas' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    linea: z.string(),
    archivoBoveda: z.string(),
    queEs: z.string(),
    convenciones: z.string(),
    abierto: z.string(),
    inventario: z.string(),
    decisiones: z.array(z.object({
      fecha: z.date(),
      titulo: z.string(),
      cuerpo: z.string(),
    })).default([]),
    actualizado: z.date(),
  }),
});

const kxSesiones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-sesiones' }),
  schema: z.object({
    id: z.string(),
    fecha: z.date(),
    titulo: z.string(),
    conclusiva: z.boolean().default(false),
    estado_autopoiesis: z.enum(['sin-procesar', 'procesada']),
    produjo: z.array(z.string()).default([]),
    resumen: z.string().optional(),
    hrefTextual: z.string().optional(),
    hrefMapa: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxDocumentos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-documentos' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    subtitulo: z.string(),
    modulo: z.string(),
    hrefTextual: z.string(),
    hrefMapa: z.string().optional(),
    estado: z.string(),
    fecha: z.date(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxPiezas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-piezas' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    tipo: z.enum(['skill', 'flujo', 'template', 'convencion', 'integracion']),
    modulo: z.string(),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    ruta: z.string().optional(),
    fechaInicio: z.date().optional(),
    fechaFin: z.date().optional(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxTareas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-tareas' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    tipo: z.enum(['decidir', 'pensar', 'construir', 'escribir', 'aclarar']),
    estado: z.enum(['abierta', 'bloqueada', 'cerrada']),
    modulo: z.string().optional(),
    area: z.string().optional(),
    prioridad: z.enum(['alta', 'media', 'baja']).optional(),
    descripcion: z.string(),
    notaOriginal: z.string().optional(),
    bloqueadaPor: z.array(z.string()).optional(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxCiclos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-ciclos' }),
  schema: z.object({
    id: z.string(),
    tema: z.string(),
    estado_ciclo: z.enum(['activo', 'terminado', 'pausado', 'abandonado']),
    fecha_inicio: z.date(),
    fecha_fin: z.date().optional(),
    hora_inicio: z.string().optional(),
    origen: z.array(z.string()).default([]),
    produjo: z.array(z.string()).default([]),
    // La ida y vuelta: un callout por intercambio con consecuencia real.
    // La genera generate-kx-ciclos.mjs desde los callouts [!teo]/[!ia] de la bóveda.
    idaYVuelta: z.array(z.object({
      quien: z.enum(['teo', 'ia']),
      marca: z.string().default(''),
      texto: z.string(),
    })).default([]),
    cierre: z.string().default(''),
    actualizado: z.date(),
  }),
});

const kxEventos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-eventos' }),
  schema: z.object({
    id: z.string(),
    fecha: z.date(),
    area: z.string(),
    verbo: z.enum(['creado', 'implementado', 'decidido', 'cambiado', 'calibrado', 'deprecado', 'abierto', 'cerrado']),
    texto: z.string(),
    archivoOrigen: z.string(),
  }),
});

const kxInstancias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-instancias' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    ruta: z.string().optional(),
    etapas: z.array(z.string()).optional(),
    fechaInicio: z.date().optional(),
    fechaFin: z.date().optional(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxWorkflows = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-workflows' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    categoria: z.enum(['contenido', 'sistema']),
    pasos: z.array(z.string()),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    materiaPrima: z.string().optional(),
    destino: z.string().optional(),
    cuelloDeBotella: z.string().optional(),
    fechaInicio: z.date().optional(),
    fechaFin: z.date().optional(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxCuadrantes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-cuadrantes' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    fechaInicio: z.date().optional(),
    fechaFin: z.date().optional(),
    origen: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxStack = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-stack' }),
  schema: z.object({
    titulo: z.string(),
    categoria: z.enum(['software', 'hardware']),
    estado: z.enum(ESTADOS),
    descripcion: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxIntegraciones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-integraciones' }),
  schema: z.object({
    titulo: z.string(),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    ruta: z.string().optional(),
    actualizado: z.date(),
  }),
});

const kxFuncionalidades = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kx-funcionalidades' }),
  schema: z.object({
    titulo: z.string(),
    estado: z.enum(ESTADOS),
    descripcion: z.string(),
    actualizado: z.date(),
  }),
});

export const collections = { definitions, concepts, quotes, linguisticTreats, essays, notes, frameworks, contentNotes, researchDives, kxModulos, kxPiezas, kxTareas, kxWorkflows, kxCuadrantes, kxStack, kxIntegraciones, kxFuncionalidades, kxSesiones, kxDocumentos, kxCiclos, kxEventos, kxInstancias, kxAreas };
