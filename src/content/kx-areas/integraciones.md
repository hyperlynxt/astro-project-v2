---
id: "integraciones"
titulo: "Integraciones"
linea: "Sistema con sistema, y plugins que sostienen un pipeline."
archivoBoveda: "01 - Matriz/Mapa de Integraciones.md"
queEs: |-
  Los puntos donde el sistema kx toca otro sistema: la página, apps externas, y los plugins que sostienen un pipeline. Una integración es una pieza de tipo `integracion`.

  **El criterio del plugin es uno solo: ¿se rompe un pipeline si lo saco?** Si sí, es infraestructura y va acá. Si no, es comodidad y va a `03 - Contexto Personal/Stack Software.md`. Templater califica: sin él no hay input. Un plugin de barra de edición no.
convenciones: |-
  - Una integración se considera `activo` solo cuando el ciclo está cerrado de punta a punta: hay una skill que escribe y una vista que muestra. Si el dato hay que cargarlo a mano, la integración está en `idea` o `disenado`, no en `activo`, aunque las dos partes existan por separado.
  - Toda integración con la página declara su `ruta`, para que se pueda saltar desde el objeto a lo que produce.
  - Las integraciones no se automatizan sin pedido. Todo se dispara cuando Teo lo pide hablando: el input nunca espera al procesamiento.
abierto: |-
  - **Wispr Flow hacia Obsidian**, y WhatsApp como capa de captura de fricción casi cero (`KX-T39`, `KX-T40`). Es la integración de más impacto pendiente, porque toca el punto donde el sistema es más frágil: el momento de capturar.
  - `KX-T03`: Superwhisper versus Wispr Flow, sin decidir.
  - `KX-T13`: instalar Dataview, que habilita saber la última edición de cualquier nota sin gastar tokens ni escribir frontmatter.
  - `KX-T27`: los HTML conectados a git.
  - **La integración de ensayos no tiene skill de escritura.** Ver la decisión de arriba.
  - `KX-T46`: bases de datos, sin especificar.
inventario: |-
  `/kx/atlas/integraciones/`, con el estado de cada una.
decisiones:
  - fecha: 2026-07-26
    titulo: "el criterio de plugin es si rompe un pipeline"
    cuerpo: |-
      Se descartó separar "plugins" como área propia dentro de Estructura. Un plugin no es una categoría de cosa, es una cosa que puede ser infraestructura o comodidad según el rol que cumple, y ese rol se decide con la pregunta de arriba.
  - fecha: 2026-07-26
    titulo: "el ciclo cerrado es el criterio de activo"
    cuerpo: |-
      Se registró explícito porque hay un caso vivo: la colección `essays` existe y la página renderiza, pero no hay skill que escriba ahí desde el pipeline de limpieza. Eso es `idea`, no `activo`, aunque las dos mitades funcionen.
actualizado: 2026-08-02
---
