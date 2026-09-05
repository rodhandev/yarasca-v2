# YARASCA-V1 — plantilla archivada (REUSABLE)

Plantilla one-page (scroll único) para estudio jurídico boutique, paleta
charcoal + oro (`--accent: #C9A15A`) con titulares en `Playfair Display`.
Archivada el 4-sep-2026 al promover la arquitectura multi-página `../v2/`.

## Contenido

| Ruta | Qué es |
|---|---|
| `index.html` | Página única completa (hero, firma, áreas, conciliación, equipo, contacto) |
| `css/styles.css` | Estilos de v1 |
| `js/main.js` | Widgets: WhatsApp, balanza/chat, formulario prototipo |
| `hero video/` | Video de fondo del hero |
| `public/assets/` | Logos SVG (`logo-yarasca.svg`, `logo-yarasca-navy.svg`) |
| `favicon.svg` | Favicon |

## Reuso para otros proyectos

1. Copiar esta carpeta completa — es autocontenida (todos los paths son relativos).
2. Cambiar marca: logo en `public/assets/`, textos en `index.html`.
3. Paleta y tipografía viven en variables al inicio de `css/styles.css`.
4. Servir con cualquier servidor estático (ej. `python3 -m http.server`).

Sin dependencias, sin npm, sin build.
