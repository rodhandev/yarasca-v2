#!/usr/bin/env python3
"""Build de yarasca-v2: ensambla partials -> páginas HTML finales.

Sin npm ni bundlers (el sitio es estático y lo sirve python http.server):
  v2/src/partials/shell.html   plantilla común (header/nav/footer/analítica)
  v2/src/partials/widgets.html widgets flotantes (WhatsApp + balanza)
  v2/src/pages/<page>.html     cuerpo de cada página + META en comentario

Uso: python3 build.py   (desde v2/)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"

shell = (SRC / "partials" / "shell.html").read_text(encoding="utf-8")
widgets = (SRC / "partials" / "widgets.html").read_text(encoding="utf-8")

PAGES = [
    ("index.html", "Estudio Jurídico & Centro de Conciliación"),
    ("la-firma.html", "La Firma"),
    ("servicios.html", "Servicios y Áreas de Práctica"),
    ("centro-de-conciliacion.html", "Centro de Conciliación Extrajudicial"),
    ("equipo.html", "Equipo y Asociados"),
    ("contacto.html", "Contacto"),
]

NAV_KEYS = {
    "la-firma.html": "NAV-FIRMA",
    "centro-de-conciliacion.html": "NAV-CC",
    "equipo.html": "NAV-EQUIPO",
}

for fname, default_title in PAGES:
    page = SRC / "pages" / fname
    if not page.exists():
        print(f"FALTA {page}", file=sys.stderr)
        sys.exit(1)
    body = page.read_text(encoding="utf-8")

    # META en comentario: <!-- META title: ... | desc: ... -->
    m = re.search(r"<!--\s*META\s+title:\s*(?P<t>[^|]+)\|\s*desc:\s*(?P<d>[^>]+)-->", body)
    title = m.group("t").strip() if m else default_title
    desc = m.group("d").strip() if m else "Yarasca & Asociados: Estudio Jurídico y Centro de Conciliación Extrajudicial."
    body = re.sub(r"<!--\s*META[^>]*-->\s*", "", body, count=1)

    out = shell
    out = out.replace("{{TITLE}}", title)
    out = out.replace("{{DESC}}", desc)
    out = out.replace("{{BODY}}", body.strip("\n"))
    out = out.replace("{{WIDGETS}}", widgets)
    for f, key in NAV_KEYS.items():
        out = out.replace("{{" + key + "}}", 'class="nav-active"' if f == fname else "")
    out = out.replace("{{NAV-FIRMA}}", "").replace("{{NAV-CC}}", "").replace("{{NAV-EQUIPO}}", "")

    dest = ROOT / fname
    dest.write_text(out, encoding="utf-8")
    print(f"OK  {fname}  ({len(out)} bytes)")

print("build completado:", len(PAGES), "páginas")
