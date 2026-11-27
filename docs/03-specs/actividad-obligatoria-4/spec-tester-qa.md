# Spec - Tester QA Engineer

## MOMENTO 1: ANTES de escribir código (Planificación)

### 1. Alcance de Cobertura
Para garantizar la calidad de la nueva arquitectura, se desarrollarán pruebas para los siguientes módulos:
- **POO (Lógica de Negocio):** Se crearán suites específicas para validar las clases `Content`, `Catalog`, `LibraryEntry` y `Library`. Se evaluará:
  - Constructores y correcta instanciación.
  - Métodos de las clases y sus responsabilidades.
  - Validaciones internas, encapsulamiento y métodos de serialización/deserialización (`toJSON()` / `fromJSON()`).
- **Storage API:** Se creará `storage.spec.js` para validar las operaciones CRUD (guardar, obtener, actualizar, eliminar, listar, limpiar) y el manejo de errores (try-catch, storage lleno).
- **Eventos y DOM:** Se refactorizará `script.spec.js` para adaptarlo a la nueva arquitectura orientada a objetos.

### 2. Herramientas a utilizar
- **Jasmine:** Framework para la creación y ejecución de las suites de prueba.
- **GitHub Copilot Agent Mode:** Asistente para la generación de los tests basados en el código fuente de las clases y módulos.
- **Playwright MCP:** Herramienta para la ejecución automatizada de `test-runner.html` y captura de resultados.

### 3. Reporte de Bugs
Cualquier defecto encontrado durante la ejecución será reportado en GitHub Issues incluyendo obligatoriamente:
- Pasos para reproducir.
- Comportamiento esperado y comportamiento obtenido.
- Etiqueta de bug y test específico que falla.
- Asignación directa al rol responsable (Desarrollador JS POO, Eventos o Storage).

### 4. Criterios de Aceptación (Checklist)
- [x] El spec BEFORE está commiteado antes de escribir los tests.
- [x] Las suites (`models.spec.js`, `storage.spec.js`, `script.spec.js`) validan el comportamiento esperado, incluyendo POO, DOM y Storage.
- [x] Se documenta la ejecución con capturas de pantalla (PASS/FAIL).
- [x] Se reportan los bugs encontrados siguiendo el formato completo descrito en la sección 3 (sin bugs detectados en la ejecución final).
- [x] Se actualiza el archivo `js/test/testing-doc.md` con las métricas, instrucciones, detalle de las suites y enlaces a las evidencias.

---

## MOMENTO 2: AT CLOSE

### Evidencias de Generación
- **Prompt utilizado:**
  ```text
  Actúa como QA Automation Engineer especializado en Jasmine. Revisa la estructura actual del proyecto (`js/models/`, `js/utils/storage.js`, `js/script.js`, `index.html`, `js/test/` y `test-runner.html`). Crea `js/test/models.spec.js` (constructores, métodos, validaciones, encapsulamiento y `toJSON()`/`fromJSON()`), crea `js/test/storage.spec.js` (CRUD en `localStorage` y `sessionStorage`, JSON corrupto y `QuotaExceededError`), refactoriza `js/test/script.spec.js` para integración con el DOM y actualiza `test-runner.html` para cargar Jasmine y los módulos ES sin errores de consola.
  ```

- **Fragmento generado y ajustes manuales:**
Se generaron js/test/models.spec.js y js/test/storage.spec.js, se reemplazaron las pruebas antiguas en js/test/script.spec.js por pruebas de integración con el DOM, se actualizó js/test/test-runner.html con el fixture de interfaz y carga ordenada de módulos ES, y se actualizó js/test/testing-doc.md con las instrucciones y la evidencia de ejecución. Se verificó la ejecución mediante servidor HTTP local sin errores de consola.

- **Resultados de Ejecución y Coordinación**
- Métricas (PASS/FAIL): 66 specs, 0 failures (100% PASS) — Ejecución final en Chromium con Playwright MCP; 0 errores de consola y 0 excepciones de página.

- Capturas adjuntas:

  - [Resumen completo de todas las suites](../../../js/test/screenshots/captura-runner-completo.png)
  - [Ejecución enfocada en specs de modelos POO](../../../js/test/screenshots/captura-models-spec.png)
  - [Ejecución enfocada en specs de Storage](../../../js/test/screenshots/captura-storage-spec.png)
  - [Ejecución enfocada en specs de interfaz y DOM](../../../js/test/screenshots/captura-script-spec.png)

- Bugs/Errores encontrados: Ninguno. Todas las pruebas de POO (incluyendo flags y estados inválidos, catálogos y JSON parcialmente inválidos e IDs inexistentes), StorageAPI (incluyendo fallos simulados de acceso y actualización, JSON corrupto y QuotaExceededError) e integración DOM pasaron correctamente.

- **Coordinación con desarrolladores (Feedback por rol):**

  - Desarrollador POO: Validación exitosa de constructores, encapsulamiento, validaciones y serialización (toJSON/fromJSON) en Content, Catalog, LibraryEntry y Library.

  - Desarrollador Storage: Validación exitosa del CRUD completo en localStorage y sessionStorage, incluyendo manejo de JSON corrupto, fallos de serialización y QuotaExceededError.

  - Desarrollador Eventos/DOM: Validación exitosa de inicialización, búsqueda, filtros, favoritos, calificaciones, exportación y reversión visual ante fallos de persistencia.