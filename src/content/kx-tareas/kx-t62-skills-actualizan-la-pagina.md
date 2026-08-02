---
id: "KX-T62"
titulo: "Que las skills del ciclo actualicen la página al terminar: hecho"
tipo: construir
estado: cerrada
modulo: autopoiesis
area: pagina
prioridad: media
descripcion: "Cerrada el 26.08.02, una vez que las páginas existieron y se pudo ver qué hacía falta de verdad. El hueco no era escribir HTML: las páginas ya son proyecciones de las colecciones, y las skills ya escriben las colecciones a mano. El hueco eran las TRES COLECCIONES GENERADAS (kx-eventos desde el patch notes, kx-areas desde la Matriz, kx-ciclos desde Ciclo de Implementacion/): las skills escribían la fuente en la bóveda pero nunca corrían los generadores, así que la página mostraba el estado viejo aunque la bóveda estuviera bien. Solución en dos capas. Primero, npm run prebuild encadena los tres generadores, así que un solo npm run build deja todo al día y no hace falta acordarse de nada. Segundo, los generadores pasan de fallar a saltear con aviso cuando no encuentran la bóveda: sin eso el prebuild rompía el deploy de GitHub Actions, que clona solo el repo de la página. Verificado simulando CI sin bóveda: los tres salen con exit 0. Las dos skills suman el paso de sincronizar, con el chequeo concreto de que el ciclo cerrado ya no aparece como activo en el hub. De paso se documentaron en procesar-sesion-autopoiesis los campos que las skills todavía no conocían: area en tareas, fechaInicio/fechaFin al cambiar estado, y los campos nuevos de kx-workflows."
notaOriginal: "Esto de que la skill que procesa las autopoiesis, además de hacer todo lo que hacía, mandaba la tarea y hacía los cambios en el HTML de Hub idealmente. Y, bueno, y el de cerrar lo mismo"
origen: "KX-S07"
actualizado: 2026-08-02
---
