# Yarasca & Asociados — sitio web (PROTOTIPO)

⛔ **Prototipo interno.** El cliente está en `lead` con un **dictamen legal en curso**
(ver `zymbiotek-brain/CURRENT/clientes/yarasca-asociados.md`). Rodhan autorizó **construir la
maquetación**, no contactar al cliente ni publicar nada.

- Encargo despachado a `hermes2` el 27-ago-2026 por `claude1b` como orquestador.
- Informe del agente: `REPORT_YARASCA_WEB.md` (volátil, no se commitea).
- Sin remoto: es un prototipo, no un repo de producción.

## Estructura (4-sep-2026)

| Ruta | Estado |
|---|---|
| `v2/` | **Versión vigente.** Arquitectura multi-página inspirada en ccfirma.com (La Firma, Servicios, Centro de Conciliación, Equipo, Contacto). Ruta por defecto: abrir la raíz redirige a `v2/index.html`. |
| `v1_archived/` | Plantilla v1 one-page (charcoal + oro, Playfair Display). Archivada completa y autocontenida para reuso en otros proyectos — ver su README. |
| `index.html` (raíz) | Solo redirect a `v2/index.html`. |
| `assets/` | Multimedia de v2: video hero (`10238020-…mp4`), imagen banda (`pexels-…jpg`). |
| `public/assets/` | Logos SVG oficiales (`logo-yarasca.svg`, `logo-yarasca-navy.svg`). |
| `doc logo/` | Material fuente del cliente (logo editable, extracción docx). |
| `reference web/` | Capturas de referencia de arquitectura visual (ccfirma.com). |

### v2 — desarrollo y reconstrucción

- Servir desde la raíz del repo: `python3 -m http.server 3006` → abrir `http://127.0.0.1:3006/`.
- Las páginas HTML de `v2/` son **generadas**: el fuente vive en `v2/src/` (partials + páginas)
  y se ensambla con `python3 v2/build.py`. No editar las páginas de `v2/` a mano.
- Paleta extraída del CSS de ccfirma.com: acento `#ED6A23`, texto `#32373C`, tipografía Montserrat.
- [PENDIENTE] del cliente declarados en el marcado: fotos reales del equipo, dirección/correo,
  certificaciones del carrusel, backend del formulario.

## 3-sep — repaletizado, misma maquetación (v1)

Rodhan pidió revisar el estado y "finalizarlo" con `goldmanwolfe.com` como referencia de estilo.
La maquetación (hero, áreas, perfil, contacto, footer) ya estaba completa desde el 27-ago y no
cambia — lo que se corrigió fue la paleta: la versión anterior usaba `#00C3E3` (Blue Ice, el
acento de MARCA de Zymbiotek) como si fuera la identidad de Yarasca. Ahora es charcoal + oro
(`--accent: #C9A15A`), propia del cliente, con tipografía `Playfair Display` (Google Fonts) para
titulares. Fondo del hero y foto del titular siguen siendo **placeholders declarados**
(`.hero-placeholder-tag`, `[PENDIENTE: fotografía del titular]`) — ningún dato ni imagen real del
cliente se inventó. Sigue sin publicarse, sin remoto y sin contacto con el cliente: eso sigue
esperando la instrucción explícita de Rodhan que el expediente (`clientes/yarasca-asociados.md`)
ya documenta.
