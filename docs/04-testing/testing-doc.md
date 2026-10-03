# Testing Doc — Actividad Obligatoria N°2

**Proyecto:** Mini Letterboxd — Películas y series

**Repositorio:** `keviineze/proyecto-web-peliculas`

**Rol:** Documentador / QA Tester

**Rama de trabajo:** `feature/doc-qa-tester-add-test-cases`

**URL local:** http://localhost:3000

**Estado:** Completado

---

# Índice de Test Cases

1. [Test Case 1 — Compatibilidad en navegadores desktop](./test-case-1.md)
2. [Test Case 2 — Responsive en dispositivos móviles](./test-case-2.md)
3. [Test Case 3 — Performance y carga](./test-case-3.md)
4. [Test Case 4 — Accesibilidad web](./test-case-4.md)
5. [Test Case 5 — Estructura HTML semántica y CSS](./test-case-5.md)

---

# Resumen

Este documento centraliza la documentación de las pruebas de QA realizadas sobre el proyecto durante la Actividad Obligatoria N°2.

El testing se divide en dos momentos:

- **Momento 1:** Testing de integración parcial, antes del merge de las ramas `feature/` a `develop`.
- **Momento 2:** Testing de integración final, después del merge de las ramas `feature/` a `develop`.

Los cinco test cases fueron ejecutados utilizando Playwright MCP y las herramientas específicas indicadas para cada prueba.

Durante las pruebas se documentaron resultados, evidencias mediante capturas y los issues correspondientes a los bugs detectados.

---

# Herramientas utilizadas

## Playwright MCP

Se utilizó Playwright MCP para ejecutar las pruebas automatizadas mediante Copilot Agent y controlar el navegador.

Usos:

- compatibilidad visual en diferentes viewports;
- emulación de dispositivos móviles;
- pruebas responsive;
- medición de performance;
- evaluación de accesibilidad;
- obtención del accessibility snapshot;
- inspección de la aplicación.

## GitHub MCP

Se utilizó GitHub MCP para crear y gestionar los issues correspondientes a los bugs relevantes detectados durante las pruebas.

Los issues fueron creados únicamente cuando se identificó un hallazgo reproducible que correspondía a un problema real.

## axe-core

Se utilizó `axe-core 4.7.2` para realizar la evaluación automatizada de accesibilidad correspondiente al Test Case 4.

## W3C Validator

Se utilizó la validación W3C para comprobar la estructura HTML y los archivos CSS correspondientes al Test Case 5.

---

# Test Cases

| Test Case | Prueba | Herramienta | Momento 1 | Momento 2 | Estado |
|---|---|---|---|---|---|
| TC1 | Compatibilidad desktop | Playwright MCP | PASS | PASS | Completado |
| TC2 | Responsive | Playwright MCP + viewport emulation | PASS | PASS* | Completado |
| TC3 | Performance y carga | Playwright MCP + Performance API | PASS | PASS | Completado |
| TC4 | Accesibilidad | Playwright MCP + axe-core | FAIL | PASS | Completado |
| TC5 | HTML semántico y CSS | Playwright MCP + W3C | FAIL | PASS | Completado |

\* El Momento 2 presentó inicialmente el Issue #31. Luego de la corrección integrada en `develop`, se realizó un retest específico y se verificó que el problema quedó corregido.

---

# Momento 1 — Testing pre-merge

## Objetivo

Ejecutar los cinco test cases sobre las ramas `feature/` del Desarrollador Frontend y del Especialista en Responsive Design antes de realizar el merge a `develop`.

Las pruebas se realizaron sobre el proyecto local utilizando `http://localhost:3000`.

## Estado

**Completado.**

## Resultados

### TC1 — Compatibilidad desktop

**Resultado:** PASS

Se verificaron los viewports correspondientes al test:

- Chrome — 1920×1080
- Firefox/Safari — 1280×800
- Edge — 1280×800
- 1440×900

No se detectaron problemas de desbordamiento horizontal, cortes visuales ni problemas relevantes en header, navegación, contenido, tablas o footer.

**Issue:** Ninguno.

---

### TC2 — Responsive

**Resultado:** PASS

Se verificaron:

- iPhone 14 Pro — 390×844
- Samsung Galaxy S23 — 412×915
- iPad Air — 820×1180

La navegación, contenido, formularios y tabla se adaptaron correctamente en los viewports evaluados.

No se detectaron bugs durante este momento.

**Issue:** Ninguno.

---

### TC3 — Performance y carga

**Resultado:** PASS

Se verificaron las métricas de Performance API correspondientes a:

- DOMContentLoaded
- DOM Interactive
- Load completo
- recursos cargados
- tamaño de recursos
- tiempo de descarga

No se detectaron recursos que generaran un problema relevante según los criterios establecidos para el test.

**Issue:** Ninguno.

---

### TC4 — Accesibilidad

**Resultado:** FAIL

axe-core detectó tres violaciones correspondientes a la regla:

`link-in-text-block`

Las violaciones correspondían a enlaces del catálogo y presentaban un contraste de `2.16:1`, inferior al requerido por la regla para este caso.

Las tres detecciones correspondían al mismo problema de accesibilidad.

**Issue creado:** [Issue #27](https://github.com/keviineze/proyecto-web-peliculas/issues/27)

El problema fue posteriormente corregido por el equipo de desarrollo antes del merge.

---

### TC5 — Estructura HTML semántica y CSS

**Resultado:** FAIL

La estructura HTML presentó los controles y elementos semánticos esperados.

La validación HTML no presentó errores relevantes.

La validación de `styles.css` tampoco presentó errores relevantes.

Sin embargo, `responsive.css` presentó errores de validación CSS debido a contenido que no correspondía a código CSS dentro del archivo.

El archivo `components.css` no se consideró un bug durante este momento debido a que correspondía a la rama del Frontend y todavía no formaba parte de la rama Responsive evaluada.

**Issue creado:** [Issue #29](https://github.com/keviineze/proyecto-web-peliculas/issues/29)

El problema de `responsive.css` fue posteriormente corregido por el equipo de desarrollo antes del merge.

---

## Issues generados — Momento 1

| Issue | Test Case | Descripción | Estado |
|---|---|---|---|
| [#27](https://github.com/keviineze/proyecto-web-peliculas/issues/27) | TC4 | Violaciones de accesibilidad `link-in-text-block` en enlaces del catálogo | Corregido |
| [#29](https://github.com/keviineze/proyecto-web-peliculas/issues/29) | TC5 | Contenido no perteneciente a CSS dentro de `responsive.css` | Corregido |

**Total de issues creados en Momento 1: 2**

---

# Momento 2 — Testing post-merge

## Objetivo

Ejecutar nuevamente los cinco test cases sobre la rama `develop` después de la integración de las ramas de Frontend y Responsive Design.

Este momento permitió verificar el comportamiento de la aplicación integrada y comprobar que los problemas encontrados durante el Momento 1 hubieran sido corregidos.

## Estado

**Completado.**

## Resultados

### TC1 — Compatibilidad desktop

**Resultado:** PASS

Se verificaron los viewports establecidos para compatibilidad desktop.

No se detectaron problemas visuales, cortes, desbordamientos ni inconvenientes relevantes de visualización.

**Issue:** Ninguno.

---

### TC2 — Responsive

**Resultado:** FAIL

Se verificaron:

- iPhone 14 Pro — 390×844
- Samsung Galaxy S23 — 412×915
- iPad Air — 820×1180

En iPhone 14 Pro y Samsung Galaxy S23 se detectó que la tabla del catálogo tiene un ancho superior al espacio disponible y que las columnas ubicadas a la derecha quedan inaccesibles.

No se detectó scroll horizontal global de la página ni un contenedor desplazable que permitiera consultar las columnas restantes.

En iPad Air la tabla se visualizó correctamente.

**Issue creado:** [Issue #31](https://github.com/keviineze/proyecto-web-peliculas/issues/31)

**Severidad:** Media.

### Retest TC2 — Issue #31

Luego de la corrección del problema responsive y su integración en `develop`, se realizó una prueba de regresión específica mediante Playwright MCP.

Se verificaron nuevamente:

- iPhone 14 Pro — 390×844
- Samsung Galaxy S23 — 412×915
- iPad Air — 820×1180

En iPhone y Samsung la tabla pudo desplazarse horizontalmente mediante su propio contenedor, permitiendo consultar la columna final "Estado".

Se verificó además que la página no presenta scroll horizontal global.

En iPad Air las cinco columnas continúan visibles sin necesidad de desplazamiento.

**Resultado del retest:** PASS.

**Issue #31:** Corregido y verificado.

---

### TC3 — Performance y carga

**Resultado:** PASS

Se ejecutaron las mediciones correspondientes mediante Performance API.

No se detectaron problemas relevantes según los criterios definidos para el test.

**Issue:** Ninguno.

---

### TC4 — Accesibilidad

**Resultado:** PASS

Se ejecutó nuevamente la evaluación mediante axe-core sobre la versión integrada en `develop`.

No se detectaron nuevas violaciones relevantes.

El problema registrado previamente en el Issue #27 no volvió a presentarse durante el Momento 2.

**Issue:** Ninguno nuevo.

---

### TC5 — Estructura HTML semántica y CSS

**Resultado:** PASS

Se verificó la estructura semántica de la aplicación y la validación HTML.

También se validaron los tres archivos CSS correspondientes a la versión integrada:

- `css/styles.css`
- `css/components.css`
- `css/responsive.css`

No se detectaron nuevos errores relevantes.

El problema documentado anteriormente en el Issue #29 no volvió a presentarse durante el Momento 2.

**Issue:** Ninguno nuevo.

---

## Issues generados — Momento 2

| Issue | Test Case | Descripción | Estado |
|---|---|---|---|
| [#31](https://github.com/keviineze/proyecto-web-peliculas/issues/31) | TC2 | La tabla del catálogo queda parcialmente inaccesible en los viewports móviles | Corregido y verificado |

**Total de issues creados en Momento 2: 1**

---

# Resumen general de Issues

## Momento 1

**Issues creados: 2**

- [Issue #27](https://github.com/keviineze/proyecto-web-peliculas/issues/27) — Accesibilidad `link-in-text-block`.
- [Issue #29](https://github.com/keviineze/proyecto-web-peliculas/issues/29) — Errores en `responsive.css`.

Ambos problemas fueron corregidos antes del merge a `develop`.

## Momento 2

**Issues creados: 1**

- [Issue #31](https://github.com/keviineze/proyecto-web-peliculas/issues/31) — Tabla del catálogo inaccesible completamente en dispositivos móviles. El Issue #31 fue corregido mediante una nueva PR del equipo de desarrollo e integrado en `develop`. La corrección fue posteriormente verificada mediante una prueba de regresión de TC2 utilizando Playwright MCP.

---

# Resumen final de resultados

| Test Case | Momento 1 | Momento 2 | Issues |
|---|---|---|---|
| TC1 | PASS | PASS | Ninguno |
| TC2 | PASS | PASS* | #31 |
| TC3 | PASS | PASS | Ninguno |
| TC4 | FAIL | PASS | #27 |
| TC5 | FAIL | PASS | #29 |

\* El resultado inicial del Momento 2 fue FAIL debido al Issue #31. Luego de la corrección se realizó un retest y el resultado final fue PASS.

**Total de Test Cases ejecutados:** 5

**Total de ejecuciones:** 10

**Issues creados:** 3

**Issues corregidos antes del merge:** 2

**Issues pendientes detectados después del merge:** 0 

**Issues corregidos y verificados después del merge:** 1

---

# Evidencias

Las capturas de las pruebas se almacenan dentro de:

```text
docs/04-testing/capturas/