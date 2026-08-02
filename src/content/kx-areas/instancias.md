---
id: "instancias"
titulo: "Instancias"
linea: "Unidades atómicas y los templates que las crean."
archivoBoveda: "01 - Matriz/Mapa de Instancias.md"
queEs: |-
  Las unidades atómicas que viajan por el sistema, y los templates que las crean. Una instancia es un archivo que nace de un acto de captura y después recorre un flujo: una stream session, una sesión de sistema, una entrada de bullet journal, un batch de treats, un ensayo.

  **Un template y su instancia son la misma cosa vista desde dos lados**, y por eso viven juntos en esta área: el template la crea, la instancia es el resultado. Separarlos garantiza que se desincronicen.

  No entra acá el pipeline que la instancia recorre. Eso es `Mapa de Flujos.md`.
convenciones: |-
  - **Los templates son de Templater** y viven en `Templates/` en la raíz de la bóveda, un archivo por instancia.
  - **El template hace tres cosas antes de escribir el frontmatter**, siempre en este orden: calcula la fecha, calcula el correlativo o el numeral romano contando los archivos que ya existen, y mueve la nota a su carpeta final con `tp.file.move()`. Teo nunca tipea un número ni elige una carpeta.
  - **Naming de instancia:** fecha primero, `{AA.MM.DD} - {tipo}[ - {romano}]`. El romano se agrega desde la segunda del día y arranca en `II`: la primera del día no lleva sufijo.
  - **`titulo` arranca vacío** en todas las instancias. Lo completa la skill de procesamiento, no Teo al crear la nota. Es una regla de fricción: nombrar algo antes de haberlo dicho es trabajo puesto en el momento equivocado.
  - **La fricción de captura es sagrada.** Ningún campo nuevo se agrega al momento de crear una instancia. Todo lo que se pueda derivar o llenar después, se llena después.
abierto: |-
  - `KX-T42`: nuevas clases de sesión (prompts directos a Claude, daily journal rant).
  - `KX-T26`: bullet journal como daily note, con template y skill posterior.
  - `KX-T07`: relación formal entre bullet journal y stream sessions.
  - **La relación entre las sesiones de sistema y las stream sessions class C.** Las dos hablan del sistema y hoy son dos capturas paralelas que no se hablan. Es una sesión de decisión pendiente, no un ítem menor.
inventario: |-
  `/kx/atlas/instancias/`: las instancias y sus templates, agrupados por estado.
decisiones:
  - fecha: 2026-07-26
    titulo: "un solo template de sesión kx core, sin suggester"
    cuerpo: |-
      Se elimina el suggester de cuatro propósitos (`explorar`, `decidir`, `especificar`, `descargar`) y el campo `proposito` del frontmatter. Queda un template único.

      Qué se descartó y por qué: la propuesta era usar `proposito` para rutear la destilación por criterio, y agregar un quinto valor `implementar`. Teo lo desestimó a favor de una sola sesión tratada siempre igual, con el doble HTML, decidiendo después dónde va el contenido según lo que el contenido sea.

      La consecuencia hay que tenerla presente: **sin `proposito`, el criterio de extracción se infiere del texto en vez de estar declarado.** El campo `conclusiva` se mantiene como la única señal declarada de nivel de compromiso.
  - fecha: 2026-07-26
    titulo: "el nombre de la sesión kx core va por fecha, no por id"
    cuerpo: |-
      `{AA.MM.DD} - kx autopoiesis session[ - {romano}]`, espejando el template de stream sessions. El id `KX-S{NN}` se mantiene en el frontmatter porque es lo que citan los objetos en su campo `origen`, pero no está en el nombre del archivo.
  - fecha: 2026-07-26
    titulo: "las sesiones kx core no pasan por limpieza por default"
    cuerpo: |-
      Se consumen por destilación, no por relectura, y Claude lee el crudo perfectamente bien. La limpieza se vuelve un paso del pipeline de publicación, no del de captura.
  - fecha: 2026-08-01
    titulo: "se elimina la cabecera de Intención de la sesión"
    cuerpo: |-
      El bloque `## Intención` (de qué hablo, de qué no hablo, qué busco, nivel de compromiso) sale del template. Teo lo pidió explícito: la sesión es agarrar el micrófono y hablar crudo, con muletillas, y cualquier cosa que haya que completar antes de hablar es fricción puesta en el momento en que el sistema no la tolera. Es el mismo principio que ya sostiene que `titulo` arranque vacío, aplicado al cuerpo.

      Es el segundo campo declarado que sale de esta instancia, después de `proposito` en `KX-S02`, y las dos veces por el mismo motivo. Vale la pena leerlo como patrón y no como dos hechos sueltos: **todo intento de que Teo declare de antemano de qué va a hablar terminó descartado.**

      **La consecuencia hay que mirarla de frente.** `KX-S02` había dejado a `conclusiva` y a la cabecera de Intención como las dos únicas señales declaradas que tenía la destilación. Ahora queda una sola, `conclusiva`, un booleano. Todo lo demás se infiere del texto. Esta corrida (`KX-S05`) es evidencia de que se puede: la sesión tenía la cabecera vacía y aun así se destiló entera. Pero es una señal menos, y si la inferencia falla en alguna corrida futura, este es el lugar donde está anotado por qué.
  - fecha: 2026-08-01
    titulo: "estado_autopoiesis se colapsa a dos valores, sin planificada"
    cuerpo: |-
      `KX-T50` había quedado reducida a una sola pregunta: si `planificada` entraba como campo propio o como cuarto valor de `estado`. Teo cortó por un lado que no era ninguna de las dos opciones evaluadas: **no hay `planificada`**, y de paso tampoco hace falta distinguir `destilada` de `publicada`. El campo pasa de tres valores a dos: `sin-procesar` y `procesada`.

      Qué se descartó y por qué. El esquema de tres pasaba de estado en estado seguido de cerca por cada paso del flujo (dictar, destilar, publicar), pero **ningún paso lo leía para nada**: no hay una sola página que renderice este campo, la única consumidora real era la skill de destilación buscando `estado: dictada` (nombre viejo del campo) como gatillo. Publicación ya tenía su propia señal, independiente: si `hrefTextual` o `hrefMapa` están completos, está publicada. Mantener un tercer valor solo para eso era redundancia sin lector.

      La consecuencia que hay que tener presente: **"procesada" no distingue si además ya se implementó o se publicó.** Esas dos cosas siguen pasando (son los pasos 4 a 7 del flujo, ver `Mapa de Flujos.md`), pero no las cuenta este campo. Si en algún momento hace falta filtrar por eso, la señal ya existe en otro lado: `produjo` (qué se creó) y `hrefTextual`/`hrefMapa` (si se publicó).
  - fecha: 2026-08-01
    titulo: "el campo se renombra a estado_autopoiesis"
    cuerpo: |-
      Mismo día, segunda vuelta. Teo lo pidió después de una pregunta suya sobre si el `estado` de esta instancia se comparte con el de las stream sessions (no: esas usan `estado_stream`, un campo distinto en un sistema sin colección de página). El renombre saca la ambigüedad de raíz: `estado` a secas ya lo usan también `kx-modulos`, `kx-piezas` y `kx-tareas`, cada uno con un enum completamente distinto.

      No hay riesgo técnico real (cada colección tiene su propio schema de Zod, y los frontmatter de archivos distintos no interfieren entre sí), pero sí hay riesgo humano y de proceso: la destilación lee varias colecciones a la vez y escribe en varias a la vez, y un nombre de campo genérico compartido entre esquemas con significados distintos es exactamente el tipo de cosa que se escribe mal en el archivo equivocado. Ver la convención general en `Mapa de Convenciones.md`.

      **Nota, no aplicada acá:** `kx-modulos`, `kx-piezas` y `kx-tareas` siguen con `estado` a secas. La convención nueva es hacia adelante; renombrar esos tres es un cambio más grande, sin pedir todavía.
actualizado: 2026-08-02
---
