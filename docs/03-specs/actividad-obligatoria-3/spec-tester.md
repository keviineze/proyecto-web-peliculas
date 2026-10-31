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

- [x] Este spec está commiteado antes de crear `js/test/script.spec.js`. El historial Git confirma que el spec se agregó el 27/10/2026 (`13ca27b`), antes de que `script.spec.js` se agregara el 30/10/2026 (`d6a3300`).
- [x] Los cuatro flujos y sus funciones se identifican a partir de los diagramas y del código real.
- [x] `js/test/test-runner.html` carga correctamente Jasmine, el código fuente y las suites.
- [x] `js/test/script.spec.js` contiene cuatro suites, una por cada flujo.
- [x] Cada suite contiene al menos tres tests.
- [x] Se incluyen casos normales, casos borde y validaciones de errores pertinentes.
- [x] Se utilizan assertions de Jasmine apropiadas.
- [x] El runner se ejecuta mediante Playwright MCP en un navegador real.
- [x] Se capturan screenshots reales de los resultados.
- [x] No se detectaron bugs que requirieran nuevas Issues; por ese motivo no hubo Issues de bugs que crear.
- [x] `js/test/testing-doc.md` respeta la plantilla proporcionada por el profesor.
- [x] Se documentan los resultados de las pruebas y la colaboración con el Desarrollador JavaScript.

### 2.6 Dependencias

La implementación de los tests depende de que estén disponibles `js/script.js` y los cuatro diagramas de actividades. Si las pruebas detectan problemas de testabilidad o defectos funcionales, se coordinarán los ajustes necesarios con el Desarrollador JavaScript.

### 2.7 Cierre de la tarea — AT CLOSE

#### Prompt utilizado para generar `js/test/script.spec.js`

El siguiente es el prompt inicial enviado a Copilot para generar las suites, con `js/script.js` como contexto:

Nota: el prompt contiene una frase contradictoria que pide crear `script.spec.js` y luego indica que no debe crearse todavía. Copilot generó correctamente el archivo solicitado.

```text
Actuá como un especialista en testing automatizado de JavaScript utilizando Jasmine 5.10.0.

Necesito que generes el archivo `js/test/script.spec.js` para probar la aplicación Mini Letterboxd, correspondiente a la Actividad Obligatoria N.º 3.

El archivo principal de producción `js/script.js` es el contexto fundamental para diseñar las pruebas.

### 1. Estructura obligatoria
Creá exactamente cuatro suites principales utilizando `describe()`, una para cada flujo:

1. Flujo 1: Búsqueda y filtrado de contenidos.
2. Flujo 2: Gestión de lista personal (favoritos).
3. Flujo 3: Exportar y compartir lista personal.
4. Flujo 4: Calificación de contenidos vistos.
Cada suite debe contener como mínimo tres pruebas independientes mediante `it()`. Recomiendo incluir entre cuatro y seis pruebas por suite para lograr una cobertura más completa.

### 2. Funciones que debés probar
Utilizá las funciones reales que existen en `js/script.js`, respetando exactamente sus nombres, parámetros y valores de retorno.

**Suite 1 — Búsqueda y filtrado:**

- `searchContents()`
- `findTitleByName()`
- `formatSearchResults()`
Comprobá búsquedas con coincidencias, búsquedas sin resultados, filtros por tipo y género, coincidencias parciales y normalización de mayúsculas y tildes.

**Suite 2 — Gestión de favoritos:**

- `addFavorite()`
- `removeFavorite()`
- `findLibraryRecord()`
- `createInitialLibrary()`
- `readStoredLibrary()`
- `getWorkingLibrary()`
- `loadLibrary()`
- `saveLibrary()`
Comprobá agregar favoritos, eliminar favoritos, contenido inexistente, favoritos duplicados, conservación de estado y calificación, inmutabilidad y persistencia.

Incluí especialmente casos de almacenamiento con:

- Clave inexistente.
- JSON inválido.
- Array válido vacío.
- Array con registros válidos e inválidos.
- Array con todos sus registros válidos.
Verificá que los registros válidos no se pierdan cuando existen registros inválidos en el mismo array.

**Suite 3 — Exportar y compartir:**

- `getFavoriteContents()`
- `formatFavoritesAsText()`
- `createFavoritesLink()`
- `runSharingFlow()`
Comprobá exportación en texto, generación de enlace simulado, lista vacía, formato inválido y reintento de selección.

**Suite 4 — Calificación de contenidos vistos:**

- `validateRating()`
- `getUnratedWatchedContents()`
- `rateWatchedContent()`
- `runRatingFlow()`
Comprobá:

- Calificaciones válidas de 1 a 5.
- Valores inválidos: 0, negativos, mayores que 5, decimales y strings vacíos.
- Contenidos vistos sin calificación.
- Contenidos pendientes que no deben poder calificarse.
- Actualización correcta de la calificación.
- Inmutabilidad de la biblioteca.
- Cancelaciones y reintentos ante valores inválidos.

### 3. Cobertura y calidad de las pruebas
Cada suite debe contemplar, según corresponda:

- Happy path: funcionamiento normal.
- Casos borde y valores límite.
- Validación de errores y datos inválidos.
- Operaciones con arrays y objetos.
- Comprobación de valores de retorno.
- Inmutabilidad cuando corresponda.
Utilizá assertions apropiadas de Jasmine:

- `expect().toBe()`
- `expect().toEqual()`
- `expect().toBeTruthy()`
- `expect().toBeFalsy()`
- `expect().toContain()`
- `expect().toBeNull()`
- `expect().toThrow()` cuando corresponda.

### 4. Independencia de los tests
Cada prueba debe ser independiente.

- Utilizá fixtures propios para catálogos y bibliotecas.
- No dependas de los datos modificados por otras pruebas.
- No utilices el localStorage real del navegador.
- Cuando pruebes funciones de interacción, inyectá mocks de `promptFunction` y `alertFunction`.
- Cuando pruebes persistencia, utilizá un objeto de almacenamiento simulado que implemente `getItem()` y `setItem()`.
- Evitá que se abran diálogos reales del navegador durante la ejecución.
Prestá especial atención a las funciones que reciben `options`, como `runFavoritesFlow()`, `runSharingFlow()` y `runRatingFlow()`. Verificá sus firmas reales en `script.js` antes de escribir cada test.

### 5. Restricciones

- Crear únicamente `js/test/script.spec.js`.
- No modificar `js/script.js`.
- No modificar `index.html`.
- No crear todavía `script.spec.js`.
- No modificar `testing-doc.md` ni `spec-tester.md`.
- No agregar manipulación del DOM ni eventos al código de producción.
- No inventar funciones que no existan en `script.js`.
- No escribir expectativas que contradigan el comportamiento real de la implementación.
Si encontrás un posible defecto en el código de producción, informalo separadamente. No modifiques el código ni adaptes un test para ocultar un defecto real.

### 6. Resultado esperado
Al finalizar, entregá:

1. El archivo `js/test/script.spec.js`.
2. Un resumen de las cuatro suites creadas.
3. La cantidad de tests incluidos en cada suite.
4. Los nombres de las funciones cubiertas.
5. Cualquier limitación o posible defecto identificado.
Todavía no ejecutes Playwright ni declares que las pruebas pasaron. La ejecución real se realizará posteriormente mediante el navegador y Playwright MCP.
```

#### Instrucciones posteriores de corrección

La instrucción de corrección posterior a la revisión técnica se recuperó literalmente de la conversación:

```text
Actuá como un Senior QA Engineer especializado en Jasmine 5.10.0.

Necesito corregir el archivo `js/test/script.spec.js` según los hallazgos del último Code Review.

El informe concluyó NEEDS CORRECTIONS por problemas de aislamiento del almacenamiento y cobertura incompleta de los flujos de búsqueda y favoritos.

### 1. Corregir el aislamiento del almacenamiento
En las pruebas de `runSharingFlow()` identificadas en las líneas 332, 349, 370 y 397, y en la prueba de `runRatingFlow()` de la línea 513, se omite la propiedad `storage`.

Esto provoca que `resolveStorage()` pueda acceder al `localStorage` global del navegador, aunque las pruebas ya proporcionen una biblioteca mediante `library`.

Corregí esas llamadas inyectando almacenamiento simulado, utilizando el helper existente `createSpecStorage(null)` si su implementación y firma son compatibles.

Revisá también todas las llamadas de pruebas a funciones que utilicen `resolveStorage()`, incluyendo `runFavoritesFlow()` y `startApp()` si aparecen en el archivo.

**Objetivo:** ninguna prueba debe depender ni acceder al `localStorage` real del navegador.

No dupliques helpers si ya existe uno que cumple esta función.

### 2. Completar la cobertura de interacción de búsqueda
Actualmente se prueban las funciones auxiliares, pero falta probar `runSearchFlow()`.

Agregá tests independientes que cubran:

- Cancelación del usuario en la primera entrada del título y mensaje de cancelación.
- Una búsqueda inicial seguida de una segunda búsqueda al responder afirmativamente que desea cambiar los criterios.
- Finalización correcta cuando responde negativamente que no desea repetir la búsqueda.
- Cancelación durante una repetición, si corresponde al comportamiento real de la función.
Utilizá mocks de `promptFunction` y `alertFunction`, simulando secuencialmente las respuestas del usuario.

Comprobá los mensajes y resultados esperados según la implementación real de `script.js`.

### 3. Completar la cobertura de interacción de favoritos
Actualmente existe una prueba de `runFavoritesFlow()` que confirma una adición, pero faltan ramas de interacción.

Agregá tests independientes que cubran:

- Confirmar la eliminación de un favorito existente y verificar que se actualice la biblioteca simulada.
- Cancelar la confirmación de una adición y comprobar que no se guarden cambios.
- Cancelar la confirmación de una eliminación y comprobar que el favorito se conserve.
Utilizá mocks de `promptFunction` y `alertFunction`, así como almacenamiento simulado.

Verificá que los argumentos, secuencias de prompts y resultados coincidan con el comportamiento real de `runFavoritesFlow()`.

### 4. Reglas de calidad

- Conservar las cuatro suites principales.
- Mantener como mínimo tres tests por suite.
- Los tests nuevos deben ser independientes.
- No utilizar `localStorage` real.
- No abrir diálogos reales del navegador.
- No modificar las pruebas que ya son correctas.
- No reducir la cobertura existente.
- Utilizar assertions de Jasmine apropiadas.
- No escribir tests que oculten defectos reales del código de producción.

### 5. Restricciones
Modificar únicamente `js/test/script.spec.js`.

No modificar:

- `js/script.js`
- `js/test/test-runner.html`
- `js/test/testing-doc.md`
- `docs/03-specs/actividad-obligatoria-3/spec-tester.md`
- `index.html`
No generar commits, no hacer push y no ejecutar Git.

Todavía no ejecutes Jasmine ni Playwright.

### 6. Resultado esperado
Al finalizar:

1. Informá cuántas suites y tests contiene el archivo.
2. Indicá cuántos tests nuevos agregaste.
3. Explicá cómo corregiste el aislamiento del almacenamiento.
4. Detallá los escenarios nuevos de búsqueda y favoritos.
5. Ejecutá únicamente `node --check js/test/script.spec.js` para comprobar la sintaxis.
6. Informá cualquier problema que no hayas podido resolver.
No declares que los tests pasan: todavía falta ejecutarlos con Jasmine en el navegador.
```

No se registraron otros prompts exactos de corrección.

#### Herramientas utilizadas

- GitHub Copilot Agent Mode para generar y revisar las suites de `js/test/script.spec.js`.
- Jasmine 5.10.0 mediante CDN, integrado en `js/test/test-runner.html`.
- Playwright MCP para abrir el runner en un navegador real, verificar el reporte y guardar las capturas.
- Servidor local iniciado con `python -m http.server 8000`; URL probada: `http://localhost:8000/js/test/test-runner.html`.

#### Resultados de Jasmine

| Suite | Tests ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| Búsqueda y filtrado de contenidos | 9 | 9 | 0 |
| Gestión de lista personal (favoritos) | 12 | 12 | 0 |
| Exportar y compartir lista personal | 6 | 6 | 0 |
| Calificación de contenidos vistos | 6 | 6 | 0 |
| **Total** | **33** | **33** | **0** |

Jasmine confirmó 4 suites, 33 specs ejecutados, 33 aprobados y 0 fallidos.

#### Capturas

- Resumen general: [`js/test/screenshots/tests-passing.png`](../../../js/test/screenshots/tests-passing.png)
- Detalle de las suites: [`js/test/screenshots/suite-detail.png`](../../../js/test/screenshots/suite-detail.png)

Las dos capturas están guardadas en la carpeta del proyecto y listas para incluirse en la PR de Tester. Corresponden a la ejecución real del runner mediante Playwright MCP; todavía no se afirma que estén publicadas en GitHub.

#### Ajustes realizados en los tests

- **Copilot:** generó la primera versión de los specs. Después de la revisión técnica, aplicó las correcciones solicitadas: inyectó almacenamiento simulado en los flujos que podían resolver el almacenamiento global, agregó cobertura de `runSearchFlow()` para cancelaciones, repetición y finalización, y amplió `runFavoritesFlow()` con confirmaciones/cancelaciones de altas y bajas.
- **Ajustes manuales del Tester:** no hay modificaciones manuales de código registradas en el historial disponible. La revisión técnica definió los cambios necesarios y Copilot los aplicó a pedido.

#### Bugs e Issues

No se detectaron tests fallidos ni bugs que requirieran crear nuevas Issues durante la ejecución. Se observó un único 404 no bloqueante al buscar `http://localhost:8000/favicon.ico`; Jasmine, `script.js` y `script.spec.js` cargaron correctamente, no se observaron errores de JavaScript y no se abrieron prompts reales.

La Issue de trabajo del rol Tester **#68** no representa una Issue de bug. No se crearon Issues de bugs como resultado de esta ejecución.

#### Coordinación y cierre

Los tests fueron contrastados con las firmas y el comportamiento implementado en `js/script.js`. La revisión señaló inicialmente omisiones de aislamiento y cobertura; se incorporaron las correcciones y luego se ejecutó el conjunto real en el navegador.

Los criterios de aceptación de la sección BEFORE se consideran respaldados por la ejecución y las evidencias descritas arriba, excepto cualquier requisito de commit, que no forma parte de este cierre documental.