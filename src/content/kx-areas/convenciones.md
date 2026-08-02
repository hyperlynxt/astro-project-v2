---
id: "convenciones"
titulo: "Convenciones"
linea: "Naming, frontmatter, cómo se escribe cada cosa."
archivoBoveda: "01 - Matriz/Mapa de Convenciones.md"
queEs: |-
  Cómo se nombran, se ubican y se escriben las cosas. El lugar donde se encuentra, en sentido operativo, cómo se crea algo nuevo en este sistema.

  Se divide en dos por alcance: lo transversal a toda la bóveda vive en `Convenciones/` en la raíz (un archivo por tema) y en el `CLAUDE.md` raíz; lo propio del kx atlas system vive acá y en el `CLAUDE.md` de este módulo. Si algo aplica a más de un módulo, va arriba, no acá.

  No entra acá el vocabulario en sí (ids, estados, tipos). Eso es `Mapa de Taxonomia.md`. Esta área es sobre la forma; esa, sobre las palabras.
convenciones: |-
  ##### Archivos y carpetas

  - Carpetas de módulo con prefijo numérico de dos dígitos. `0X` marca carpetas de soporte fuera de la secuencia principal (`0X - Deprecated/`, `0X - Testing Files/`).
  - Instancias con fecha primero: `{AA.MM.DD} - {tipo}[ - {romano}]`.
  - Archivos de área y de referencia con nombre descriptivo en Title Case, sin fecha. El nombre es la identidad y otros archivos lo citan, así que **renombrarlo es un cambio con costo**, no cosmético.
  - **Homogeneización:** antes de inventar un nombre nuevo, reusar uno que ya exista en el sistema. La consistencia entre plataformas (carpetas, grupos de WhatsApp, proyectos de Claude) es un principio de diseño explícito.

  ##### Encabezados

  En este módulo, **nunca `#`, `##` ni `###`.** Se arranca en `####` y se anida con `#####` y `######`. El nombre del archivo ya hace de título en Obsidian.

  La excepción son los documentos que se publican en la página, que necesitan jerarquía normal porque Astro genera los anchors de navegación a partir de los `##` y `###`.

  ##### Frontmatter

  - Comillas dobles en fechas y en todo string que pueda romper el parseo de YAML.
  - `titulo` vacío al crear, lo completa la skill de procesamiento.
  - Un campo nuevo se agrega cuando hay una pregunta que no se puede contestar sin él, no por completitud.
  - Lo que se puede derivar de otra cosa no se declara. Ejemplo aplicado: el área de una pieza se deriva de su `tipo`, así que `kx-piezas` no lleva campo `area`.
  - **Un campo de lifecycle nuevo lleva el tipo de instancia en el nombre, namespaced con `_`.** No `estado` a secas: `estado_autopoiesis`, `estado_stream`. El nombre bare queda reservado para cuando de verdad no hay ambigüedad posible en el sistema entero.

  ##### Cómo se agrega información

  - **Fecha en todo lo que se agrega.** Cada decisión, cada línea de patch notes, cada nota de área lleva su `{AA.MM.DD}`.
  - **Granularidad por destino:** el patch notes lleva una línea por evento; la entrada de la Matriz lleva la descripción completa y con qué se conecta; el objeto de la colección lleva el estado en una línea. La misma cosa se cuenta tres veces con tres niveles de detalle, y eso no es duplicación mientras cada uno cuente lo suyo.
  - **La Matriz es la fuente, la colección es el índice derivado.** Ver el `CLAUDE.md` del módulo. Reemplaza a la regla anterior de este archivo ("la prosa nunca enuncia inventario"), retirada el 26.07.26 por prohibir justo el contenido que la Matriz necesita tener.
  - **Nunca borrar información de Teo.** Lo que no encaja se lista verbatim como "sin clasificar" en el reporte de corrida.

  ##### Estilo

  - **Nunca em-dashes.** Regla dura de todo el sistema, sin excepciones.
  - Palabras dudosas de dictado: se marcan inline, nunca se adivina el reemplazo.
  - Sin tracking de métricas que no se pidió (conteos de palabras, porcentajes de muletillas).
abierto: |-
  - **`kx-modulos`, `kx-piezas` y `kx-tareas` siguen con `estado` a secas**, sin namespacear. La convención nueva del 26.08.01 es hacia adelante; renombrar los tres campos existentes es un cambio más grande (schema, todos los objetos, toda la documentación que los cita), sin pedir todavía.
  - **Dónde caen los archivos que no encajan en ningún módulo.** Desde el 26.08.01 Teo crea adentro de la bóveda en vez de solo diseñarla, y eso rompe el supuesto de que todo archivo pertenece a algo: van a aparecer tipos de nota y templates en prueba. Necesitan una carpeta de cuarentena que el Atlas no reclame (`KX-T52`). Hay que reconciliarlo contra `0X - Testing Files/`, que existe pero es para calibración de skills, no para captura sin clasificar.
  - `KX-T23`: diccionario de dictado, la lista de reemplazos ya confirmados versus el marcador inline para casos nuevos.
  - `KX-T18`: catálogo de banderas. El formato `BANDERA: TIPO` está propuesto pero los tipos no están definidos.
  - `KX-T28`: frontmatter de evento, mecanismo en duda.
  - `KX-T43`: research de properties.
  - El material de `Convenciones/Templates.md` (frontmatter compartido entre templates) todavía no está reflejado acá ni al revés. Hay que decidir cuál de los dos es la fuente para lo que se solapa.
inventario: |-
  `/kx/atlas/convenciones/`: las piezas de tipo convención agrupadas por estado, más esta prosa completa.
decisiones:
  - fecha: 2026-08-01
    titulo: "un objeto entra al Atlas cuando se empieza a implementar, no cuando se termina"
    cuerpo: |-
      El criterio de cuándo algo se carga en la Matriz y en las colecciones: **en el momento en que se empiezan a crear carpetas y archivos**, con el estado más bajo que corresponda (`idea` o `construyendo`), y se sube después a medida que Teo diga que está terminado.

      La alternativa era esperar a que la cosa estuviera hecha para registrarla. Se descarta porque produce el peor error posible en un sistema que existe para saber dónde estás parado: el Atlas mostraría menos de lo que hay, y justo se comería lo que está en obra, que es lo único que uno necesita ver cuando vuelve el sábado. Que un objeto exista en estado `idea` no es ruido, es el dato.

      Encaja con la distinción entre `activo` y `finalizado` que ya está en `Mapa de Taxonomia.md`, y es la misma preferencia de fondo: que el estado del sistema nunca mienta hacia el lado optimista.
  - fecha: 2026-08-01
    titulo: "el patch notes también contesta dónde lo dejé"
    cuerpo: |-
      La convención de registrar todo cambio ya existía. Lo que se agrega es el segundo propósito, que cambia qué se espera de ella: además del linaje de actualizaciones y de poder verificar si una corrida se ejecutó o no, el patch notes es lo que contesta **en qué estaba trabajando** cuando se retoma después de unos días.

      Es el mismo dato leído de dos formas, y por eso no compite con la Matriz: la Matriz dice qué existe hoy, el patch notes dice qué se movió último. La consecuencia operativa es que la regla sube de alcance: Teo la quiere en el `CLAUDE.md` raíz y no solo en el del Atlas, porque aplica a cualquier sesión que toque la bóveda (`KX-T54`).
  - fecha: 2026-08-01
    titulo: "los campos de lifecycle se namespacean por tipo de instancia"
    cuerpo: |-
      Motivo concreto: Teo preguntó si el `estado` nuevo de las sesiones de sistema (`sin-procesar`/`procesada`) se compartía con el de las stream sessions. La respuesta era no (las stream sessions usan `estado_stream`, con su propio catálogo de valores, ni siquiera tienen colección de página), pero la pregunta expuso el problema real: `estado` a secas ya lo usan `kx-modulos`, `kx-piezas` y `kx-tareas`, cada uno con un enum distinto, y ahora también las sesiones.

      **No hay riesgo técnico.** Cada colección tiene su propio schema de Zod, y el frontmatter de un archivo no interfiere con el de otro. El riesgo es humano y de proceso: `destilar-sesion-kx` lee varias colecciones a la vez y escribe en varias a la vez, y un nombre de campo genérico repetido con significados distintos en cada esquema es justo el tipo de cosa que se termina escribiendo en el archivo equivocado, o con el valor del enum que no corresponde.

      **La regla:** todo campo de lifecycle nuevo (`estado`, o lo que cumpla ese rol) lleva el tipo de instancia como sufijo namespaced: `estado_autopoiesis` para las sesiones de sistema, `estado_stream` para las stream sessions (que ya lo hacía, sin que fuera una regla escrita hasta ahora).

      **Qué NO se tocó.** `kx-modulos`, `kx-piezas` y `kx-tareas` siguen con `estado` a secas. La regla es hacia adelante, sobre lo que se crea de acá en más; renombrar esos tres campos existentes (que tocaría el schema, cada objeto de las tres colecciones, y toda la documentación que los cita) es un cambio bastante más grande, y no se pidió. Queda anotado en "Abierto" por si en algún momento se decide hacerlo.
  - fecha: 2026-07-26
    titulo: "el nivel de encabezado arranca en cuatro"
    cuerpo: |-
      Preferencia explícita de Teo: los subtítulos grandes no le gustan. Aplica a todo archivo de este módulo, con la excepción de los publicables.
  - fecha: 2026-07-26
    titulo: "CLAUDE.md jerárquico, uno por carpeta de trabajo real"
    cuerpo: |-
      Cada carpeta con convenciones propias lleva su `CLAUDE.md`, para que una sesión cargue solo lo que necesita en vez de todo el contexto de la bóveda. El raíz se mantiene corto a propósito y funciona como mapa, no como manual.
actualizado: 2026-08-02
---
