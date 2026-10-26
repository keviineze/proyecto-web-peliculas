# Test Case 10 — Ficha técnica HTML nativa

## Metadata
| Campo | Valor |
|-------|-------|
| Componente | details/summary |
| Ubicación | Tarjeta de El viaje de Chihiro en el Catálogo |
| Estado del retest | PASS — 14/10/2026 |

## Objetivo
Comprobar la interacción nativa de la ficha técnica tras trasladarla desde el modal a la tarjeta para alinear la implementación con el mockup disponible.

## Procedimiento
En http://localhost:3000, localizar la tarjeta de El viaje de Chihiro. Repetir en desktop 1280×800, iPad Air 820×1180 y mobile 390×844.

1. Confirmar que Ficha técnica aparece cerrada inicialmente.
2. Abrirla con teclado (Enter y Espacio) y con clic.
3. Confirmar que se muestran Duración: 125 minutos y Estado: vista.
4. Volver a cerrarla y confirmar que el contenido se oculta.
5. Revisar foco visible, legibilidad, límites del viewport y overflow horizontal.

## Criterios de aceptación
- Se usa el elemento HTML details con summary y no depende de JavaScript de aplicación.
- La ficha abre y cierra con teclado y ratón.
- Los datos corresponden a la tarjeta de Chihiro.
- La tarjeta permanece legible y no provoca overflow en los tres viewports.

## Resultados y capturas

### Ejecución real — 14/10/2026

**PASS en los tres viewports.** En desktop (1280×800), iPad Air (820×1180) y mobile (390×844), `Ficha técnica` estaba cerrada inicialmente. Se abrió con Enter y cerró con Espacio; el resumen mantuvo foco visible. También se abrió y cerró mediante clic. Al abrirla se mostraron los datos existentes: `Duración: 125 minutos` y `Estado: vista`. No se detectó overflow horizontal, ni con la ficha abierta ni cerrada.

| Viewport | Overflow comprobado | Captura con la ficha abierta |
|---|---|---|
| Desktop — 1280×800 | `scrollWidth` 1265 px ≤ 1280 px | [tc-10-desktop-1280x800.png](./capturas/tc-html-avanzados/momento-2/tc-10-desktop-1280x800.png) |
| iPad Air — 820×1180 | `scrollWidth` 805 px ≤ 820 px | [tc-10-ipad-air-820x1180.png](./capturas/tc-html-avanzados/momento-2/tc-10-ipad-air-820x1180.png) |
| Mobile — 390×844 | `scrollWidth` 375 px ≤ 390 px | [tc-10-mobile-390x844.png](./capturas/tc-html-avanzados/momento-2/tc-10-mobile-390x844.png) |

Las capturas nuevas de pantalla completa se guardaron en `docs/04-testing/capturas/tc-html-avanzados/momento-2/`; no se reutilizaron las capturas de una corrida anterior.
