---
id: "flujos"
titulo: "Flujos"
linea: "Los pipelines que recorren las instancias."
archivoBoveda: "01 - Matriz/Mapa de Flujos.md"
queEs: |-
  Los pipelines que recorren las instancias: de dónde sale un archivo, por qué etapas pasa, qué skill actúa en cada una, y dónde termina. Un flujo es una pieza de tipo `flujo`.

  El eje que falta y que esta área tiene que sostener: **instancias en las filas, etapas en las columnas.** Es la vista que Teo quiere tener abierta mientras dicta, porque ver el flujo antes de hablar cambia lo que dicta.

  No entra acá cómo funciona cada skill por dentro. Eso es `Mapa de Skills.md` y el `SKILL.md` de cada una.

  **Código de color de los diagramas de abajo:** azul = Teo, violeta = IA, ámbar = Teo e IA juntos, gris punteado = espera, verde = build, rojo punteado = paso que hoy no existe como skill (se hace a mano). No reemplazan a la tabla de pasos, que sigue siendo la fuente: el diagrama es la forma rápida de ver dónde se concentra cada actor y dónde está el hueco.
convenciones: |-
  - **Granularidad: un flujo por materia prima de entrada.** Es la unidad que Teo elige cuando dicta, y por eso es la que sirve como identidad del flujo. Una variante de ruteo interno (class A versus class B) no es otro flujo, es una bifurcación adentro del mismo.
  - **Cada etapa declara quién actúa:** Teo, la IA, o un plugin. Ese dato es el que colorea la vista, y es el que permite leer el silencio: una etapa de IA que no corre hace dos semanas significa un pipeline roto, no una semana ocupada.
  - **El esfuerzo se pesa hacia el final.** Todo flujo del sistema tiene que tener su etapa más liviana en la captura. Si un flujo nuevo pide trabajo al principio, está mal diseñado.
  - Un flujo puede terminar en la bóveda, en la página, o en las dos. El destino final es parte de la definición del flujo, no un detalle.
abierto: |-
  - **`kx-workflows` está vacía.** Los cinco flujos de arriba ya están escritos acá, pero no transcritos como objetos de la colección: eso es trabajo de página, pospuesto a propósito (ver `Mapa de Pagina.md`).
  - **La página `/kx/flujos/`** con un diagrama por flujo, coloreado por quién actúa en cada etapa, no existe. Los diagramas Mermaid de este archivo (agregados el 26.08.01) son el mismo criterio de color aplicado adentro de la bóveda, no un reemplazo: si algún día se publica esta página, el diseño visual ya está calibrado acá.
  - El schema de `pasos` en `kx-workflows` es `string[]`, lo cual no permite declarar quién actúa en cada paso. Cuando se carguen los datos reales va a hacer falta decidir si el paso pasa a ser un objeto con `actor`, o si el actor se codifica en el texto del paso.
inventario: |-
  `/kx/atlas/flujos/`: los cinco flujos agrupados por estado, y debajo cada pipeline paso por paso, coloreado por actor y con el cuello de botella marcado.
decisiones:
  - fecha: 2026-07-26
    titulo: "un flujo por materia prima, no por combinación de pasos"
    cuerpo: |-
      Cierra el criterio de granularidad que `KX-T22` dejaba abierto. Se descartó la alternativa (un flujo por combinación exacta de pasos) porque multiplica los flujos sin agregar información: dos combinaciones que arrancan del mismo material son la misma decisión de Teo.

      Queda pendiente de `KX-T22` la carga real de los datos en `kx-workflows`, que es lo que convierte esta decisión en algo visible.

      **Resuelto el 26.08.02:** `KX-T22` se cerró. Los cinco flujos están cargados como `KX-F01` a `KX-F05`, y se ven en `/kx/atlas/flujos/` con sus pasos coloreados por actor y el cuello de botella marcado. El schema sumó `materiaPrima`, `destino` y `cuelloDeBotella`, que antes vivían solo como prosa acá.
  - fecha: 2026-08-01
    titulo: "el flujo de sesión de sistema no se parte en dos"
    cuerpo: |-
      La skill de procesamiento podría haber sido dos flujos (estructurar el plan en un archivo, y después ejecutarlo en otra corrida) y se descartó. Ver `Mapa de Skills.md` para el razonamiento completo.

      Lo que importa acá es que la convención de granularidad de este archivo lo predecía: los dos caminos arrancan del mismo dictado, así que nunca podían ser dos flujos, a lo sumo dos pasos. Es la primera vez que esa convención se aplica a un caso que no venía ya resuelto, y aguantó.
actualizado: 2026-08-02
---
