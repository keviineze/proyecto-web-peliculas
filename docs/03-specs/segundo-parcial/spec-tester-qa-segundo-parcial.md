# Spec - Tester QA/JS - Testing Avanzado (Segundo Parcial)

**Rol:** Tester QA/JS - Testing Avanzado

**Rama:** `feature/tester-qa-js-testing-suite`

**Fecha de creación:** 2026-11-26

**Base de la rama:** `origin/release/cuarta-entrega`

---

## MOMENTO 1: ANTES de escribir cualquier test o correr Lighthouse (commitear primero)

### 1. Plan de testing funcional

#### 1.1 `js/test/api.spec.js` — funciones asíncronas (Fetch)

Cobertura mínima exigida: casos de éxito, error HTTP, error de red y procesamiento con map/filter/reduce.

- **Éxito**
  - `it("debe obtener datos exitosamente de la API")` → `fetchData()` resuelve con los datos parseados y definidos.
  - `it("debe devolver un array cuando la API responde una lista")` → valida la estructura de la respuesta.
  - `it("debe ocultar el estado de loading al finalizar correctamente")` → estados de carga consistentes (success).
- **Error HTTP**
  - `it("debe lanzar error cuando la API responde 404")` → error con mensaje que contiene `HTTP error` y el status correspondiente.
  - `it("debe lanzar error cuando la API responde 500")`.
  - `it("debe ocultar el loading y mostrar el estado de error")`.
- **Error de red**
  - `it("debe capturar el error de red cuando fetch() falla")` → sin respuesta del servidor (offline o endpoint inalcanzable), se captura la excepción.
  - `it("debe mantener la UI en estado de error sin dejar el loading activo")`.
- **Procesamiento con map/filter/reduce**
  - `it("debe transformar los datos crudos con map()")`.
  - `it("debe filtrar la colección con filter()")`.
  - `it("debe agregar o calcular valores con reduce()")` → totales, promedios o conteos.
  - `it("debe validar y sanitizar los datos recibidos de la API")`.
- **Integración (si aplica)**
  - `it("debe integrar los datos asíncronos con el DOM")`.
  - `it("debe coordinar con las clases POO / Storage cuando corresponde")`.

> Nota: los nombres exactos de módulos, funciones y estados se confirmarán con el Desarrollador JS Asíncrono contra `js/api/apiService.js` antes de escribir la suite. El plan sigue la estructura de ejemplo de la consigna (`ApiService.fetchData()` y `DataProcessor`) y se ajustará a la implementación real.

#### 1.2 `js/test/library.spec.js` — librería externa

Cobertura mínima exigida: inicialización, configuración, funcionalidad principal y errores.

- **Inicialización**
  - `it("debe disponer de la librería cargada vía CDN")`.
  - `it("debe inicializar el módulo wrapper sin errores de consola")`.
- **Configuración**
  - `it("debe aplicar las opciones configuradas según la documentación oficial")`.
- **Funcionalidad principal**
  - `it("debe ejecutar la funcionalidad principal en el primer punto de integración")`.
  - `it("debe ejecutar la funcionalidad principal en el segundo punto de integración")`.
- **Manejo de errores de la librería**
  - `it("debe manejar invocaciones con parámetros inválidos")`.
  - `it("debe degradar de forma controlada ante datos inválidos")`.
- **Interacción con otras partes del sistema**
  - `it("debe interactuar con el DOM y los eventos existentes")`.

> Nota: depende de la librería elegida por el Desarrollador JS Librerías Externas (todavía no definida); se ajustará una vez integrada.

#### 1.3 Actualización de suites existentes
- Revisar `js/test/script.spec.js` si el DOM o los eventos cambian con la integración de fetch/librería.
- Revisar `js/test/models.spec.js` si las clases POO son modificadas.
- Mantener la cobertura actual: **66 specs PASS, 0 failures** (Jasmine 5.10.0) al cierre de la AO4.
- Registrar `api.spec.js` y `library.spec.js` en `js/test/test-runner.html`.

### 2. Plan de auditorías Lighthouse

**Umbrales mínimos definidos (consigna 4.3 y rubro):**
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

| Test Case | Momento | Timing | Archivo |
|---|---|---|---|
| 11 | Baseline inicial | Ahora, antes de implementar nuevas funcionalidades | `docs/04-testing/test-case-11-lighthouse-baseline.md` |
| 12 | Post-fetch | Después de mergear `feature/dev-async-fetch-api` en develop | `docs/04-testing/test-case-12-lighthouse-post-fetch.md` |
| 13 | Post-librería | Después de mergear `feature/dev-libreria-externa-[nombre]` en develop | `docs/04-testing/test-case-13-lighthouse-post-library.md` |

- **URL testeada:** GitHub Pages del repositorio (verificar en Settings → Pages qué rama sirve).
- **Herramienta:** Chrome → DevTools → panel Lighthouse → "Generar informe"; capturas en `docs/04-testing/screenshots/`.
- **Comparaciones:** el TC12 compara contra el baseline; el TC13 compara contra el estado post-fetch (comparación evolutiva completa).
- Cada hallazgo por debajo del umbral genera una issue detallada, con asignación al rol correspondiente.

### 3. Herramientas a utilizar

- **Jasmine 5.10.0** (vendorizado en `js/test/vendor/`) — framework de tests.
- **GitHub Copilot Agent Mode** — generación de `api.spec.js` y `library.spec.js` usando como contexto el código fuente de `js/api/apiService.js`, la librería integrada y las suites existentes. Justificación: mantiene el estilo y el fixture del runner ya establecidos en el repositorio, acelera la redacción de los casos y deja trazabilidad del prompt (exigido en el momento AL CERRAR). Los tests generados se revisan y ajustan manualmente.
- **Playwright MCP (Chromium)** — ejecución de `test-runner.html` y captura de resultados PASS/FAIL.
- **Chrome Lighthouse** — auditorías de rendimiento, accesibilidad, buenas prácticas y SEO.

### 4. Criterios de Aceptación (Checklist)

- [x] El spec BEFORE está commiteado antes de escribir cualquier test o correr Lighthouse.
- [x] `js/test/api.spec.js` completo: éxito, error HTTP, error de red y procesamiento con map/filter/reduce.
- [x] `js/test/library.spec.js` completo: inicialización, configuración, funcionalidad principal y manejo de errores.
- [x] Ambos specs cargados en `test-runner.html` y suite en verde (0 failures) → **104 specs, 0 failures**.
- [x] `js/test/script.spec.js` y `js/test/models.spec.js` actualizados si corresponde, manteniendo la cobertura — no requirieron cambios: el Desarrollador ya los había adaptado en las PR #124/#125 y siguen en verde.
- [x] `docs/04-testing/test-case-11-lighthouse-baseline.md` documentado con métricas, umbrales e issues.
- [x] `docs/04-testing/test-case-12-lighthouse-post-fetch.md` con comparación contra baseline y análisis de impacto.
- [x] `docs/04-testing/test-case-13-lighthouse-post-library.md` con comparación evolutiva y recomendaciones finales.
- [x] Issues creadas para todos los problemas encontrados y asignadas a los roles correspondientes (4 del baseline #103–#106 + 2 nuevas del TC12/TC13: #126 y #127, ambas asignadas a @Davidsoria99).
- [x] `js/test/testing-doc.md` y `docs/04-testing/testing-doc.md` actualizados (con enlaces a los nuevos test cases).
- [x] `changelog.md` actualizado con links a la PR y a las issues (PR [#128](https://github.com/keviineze/proyecto-web-peliculas/pull/128), issues #102, #103–#106, #126 y #127).
- [ ] PR `feature/tester-qa-js-testing-suite` → `develop` revisada y aprobada por el Coordinador/DevOps.

---

## MOMENTO 2: AL CERRAR la tarea (evidencia)

### 1. Prompt exacto utilizado en Copilot Agent
```text
Actuás como asistente de testing QA del proyecto Mini Letterboxd (Programación Web I — Segundo Parcial).
Como contexto adjunto: js/api/apiService.js, js/utils/notifications.js, js/script.js, index.html,
js/test/test-runner.html, js/test/models.spec.js, js/test/storage.spec.js, js/test/script.spec.js y
docs/03-specs/segundo-parcial/spec-tester-qa-segundo-parcial.md.

Creá dos suites Jasmine 5.10.0 con el mismo estilo que las existentes (describe/it en español, funciones
clásicas, módulos ES con import, fixture del runner, sin dependencias nuevas):

1) /js/test/api.spec.js sobre ApiService: casos de éxito de fetchCatalog() (lista plana y payload envuelto en
   "catalog"), error HTTP (404, 500 y 403 con mensaje exacto), error de red (mensaje amigable y conservación de
   error.cause), payload inválido (TypeError), procesamiento con map/filter/reduce (processCollection,
   filterByCategory, calculateStats, deduplicado con reduce) e integración con el DOM (showLoading, hideLoading
   y showError con botón "Reintentar"). Mockear fetch con spyOn(window, "fetch") usando una respuesta simulada
   { ok, status, json }.

2) /js/test/library.spec.js sobre showToast() de js/utils/notifications.js (librería externa Toastify-js
   1.12.0): inicialización (verificar en index.html la carga vía CDN con defer, SRI integrity y
   crossorigin, más el CSS), configuración (duration 3500, gravity "top", position "right", close,
   stopOnFocus, escapeMarkup y acento de color por tipo), funcionalidad principal (el wrapper devuelve true y
   ejecuta el toast), manejo de errores (mensaje vacío o no string, librería ausente, librería que lanza
   excepción) e interacción con el sistema (toggle-favorite con window.Toastify instalado y sin instalar,
   manteniendo el feedback inline accesible).

Registrá ambos archivos en js/test/test-runner.html después de storage.spec.js y devolvé los dos archivos
completos, listos para pegar.
```

> **Herramienta:** GitHub Copilot Agent Mode (asistente de IA) con los archivos fuente adjuntos como contexto, según lo planificado en el Momento 1 (sección 3). Salida revisada y ajustada manualmente (sección 4).

### 2. Resumen de resultados
- **Tests:** **104 specs PASS / 0 specs FAIL** (Jasmine 5.10.0) — 66 specs preexistentes + 38 nuevos (25 en `api.spec.js`, 13 en `library.spec.js`). Captura: `js/test/capturas/captura-runner-104-specs.jpeg`.
- **Lighthouse baseline (TC11):** Performance **72** ❌ · Accessibility **96** ✅ · Best Practices **100** ✅ · SEO **100** ✅ — [test-case-11](../04-testing/test-case-11-lighthouse-baseline.md), capturas en `docs/04-testing/screenshots/lighthouse-baseline-*.png`.
- **Lighthouse post-fetch (TC12):** Performance **72** ❌ · Accessibility **96** ✅ · Best Practices **100** ✅ · SEO **100** ✅ — [test-case-12](../04-testing/test-case-12-lighthouse-post-fetch.md), capturas `lighthouse-post-fetch-*.png`.
- **Lighthouse post-librería (TC13):** Performance **70** ❌ · Accessibility **96** ✅ · Best Practices **100** ✅ · SEO **100** ✅ — [test-case-13](../04-testing/test-case-13-lighthouse-post-library.md), capturas `lighthouse-post-library-*.png`.

### 3. Issues reportadas
- **Cantidad:** 6 en total — 4 del baseline (TC11) + 2 nuevas de las auditorías post-integración (TC12/TC13).
- **Asignación y estado:**
  - [#103](https://github.com/keviineze/proyecto-web-peliculas/issues/103) → @GonzaloBarbano (imágenes/LCP) — cerrada el 2026-11-27 sin corrección verificable.
  - [#104](https://github.com/keviineze/proyecto-web-peliculas/issues/104) → @GonzaloBarbano (CLS 0.71) — cerrada el 2026-11-27, hallazgo persistente en TC12/TC13 (CLS 0.713).
  - [#105](https://github.com/keviineze/proyecto-web-peliculas/issues/105) → @GonzaloBarbano (render-blocking + CSS/JS sin usar) — cerrada el 2026-11-27, persistente (890 → 980 → 1.130 ms).
  - [#106](https://github.com/keviineze/proyecto-web-peliculas/issues/106) → @GonzaloBarbano (contraste) — cerrada el 2026-11-27, persistente (Accessibility 96 en los tres estados).
  - [#126](https://github.com/keviineze/proyecto-web-peliculas/issues/126) → @Davidsoria99 — JS agregado por fetch (63 KiB por minificar, 97 KiB sin usar, 2 tareas largas) — TC12.
  - [#127](https://github.com/keviineze/proyecto-web-peliculas/issues/127) → @Davidsoria99 — CSS de Toastify en render-blocking (+150 ms) — TC13.
- La issue de tarea [#102](https://github.com/keviineze/proyecto-web-peliculas/issues/102) fue reabierta el 2026-11-27 con comentario de trazabilidad (cerrada prematuramente por @GonzaloBarbano el mismo día).
- Las cuatro issues del baseline fueron cerradas por @GonzaloBarbano con motivo *"completed"* sin comentarios; se solicita reapertura o justificación ante el Coordinador/DevOps (documentado en TC11, TC12 y TC13).

### 4. Ajustes manuales sobre tests generados por IA
- **Adaptación a la implementación real:** los nombres del ejemplo de la consigna (`ApiService.fetchData()`, `DataProcessor.mapData()`) se sustituyeron por los métodos reales de David (`fetchCatalog()`, `processCollection()`, `filterByCategory()`, `calculateStats()`).
- **Mensajes de error:** se reemplazó el `expect(...).toContain('HTTP error')` del ejemplo por los mensajes reales en español (`No se pudo cargar el catálogo (404).`, `No se pudo conectar con el servidor del catálogo.`), verificados contra `js/api/apiService.js`.
- **Mock de fetch:** se implementó con `spyOn(window, "fetch").and.resolveTo(...)` / `.and.rejectWith(...)` sobre una respuesta simulada `{ ok, status, json }` en lugar de instanciar `Response`, para no depender de APIs del navegador.
- **Bloque de integración con DOM:** se agregó el grupo `integración con el DOM` (estados accesibles `role="status"`/`role="alert"` y botón "Reintentar"), que no figuraba en el ejemplo de la consigna pero sí en el plan del Momento 1.
- **library.spec.js:** como el runner no carga el CDN, se mockea `window.Toastify` con `jasmine.createSpy` (instalado en `beforeEach`, eliminado en `afterEach`) y se validó la etiqueta del CDN real con `fetch("index.html")` + regex sobre la etiqueta `<script>`.
- **Selección de selectores:** se usó `[data-action="toggle-favorite"]` en lugar de ids concretos, para no acoplarse al DOM que renderiza `script.spec.js`.
- **Orden en el runner:** `api.spec.js` y `library.spec.js` se registraron al final para no alterar el estado del DOM que consumen los specs de interfaz.
- **Verificación:** suite ejecutada en el navegador hasta dejar **104 specs, 0 failures**.

---

## Coordinación
- Con el **Desarrollador JS Asíncrono (Fetch & APIs):** definir los casos de test de `fetch` y validar la integración con el DOM.
- Con el **Desarrollador JS Librerías Externas:** validar inicialización, configuración y los dos puntos de integración.
- Con el **Coordinador/DevOps:** priorizar correcciones críticas y revisar la PR.

## Decisiones de trazabilidad
1. **Ruta de los nuevos test cases:** la consigna (sección 4.3 y rubro) los nombra como `/docs/03-testing/...`, pero la estructura de carpetas del parcial (sección 5.1) los ubica en `04-testing/` y el repositorio ya posee `docs/04-testing/` con `test-case-1..10`, `testing-doc.md` y `capturas/`. Se decidió ubicarlos en **`docs/04-testing/`** para mantener la estructura existente y los enlaces entre documentos. Queda constancia de la decisión (pendiente de confirmación docente).
2. **Umbrales de Lighthouse:** se adoptan **≥95** en las cuatro categorías según la sección 4.3 y el rubro, por sobre los valores de ejemplo de la plantilla (≥80 / ≥90 / ≥85 / ≥80).
3. **Base de la rama:** `develop` aún no tenía el backport de la Actividad Obligatoria N°4 al momento de crear la rama, por lo que `feature/tester-qa-js-testing-suite` se creó desde `origin/release/cuarta-entrega`. **Resuelto:** se ejecutó `git merge origin/develop` sobre la rama feature (commit `d7486c0`, sin conflictos), integrando las PR #124 (fetch) y #125 (librería) antes de subir los cambios, según indica la consigna.
4. **Baseline (TC11):** al no existir todavía `develop` actualizado, se audita el estado actual publicado en GitHub Pages (rama `release/cuarta-entrega`) y se deja constancia en el test case.
5. **URL de las auditorías post-integración (TC12/TC13):** GitHub Pages sigue publicando `release/cuarta-entrega` (sin las features del parcial), por lo que TC12 y TC13 se corrieron contra un servidor local: `http://localhost:8001/` con el estado exacto del merge de la PR #124 (commit `0f8d075`) y `http://localhost:8000/` con la rama feature ya mergeada con `develop`. Se mantuvieron idénticos máquina, Chrome 158, preset Mobile, versión de Lighthouse y red; solo cambia el origen de servicio. El caveat de *cache lifetimes* en `localhost` está documentado en ambos test cases.
6. **Asignación de issues:** al no contemplar el Segundo Parcial un rol de Frontend/CSS, las issues de hallazgos de UI/rendimiento se asignan a @GonzaloBarbano (Coordinador/DevOps) o a @Davidsoria99 según el rol responsable del cambio que originó el hallazgo (fetch o librería).