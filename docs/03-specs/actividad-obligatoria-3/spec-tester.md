# Spec — Tester JavaScript / QA Engineer

## 1. Datos de la tarea

- **Proyecto:** Mini Letterboxd
- **Actividad:** Actividad Obligatoria N.º 3
- **Responsable:** Kevin Ezequiel Sosa
- **Rol:** Tester JavaScript / QA Engineer
- **Rama:** `feature/tester-javascript-jasmine`
- **Rama destino:** `develop`
- **Repositorio:** [keviineze/proyecto-web-peliculas](https://github.com/keviineze/proyecto-web-peliculas)

## 2. Momento 1 — BEFORE: Plan de testing

### 2.1 Objetivo

Implementar una suite de pruebas automatizadas para validar la lógica de negocio de los cuatro flujos principales del proyecto Mini Letterboxd, utilizando Jasmine en navegador y Playwright MCP para ejecutar las pruebas y capturar evidencia.

Las pruebas deberán ser coherentes con `plan.md`, los diagramas de actividades aprobados y las funciones implementadas en `js/script.js`.

### 2.2 Plan de testing

Se desarrollarán cuatro suites Jasmine, una por cada flujo principal definido en los diagramas de actividades.

Los nombres definitivos de los flujos y las funciones a probar se establecerán al revisar los diagramas y el archivo `js/script.js`. No se inventarán nombres de funciones, resultados esperados ni comportamientos que no estén respaldados por la implementación.

Para cada flujo se planifica cubrir, según corresponda:

- **Happy path:** entradas válidas y resultados esperados.
- **Casos borde:** cero, valores negativos, valores grandes y cadenas vacías cuando sean aplicables.
- **Validación de errores:** datos inválidos, tipos incorrectos, `null` y `undefined`, según el contrato de cada función.
- **Arrays y objetos:** creación, búsqueda, filtrado, modificación y eliminación cuando esas operaciones formen parte del flujo.
- **Cálculos y algoritmos:** verificación de resultados y decisiones condicionales.

Cada suite tendrá como mínimo tres tests, con casos representativos de la funcionalidad real.

### 2.3 Herramientas

- **GitHub Copilot en Agent Mode:** generar una primera versión de `js/test/script.spec.js` utilizando `js/script.js` como contexto.
- **Jasmine 5.10.0 mediante CDN:** ejecutar los tests en navegador.
- **Playwright MCP (`@playwright/mcp`):** abrir `js/test/test-runner.html`, ejecutar las suites y capturar screenshots de los resultados.
- **GitHub Issues:** registrar bugs reproducibles con comportamiento esperado y obtenido, pasos para reproducir y referencia al test que falla.
- **Visual Studio Code:** revisar manualmente los tests y documentar ajustes realizados.

Copilot servirá como herramienta de apoyo. Los tests generados serán revisados y contrastados con la implementación antes de considerarlos válidos.

### 2.4 Estructura prevista

- `js/test/test-runner.html`: página que carga Jasmine, `js/script.js` y `js/test/script.spec.js`.
- `js/test/script.spec.js`: cuatro suites con los casos de prueba.
- `js/test/testing-doc.md`: documentación de ejecución, suites, métricas, capturas, issues conocidas y limitaciones.

Las capturas se organizarán dentro de `js/test/screenshots/`, usando las rutas relativas requeridas por la plantilla del profesor.

### 2.5 Criterios de aceptación

- [ ] Este spec está commiteado antes de crear `js/test/script.spec.js`.
- [ ] Los cuatro flujos y sus funciones se identifican a partir de los diagramas y del código real.
- [ ] `js/test/test-runner.html` carga correctamente Jasmine, el código fuente y las suites.
- [ ] `js/test/script.spec.js` contiene cuatro suites, una por cada flujo.
- [ ] Cada suite contiene al menos tres tests.
- [ ] Se incluyen casos normales, casos borde y validaciones de errores pertinentes.
- [ ] Se utilizan assertions de Jasmine apropiadas.
- [ ] El runner se ejecuta mediante Playwright MCP en un navegador real.
- [ ] Se capturan screenshots reales de los resultados.
- [ ] Los bugs reproducibles se registran en GitHub Issues.
- [ ] `js/test/testing-doc.md` respeta la plantilla proporcionada por el profesor.
- [ ] Se documentan los resultados de las pruebas y la colaboración con el Desarrollador JavaScript.

### 2.6 Dependencias

La implementación de los tests depende de que estén disponibles `js/script.js` y los cuatro diagramas de actividades. Si las pruebas detectan problemas de testabilidad o defectos funcionales, se coordinarán los ajustes necesarios con el Desarrollador JavaScript.

### 2.7 Cierre de la tarea — AT CLOSE

**Se completará después de implementar y ejecutar las pruebas.**

- Prompt exacto utilizado en Copilot Agent Mode, con `js/script.js` adjunto como contexto.
- Ajustes manuales realizados en los tests generados.
- Screenshots reales del test runner ejecutado con Playwright MCP.
- Cantidad total de tests, aprobados y fallidos.
- Bugs reportados mediante GitHub Issues.
- Resumen de la coordinación con el Desarrollador JavaScript y de los ajustes realizados.

No se marcarán como completados los criterios que todavía no cuenten con evidencia verificable.