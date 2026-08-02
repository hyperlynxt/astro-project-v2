---
id: "capas"
titulo: "Capas"
linea: "La escalera: sistema, módulo, pieza, artefacto."
archivoBoveda: "01 - Matriz/Mapa de Capas.md"
queEs: |-
  La escalera de abstracción del sistema: a qué distancia está cada cosa. Es un eje **perpendicular** al de las áreas, y conviene no confundirlos.

  ```
  sistema          el kx system entero (el mapa: kx atlas system)
    módulo         kx sesiones module, kx ensayos module, ...
      pieza        una skill, un flujo, un template, una convención
        artefacto  un archivo concreto que la pieza produce
  ```

  **Área es de qué tema. Capa es a qué distancia.** Una skill del área `flujos` está en la capa pieza. Un archivo `26.07.26 - kx autopoiesis session.md` está en la capa artefacto, en el área `instancias`.
convenciones: |-
  - La capa de un objeto **se deriva de en qué colección vive**, no se declara. Un archivo de `kx-modulos/` está en la capa módulo, uno de `kx-piezas/` en la capa pieza. No hay campo `capa` y no debería haberlo.
  - Los artefactos no se registran como objetos. Son demasiados y son el resultado, no el sistema. Se ven en el árbol de carpetas (ver `Mapa de Mapas.md`), no en una colección.
  - Cuando en una sesión Teo dice "capa" queriendo decir "subcategoría", se interpreta como **área** y se rutea a la que corresponda.
abierto: |-
  Nada abierto. Es la única área del módulo que arranca cerrada, porque su única función es prevenir una confusión de vocabulario.
inventario: |-
  No aplica: las capas no son un inventario, son un eje. La escalera de arriba es todo el contenido.
decisiones:
  - fecha: 2026-07-26
    titulo: "capa es nivel de abstracción, no sinónimo de subcategoría"
    cuerpo: |-
      En la sesión KX-S01 la palabra se usó de las dos formas. Se fija en el sentido de nivel de abstracción, y "área" queda como el nombre de las subcategorías.

      Se descartó crear una colección `kx-capas` y un campo `capa` en los objetos: no pasan el test de si responden una pregunta que hoy no se puede responder, porque la capa ya es derivable. Esta área existe para tener la escalera escrita en un lugar, no para taggear nada.
  - fecha: 2026-07-26
    titulo: "por qué el término es \"área\" y no \"categoría\" ni \"capa\""
    cuerpo: |-
      `categoria` ya está tomado con otro significado en dos colecciones: `kx-stack` lo usa para software y hardware, `kx-workflows` para contenido y sistema. `capa` es ambiguo por lo de arriba. `area` queda libre y es corto.
actualizado: 2026-08-02
---
