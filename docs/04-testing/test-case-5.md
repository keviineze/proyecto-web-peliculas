# Test Case 5 — Estructura HTML Semántica y Validación CSS/HTML

## Metadata
| Campo | Valor |
|-------|-------|
| Responsable | Kevin Ezequiel Sosa |
| Fecha Momento 1 |24-09-26 |
| Fecha Momento 2 |27-09-26|
| Rama Momento 1 | `feature/responsive-design-add-responsive-styles` |
| Rama Momento 2 | `develop` |
| URL testeada | `http://localhost:3000` |

## Objetivo
Verificar que la página utilice HTML5 semántico correctamente y que el código
HTML y CSS sea válido según los estándares del W3C.

## Herramientas utilizadas
- Playwright MCP (`@playwright/mcp`) con snapshot de accesibilidad
- W3C HTML Validator API (`validator.w3.org`) vía curl
- W3C CSS Validator API (`jigsaw.w3.org/css-validator`) vía curl
- GitHub Copilot Agent Mode

---

## Prompt para Copilot Agent Mode

Copiá este prompt en Copilot Agent Mode con Playwright MCP activo:

```
Usando Playwright MCP y herramientas disponibles, necesito analizar la
estructura semántica y validar el código de http://localhost:3000

PARTE 1 — Estructura HTML semántica

1. Navegá a http://localhost:3000 con Playwright MCP y tomá un snapshot
   de accesibilidad completo
2. Del snapshot extraé y listá:
   - Todos los headings (h1-h6) con nivel y texto
   - Todos los landmarks (header, nav, main, footer, section, article)
   - Cualquier <div> donde debería ir un elemento semántico
3. Verificá:
   - ¿Hay un solo h1?
   - ¿La jerarquía de headings no tiene saltos (h1→h2→h3)?
   - ¿Todos los campos del formulario tienen <label> asociado?
   - ¿Las tablas tienen <caption>?
4. Tomá captura de pantalla de la página

PARTE 2 — Validación HTML con W3C

Usá este comando para validar el archivo index.html:

cat index.html | curl -s -F 'uploaded_file=@-' -F 'output=json' \
  https://validator.w3.org/check | jq '.'

Reportá:
- Total de errores y warnings
- Por cada error: número de línea, descripción y fragmento de código afectado

PARTE 3 — Validación CSS con W3C

Para cada archivo CSS ejecutá:

cat css/styles.css | curl -s \
  -F 'file=@-;type=text/css' \
  -F 'output=json' \
  'https://jigsaw.w3.org/css-validator/validator' | jq '.'

Repetí para css/components.css y css/responsive.css

Reportá por cada archivo:
- Total de errores y warnings
- Por cada error: número de línea, propiedad afectada y descripción

RESUMEN FINAL

Generá una tabla consolidada con:
- Estado de estructura semántica
- Total errores HTML
- Total errores CSS por archivo
- Lista de issues a crear

Guardá las capturas en docs/04-testing/capturas/tc-5/momento-X/
(reemplazá X por 1 o 2 según el momento de ejecución)
```

---

## MOMENTO 1 — Pre-merge (rama `feature/`)

### Estructura de headings
| Nivel | Texto | ¿Correcto? | Observación |
|-------|-------|-----------|-------------|
| H1 | Sobre el proyecto | Sí | Único H1 detectado. |
| H2 | Tu biblioteca de películas y series | Sí | Jerarquía correcta. |
| H2 | Tu biblioteca | Sí | Jerarquía correcta. |
| H3 | Pendientes | Sí | Jerarquía correcta. |
| H4 | Interstellar | Sí | Jerarquía correcta. |
| H3 | Vistas | Sí | Jerarquía correcta. |
| H4 | El viaje de Chihiro | Sí | Jerarquía correcta. |
| H2 | Catálogo de películas | Sí | Jerarquía correcta. |
| H3 | Interstellar | Sí | Jerarquía correcta. |
| H3 | El viaje de Chihiro | Sí | Jerarquía correcta. |
| H3 | Dark | Sí | Jerarquía correcta. |
| H2 | Mi lista | Sí | Jerarquía correcta. |
| H3 | Títulos guardados | Sí | Jerarquía correcta. |
| H2 | Buscar en el catálogo | Sí | Jerarquía correcta. |
| H2 | Resumen del catálogo | Sí | Jerarquía correcta. |
| H2 | Próximas funciones | Sí | Jerarquía correcta. |
| H2 | Mini Letterboxd | Sí | Jerarquía correcta. |

### Landmarks detectados
| Landmark | Elemento HTML | ¿Correcto? | Observación |
|----------|---------------|-----------|-------------|
| header | `<header>` | Sí | Encabezado principal detectado. |
| nav | `<nav aria-label="Navegación principal">` | Sí | Navegación principal identificada. |
| main | `<main id="inicio">` | Sí | Contenido principal identificado. |
| section | `<section id="sobre-proyecto">` | Sí | Sección semántica con heading. |
| section | `<section id="lista-pendientes">` | Sí | Sección semántica con heading. |
| article | `<article>` — Interstellar | Sí | Contenido independiente de película. |
| section | `<section id="lista-vistas">` | Sí | Sección semántica con heading. |
| article | `<article>` — El viaje de Chihiro | Sí | Contenido independiente de película. |
| section | `<section id="catalogo">` | Sí | Sección semántica con heading. |
| article | `<article>` — Interstellar | Sí | Contenido independiente de película. |
| article | `<article>` — El viaje de Chihiro | Sí | Contenido independiente de película. |
| article | `<article>` — Dark | Sí | Contenido independiente de serie. |
| section | `<section>` — Mi lista | Sí | Sección semántica con heading. |
| nav | `<nav aria-label="Estados de mi lista">` | Sí | Navegación secundaria identificada. |
| section | `<section id="lista-completa">` | Sí | Sección semántica con heading. |
| section | `<section id="recomendaciones">` | Sí | Sección semántica con heading. |
| section | `<section>` — Resumen del catálogo | Sí | Sección semántica con heading. |
| section | `<section id="ajustes">` | Sí | Sección semántica con heading. |
| footer | `<footer id="compartir">` | Sí | Pie de página identificado. |

### Verificaciones semánticas
| Verificación | Estado | Detalle |
|--------------|--------|---------|
| Un solo H1 | OK | Se detectó exactamente un H1: “Sobre el proyecto”. |
| Jerarquía de headings sin saltos | OK | No se detectaron saltos en la jerarquía observada. |
| Secciones con elementos semánticos | OK | Se utilizaron header, nav, main, section, article y footer. |
| Campos de formulario con label | OK | `input#busqueda`, `select#tipo` y `select#genero` tienen label asociado. |
| Tabla/s con caption | OK | La tabla tiene caption: “Películas y series disponibles en la biblioteca inicial”. |

### Validación W3C HTML
| Tipo | Cantidad | Detalle |
|------|----------|---------|
| Errores | 0 | HTML válido según W3C. |
| Warnings | 1 | Advertencia informativa por barras finales en elementos void. |

### Validación W3C CSS
| Archivo | Errores | Warnings |
|---------|---------|----------|
| styles.css | 0 | 1 — Variables CSS no verificadas estáticamente. |
| components.css | No validado en Momento 1 | No disponible en la rama evaluada; se contemplará en Momento 2 tras el merge. |
| responsive.css | 5 | 3 — Extensiones de proveedor `-webkit-`. |

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Snapshot accesibilidad | ![](capturas/tc-5/momento-1/semantic-structure-momento-1.png) |
| W3C HTML Validator | No se tomó captura específica. |
| W3C CSS — styles.css | No se tomó captura específica. |
| W3C CSS — components.css | No se tomó captura específica; se validará en Momento 2. |
| W3C CSS — responsive.css | No se tomó captura específica. |

### Hallazgos
| # | Tipo | Elemento / Archivo | Descripción | Severidad |
|---|------|--------------------|-------------|-----------|
| 1 | Validación CSS | `css/responsive.css` | El W3C reportó 5 errores de parseo en las líneas 6, 11, 16, 34 y 376. El archivo contiene texto ajeno a CSS y bloques Markdown. | Alta |

### Resultado Momento 1
- [ ] ✅ PASS — Sin hallazgos
- [x] ⚠️ FAIL CON OBSERVACIONES
- [ ] ❌ FAIL

---

## MOMENTO 2 — Post-merge (`develop`)

### Estructura de headings
| Nivel | Texto | ¿Correcto? | Observación |
|-------|-------|-----------|-------------|
| H1 | Sobre el proyecto | Sí | Único H1 del documento. |
| H2 | Tu biblioteca de películas y series | Sí | Sin salto de jerarquía. |
| H2 | Tu biblioteca | Sí | Sin salto de jerarquía. |
| H3 | Pendientes | Sí | Subtítulo de la biblioteca. |
| H4 | Interstellar | Sí | Jerarquía bajo “Pendientes”. |
| H3 | Vistas | Sí | Mismo nivel que “Pendientes”. |
| H4 | El viaje de Chihiro | Sí | Jerarquía bajo “Vistas”. |
| H2 | Catálogo de películas | Sí | Sin salto de jerarquía. |
| H3 | Interstellar | Sí | Título de artículo. |
| H3 | El viaje de Chihiro | Sí | Título de artículo. |
| H3 | Dark | Sí | Título de artículo. |
| H2 | Mi lista | Sí | Sin salto de jerarquía. |
| H3 | Títulos guardados | Sí | Subtítulo de la sección. |
| H2 | Buscar en el catálogo | Sí | Sin salto de jerarquía. |
| H2 | Resumen del catálogo | Sí | Sin salto de jerarquía. |
| H2 | Próximas funciones | Sí | Sin salto de jerarquía. |
| H2 | Mini Letterboxd | Sí | Heading del footer. |

### Landmarks detectados
| Landmark | Elemento HTML | ¿Correcto? | Observación |
|----------|---------------|-----------|-------------|
| banner | `<header>` | Sí | Encabezado principal. |
| navigation | `<nav aria-label="Navegación principal">` | Sí | Nombre accesible presente. |
| main | `<main id="inicio">` | Sí | Contenido principal único. |
| complementary | `<aside id="biblioteca">` | Sí | Biblioteca lateral con heading. |
| navigation | `<nav aria-label="Estados de mi lista">` | Sí | Navegación secundaria nombrada. |
| contentinfo | `<footer id="compartir">` | Sí | Pie de página con heading. |
| region | `<section>` con heading | Sí | Secciones identificables por sus encabezados. |
| — | `<article>` | Sí | Cada artículo de película/serie tiene heading propio. |

### Verificaciones semánticas
| Verificación | Estado | Detalle |
|--------------|--------|---------|
| Un solo H1 | OK | Se detectó un H1: “Sobre el proyecto”. |
| Jerarquía de headings sin saltos | OK | 17 headings; no se detectaron saltos de nivel. |
| Secciones con elementos semánticos | OK | Se usan header, nav, main, aside, section, article y footer con propósito reconocible. Los 5 div observados envuelven el layout (2) y campos del formulario (3); no sustituyen elementos semánticos donde corresponda. |
| Campos de formulario con label | OK | `input#busqueda`, `select#tipo` y `select#genero` tienen labels asociados. |
| Tabla/s con caption | OK | Una tabla con caption “Películas y series disponibles en la biblioteca inicial”. |

### Validación W3C HTML
| Tipo | Cantidad | Detalle |
|------|----------|---------|
| Errores | 0 | Documento validado por Nu Html Checker (vnu 26.9.16). |
| Warnings | 0 | No se informaron warnings. |

El validador reportó 9 mensajes `Info` (no errores ni warnings) sobre barras finales en elementos void, en las líneas 4, 5, 9, 63, 79, 100, 125, 148 y 201.

### Validación W3C CSS
| Archivo | Errores | Warnings |
|---------|---------|----------|
| styles.css | 0 | 23 |
| components.css | 0 | 47 |
| responsive.css | 0 | 2 |

**Detalle de warnings W3C CSS (perfil CSS level 3, nivel de warnings 2):**
- `styles.css` — 23: variable CSS no comprobable estáticamente y recomendación de familia genérica (línea 31); avisos por color sin color de fondo explícito en líneas 61 (4 mensajes), 83, 95, 121, 139, 143, 159 y 205; por fondo sin color de texto explícito en líneas 111, 176 (3) y 197; redefiniciones en líneas 210 (`align-items`), 212 (`gap`), 220 (`grid-template-columns`) y URI `$sf`, línea 0 (`column-gap`, `row-gap`).
- `components.css` — 47: variables CSS no comprobables estáticamente en líneas 9, 13, 15, 17, 19, 33, 35, 69, 89, 93, 111, 123, 139, 151, 167, 181, 211, 213, 215, 217, 255, 257, 265, 279, 281, 293 y 321; avisos por color/fondo no explícito en líneas 61 (3), 113 (2), 125 (2), 191, 219 (3), 229, 267, 303 y 311; redefiniciones de `padding-*` en línea 321 y `grid-template-columns` en línea 329.
- `responsive.css` — 2: redefinición de `grid-template-columns` en líneas 33 y 43. No se detectaron errores de parseo ni contenido no CSS, a diferencia de Momento 1.

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Snapshot accesibilidad | ![](capturas/tc-5/momento-2/semantic-snapshot.png) |
| W3C HTML Validator (0 errores, 0 warnings) | ![](capturas/tc-5/momento-2/w3c-html.png) |
| W3C CSS — styles.css | ![](capturas/tc-5/momento-2/w3c-css-styles.png) |
| W3C CSS — components.css | ![](capturas/tc-5/momento-2/w3c-css-components.png) |
| W3C CSS — responsive.css | ![](capturas/tc-5/momento-2/w3c-css-responsive.png) |

### Hallazgos
| # | Tipo | Elemento / Archivo | Descripción | Severidad |
|---|------|--------------------|-------------|-----------|
| — | — | — | No se encontraron errores HTML/CSS ni problemas semánticos. Los warnings CSS y mensajes informativos HTML están detallados arriba y no impidieron la validación. | — |

### Resultado Momento 2
- [x] ✅ PASS — Sin errores de validación ni hallazgos semánticos
- [ ] ⚠️ FAIL CON OBSERVACIONES
- [ ] ❌ FAIL

---

## Issues creados
| Issue | Momento | Tipo | Elemento / Archivo | Severidad | Estado |
|-------|---------|------|--------------------|-----------|--------|
| [#29](https://github.com/keviineze/proyecto-web-peliculas/issues/29) | Momento 1 | Validación CSS | `css/responsive.css` — 5 errores de parseo W3C | Alta | Cerrado |

## Decisiones tomadas
Se consideró bug el hallazgo de `css/responsive.css` porque contiene contenido que no pertenece a CSS y el validador W3C reportó 5 errores de parseo. Se registró en el issue [#29](https://github.com/keviineze/proyecto-web-peliculas/issues/29). Los warnings de `styles.css` sobre variables CSS y los warnings `-webkit-` de `responsive.css` no se consideraron bugs. El warning HTML sobre barras finales en elementos void tampoco se consideró bug, ya que el documento obtuvo 0 errores. `components.css` no se consideró bug en Momento 1 porque aparecerá al hacer el merge a `develop`; queda pendiente de validación en Momento 2.

## Conclusión general
**Resultado Momento 1:** FAIL — se detectaron 5 errores W3C en `responsive.css`.  
**Resultado Momento 2:** PASS — la estructura semántica es correcta y HTML/CSS no presentan errores W3C. `responsive.css` valida sin errores.