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

- [ ] El spec BEFORE está commiteado antes de escribir cualquier test o correr Lighthouse.
- [ ] `js/test/api.spec.js` completo: éxito, error HTTP, error de red y procesamiento con map/filter/reduce.
- [ ] `js/test/library.spec.js` completo: inicialización, configuración, funcionalidad principal y manejo de errores.
- [ ] Ambos specs cargados en `test-runner.html` y suite en verde (0 failures).
- [ ] `js/test/script.spec.js` y `js/test/models.spec.js` actualizados si corresponde, manteniendo la cobertura.
- [ ] `docs/04-testing/test-case-11-lighthouse-baseline.md` documentado con métricas, umbrales e issues.
- [ ] `docs/04-testing/test-case-12-lighthouse-post-fetch.md` con comparación contra baseline y análisis de impacto.
- [ ] `docs/04-testing/test-case-13-lighthouse-post-library.md` con comparación evolutiva y recomendaciones finales.
- [ ] Issues creadas para todos los problemas encontrados y asignadas a los roles correspondientes.
- [ ] `js/test/testing-doc.md` y `docs/04-testing/testing-doc.md` actualizados (con enlaces a los nuevos test cases).
- [ ] `changelog.md` actualizado con links a la PR y a las issues.
- [ ] PR `feature/tester-qa-js-testing-suite` → `develop` revisada y aprobada por el Coordinador/DevOps.

---

## MOMENTO 2: AL CERRAR la tarea (evidencia)

> ⏳ Pendiente: se completa al finalizar el testing. No se commitea hasta tener las evidencias.

### 1. Prompt exacto utilizado en Copilot Agent
```text
[Pendiente — prompt exacto, con los archivos adjuntados como contexto]
```

### 2. Resumen de resultados
- **Tests:** [Pendiente] specs PASS / [Pendiente] specs FAIL (Jasmine 5.10.0).
- **Lighthouse baseline (TC11):** [Pendiente] — captura en `docs/04-testing/screenshots/`.
- **Lighthouse post-fetch (TC12):** [Pendiente].
- **Lighthouse post-librería (TC13):** [Pendiente].

### 3. Issues reportadas
- **Cantidad:** [Pendiente].
- **Asignación y estado:** [Pendiente — issue #XX → rol, estado].

### 4. Ajustes manuales sobre tests generados por IA
- [Pendiente — detallar qué se corrigió a mano sobre el output de Copilot].

---

## Coordinación
- Con el **Desarrollador JS Asíncrono (Fetch & APIs):** definir los casos de test de `fetch` y validar la integración con el DOM.
- Con el **Desarrollador JS Librerías Externas:** validar inicialización, configuración y los dos puntos de integración.
- Con el **Coordinador/DevOps:** priorizar correcciones críticas y revisar la PR.

## Decisiones de trazabilidad
1. **Ruta de los nuevos test cases:** la consigna (sección 4.3 y rubro) los nombra como `/docs/03-testing/...`, pero la estructura de carpetas del parcial (sección 5.1) los ubica en `04-testing/` y el repositorio ya posee `docs/04-testing/` con `test-case-1..10`, `testing-doc.md` y `capturas/`. Se decidió ubicarlos en **`docs/04-testing/`** para mantener la estructura existente y los enlaces entre documentos. Queda constancia de la decisión (pendiente de confirmación docente).
2. **Umbrales de Lighthouse:** se adoptan **≥95** en las cuatro categorías según la sección 4.3 y el rubro, por sobre los valores de ejemplo de la plantilla (≥80 / ≥90 / ≥85 / ≥80).
3. **Base de la rama:** `develop` aún no tiene el backport de la Actividad Obligatoria N°4, por lo que la rama `feature/tester-qa-js-testing-suite` se creó desde `origin/release/cuarta-entrega`; se integrará `develop` en la rama antes de subir los cambios (proceso indicado en la consigna).
4. **Baseline (TC11):** al no existir todavía `develop` actualizado, se audita el estado actual publicado en GitHub Pages (rama `release/cuarta-entrega`) y se deja constancia en el test case.