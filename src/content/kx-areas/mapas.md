---
id: "mapas"
titulo: "Mapas"
linea: "Organigramas, cursogramas, árbol de carpetas."
archivoBoveda: "01 - Matriz/Mapa de Mapas.md"
queEs: |-
  Las vistas del sistema sobre sí mismo: organigramas, cursogramas, el árbol de carpetas, y las representaciones visuales que permiten mirar el sistema en vez de leerlo.

  Esta área tiene un rol que no es estético y conviene tenerlo claro: **lo visual es el eslabón que hace que la próxima sesión sea mejor que la anterior.** Teo dicta mejor cuando tiene el mapa abierto, porque ve el hueco antes de hablar. Por eso las vistas van antes de la automatización, aunque automatizar parezca más productivo.
convenciones: |-
  - **Toda vista es una proyección, nunca una fuente.** Si una vista tiene un dato que no está en ninguna colección ni en ningún archivo, ese dato se va a perder. La vista no guarda nada.
  - **Actual y proyectado son la misma vista filtrada por estado**, no dos páginas. Actual es `construyendo`, `activo`, `finalizado` y `pausado`; proyectado es `idea` y `disenado`. Si fueran dos colecciones, promover una idea implicaría mover archivos y perder la historia. Con un campo, promover es cambiar una palabra y el objeto aparece solo en la otra vista con su fecha de creación y su sesión de origen intactas.
  - **El color codifica autoría** en las vistas de estructura y de flujos: qué escribe Teo, qué escribe la IA, qué es mixto. Nunca es el único portador de significado, siempre va con texto.
  - **Ninguna vista se actualiza sola, y está bien.** Teo pide "actualizá el árbol" y se actualiza. Automatizar esto cuesta más que decirlo.
  - Cada nodo de una vista debería poder llevar a su objeto o a su área. Todavía no está implementado en todas.
abierto: |-
  Casi todo sigue sin existir, pero desde el 26.08.01 **todo está especificado**: las vistas de abajo ya tienen su ruta, su forma y sus prerequisitos escritos en `Plan de Hub Kx - Atlas y Autopoiesis.md`. Lo que falta es construirlas, y en varios casos cargar la data primero. Esta área sigue siendo la más grande en intención y la más vacía en implementación, y es deliberado: depende de que las otras áreas tengan data cargada.

  - **El árbol de carpetas**, ahora `/kx/atlas/estructura/`: falta el script de snapshot, el archivo de anotaciones, y la vista. Etapa 6.
  - **El organigrama**, ahora `/kx/atlas/mapa/`: el grafo del sistema generado de las colecciones, con toggle actual y proyectado, y nodos clickeables. Etapa 6. Su versión completa, el mapa de dependencias, queda afuera de la v1 (`KX-T63`).
  - **La vista de flujos**, ahora `/kx/atlas/flujos/`, sigue siendo la de más impacto según el razonamiento de arriba. Especificada como cursograma por carriles con el cuello de botella marcado. Bloqueada por que `kx-workflows` esté cargada (`KX-T22`); los cinco flujos ya están escritos con tabla de pasos y diagrama en `Mapa de Flujos.md`, falta transcribirlos.
  - **La matriz de instancias por etapas**, ahora `/kx/atlas/instancias/`. Necesita una colección `kx-instancias` con un campo `etapas`, sin aprobar (`KX-T61`).
  - La vista por temperatura (qué se tocó hace poco, qué está frío) necesita el log de eventos como data, no el campo `actualizado`, que solo dice la última vez. Queda fuera de la v1: como mínimo es posterior a que `kx-eventos` exista.
  - **Modo oscuro:** deja de estar sin especificar. Entra como parte del design system (`KX-P22`, `KX-T58`), que es la etapa 0 del plan. Ver la decisión del 26.08.01 en `Mapa de Pagina.md`.
inventario: |-
  El hub `/kx/` es la puerta, y desde ahí se llega a las dos áreas.

  **Atlas:** `/kx/atlas/` más las once páginas de área (`/kx/atlas/{area}/`), y la vista transversal `/kx/atlas/piezas/`.
  **Autopoiesis:** `/kx/autopoiesis/`, más `tareas/`, `sesiones/`, `ciclos/` y `log/`.

  Los dos pares de documento publicados siguen en `/kx/modulo-base/` + `/kx/modulo-base-mapa/` y `/kx/kx-core/` + `/kx/kx-core-mapa/`.
decisiones:
  - fecha: 2026-07-26
    titulo: "las vistas alternativas son consultas, no data nueva"
    cuerpo: |-
      Por capas, por pipeline, por dependencias, por temperatura, por completitud: son cinco preguntas distintas sobre las mismas colecciones. Ninguna requiere cargar nada nuevo. Ese es el pago de haber puesto el estado en markdown tipado.
  - fecha: 2026-07-26
    titulo: "el árbol de carpetas se genera por snapshot a pedido"
    cuerpo: |-
      Un script recorre la bóveda y el repo y escribe un JSON commiteado; un segundo archivo lleva las anotaciones de `permanencia` y `autoria`, solo de las excepciones, no de todo el árbol. Ver `Mapa de Pagina.md` para por qué no se lee el filesystem en build.
  - fecha: 2026-08-01
    titulo: "cada categoría se dibuja según su driver ontológico"
    cuerpo: |-
      `KX-S07`, y es el criterio que le da forma a todas las vistas pendientes de esta área. Teo lo pidió en esos términos: las categorías del sistema no se diagraman todas igual, sino **dependiendo del driver ontológico de esa categoría**. Una tabla no es la forma correcta de mostrar un flujo, y un grafo no es la forma correcta de mostrar una enumeración cerrada.

      | Categoría | Su driver | Forma que le corresponde |
      |---|---|---|
      | Módulos | pertenencia y madurez | tarjetas agrupadas por estado |
      | Piezas | tipo cruzado con módulo | tabla densa filtrable más matriz tipo × módulo |
      | Flujos | secuencia y actor | cursograma por carriles, uno por actor |
      | Instancias | etapa del ciclo de vida | matriz instancias × etapas |
      | Cuadrantes | partición del espacio | grilla de dos ejes |
      | Taxonomía | enumeración cerrada | listas de valores con su leyenda |
      | Stack e integraciones | dependencia funcional | tarjetas, con "¿se rompe un pipeline si lo saco?" respondido |
      | Tareas | quién puede desbloquearla | columnas por tipo, con los bloqueos como aristas |
      | Sesiones, ciclos, log | tiempo | timeline vertical |
      | El sistema entero | dependencia | grafo, con toggle actual / proyectado |

      Lo que esto descarta: la vista genérica. La tentación de resolver diez categorías con un listado configurable y filtros distintos es real y sale más barata, pero borra justo la información que hace útil a cada vista. La matriz de instancias por etapas no es un listado con filtros, es otra cosa.

      El detalle por página está en `Plan de Hub Kx - Atlas y Autopoiesis.md` §4 y §5.
actualizado: 2026-08-02
---
