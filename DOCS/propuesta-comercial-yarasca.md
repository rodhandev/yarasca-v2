# Propuesta comercial — Yarasca & Asociados Abogados

> **Estado: BORRADOR para revisión de Rodhan, no una cotización cerrada.** Ningún precio de
> aquí se envía al cliente sin su aprobación — la ficha del cliente
> (`zymbiotek-brain/CURRENT/clientes/yarasca-asociados.md`) sigue diciendo "no se ha
> empezado ningún desarrollo [comercial] y no se empieza hasta que Rodhan lo diga", y este
> documento no cambia eso.
>
> **Fuentes usadas, no cifras inventadas**: `zymbiotek-brain/CURRENT/PRICING.md` (catálogo
> vigente de Zym Web Chat — única fuente oficial de esos precios), `PRICING-RANGOS.md`
> (método de bandas, ratificado DEC-393), `ANEXO-COSTOS-META.md` (costos reales de
> WhatsApp/infra), tabla `precios_modelo` de Supabase (costo LLM medido) y una búsqueda en
> vivo del precio de dominios `.pe` (3-sep-2026, ver fuentes al final). **Lo que no tiene
> banda todavía en `PRICING-RANGOS.md`** (desarrollo de sitio web como línea propia) se
> construye aquí con el mismo método, marcado `[SUPUESTO propio]` — no se presenta como
> catálogo cerrado.
>
> Tipo de cambio usado: **S/ 3.78 por USD** (mismo que ya usa `ANEXO-COSTOS-META.md` —
> $9 ≈ S/34 —, no una tasa nueva inventada para este documento). Cifras en USD son
> **orientativas**, no de facturación (Meta ya factura en PEN en Perú, `[V]`).

---

## 1. Sitio Web Corporativo

### 1.1 Desarrollo — pago único

`PRICING-RANGOS.md` no tiene todavía una banda propia para "desarrollo de sitio web" como
línea independiente (hoy vive dentro de "§4 servicios sin precio de lista" de `PRICING.md`,
sin cifra). Se construye una aquí, con el mismo método (`Base × multiplicadores`, ancla =
caso pequeño/simple) y el ancla más cercana que sí existe (**Bots web (S6): setup 900–2,000
[1,200]** — comparable en esfuerzo de configuración, aunque un sitio a medida como éste lleva
más horas de diseño/contenido que un widget):

| | Banda | Ancla propuesta | Por qué |
|---|---|---|---|
| **Setup — sitio simple** (1 rubro, contenido provisto por el cliente, sin e-commerce) | S/ 900 – 1,400 | **S/ 1,100** (≈ USD 291) | Caso Yarasca: landing de una página, formulario de contacto, sin pasarela de pago |
| **Setup — sitio ampliado** (2-4 páginas, secciones adicionales, más curaduría de contenido) | S/ 1,400 – 2,200 | **S/ 1,700** (≈ USD 450) | Si se piden páginas aparte por área de práctica, blog, o casos de éxito |

`[SUPUESTO propio]` — banda a proponer para su primer caso real (Yarasca sería el ancla), no
un precio ya validado con clientes como sí lo está la línea Zym Web Chat.

**Qué cubre**: maquetación completa (ya construida como prototipo, ver `index.html`),
identidad visual propia del cliente (charcoal + oro, no la marca de Zymbiotek), formulario de
contacto, mapa, widgets — **contenido real del cliente pendiente** (semblanza, colegiatura,
áreas de práctica confirmadas, fotografías) antes de publicar.

### 1.2 Mantenimiento y hosting — anual

| Concepto | Costo/año | Fuente |
|---|---|---|
| **Hosting** | **S/ 0** | Cloudflare Pages, plan gratuito con uso comercial — **ya es la decisión vigente del ecosistema** para los sitios de cliente pequeños ([DEC-459](../../zymbiotek-brain/CURRENT/DECISIONS.md#dec-459)), no una promesa nueva de este documento |
| **Dominio `.pe`** | S/ 100 – 180 (oficial NIC.pe ~S/180; registradores como punto.pe/yachay ~S/100–150 con 2+ años) | Búsqueda en vivo, 3-sep-2026 — ver fuentes |
| **Dominio `.com`** (alternativa) | ≈ S/ 55 (≈ USD 15) | Tarifa de mercado estándar (Namecheap/GoDaddy), **no verificada en vivo esta sesión** — confirmar antes de cotizar en firme |
| **Soporte técnico** (cambios menores de contenido, monitoreo de que el sitio siga arriba, actualizaciones de seguridad) | S/ 480 (S/ 40/mes) | `[SUPUESTO propio]` — comparable a "Monitoreo/status (S5) 80–180/mes" pero mucho más liviano: un sitio estático sin backend no necesita ese nivel de vigilancia |

**Total mantenimiento anual recomendado**: **S/ 580/año con `.com`** o **S/ 660–730/año con
`.pe`** (el cliente elige el dominio; la diferencia es sólo el registro, no el servicio).

> 🔑 **Por qué recomendar `.com` sobre `.pe` por defecto, dejando `.pe` como opción**: 3-4x más
> barato y sin el trámite adicional de NIC.pe. La contrapartida es la señal de confianza local
> que da un `.pe` para un estudio jurídico peruano — es una decisión del cliente, no técnica;
> se presentan ambas cifras para que la tome informado, no se elige por él.

### 1.3 Modalidad recomendada: **pago único + mantenimiento anual**, no SaaS mensual

**Recomendación, con la razón, no solo la conclusión**:

1. **Ya es el patrón que usa Zymbiotek para sus 3 sitios de cliente existentes**
   ([DEC-447](../../zymbiotek-brain/CURRENT/DECISIONS.md#dec-447): "vende *operación* de
   páginas web", como línea separada de construirla). Ofrecerle a Yarasca algo distinto de lo
   que ya funciona para otros clientes sería inventar un segundo modelo sin motivo.
2. **El costo marginal real es casi cero** — hosting en Cloudflare Pages es S/0, un sitio
   estático no consume cómputo por visita como sí lo hace un bot con LLM. Cobrar una
   mensualidad tipo SaaS por algo sin costo variable real sería cobrar por algo que no se está
   entregando mes a mes — y un cliente puede notarlo.
3. **Para el objetivo explícito de "no ahuyentar al cliente"**: un pago único razonable +
   una cuota anual pequeña y predecible es más fácil de aprobar para un estudio jurídico
   pequeño que un compromiso mensual abierto por algo que no es una herramienta que usan a
   diario (a diferencia del bot, que si conversa con clientes todos los días).

---

## 2. Bot Inteligente para WhatsApp (Zymbot Legal WA)

### 2.1 Lo que ya existe — no se inventa un producto nuevo

El catálogo vigente (`PRICING.md §1`, única fuente de precios de esta línea) es **Zym Web
Chat**: un asistente que **ya incluye derivación a WhatsApp**, no un producto aparte por
canal. La forma honesta de cotizar esto — y la que más ayuda a "propuesta irresistible" — es
**no cobrarle al cliente dos veces por el mismo motor de IA en dos canales distintos**.

### 2.2 Setup — pago único

Una base de conocimiento jurídica (áreas de práctica, cómo agendar consulta, qué NO puede
responder el bot — ver el límite de responsabilidad legal ya registrado en la ficha del
cliente) es más curaduría que el setup "Estándar", así que corresponde:

| Tier de setup | Precio | Por qué éste y no otro |
|---|---|---|
| **Reforzado** | **S/ 349** (≈ USD 92) | "Más servicios, más matices, puesta en marcha más cuidada" — encaja con una base de conocimiento legal que necesita revisión cuidadosa de qué puede/no puede afirmar el bot |

(No se propone "A medida" — eso es para RAG legal privado sobre expedientes, que la propia
ficha del cliente marca como "el más ambicioso y el que más hay que acotar", con requisitos
de tratamiento de datos de terceros sin resolver. Fuera de alcance de esta propuesta.)

### 2.3 Consumo/mantenimiento mensual

| Concepto | Costo | Fuente |
|---|---|---|
| **Suscripción Zym Web Chat — Growth** | **S/ 129/mes** (≈ USD 34) | `PRICING.md §1`, catálogo vigente. Growth = 60 conversaciones/día ≈ 1,800 msgs/mes — razonable para un estudio de un solo abogado |
| **Licencia WhatsApp Business API — mensajes reactivos** (el cliente le escribe al bot) | **S/ 0** | `[V]` verificado en `ANEXO-COSTOS-META.md`: desde jul-2025 Meta cobra por plantilla PROACTIVA, no por conversación — cuando el visitante escribe primero, la respuesta es gratis |
| **Licencia WhatsApp Business API — mensajes proactivos** (recordatorios, seguimiento) | Bolsa incluida en el plan + excedente a tarifa Meta vigente **+20% gestión** | ⚠️ **Cifra exacta de Meta para Perú pendiente** — mismo pendiente ya registrado en `ANEXO-COSTOS-META.md §4` ("tomar del rate card de Meta Business Manager"), no un hueco nuevo de este documento. Para un bot de **intake** (responde consultas entrantes), el uso proactivo esperado es bajo |
| **Cómputo LLM** | Absorbido en la mensualidad | `[M]` medido: ~$0.001/turno con el modelo económico ya en uso (deepseek-v4-flash) — el costo real cabe cómodo dentro de S/129/mes |

**Total mensual WhatsApp**: **S/ 129/mes**, el mismo que el bot web (§3) — porque, si se
contratan juntos, **es el mismo bot**. Ver §4.

---

## 3. Bot Inteligente para Sitio Web (Widget Balanza / Zymbot Web)

Mismo producto que §2 (Zym Web Chat), canal web en vez de — o además de — WhatsApp.

| | Precio | Fuente |
|---|---|---|
| **Implementación/integración en la landing** | **S/ 0 adicional si se contrata junto con §2** (mismo setup Reforzado S/349 cubre los dos canales) · **S/ 349 si se contrata solo** | Mismo tier que §2.2 |
| **Mantenimiento mensual (consumo de tokens/IA)** | **S/ 129/mes** (Growth) | `PRICING.md §1` |

La balanza jurídica animada ya construida en el prototipo (ver `index.html`,
`.balanza-viga`) es el launcher visual de este widget — **maqueta de interfaz hoy**, se activa
de verdad cuando se contrate este ítem y se registre el bot en el panel.

---

## 4. Desglose individual y Paquete Comercial

### 4.1 Lista de precios — ítem por ítem

| Ítem | Setup (único) | Mensual | Anual (si aplica) |
|---|---|---|---|
| Sitio Web — desarrollo | S/ 1,100 (≈ USD 291) | — | — |
| Sitio Web — mantenimiento + dominio `.com` | — | — | S/ 580 (≈ USD 153) |
| Zymbot Legal — WhatsApp | S/ 349 (≈ USD 92) | S/ 129 (≈ USD 34) | — |
| Zymbot Legal — Web | S/ 349 si es solo* (≈ USD 92) | S/ 129 (≈ USD 34) | — |

\* *Si se contratan Web + WhatsApp juntos, el setup de S/349 es uno solo — no se duplica
(§2.1/§3).*

**Comprado suelto, ítem por ítem (Sitio + Zymbot en los dos canales)**:
- Setup total: S/ 1,100 + S/ 349 = **S/ 1,449** (≈ USD 383)
- Mensual: **S/ 129/mes** (≈ USD 34)
- Anual (mantenimiento sitio): **S/ 580/año** (≈ USD 153)

### 4.2 Paquete Integrado — "Combo Pro Yarasca"

| | Comprado suelto | Combo Pro | Ahorro |
|---|---|---|---|
| Setup (sitio + bot, 2 canales) | S/ 1,449 | **S/ 1,199** (≈ USD 317) | S/ 250 (17%) |
| Primer mes de Zymbot | S/ 129 | **S/ 0** (cortesía de cierre) | S/ 129 |
| Mantenimiento anual del sitio, año 1 | S/ 580 | **incluido** (con dominio `.com` de regalo el primer año) | S/ 580 |
| **Mensualidad recurrente (mes 2 en adelante)** | S/ 129/mes | S/ 129/mes | — (sin cambio; ver nota) |

**Lo que paga el cliente al firmar**: **S/ 1,199** (setup combo) — nada más hasta el mes 2,
donde empieza **S/ 129/mes** (Zymbot, ambos canales) y, al año, **S/ 480** de soporte del
sitio (dominio ya cubierto el año 1).

🔑 **Por qué el descuento es real y no solo un gesto comercial**: el ahorro de S/250 en setup
existe porque **no se repite trabajo** — la identidad visual, el tono y el contenido curado
para el sitio son el MISMO insumo que alimenta la base de conocimiento del bot; hacerlos por
separado sí costaría más horas. El mes gratis y el dominio del año 1 sí son cortesía de
cierre, y se presentan como tal, no disfrazados de "costo evitado".

---

## 5. Resumen para presentar al cliente (una sola tabla)

| | Precio |
|---|---|
| **Hoy, al firmar** | S/ 1,199 |
| **Desde el mes 2** | S/ 129/mes |
| **Al año, mantenimiento del sitio** (dominio ya pagado el año 1) | S/ 480/año |

---

## 6. Lo que falta antes de poder enviar esto al cliente

1. **Aprobación de Rodhan** de las cifras — este documento es una propuesta técnica, no una
   decisión comercial cerrada (`AGENTS.md`: "Rodhan decide el negocio").
2. **Confirmar que el dictamen legal del cliente ya cerró** — la ficha sigue marcando eso
   como el motivo por el que no se ha contactado a Yarasca todavía.
3. **Confirmar tarifario `.com` en vivo** (esta sesión no lo verificó, a diferencia de `.pe`).
4. **Rate card real de Meta para Perú** — sigue siendo el mismo pendiente abierto en
   `ANEXO-COSTOS-META.md`, no algo que este documento resuelve.
5. Si el cliente pide RAG legal privado sobre expedientes (línea 3 de la ficha del cliente),
   **eso no está en esta propuesta** — tiene su propio conjunto de decisiones pendientes
   (base legal de datos de terceros, contrato de encargo) antes de poder cotizarse.

---

## Fuentes

- [Cuánto cuesta un dominio .pe en 2026 y dónde comprarlo](https://kom.pe/cuanto-cuesta-un-dominio-pe-en-2026-y-donde-comprarlo/)
- [Dominio .pe: Dónde comprar más barato, registrador oficial](https://www.miciudad.pe/dominio-pe-donde-comprar-mas-barato-registrador-oficial/)
- `zymbiotek-brain/CURRENT/PRICING.md`, `PRICING-RANGOS.md`, `ANEXO-COSTOS-META.md` (internos)
- Tabla `precios_modelo` (Supabase, proyecto `zymbiotek`) — costo LLM verificado 2026-08-13
