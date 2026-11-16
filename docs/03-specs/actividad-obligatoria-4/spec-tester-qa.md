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
- [ ] El spec BEFORE está commiteado antes de escribir los tests.
- [ ] Las suites (`models.spec.js`, `storage.spec.js`, `script.spec.js`) validan el comportamiento esperado, incluyendo POO, DOM y Storage.
- [ ] Se documenta la ejecución vía Playwright MCP con capturas de pantalla (PASS/FAIL).
- [ ] Se reportan los bugs encontrados siguiendo el formato completo descrito en la sección 3.
- [ ] Se actualiza el archivo `js/test/testing-doc.md` con las métricas, instrucciones, detalle de las suites y enlaces a las evidencias.

---

## MOMENTO 2: AT CLOSE (Después de la ejecución)
*(Esta sección se completará una vez que los desarrolladores entreguen su código y se ejecuten las pruebas)*

### Evidencias de Generación (Copilot Agent Mode)
- **Prompt utilizado:**
```text
(Pendiente de ejecución)
 ```

- **Fragmento generado y ajustes manuales:**
(Pendiente de documentar)

### Resultados de Ejecución y Coordinación
- Métricas (PASS/FAIL): (Pendiente)
- Capturas adjuntas: (Pendiente)
- Bugs/Errores encontrados: (Pendiente de indicar si hubo o "Ninguno")
- Coordinación con desarrolladores (Feedback por rol):
  - Desarrollador POO: (Pendiente)
  - Desarrollador Storage: (Pendiente)
  - Desarrollador Eventos/DOM: (Pendiente)