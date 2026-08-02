---
id: "KX-F02"
titulo: "Flujo de stream session, clase a o c"
categoria: contenido
estado: finalizado
materiaPrima: "Dictado de voz, emocional/introspectivo (a) o de sistema (c)"
destino: "01 - Sesiones/Final/{a,c}/"
cuelloDeBotella: "Ninguno identificado. Es el flujo más maduro del sistema, con procesar-stream-sessions-del-dia como orquestador batch."
pasos:
  - "Teo · Template Stream Session, suggester de clase, se dicta"
  - "espera · Queda en 0X - Deprecated/Raw/{clase}/ hasta procesarse"
  - "IA · limpieza-innie corre sola (dispara por clase: a/c en el frontmatter)"
  - "IA · estructura-innie corre después, agrega subtítulos y scaffolding de frontmatter"
  - "IA · El final va a 01 - Sesiones/Final/{clase}/; el tachado y el original a 0X - Deprecated/Tachado/{clase}/"
descripcion: "El flujo más maduro del sistema. Ruteo automático por el campo clase del frontmatter, sin que Teo elija skill. Sin cuello de botella identificado."
fechaInicio: 2026-07-20
origen: "KX-S02"
actualizado: 2026-08-02
---
