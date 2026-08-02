---
id: "taxonomia"
titulo: "Taxonomía"
linea: "Ids, estados, tipos, terminología."
archivoBoveda: "01 - Matriz/Mapa de Taxonomia.md"
queEs: |-
  El vocabulario del sistema: qué significa cada palabra que usamos para hablar de él. Ids, estados, tipos, y los términos que se confunden entre sí.

  La terminología es la API del sistema: si una palabra significa dos cosas, cada sesión de trabajo tiene que renegociarla, y eso se paga en tokens y en errores de ruteo. Esta área existe para que eso no pase.

  **La tabla operativa vive en el `CLAUDE.md` del módulo**, que es lo que se carga al empezar a trabajar. Acá va el porqué de cada valor y las distinciones finas. Si divergen, gana el `CLAUDE.md`.
convenciones: |-
  - **Los ids no se reusan nunca**, ni cuando el objeto se deprecia. Un `KX-T05` cerrado sigue siendo `KX-T05` para siempre, porque hay documentos que lo citan.
  - Los correlativos se calculan contando los archivos existentes de esa colección más uno. No hay contador guardado en ningún lado, y eso es a propósito: un contador es un estado más que puede desincronizarse.
  - **Un valor nuevo en un enum es un cambio de schema.** Se agrega en `content.config.ts`, acá, y en el `CLAUDE.md` del módulo, en la misma corrida. Si se agrega en uno solo, la próxima sesión va a operar con vocabulario viejo.
  - `anatomia.astro` tiene la taxonomía duplicada en arrays de JavaScript. **Son espejo, no fuente.** Ver "Abierto".
abierto: |-
  - **La taxonomía vive duplicada en JSX.** `anatomia.astro` la tiene hardcodeada en cuatro arrays (`TAXONOMIA_IDS`, `TAXONOMIA_ESTADOS`, `TAXONOMIA_TIPOS_TAREA`, `TAXONOMIA_NAMING`). Hoy el acuerdo es que este archivo y el `CLAUDE.md` del módulo son la fuente y los arrays son espejo manual, pero eso depende de la disciplina de actualizar los dos. Cuando duela, la salida es una colección `kx-taxonomia`. Todavía no duele: cambia dos veces por trimestre.
inventario: |-
  `/kx/atlas/taxonomia/`, que es el espejo renderizado de esto. Es un área conceptual: no cataloga objetos, todo su contenido es esta prosa.
decisiones:
  - fecha: 2026-07-26
    titulo: "activo y finalizado son estados distintos"
    cuerpo: |-
      `activo` significa en producción y en uso de verdad, pero todavía en calibración, con cosas por agregar. `finalizado` significa estable, sin nada pendiente.

      La distinción importa porque casi todo el sistema está en `activo` y muy poco en `finalizado`, y colapsarlos haría que el dashboard mienta en la dirección optimista, que es la peor.
  - fecha: 2026-07-26
    titulo: "aclarar es un tipo de tarea, no un defecto"
    cuerpo: |-
      Un input dictado tan corto o cortado que no se entiende no es una tarea todavía: es una cita cruda esperando triage. Tener un tipo para eso evita las dos salidas malas: inventar qué quiso decir, o descartarlo.
  - fecha: 2026-07-26
    titulo: "los tipos de tarea se separan por quién desbloquea"
    cuerpo: |-
      No por tamaño ni por dificultad. La pregunta útil cuando se mira el backlog un sábado es quién puede mover cada cosa, y eso habilita el dato accionable: cuántas decisiones de Teo están bloqueando cuántas tareas de construcción.
  - fecha: 2026-07-26
    titulo: "el término es \"área\", y \"capa\" queda para nivel de abstracción"
    cuerpo: |-
      Ver `Mapa de Capas.md` para el razonamiento completo. Se registra acá porque es una decisión de vocabulario y este es su lugar canónico.
  - fecha: 2026-07-26
    titulo: "se elimina proposito del vocabulario de sesiones"
    cuerpo: |-
      Los cuatro valores (`explorar`, `decidir`, `especificar`, `descargar`) salen del sistema. Ver `Mapa de Instancias.md` para el porqué y la consecuencia.
actualizado: 2026-08-02
---
