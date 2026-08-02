---
id: "pagina"
titulo: "Página"
linea: "Qué colección alimenta qué vista."
archivoBoveda: "01 - Matriz/Mapa de Pagina.md"
queEs: |-
  `interlynkx-page`: cómo está armada, qué colección alimenta qué vista, y cómo se publica algo nuevo. Es la mitad del sistema que vive fuera de la bóveda.

  La página no es solo la salida pública del sistema: **es donde vive la capa de estado.** Los objetos del sistema (módulos, piezas, tareas) son archivos markdown en `src/content/`, y las vistas los leen en build. Por eso esta área es de Estructura y no un detalle de presentación.
convenciones: |-
  ##### Dónde está qué

  - Proyecto Astro, hermano de la bóveda en el workspace, con su propio repo de git. La bóveda **no** está en ese repo.
  - `base: '/astro-project-v2'`. Toda ruta interna lo lleva. Olvidarlo es el bug más frecuente.
  - `src/content.config.ts`: las colecciones y sus schemas Zod. Un campo nuevo se agrega acá primero.
  - `src/content/kx-*/`: un archivo markdown por objeto, frontmatter y nada más en el cuerpo.
  - `src/pages/kx/`: las vistas. `src/layouts/KxDoc.astro` para las páginas textuales.
  - Deploy por GitHub Actions al pushear a `main`.

  ##### Publicación en pareja

  Un documento se publica **siempre** como par: una versión textual (`{slug}.md` con el layout `KxDoc`, prosa completa) y un mapa visual (`{slug}-mapa.astro`, números grandes y tarjetas, casi sin párrafos). Cada elemento del mapa linkea al anchor exacto de su sección en la textual. Ver la skill `publicar-modulo-kx`.

  **Los anchors no se calculan a mano.** Astro los genera con github-slugger y hay suficientes casos borde (acentos, signos de interrogación, dos puntos) como para que valga más leerlos del HTML renderizado que confiar en la regla.

  ##### Gotchas de infraestructura

  Todos ya pisados una vez. No repetirlos.

  - **Un archivo de página nuevo no se detecta en caliente.** El dev server solo vigila lo que conocía al arrancar: un `.astro` o `.md` nuevo en `src/pages/` da 404 hasta reiniciar.
  - **Astro ignora el `PORT` que le pasa el harness** y auto incrementa solo. Si el 4321 está ocupado, el server real queda en 4322 aunque la herramienta reporte otro puerto. Verificar el puerto en los logs, no en lo que reporta el arranque.
  - **`npm.cmd` como ejecutable en `launch.json` falla** en este entorno: el proceso hijo no hereda `node` en el `PATH`. Se invoca `node.exe` directo contra `astro.mjs`.
  - **Mermaid no queda como `code.language-mermaid`.** Shiki lo deja como `pre[data-language="mermaid"]`, y ese es el selector que usa el script de hidratación en `KxDoc.astro`.
  - Los errores de `favicon.ico` en los logs son preexistentes e inofensivos: el sitio lo pide sin el `base`.

  ##### Sistema de diseño

  Paleta de pergamino: `--bg #FCFAF5`, `--ink #23211d`, `--line #ddd4bf`, `--teal #2A4747` (acento primario), `--gold #B08D57` (kickers), `--seal #8B2626` (alerta, nunca decorativo), `--panel #F5F1E6`. Cuatro colores temáticos para taxonomías de cuatro grupos: verde `#7BA08A`, violeta `#9B7CC8`, sello `#8B2626`, plata `#B4BCC0`. El quinto grupo en adelante usa neutro, no un hue nuevo.

  Tipografías: EB Garamond para prosa, Inter para metadata y UI, JetBrains Mono para ids, Reenie Beanie solo para el wordmark del topbar.

  **Regla de accesibilidad:** el color nunca es el único portador de significado. Toda tarjeta con color lleva texto visible al lado. Esta paleta no pasaría un validador de contraste para charts con leyenda pura, y está bien, porque acá el color siempre acompaña al texto.
abierto: |-
  Casi todo lo que estaba abierto acá pasó a estar **decidido y planificado, pero sin construir**, desde el 26.08.01. Lo que sigue es lo que el plan del hub no resuelve.

  - **La etapa 0 está construida** (`KX-T58`, cerrada el 26.08.01): `kx-tokens.css`, `KxShell.astro`, doce componentes. El chrome duplicado y el modo oscuro imposible dejan de ser síntomas del sistema, quedan solo en las siete páginas viejas que todavía no se tocaron.
  - **Las once páginas de área existen** (`/kx/atlas/{area}/`), más `/kx/`, `/kx/atlas/`, `/kx/atlas/piezas/` y `/kx/autopoiesis/`. Lo que falta de `KX-T59`: el visual propio de cada área según su driver ontológico (hoy solo flujos lo tiene), las fichas individuales por objeto, el grafo y el árbol de carpetas.
  - **`KX-T60` está cerrada.** Las cinco rutas de autopoiesis existen: índice, tareas (columnas por quién desbloquea), sesiones (timeline), ciclos (ida y vuelta como conversación) y log (212 eventos por día, filtrable). Falta la ficha individual por tarea y por sesión, que hoy se resuelven en la vista de listado.
  - **El molde común es provisorio a propósito.** Las once áreas comparten hoy la misma forma (prosa, escalera por estado, decisiones, abierto). Es el piso, no el destino: el §4 del plan asigna a cada categoría una forma distinta, y solo flujos la tiene aplicada.
  - **Las cuatro vistas viejas se archivaron el 26.08.02** (`sistema.astro`, `tareas.astro`, `anatomia.astro`, `areas/`) a `src/pages/_archive/kx-vistas-viejas/`. Dejan de buildear: Astro ignora las carpetas que arrancan con `_`. Su reemplazo estaba verificado, que era la condición. Al archivarlas hubo que corregir el "Dónde se ve el inventario" de diez archivos de la Matriz, que apuntaban a esas rutas y se renderizan en las páginas nuevas: una página que te manda a un 404 es exactamente la mentira que este sistema existe para evitar.
  - **Los dos pares de documento se conservan** (`modulo-base`, `kx-core`). Son contenido escrito, no chrome, y `kx-documentos` los apunta. Siguen con `KxDoc.astro` y la estética parchment: migrarlos a `KxShell` queda pendiente, y no es urgente porque son prosa, no vistas de datos.
  - **`fechaInicio` existe en el schema pero está casi vacío.** Solo dos módulos (`autopoiesis`, `modulo-base`) y los cinco flujos la tienen, porque son los únicos casos con evidencia real de fecha. El resto queda sin completar a propósito: inventar una fecha de inicio es peor que no tenerla. `fechaFin` está vacío en todo el sistema, correctamente: ningún objeto está en `finalizado`.
  - **Las tres colecciones nuevas ya están aprobadas y construidas** (`KX-T61`, cerrada el mismo día): `kx-ciclos` (con `KX-I01` y `KX-I02` cargados), `kx-eventos` (generada por `scripts/generate-kx-eventos.mjs`, 180 eventos desde los dos meses de patch notes existentes) y `kx-instancias` (las 4 instancias de `Mapa de Instancias.md`, con `etapas` sin forzar todavía). El campo `area` de `kx-tareas` también existe, con 48 de 63 tareas clasificadas.
  - **`kx-cuadrantes` sigue siendo el único prerequisito que no se puede automatizar.** La lista de cuadrantes hay que dictarla (`KX-T20`). `kx-workflows` también sigue vacía, esperando la transcripción de `KX-T22`.
  - **`area` en `kx-tareas` no fue "migración automática" como se dijo al proponerlo.** Corrección real: los cinco tipos de tarea (`decidir`, `pensar`, `construir`, `escribir`, `aclarar`) no mapean a las once áreas de la Matriz, a diferencia de los cinco tipos de pieza, que sí. Se clasificó a mano, cruzando contra las citas de id que ya existían en `#### Abierto` y `#### Decisiones` de cada archivo de área. Las 15 tareas sin `area` (sobre módulos de contenido, contexto personal, o temas todavía sin resolver) quedan así a propósito, no por descuido.
  - **Sprawl de colecciones.** Hay nueve `kx-*`, dos vacías, y la diferencia entre `kx-funcionalidades` y `kx-piezas` no está escrita en ningún lado. Se desestimó resolverlo por ahora, y el plan del hub lo empeora antes de mejorarlo: propone tres colecciones más.
  - **El mapa de dependencias** (`KX-T63`) queda afuera de la v1 a propósito. Necesita un campo `depende` que no existe, y `Mapa de Modulos.md` ya tiene anotado que no hay forma de expresar que un módulo depende de otro. El grafo de pertenencia y participación de `/kx/atlas/mapa/` es su piso, no su versión chica.
  - `KX-T27`: los HTML conectados a git. Sigue abierta y ahora se solapa parcialmente con `KX-T63`; falta decidir si son la misma pregunta.
  - El test de colecciones (agregar una solo si responde una pregunta que hoy no se puede responder) está aplicado y ahora escrito en el plan del hub §7, pero todavía no en un archivo de convenciones.
inventario: |-
  La página misma. `/kx/` es el hub, y desde ahí se llega a todas las vistas.
decisiones:
  - fecha: 2026-07-26
    titulo: "el estado vive en markdown tipado, no en el HTML"
    cuerpo: |-
      Decisión estructural, tomada en el plan anterior y confirmada. La alternativa (el dashboard como página editada a mano) se descartó porque rompe la portabilidad del núcleo y convierte cada cambio de estado en una tarea de edición.
  - fecha: 2026-07-26
    titulo: "el hub se rediseña desde cero, estética fresca y pastel"
    cuerpo: |-
      El hub viejo (fondo de textura de papel, parchment, tarjetas oscuras) se archiva en `src/pages/_archive/kx-hub-old-source/` y se reemplaza por un diseño nuevo: fondo blanco limpio (sin la textura), tarjetas redondeadas con glow de color al hover, acento teal como color primario y cuatro pastel (teal, ámbar, coral, lavanda) cíclicos en las tarjetas de área. Dirección tomada de `quotes.astro` y `linguistic-treats.astro`, que ya tenían esta identidad visual para el contenido público del sitio.

      **Alcance: hub y páginas de área.** Extendido el mismo día: `KxBase.astro` (que usaban las páginas de área) tenía tokens de modo oscuro atados a `prefers-color-scheme` que, sumados a la textura de papel, rompían el contraste en cualquier navegador con tema oscuro del sistema (tarjetas casi negras, texto ilegible). Reportado por Teo con una captura real. En vez de parchear el bug, `areas/[area].astro` y `areas/index.astro` se reescribieron con la estética fresca, igual que el hub. `sistema.astro`, `tareas.astro`, `anatomia.astro`, y los documentos publicados (`modulo-base`, `kx-core`) siguen con el estilo anterior: rediseñarlos todos junto hubiera sido demasiado para poder verificar bien cada uno.
  - fecha: 2026-07-26
    titulo: "el hub se dibuja de los datos, no se escribe"
    cuerpo: |-
      El hub `/kx/` era la última página del sistema que enumeraba a mano, y ya estaba desincronizada: mostraba cuatro módulos escritos en JSX contra seis reales en la colección. Pasa a ser una proyección, y la regla de la prosa que no enuncia inventario deja de tener excepciones.

      Con eso, el orden del hub se invierte: primero retomar (dónde quedé), después bloqueos, y al final navegar. Navegar era lo único que hacía, y es la pregunta menos frecuente.

      Plan completo en `Plan de Hub - Puerta de Entrada del Kx System.md`.
  - fecha: 2026-07-26
    titulo: "un módulo tiene N documentos, y eso necesita su propia colección"
    cuerpo: |-
      El campo `href` de `kx-modulos` es singular y el core module ya tiene dos documentos publicados, cada uno con su par textual y mapa. Se decide una colección `kx-documentos` con `hrefTextual` y `hrefMapa`, y sacar `href` de `kx-modulos`.

      Se descartó la alternativa (un array de hrefs en el módulo) porque un documento tiene metadata propia (estado, fecha, sesión de origen) que no cabe en un string, y porque es lo que `publicar-modulo-kx` tendría que escribir.
  - fecha: 2026-08-01
    titulo: "la constelación se rediseña entera como dos áreas anidadas bajo /kx/"
    cuerpo: |-
      `KX-S07`. `/kx/` deja de ser un puñado de vistas sueltas y pasa a ser una constelación de dos áreas: **Atlas** (`/kx/atlas/*`, ver el sistema) y **autopoiesis** (`/kx/autopoiesis/*`, cambiarlo). Veintiuna rutas en total, planificadas de una vez en `Plan de Hub Kx - Atlas y Autopoiesis.md`, que reemplaza al `Plan de Hub - Puerta de Entrada del Kx System.md` del 26.07.26 (aquel diseñaba una sola página, y su hallazgo central, que lo que hacía falta era una página por área, queda absorbido).

      Cuatro cosas se decidieron antes de escribir el plan, y se descartaron sus alternativas:

      - **`/kx/` sigue siendo la raíz**, con las dos áreas anidadas adentro. Se descartó una raíz nueva con `/kx/` archivado, y también dejar las rutas planas agrupándolas solo en la navegación: si la estructura no está en la ruta, no está.
      - **Reemplazo total de las siete páginas actuales**, que van a `_archive/` una vez que su reemplazo esté verificado en pantalla. Se descartó la absorción parcial, y se descartó que las dos estéticas convivan, que era exactamente el problema anotado en Abierto desde el 26.07.26.
      - **El plan puede proponer colecciones y campos nuevos** (`kx-ciclos`, `kx-eventos`, `kx-instancias`, el campo `area` en tareas), marcados como prerequisito de la página que los necesita. Se descartó limitarse a las nueve colecciones cargadas, que dejaba media constelación sin diseñar. La aprobación de cada una sigue siendo de Teo (`KX-T61`).
      - **Se planifica todo antes de escribir una línea de HTML.** El plan define pantallas, secciones, datos y componentes; el código lo escribe otro agente después. Pedido explícito de Teo.

      La relación entre las dos áreas es asimétrica a propósito, y espeja la que el sistema ya tiene: **autopoiesis linkea al Atlas siempre** (todo id que aparezca en un evento, tarea, sesión o ciclo es un link a la ficha del objeto), y **el Atlas linkea a autopoiesis solo en el bloque de historia** al pie de cada ficha. Ese bloque es lo que hace que la integración sea real en vez de dos sitios pegados: contesta "de dónde salió esto" sin que Teo tenga que acordarse.
  - fecha: 2026-08-02
    titulo: "el Atlas se organiza por área de la Matriz, no por tipo de objeto"
    cuerpo: |-
      `KX-S07`, segunda vuelta. Corrige el plan del día anterior, que había planificado las páginas del Atlas por tipo de objeto (módulos, piezas, flujos, instancias...). Teo pidió otra cosa, y es mejor: **una página por archivo de `01 - Matriz/`, once en total**, espejo 1:1 de la bóveda. Si algo está en `Mapa de X.md`, está en `/kx/atlas/x/`, y no hay ninguna ambigüedad sobre dónde vive qué.

      Lo que se descartó: la organización por tipo de objeto, que seguía la forma de las colecciones en vez de la de la Matriz y obligaba a explicar por qué una skill vivía en "piezas" y no en "skills". `/kx/atlas/piezas/` sobrevive, pero como **vista transversal**, no como columna principal: es el corte que cruza los cinco tipos de una vez.

      La consecuencia de fondo: cada área muestra su inventario **agrupado por estado** (idea, diseñado, construyendo, activo, finalizado), aunque tenga dos objetos. Ver el hueco es el punto, y con pocos ítems se ve mejor que con muchos.
  - fecha: 2026-08-02
    titulo: "la sincronización de la página cuelga del build, no de la memoria"
    cuerpo: |-
      `KX-T62`, cerrada. Teo lo venía pidiendo desde `KX-S06`: que las skills dejen la página actualizada al terminar. Al ir a implementarlo apareció que **el problema no era el que se había planteado.**

      Lo planteado era que las skills escribieran HTML. Pero las páginas ya son proyecciones de las colecciones, y las skills ya escriben las colecciones. El hueco real estaba en otro lado: **las tres colecciones generadas** (`kx-eventos`, `kx-areas`, `kx-ciclos`) se derivan de la bóveda, y las skills escribían la fuente sin correr nunca los generadores. Resultado: la página mostraba el estado viejo aunque la bóveda estuviera perfecta.

      Se resolvió en dos capas, y la segunda es la que lo hace confiable:

      1. **La instrucción**: las dos skills tienen ahora un paso explícito de sincronizar.
      2. **El mecanismo**: `prebuild` encadena los tres generadores, así que un `npm run build` alcanza. La instrucción puede olvidarse; el hook no.

      Para que la capa 2 fuera posible hubo que cambiar los generadores de **fallar** a **saltear con aviso** cuando no encuentran la bóveda. El deploy de GitHub Actions clona solo el repo de la página, así que un `prebuild` que exige la bóveda rompía el deploy. Ahora en CI saltean y se usan los archivos commiteados, que es lo correcto. Verificado simulando CI sin bóveda.

      **La regla que queda:** correr el build siempre que la corrida haya tocado la bóveda, aunque no se haya tocado una línea de `interlynkx-page`. Escribir en el patch notes o en un archivo de la Matriz **es** un cambio de la página.
  - fecha: 2026-08-02
    titulo: "la prosa de la Matriz se genera, no se reescribe"
    cuerpo: |-
      Teo pidió que toda la información del Atlas esté en las páginas, condensada. El problema conocido: la prosa vive en la bóveda, que no está en el repo del sitio. Se resuelve con el mismo patrón que ya funcionó para el patch notes: **un script parsea los once `Mapa de X.md` y genera la colección `kx-areas`** (`npm run gen:areas`). El markdown de la bóveda sigue siendo la fuente; la colección es un espejo commiteado que se regenera a pedido.

      Qué extrae y qué no, y esto importa: extrae las secciones de prosa del molde (qué es esta área, convenciones, decisiones fechadas, abierto, inventario) y **no** extrae las entradas `#####` de cada ítem. Esas vienen de las colecciones `kx-*` como tarjetas. Es la regla de dirección aplicada a la página: **el archivo de la Matriz da el porqué, la colección da el qué**, y ninguna de las dos repite a la otra.

      Se descartaron las dos alternativas: dejar la prosa solo en Obsidian (que es justo lo que Teo quiere dejar de necesitar) y condensarla a mano (que se desincroniza apenas se edite un `Mapa de X`).
  - fecha: 2026-08-01
    titulo: "el design system va antes que las páginas, y el modo oscuro entra con él"
    cuerpo: |-
      `KX-S07`. La unificación del chrome deja de ser un pendiente de higiene y pasa a ser la etapa 0 del plan: nada se construye antes. Sale como pieza propia (`KX-P22`, en estado `disenado`) y como tarea (`KX-T58`).

      El argumento es de oportunidad, no de prolijidad: si igual se reescriben las siete páginas, este es el único momento en que centralizar sale gratis. Y el modo oscuro, que estaba anotado acá abajo como imposible, deja de serlo por la misma razón.

      Dos detalles que la decisión fija y que no son negociables al implementar. **El toggle de tema gana sobre `prefers-color-scheme` en las dos direcciones**: atarlo solo a la preferencia del sistema es lo que rompió el contraste el 26.07.26. Y **cada taxonomía tiene su rampa de color propia**, sin compartir hues entre taxonomías distintas, porque el mismo verde significando dos cosas es peor que no tener color.

      La dirección estética la fijó Teo: técnico y denso en datos como un dashboard de diseño de sistemas, no sobreestetizado. **Cero emojis**, regla dura: donde iría un emoji va una pastilla de color con su texto.
  - fecha: 2026-07-26
    titulo: "un snapshot commiteado, no lectura del filesystem en build"
    cuerpo: |-
      Para el árbol de carpetas (ver `Mapa de Mapas.md`): el sitio se buildea en GitHub Actions desde el repo de la página, donde la bóveda no existe. Un `fs.readdir` funciona local y explota en CI. Un JSON generado a pedido y commiteado funciona en los dos lados, y de paso da diffs de git sobre la forma del sistema.
actualizado: 2026-08-02
---
