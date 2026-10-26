# Test Case 6 — Responsive: Bootstrap y correcciones visuales

## Metadata
| Campo | Valor |
|-------|-------|
| Responsable | Kevin Sosa |
| Rama de trabajo | fix/correcciones-rc-primer-parcial-1 |
| URL a ejecutar | http://localhost:3000 |
| Viewports requeridos | Mobile 390×844; iPad Air 820×1180; Desktop 1280×800 |
| Estado de retest | PASS — segundo retest 14/10/2026; separación desktop corregida |

## Objetivo
Volver a comprobar los hallazgos RC9, RC10, RC11, RC12, RC14 y RC16 después de los cambios de CSS y HTML. Este retest se ejecutó con Playwright el 14/10/2026; los resultados medidos y cualquier diferencia visual quedan registrados abajo.

## Procedimiento
En cada viewport, abrir http://localhost:3000, esperar la carga de imágenes y revisar la página. Las capturas nuevas de este retest se guardan en docs/04-testing/capturas/tc-6/momento-2/.

### Mobile — 390×844
- Confirmar que Biblioteca y Catálogo se apilan y no hay scroll horizontal.
- Revisar que los filtros de Mi Lista y el carrusel quepan en el viewport.
- Confirmar que las imágenes de tarjetas y carrusel se vean completas.

### iPad Air — 820×1180
- Confirmar que Biblioteca y Catálogo se apilan según el breakpoint lg.
- En lista-pendientes, confirmar que la imagen mantiene un ancho razonable.
- Revisar proporciones, nitidez, controles del carrusel y ausencia de overflow.

### Desktop — 1280×800
- Confirmar que Biblioteca y Catálogo quedan lado a lado.
- Avanzar el carrusel hasta Dark y comprobar que la imagen completa se vea.
- Revisar que las imágenes verticales de lista-pendientes no se recorten.
- Confirmar el espacio vertical entre Películas Destacadas y Catálogo.

## Criterios para aprobar
- No hay overflow horizontal en ninguno de los tres tamaños.
- Las imágenes se muestran completas y Chihiro conserva nitidez a su tamaño renderizado.
- La imagen de lista-pendientes conserva dimensiones razonables en iPad Air.
- La separación vertical y el layout corresponden con el mockup aprobado.
- No aparecen errores de consola atribuibles a esta implementación.

## Registro de resultados

### Ejecución real — 14/10/2026

| Viewport | Resultado | Observaciones verificadas |
|---|---|---|
| Mobile — 390×844 | PASS | Sin scroll horizontal (`scrollWidth` 375 px frente a viewport 390 px). Biblioteca y Catálogo apilados. Imagen de Pendientes cargada, 220×321 px, `object-fit: contain`. Carrusel Interstellar cargado y completo en su área 211×160 px. Separación medida entre el borde inferior de Películas Destacadas y el inicio de Biblioteca: 48 px. |
| iPad Air — 820×1180 | PASS | Sin scroll horizontal (`scrollWidth` 805 px frente a viewport 820 px). Biblioteca y Catálogo apilados en el breakpoint `lg`. Imagen de Pendientes cargada, 260×379 px, `object-fit: contain`. Carrusel Interstellar cargado y completo en su área 609×230 px. Separación medida: 56 px. |
| Desktop — 1280×800 | FAIL | Sin scroll horizontal (`scrollWidth` 1265 px frente a viewport 1280 px). Biblioteca y Catálogo quedan lado a lado. Imagen de Pendientes cargada, 178×260 px, `object-fit: contain`. Interstellar, Chihiro y Dark cargaron y se ven completos en el carrusel (`object-fit: contain`; área 738×260 px). La separación medida entre Películas Destacadas y Biblioteca es 56 px; en el mockup es aproximadamente 40 px, por lo que la separación real resulta unos 16 px mayor y no cumple el criterio de correspondencia visual. |

**Resultado general del primer retest: FAIL**, únicamente por la diferencia de separación vertical observada en desktop. La comparación visual confirmó la distribución de columnas y el orden de secciones del mockup. El registro se conserva para trazabilidad.

**Consola:** se registró un error real al cargar la página: `GET http://localhost:3000/favicon.ico` respondió `404 (File not found)`. Es ajeno a los cambios responsive/carrusel comprobados; no se observaron errores de consola relacionados con ellos ni warnings.

### Capturas de pantalla completa

| Viewport / estado | Captura |
|---|---|
| Mobile — 390×844 | [mobile-390x844.png](./capturas/tc-6/momento-2/mobile-390x844.png) |
| iPad Air — 820×1180 | [ipad-air-820x1180.png](./capturas/tc-6/momento-2/ipad-air-820x1180.png) |
| Desktop — 1280×800 | [desktop-1280x800.png](./capturas/tc-6/momento-2/desktop-1280x800.png) |
| Desktop — slide Dark | [desktop-dark-1280x800.png](./capturas/tc-6/momento-2/desktop-dark-1280x800.png) |

### Segundo retest — Desktop 1280×800 — 14/10/2026

Se aplicó el ajuste solicitado exclusivamente dentro de `@media (min-width: 992px)`: `main > div.row { margin-top: var(--space-4); }`. Se mantuvieron el valor base para iPad Air y el ajuste existente para mobile.

**Resultado: PASS.** Con Playwright a 1280×800, midiendo desde el borde inferior de `.featured-section` hasta el inicio de `#biblioteca` y `#catalogo` (los dos comienzan a la misma altura), se obtuvo **40 px**: borde inferior de Películas Destacadas en `y=549.1875` e inicio de ambas columnas en `y=589.1875`. La medida coincide con los aproximadamente 40 px del mockup. No hubo scroll horizontal (`scrollWidth` 1265 px ≤ 1280 px). Las imágenes cargaron; la imagen de Pendientes se mostró completa en 178×260 px y la imagen activa del carrusel (Interstellar) completa en 738×260 px, ambas con `object-fit: contain`.

**Consola del segundo retest:** error real `Failed to load resource: the server responded with a status of 404 (File not found) @ http://localhost:3000/favicon.ico:0`. Es el mismo error preexistente de favicon documentado en el primer retest; no se observaron errores relacionados con el espaciado ni advertencias.

La captura de pantalla completa se reemplazó tras ejecutar esta medición: [desktop-1280x800.png](./capturas/tc-6/momento-2/desktop-1280x800.png).
