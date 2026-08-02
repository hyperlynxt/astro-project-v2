---
id: "KX-P22"
titulo: "design system de /kx/"
tipo: convencion
modulo: modulo-base
estado: activo
descripcion: "El sistema de diseño único de toda la constelación /kx/, construido el 26.08.01. kx-tokens.css con las cuatro rampas de taxonomía (estado, tipo de pieza, tipo de tarea, autoría) declaradas como par claro/oscuro, sin compartir hue entre rampas donde puedan aparecer juntas. Paleta pastel verde/violeta/gold como acento primario, con pastillas de apoyo (rosa, cielo, arcilla, pizarra) para lo no taxonómico. Fondo pergamino con la textura de papel conservada, a pedido explícito. KxShell.astro como chrome único: topbar, breadcrumbs, footer, toggle de tema que persiste en localStorage y gana sobre prefers-color-scheme en las dos direcciones. Once componentes en src/components/kx/: Kicker, Pastilla, TarjetaObjeto, Medidor, Timeline (+TimelineItem), TablaDatos (ordenable, con filtrado integrado), BarraFiltros (chips acumulables, refleja query string, dispara el evento kx:filtros), Matriz, BloqueHistoria, Carriles, Grafo. Verificado con build limpio y probado en vivo: filtros, orden de columnas y el toggle de tema funcionan sobre datos reales en /kx/atlas/piezas/. Cero emojis en todo lo construido."
ruta: "interlynkx-page/src/styles/kx-tokens.css, src/layouts/KxShell.astro, src/components/kx/"
origen: "KX-S07"
actualizado: 2026-08-01
---
