---
id: "modulos"
titulo: "Módulos"
linea: "Los módulos del sistema y su relación."
archivoBoveda: "01 - Matriz/Mapa de Modulos.md"
queEs: |-
  Los módulos del sistema kx: qué es un módulo, cómo se crea uno, y cómo se relacionan entre sí. Un módulo es un área funcional del sistema, no una carpeta: puede tener carpeta en la bóveda, páginas en el sitio, skills propias, o nada de eso todavía.

  No entra acá el contenido de cada módulo (eso vive en el módulo mismo) ni las piezas que lo componen (eso es `Mapa de Skills.md`, `Mapa de Instancias.md`, `Mapa de Flujos.md`). **`kx atlas system` no se describe a sí mismo acá**: este archivo mapea a los demás, no es uno de ellos (ver `Mapa de Capas.md`).
convenciones: |-
  - **Título:** `kx {nombre} module`, con una excepción: el mapa del sistema mismo (`00 - Kx Atlas System/`) es `system`, no `module`, porque no es un módulo entre otros. Ejemplos: `kx sesiones module`, `kx ensayos module`, `kx atlas system`.
  - **Id:** slug kebab del nombre, no numerado. Un módulo no lleva `KX-M{NN}`, a diferencia de piezas y tareas.
  - **Carpeta en la bóveda:** prefijo numérico de dos dígitos cuando existe (`00 - Kx Atlas System/`, `01 - Sesiones/`, `02 - Ensayos/`). El `00` está reservado para el mapa del sistema.
  - **Pertenencia:** toda pieza declara a qué módulo pertenece en su campo `modulo`. Los módulos se apuntan a sí mismos.
  - Un módulo puede existir en estado `idea` sin una sola línea escrita. Eso es deliberado: permite proyectar el sistema antes de construirlo.
abierto: |-
  - **Dependencias entre módulos.** No hay forma de expresar que un módulo depende de otro. El campo `bloqueadaPor` existe en tareas, no en módulos. Sin diseñar, y no urgente: con seis módulos el grafo se tiene en la cabeza.
  - **Cuándo algo merece ser módulo y cuándo es una pieza de otro.** No hay criterio escrito. Hasta ahora se resolvió por intuición y funcionó, pero es la pregunta que va a doler al llegar a diez módulos.
  - `KX-T38`: naming del sistema completo, todavía abierta.
inventario: |-
  `/kx/atlas/modulos/`: cada módulo agrupado por estado, con sus fechas y su descripción completa.
decisiones:
  - fecha: 2026-07-26
    titulo: "el módulo raíz se llama kx core module"
    cuerpo: |-
      Se cierra `KX-T01`. Las opciones eran "Núcleo" y "Módulo Base". Gana `kx core module` porque hace del patrón de nombre una regla sin excepciones: si todos los módulos son `kx {nombre} module`, el raíz también. La carpeta se renombró de `00 - Nucleo` a `00 - Kx Core Module` mientras todavía tenía un solo archivo adentro.

      Consecuencia: "Módulo Base" queda como el nombre del **documento** de análisis sistémico publicado en `/kx/modulo-base/`, no como el nombre del módulo. Son dos cosas distintas y conviene no volver a mezclarlas.
  - fecha: 2026-07-26
    titulo: "segundo renombre: kx atlas system, y por qué no siguió el patrón de arriba"
    cuerpo: |-
      `KX-S03` corrige el propósito del módulo raíz (deja de documentarse a sí mismo, pasa a mapear todo el sistema) y con eso el nombre `kx core module` deja de tener sentido: invitaba a leerlo como un módulo entre otros. Pasa a `kx atlas system`, y la carpeta de `00 - Kx Core Module` a `00 - Kx Atlas System`.

      Se decide **no** forzarlo al patrón `kx atlas module`: es el único caso del sistema donde "system" es correcto y "module" sería engañoso, porque el objeto que describe (el mapa del sistema entero) no es una parte del sistema, es la vista de todo. Ver `Reencuadre - Kx Architecture System.md` §7.2 para las alternativas que se descartaron.
  - fecha: 2026-08-01
    titulo: "el módulo se llama kx autopoiesis module"
    cuerpo: |-
      Cierra `KX-T48`. Se evaluaron cinco nombres, todos del mismo campo (teoría de sistemas y cibernética): **autopoiesis**, autoorganización, morfogénesis, recursión y refinamiento.

      Gana `autopoiesis`, de Maturana y Varela: un sistema que se produce y se mantiene a sí mismo. Es descriptivamente exacto (el módulo construye el sistema que lo contiene) y es el único de los cinco que no significa otra cosa en castellano corriente, que es la propiedad que `Mapa de Taxonomia.md` pide de cualquier palabra que el sistema adopte: si una palabra significa dos cosas, cada sesión tiene que renegociarla.

      Qué se descartó y por qué importa: `autoorganización` es la más legible pero la menos precisa, y describe un fenómeno que ocurre sin nadie, cuando acá hay alguien dictando. `morfogénesis` (la segunda cibernética de Maruyama, los loops que amplifican desvío) era la segunda opción y sigue siendo buena si alguna vez el nombre necesita decir qué hace en vez de qué es. `recursión` y `refinamiento` quedaron cortas: la primera es genérica, la segunda era la vía Severance y suena a departamento, que era medio el punto, pero no dice nada del sistema.

      Sigue afuera de esta decisión el renombre de la carpeta, que en ese momento todavía era `02 - Ensamblaje/`. Se resolvió aparte, más tarde el mismo día: ver la decisión siguiente.
  - fecha: 2026-08-01
    titulo: "el ciclo de cambiar el sistema sale de ensamblaje y se vuelve módulo propio"
    cuerpo: |-
      Teo separa el ciclo de cambiar el sistema del andamio que sostiene al Atlas. El argumento es de permanencia, no de tamaño: `02 - Ensamblaje/` era temporal por diseño (existía mientras el Atlas se armaba), y este ciclo va a estar corriendo siempre, porque siempre va a haber algo que modificar, implementar o rediseñar.

      Qué se descartó: dejarlo adentro de ensamblaje y solo renombrar la carpeta. No alcanza, porque el problema no era el nombre sino que una cosa permanente estaba viviendo adentro de un andamio.

      Se resolvió: `02 - Ensamblaje/` se mudó entera a `04 - Kx Autopoiesis/` (patch notes, sesiones, tareas, las tres subcarpetas), y el Atlas quedó con dos categorías (`01 - Matriz/`, `03 - Contexto Personal/`) en vez de tres.
actualizado: 2026-08-02
---
