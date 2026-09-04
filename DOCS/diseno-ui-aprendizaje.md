# Aprendizajes de diseño UI — aplicados en el prototipo de Yarasca & Asociados

> Encargo de Rodhan (3-sep): documentar los aprendizajes del vídeo de Fazt ("Diseños web
> únicos con Claude + Impecable") y cómo se aplicaron aquí. **Nota de honestidad**: quien
> escribe esto (Claude Code) no vio el vídeo — no tiene acceso a YouTube ni a contenido en
> vídeo fuera de lo que se le describe. Lo que sigue documenta los **tres principios tal como
> los resumió Rodhan** en el encargo, contrastados contra lo que **de verdad se hizo** en este
> repo, con evidencia concreta (commits, capturas, código) — no una repetición de afirmaciones
> sobre el vídeo que no se pudieron verificar de primera mano.

## 1. Evitar el "AI slop" mediante especificación explícita

**La idea, tal como se planteó**: un diseño genérico ("AI slop") pasa cuando no se especifica
estética, intención ni restricciones de contraste — el modelo rellena con lo más probable
estadísticamente (gradientes morados, Inter, tarjetas planas), que es exactamente lo que un
diseño *con* intención evita.

**Evidencia de este repo, no teoría**:

- La primera versión de este sitio (27-ago) usaba `#00C3E3` — el cian de marca de
  **Zymbiotek**, la agencia — como si fuera la identidad de **Yarasca**, el cliente. Nadie lo
  especificó mal a propósito: nadie especificó la paleta del CLIENTE en absoluto, así que el
  resultado por defecto fue reusar la que ya estaba a mano. Corregido el 3-sep a charcoal
  (`#17130D`) + oro (`#C9A15A`) — una paleta que no existe en ningún otro producto de
  Zymbiotek, elegida por lo que transmite un estudio jurídico (autoridad, permanencia), no
  por conveniencia técnica.
- **Contraste no se dejó a ojo**: `--ink` (#F3EEE4) sobre `--bg` (#17130D) y `--accent-bright`
  (#E4BE7C) para texto interactivo — pares elegidos para que el texto dorado y blanco lean con
  autoridad sobre fondo oscuro Y sobre el vídeo del hero (ver §3), no solo sobre un fondo
  plano. El overlay del hero (`linear-gradient` charcoal, opacidad creciente hacia abajo,
  `styles.css` `.hero::before`) existe específicamente para garantizar ese contraste sobre
  metraje real, que varía de fotograma a fotograma — un color de texto fijo sin ese overlay
  habría funcionado en algunos frames del vídeo y fallado en otros.
- **Restricción explícita, no implícita**: cada dato que no existe todavía (teléfono, RUC,
  semblanza del titular) queda como `[PENDIENTE: …]` visible en el propio HTML, nunca
  inventado para "que se vea completo". Un dato de cliente inventado que se ve bien es peor
  que un placeholder honesto que se ve a medio hacer — la especificación explícita también es
  esto: decir qué NO se sabe, no solo qué estética se quiere.

## 2. Integración de skills de diseño para guiar la generación

**La idea**: usar una skill/MCP de diseño (el vídeo la llama "Impecable"/"Taste Skill") para
que el modelo tenga un marco de decisión antes de escribir CSS, en vez de improvisar.

**Lo que existe de verdad en este entorno, no una suposición**: Claude Code trae una skill
propia para esto — `frontend-design` (`~/.claude/skills/frontend-design/SKILL.md`), invocada
explícitamente en la sesión del 3-sep antes de tocar el CSS de pulido. Da un marco concreto,
no una lista de buenas intenciones:

- **Comprometerse con una dirección estética "extrema"** en vez de un término medio tibio —
  aquí, "lujo/refinado" (luxury/refined), coherente con "autoridad jurídica" del contenido.
- **Un momento de carga orquestado > microinteracciones dispersas** — de ahí el revelado
  escalonado de las tarjetas de área (`transition-delay` de 70ms por tarjeta,
  `.areas-grid .area-card.reveal:nth-child(n)`), en vez de que las cuatro aparezcan a la vez.
- **Profundidad vía textura, no color plano** — el grano SVG sobre `body::before`
  (`feTurbulence`, opacity 0.035, `mix-blend-mode: overlay`) es casi imperceptible aislado;
  la diferencia se nota en conjunto, exactamente como advierte la skill sobre "backgrounds
  que crean atmósfera en vez de defaultear a color sólido".
- **El detalle que se recuerda**: la skill pide identificar "qué hace esto inolvidable". Para
  este sitio, la balanza jurídica animada del launcher del chat (SVG con `@keyframes
  balanza-oscilar`, oscilación de ±4° cada 3.4s, pivote real en el punto donde el brazo cuelga
  del poste) es ese detalle — una identidad propia del estudio, no un ícono de chat genérico.

## 3. Elementos visuales dinámicos para romper la monotonía lineal

**La idea**: mapas, widgets interactivos y vídeo con overlay evitan que una landing se lea
como una lista vertical de secciones idénticas (título + párrafo + cards, repetido).

**Los tres, construidos en este repo, con la restricción que los mantiene honestos**:

- **Vídeo hero con overlay** (`hero video/198890-909564521_medium.mp4`, real, 2560×1440):
  `<video autoplay loop muted playsinline>` + overlay `::before` charcoal. La lección técnica
  que no estaba en el resumen del encargo pero apareció al construirlo: **un `::before`
  generado no pinta automáticamente por encima de un `<video>` que va después en el marcado**
  — hizo falta `z-index` explícito en las tres capas (vídeo/overlay/contenido) para que el
  overlay de verdad tapara el vídeo y no al revés.
- **Widget de chat interactivo**: desplegable de verdad (abre/cierra con JS real, no solo
  visualmente), pero **declarado como maqueta** en el propio marcado — sin bot-id registrado
  no hay backend real, y fingir que lo hay habría sido el mismo "AI slop" del punto 1 pero en
  funcionalidad en vez de en estética.
- **Mapa embebido** (`Huancayo, Junín` — pin de prueba, la dirección real del cliente no está
  confirmada): el embed simple de Google (sin API key) no admite tema oscuro nativo, así que
  el "dark mode" del mapa es un filtro CSS (`invert + hue-rotate + saturate`) sobre el iframe
  estándar — una aproximación declarada como tal en el comentario del CSS, no presentada como
  un estilo nativo que no es.

## Un bug real que conecta los tres puntos

Dos veces en esta sesión (aquí y en el MVP de ZSTORE, mismo día) apareció el mismo bug: un
elemento con el atributo `hidden` seguía visible porque una regla CSS con `display` propio
empataba en especificidad con la regla `[hidden] { display: none }` del navegador. Ninguna
"especificación de estética" lo habría prevenido — se encontró con Playwright, haciendo clic
de verdad y mirando el resultado, no leyendo el CSS. La lección que se lleva de aquí: los tres
principios de arriba mejoran CUÁNTO se parece el diseño a lo que se pidió; no sustituyen
verificar que lo interactivo funciona de verdad.
