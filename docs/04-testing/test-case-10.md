# Test Case 10 — Componente HTML avanzado: ficha desplegable

## Metadata

| Campo              | Valor                                            |
| ------------------ | ------------------------------------------------ |
| Responsable        | Gonzalo Barbano                                  |
| Fecha de ejecución | 2026-10-07                                       |
| Rama testeada      | `feature/dev-comp-html-avanzados-add-components` |
| URL testeada       | `http://localhost:3000`                          |

## Componente testeado

| Campo                   | Descripción                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| Nombre                  | `details` y `summary`                                                                        |
| Selector                | `#modal-chihiro details`                                                                     |
| Sección                 | Modal de detalles de El viaje de Chihiro                                                     |
| Comportamiento esperado | Mantener la ficha cerrada inicialmente y permitir expandirla/contraerla con teclado o ratón. |

## Objetivo y herramientas

Validar el comportamiento nativo y el contenido de la ficha técnica, además de su integración visual y responsive, mediante Playwright MCP.

## Procedimiento ejecutado

```text
Usando Playwright MCP, validá #modal-chihiro details en http://localhost:3000 en 1280x800, 390x844 y 768x1024. Confirmá el estado cerrado inicial, abrí la ficha con Enter y con clic, verificá que se muestren los datos existentes y cerrala con Espacio. Revisá que el modal no desborde el viewport y tomá una captura con la ficha abierta en cada tamaño. No agregues ni ejecutes JavaScript de aplicación.
```

## Resultados

| Viewport         | Estado inicial | Interacción                                                       | Ficha dentro del viewport / overflow | Captura                                                           |
| ---------------- | -------------- | ----------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| 1280×800 desktop | Cerrada        | Enter abrió; Espacio cerró                                        | Sí / No                              | [tc-10-desktop.png](capturas/tc-html-avanzados/tc-10-desktop.png) |
| 390×844 mobile   | Cerrada        | Clic abrió la ficha                                               | Sí / No                              | [tc-10-mobile.png](capturas/tc-html-avanzados/tc-10-mobile.png)   |
| 768×1024 tablet  | Cerrada        | Clic abrió la ficha después de que el modal terminó su transición | Sí / No                              | [tc-10-tablet.png](capturas/tc-html-avanzados/tc-10-tablet.png)   |

La ficha contiene solo datos ya presentes: duración y estado. En tablet, un clic realizado durante la transición inicial del modal no la abrió; al repetirlo con el modal visible, abrió correctamente y no se reprodujo el problema.

## Hallazgos

No se encontraron defectos reproducibles en `details`/`summary`. La consola registró un 404 de `/favicon.ico`, reproducible antes de la implementación y no relacionado con este componente. Se creó el Issue [#55](https://github.com/keviineze/proyecto-web-peliculas/issues/55); su corrección se realiza en una rama `fix/` desde `develop`.

## Conclusión

**Resultado:** PASS para el componente. El hallazgo general de favicon queda rastreado por el Issue #55 y se actualizará después del retest.
