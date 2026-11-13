# Spec - Tester QA

## MOMENTO 1: ANTES de escribir cualquier test

### 1. Plan de Testing
Se desarrollarán y refactorizarán las siguientes suites de pruebas para garantizar la calidad del software tras la migración a POO y Storage:
- **POO Models (`js/test/models.spec.js`):**
  - *Happy path:* Instanciación correcta de clases, ejecución de métodos de negocio con parámetros válidos, correcta serialización/deserialización (`toJSON`/`fromJSON`).
  - *Edge cases y Errores:* Validaciones internas al instanciar con datos faltantes o tipos de datos inválidos.
- **Storage (`js/test/storage.spec.js`):**
  - *Happy path:* Operaciones CRUD (guardar, obtener, actualizar, eliminar) exitosas usando `localStorage` y `sessionStorage`.
  - *Edge cases y Errores:* Manejo de almacenamiento lleno, peticiones a claves inexistentes, intento de parseo de datos corruptos.
- **Refactor de `js/test/script.spec.js`:** Adaptar las pruebas existentes para alinearlas a la nueva arquitectura orientada a objetos.

### 2. Herramientas a utilizar
- **GitHub Copilot Agent Mode:** Se utilizará para la generación rápida de los test suites (`models.spec.js` y `storage.spec.js`), entregándole como contexto el código fuente de las clases y del módulo de storage generados por los desarrolladores.
- **Playwright MCP (@playwright/mcp):** Se utilizará para la ejecución automatizada de los tests abriendo `test-runner.html` en un entorno de navegador real, permitiendo capturar evidencia visual (screenshots) de los resultados de Jasmine de forma transparente.

### 3. Criterios de Aceptación (Checklist)
- [ ] Suites de tests creadas para modelos POO y capa de storage.
- [ ] Refactorización completa de los tests preexistentes.
- [ ] Tests ejecutados en `test-runner.html` vía Playwright MCP.
- [ ] Screenshots del test runner capturados mostrando los resultados (PASS/FAIL).
- [ ] Bugs encontrados reportados como Issues en GitHub (con pasos para reproducir, etiqueta correspondiente y test case que falla).