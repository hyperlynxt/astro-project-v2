---
id: "skills"
titulo: "Skills"
linea: "Catálogo, convenciones, arquitectura."
archivoBoveda: "01 - Matriz/Mapa de Skills.md"
queEs: |-
  Las skills del sistema: cómo se escribe una, dónde vive, cómo se decide si algo merece ser skill, y cuándo una skill se parte en dos. Una skill es una pieza de tipo `skill` en el estado del sistema.

  No entra acá el contenido de cada skill (eso está en su `SKILL.md`) ni el pipeline completo que la usa (eso es `Mapa de Flujos.md`).
convenciones: |-
  - **Naming:** kebab-case, verbo primero, en español. La excepción son las que nombran un objeto en vez de una acción, y se toleran cuando la acción no tiene un verbo corto que sirva.
  - **Ubicación:** `.claude/skills/{nombre}/SKILL.md`. Hay dos niveles y la diferencia importa:
    - **Nivel bóveda** (`ground up kx vault/.claude/skills/`): las que solo tocan archivos de la bóveda. Se cargan cuando la sesión trabaja adentro de la bóveda.
    - **Nivel workspace** (`.claude/skills/` en la raíz): las que escriben en `interlynkx-page/`. Tienen que estar arriba porque la bóveda y la página son hermanas, no anidadas.
  - **Estructura del `SKILL.md`:** frontmatter con `name` y `description`, y después el cuerpo. La `description` es lo único que se lee para decidir si la skill se dispara, así que lleva los disparadores textuales de Teo tal como los dice. El cuerpo va: input y output, el proceso paso a paso, gotchas ya pisados, "qué NO hace", y "estado" al final.
  - **Disparo:** por default manual. Una skill se dispara sola solo cuando hay una señal inequívoca en el frontmatter del archivo procesado, y eso se declara explícito en la `description`.
  - **Retiro:** las skills que se dejan de usar van a `.claude/skills/deprecated/`, no se borran. Sirven de referencia histórica.
  - La sección "estado" al final de cada `SKILL.md` dice si está calibrada con corridas reales o si sigue siendo la mejor hipótesis. **No se borra ni se maquilla**: es la diferencia entre confiar en una skill y confiar de más.
abierto: |-
  - `KX-T25`: arquitectura de skills, una sola o varias por pipeline. La fusión de `procesar-sesion-autopoiesis` es el primer caso real resuelto, pero la pregunta general (para otros pipelines) sigue abierta.
  - `KX-T35`: skills por párrafo, sin especificar.
  - `KX-T34`: naming de las carpetas de skills nuevas.
  - `KX-T21`: skill de revisión holística.
  - `KX-T41`: paquetes skill paper y condenser.
  - **Sin criterio escrito para decidir que algo merece ser skill.** Hoy se decide caso por caso. La pregunta útil probablemente sea si la operación se repite con material distinto, pero no está validada.
inventario: |-
  `/kx/atlas/skills/`, agrupadas por estado. La vista transversal `/kx/atlas/piezas/` las muestra cruzadas con los otros cuatro tipos de pieza, en una matriz tipo por módulo y una tabla filtrable.
decisiones:
  - fecha: 2026-07-26
    titulo: "las skills que escriben en la página van a nivel workspace"
    cuerpo: |-
      `destilar-sesion-kx` (hoy `procesar-sesion-autopoiesis`), `publicar-modulo-kx` y `procesar-quotes` viven en el `.claude/skills/` de la raíz del workspace, no en el de la bóveda, porque escriben en `interlynkx-page/src/content/`. Las de limpieza y estructura se quedan a nivel bóveda.
  - fecha: 2026-07-26
    titulo: "el SKILL.md no duplica el diseño"
    cuerpo: |-
      Cuando existe un documento de diseño, el `SKILL.md` lleva la instrucción ejecutable y linkea al documento para el porqué. No se copia el razonamiento adentro de la skill. Aplicaba entre `destilar-sesion-kx` y `Plan de Andamio - Estructura del Kx Core Module.md`; hoy es `procesar-sesion-autopoiesis` la que linkea a ese documento y también a `Plan de Ciclo de Implementacion.md`.
  - fecha: 2026-08-01
    titulo: "la skill de procesamiento no produce archivo de plan"
    cuerpo: |-
      Se evaluaron dos arquitecturas para procesar una sesión de sistema, y Teo cerró la decisión en la misma sesión sin pedir análisis previo.

      | | Qué hace | Por qué se evaluó |
      |---|---|---|
      | **A, descartada** | Escribe un documento de plan estructurado en una subcarpeta `Planes de Sesiones/`, y después Teo abre otro chat y lo ejecuta | Deja el plan como artefacto revisable y reusable |
      | **B, elegida** | Sin archivo intermedio: la skill lee la sesión, planifica, pregunta e implementa en la misma corrida | Menos fricción, y menos archivos |

      Los dos argumentos que decidieron: **la fricción**, porque grabar y decir "corré la skill" es todo lo que Teo quiere tener que hacer; y uno más fino y más importante, **que la IA lea los pensamientos crudos en vez de un plan derivado de ellos**. Si el archivo de plan existe, la implementación se hace contra el resumen y no contra lo dicho, y ahí se pierde exactamente lo que la sesión larga tenía de valioso.

      Consecuencia registrada: la subcarpeta `04 - Kx Autopoiesis/Sesiones/Planes de Sesiones/` que se propuso a mitad de la sesión queda cancelada, no pendiente. Y no hay dos skills separadas (una que estructura, otra que implementa): es una sola.

      **Confirmado el mismo día, más tarde:** esta decisión predijo lo que terminó pasando también con `destilar-sesion-kx` y `KX-P20`, que se fusionaron por el mismo motivo (ver la entrada de `procesar-sesion-autopoiesis` arriba).

      De A sobrevivió, por un rato, la idea de una property `planificada` para saber cuáles sesiones ya se habían procesado. El 26.08.01, en la misma fecha, Teo la descartó también: en vez de agregar un cuarto valor al lifecycle, lo simplificó a dos (`sin-procesar` / `procesada`). Ver `Mapa de Instancias.md`.
actualizado: 2026-08-02
---
