# Test Case 9 — Componente HTML avanzado: calificación

## Metadata

| Campo              | Valor                                            |
| ------------------ | ------------------------------------------------ |
| Responsable        | Gonzalo Barbano                                  |
| Fecha de ejecución | 2026-10-07                                       |
| Rama testeada      | `feature/dev-comp-html-avanzados-add-components` |
| URL testeada       | `http://localhost:3000`                          |

## Componente testeado

| Campo                   | Descripción                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Nombre                  | `input type="range"` nativo                                                                                 |
| Selector                | `#rating-chihiro`                                                                                           |
| Sección                 | Biblioteca → Vistas → El viaje de Chihiro                                                                   |
| Comportamiento esperado | Permitir seleccionar una calificación de 1 a 5 con las interacciones nativas del navegador, sin JavaScript. |

## Objetivo y herramientas

Validar etiqueta accesible, límites, interacción por teclado, integración visual con Bootstrap y adaptación responsive mediante Playwright MCP.

## Procedimiento ejecutado

```text
Usando Playwright MCP, validá #rating-chihiro en http://localhost:3000 en 1280x800, 390x844 y 768x1024. Comprobá que el control nativo sea visible, tenga etiqueta, permita seleccionar los límites 1 y 5 con Home y End, y no cause overflow horizontal. Tomá una captura de la tarjeta de la biblioteca en cada viewport. No agregues ni ejecutes JavaScript de aplicación.
```

## Resultados

| Viewport         | Visible y dentro del viewport | Interacción                         | Overflow | Captura                                                         |
| ---------------- | ----------------------------- | ----------------------------------- | -------- | --------------------------------------------------------------- |
| 1280×800 desktop | Sí                            | Home seleccionó 1; End seleccionó 5 | No       | [tc-9-desktop.png](capturas/tc-html-avanzados/tc-9-desktop.png) |
| 390×844 mobile   | Sí                            | Control nativo disponible           | No       | [tc-9-mobile.png](capturas/tc-html-avanzados/tc-9-mobile.png)   |
| 768×1024 tablet  | Sí                            | Control nativo disponible           | No       | [tc-9-tablet.png](capturas/tc-html-avanzados/tc-9-tablet.png)   |

El control tiene la etiqueta “Tu calificación”, rango 1–5 y escala visual con los cinco valores. No se carga un script propio ni se afirma persistencia de la selección.

## Hallazgos

El control pasó las verificaciones funcionales y responsive. La ejecución original registró un 404 de `/favicon.ico`, ajeno al componente. Se creó el Issue [#55](https://github.com/keviineze/proyecto-web-peliculas/issues/55); la corrección y su retest se documentan a continuación.

## Conclusión

**Resultado:** PASS para el componente. El hallazgo del favicon se rastreó con el Issue #55; su corrección y retest están documentados abajo. La integración por PR sigue pendiente.

## Retest del Issue #55

**Fecha:** 2026-10-16. **Rama:** `fix/correcciones-rc`.

Se agregó `assets/images/favicon.svg` y se declaró en `index.html`. La página respondió HTTP 200 (`text/html`) y el favicon HTTP 200 (`image/svg+xml`) en `http://localhost:3000`; el recurso ya no devuelve 404.

**Estado:** PASS en la rama de corrección. La PR que integre este cambio sigue pendiente; no se afirma que el issue esté cerrado.
