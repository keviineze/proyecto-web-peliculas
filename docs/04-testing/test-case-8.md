# Test Case 8 — Componente Bootstrap 2

## Metadata
| Campo | Valor |
|-------|-------|
| Responsable | Kevin Sosa |
| Fecha de ejecución | 2026-10-05 |
| Rama testeada | `feature/esp-componentes-bootstrap-add-components` |
| URL testeada | `http://localhost:3000` |

## Componente testeado

| Campo | Descripción |
|-------|-------------|
| **Nombre del componente** | Carousel |
| **Selector / ID en el HTML** | `#featured-carousel` |
| **Sección de la página** | Películas Destacadas |
| **Comportamiento esperado** | Carousel responsive que permite avanzar y retroceder entre las películas destacadas. |

---

## Objetivo
Verificar que el segundo componente Bootstrap implementado funciona correctamente,
responde a las interacciones del usuario, se adapta a distintos viewports
y mantiene la identidad visual definida en bootstrap-overrides.css.

## Herramientas utilizadas
- Playwright MCP (`@playwright/mcp`) con viewport emulation e interacción de UI
- GitHub Copilot Agent Mode
- GitHub MCP (`@modelcontextprotocol/server-github`) para registrar issues

---

## Prompt para Copilot Agent Mode

> **Antes de copiar el prompt:** reemplazá `[COMPONENTE]` con el nombre del componente
> y `[SELECTOR]` con el selector CSS o ID del elemento en el HTML.

```
Usando Playwright MCP, necesito testear el componente Bootstrap Carousel
en http://localhost:3000.

Selector: #featured-carousel

Ejecutá estos pasos en orden:

1. Navegá a http://localhost:3000 con viewport 1280x800 (desktop)
   - Localizá el elemento #featured-carousel en la página
   - Tomá captura del componente en su estado inicial
   - Interactuá con el componente según su tipo:
     · Si es un modal: hacé click en el botón que lo abre y verificá que se abre correctamente
     · Si es un navbar/collapse: hacé click en el toggler y verificá que se despliega
     · Si es un carrusel: avanzá y retrocedé slides, verificá transiciones
     · Si es un accordion: abrí y cerrá secciones, verificá que solo una esté activa
     · Si es un dropdown: hacé click y verificá que el menú aparece correctamente
     · Si es un offcanvas: activá y cerrá, verificá overlay
   - Tomá captura del componente en estado activo/expandido
   - Verificá que los estilos de bootstrap-overrides.css se aplican

2. Cambiá el viewport a 390x844 (iPhone 14 Pro — mobile)
   - Verificá que el componente se adapta correctamente
   - Repetí la interacción y tomá capturas
   - Verificá si hay diferencias respecto al desktop

3. Cambiá el viewport a 768x1024 (iPad — tablet)
   - Verificá comportamiento intermedio
   - Tomá captura

4. Reportá para cada viewport:
   - Si el componente es visible y funcional
   - Si las animaciones/transiciones funcionan
   - Si la identidad visual se mantiene (colores, tipografías de overrides)
   - Cualquier problema visual o de comportamiento

Guardá las capturas en docs/04-testing/capturas/tc-8/
```

---

## Dispositivos testeados
| Viewport | Componente visible | Interacción funcional | Estilos override | Estado |
|----------|-------------------|----------------------|------------------|--------|
| 1280×800 (desktop) | Sí; visible y 3 slides | Sí: Interstellar → El viaje de Chihiro → Interstellar; eventos `slide.bs.carousel` y `slid.bs.carousel` observados | Sí: superficie oscura, borde `#303b47`, controles transparentes con iconos verdes y tipografía del proyecto | PASS |
| 390×844 (mobile) | Sí; visible y adaptado al ancho | Sí: Interstellar → El viaje de Chihiro → Interstellar; eventos `slide.bs.carousel` y `slid.bs.carousel` observados | Sí: superficie oscura, borde `#303b47`, controles transparentes con iconos verdes y tipografía del proyecto | PASS |
| 768×1024 (tablet) | Sí; visible y adaptado al ancho | Sí: Interstellar → El viaje de Chihiro → Interstellar; eventos `slide.bs.carousel` y `slid.bs.carousel` observados | Sí: superficie oscura, borde `#303b47`, controles transparentes con iconos verdes y tipografía del proyecto | PASS |

## Capturas de pantalla
| Viewport / Estado | Captura | Estado |
|-------------------|---------|--------|
| Desktop — estado inicial | ![](capturas/tc-8/desktop-inicial.png) | Generada a 1280×800; slide inicial Interstellar |
| Desktop — estado activo | ![](capturas/tc-8/desktop-activo.png) | Generada a 1280×800 después de avanzar; El viaje de Chihiro |
| Mobile — estado inicial | ![](capturas/tc-8/mobile-inicial.png) | Generada a 390×844; slide inicial Interstellar |
| Mobile — estado activo | ![](capturas/tc-8/mobile-activo.png) | Generada a 390×844 después de avanzar; El viaje de Chihiro |
| Tablet | ![](capturas/tc-8/tablet.png) | Generada a 768×1024; slide inicial Interstellar |

## Hallazgos
| # | Viewport | Descripción del problema | Comportamiento esperado | Comportamiento observado | Severidad |
|---|----------|--------------------------|-------------------------|--------------------------|-----------|
| 1 | Carga de página (todos los viewports) | El recurso `/favicon.ico` responde 404; no afecta el Carousel | El recurso del favicon solicitado por la página debería cargar correctamente | Playwright registró HTTP 404 para `http://localhost:3000/favicon.ico`; el Carousel funcionó y no hubo errores de interacción observados | Baja |

### Severidad
- **Alta** — Componente no funciona o no se renderiza
- **Media** — Problema visual o de interacción significativo
- **Baja** — Detalle estético menor

## Issues creados
| Issue | Viewport | Descripción | Severidad | Estado |
|-------|----------|-------------|-----------|--------|
| No creado | Todos | 404 de favicon, ajeno al Carousel | Baja | No se creó Issue |

## Conclusión general
**Resultado final:** PASS CON OBSERVACIONES

El Carousel `#featured-carousel` fue visible y responsive en 1280×800, 390×844 y 768×1024. En los tres viewports avanzó de Interstellar a El viaje de Chihiro y retrocedió a Interstellar; se observaron los eventos `slide.bs.carousel` y `slid.bs.carousel`. Las imágenes activas y su contenido permanecieron dentro del componente, los estilos de `bootstrap-overrides.css` se mantuvieron y no hubo overflow horizontal. Hallazgo de baja severidad ajeno al Carousel: `/favicon.ico` respondió 404. No se creó un Issue.