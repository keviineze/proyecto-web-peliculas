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

El control pasó las verificaciones funcionales y responsive. La consola registró un 404 de `/favicon.ico`, reproducible antes de la implementación y no relacionado con este componente. Se creó el Issue [#55](https://github.com/keviineze/proyecto-web-peliculas/issues/55); su corrección se realiza en una rama `fix/` desde `develop`.

## Conclusión

**Resultado:** PASS para el componente. El hallazgo general de favicon queda rastreado por el Issue #55 y se actualizará después del retest.
