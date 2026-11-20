# Spec - Coordinador / DevOps

## MOMENTO 1: ANTES de comenzar las tareas de coordinación

### 1. Plan de Coordinación
Para esta Cuarta Entrega, se espera la recepción y revisión de las siguientes Pull Requests (PRs) orientadas a la rama `develop`, las cuales se integrarán en el siguiente orden estratégico para garantizar la integridad de la arquitectura:

1. **`feature/dev-poo-logica-negocio`**: Se integrará en primer lugar, ya que establece las clases del dominio (modelos) y la lógica estructural sobre la cual operarán los demás módulos.
2. **`feature/dev-storage`**: Se integrará en segundo lugar. Depende de la estructura de las clases POO para poder implementar la persistencia y la serialización/deserialización de los objetos.
3. **`feature/dev-eventos-dom`**: Se integrará al final. El controlador de la interfaz (UI) requiere que tanto la lógica de negocio como la capa de persistencia ya estén definidas en la rama base para poder orquestar la aplicación.

**Criterios técnicos de aprobación para las PRs:**
* Erradicación absoluta de funciones bloqueantes (`prompt()` y `alert()`).
* Estricta separación de responsabilidades: el archivo `script.js` debe actuar únicamente como controlador (eventos y DOM), sin alojar lógica de negocio.
* Correcto encapsulamiento en las clases POO implementadas en `/js/models/`.
* Implementación de manejo de errores (bloques `try-catch`) en las operaciones CRUD del Storage.
* Consola del navegador limpia de errores críticos y dependencias correctamente referenciadas en el `index.html`.

### 2. Herramientas a utilizar
**GitHub Copilot Agent Mode (Asistencia en Code Reviews):**
Se utilizará Copilot Agent como herramienta analítica durante la revisión de código de las PRs generadas por el equipo. Su uso se justifica por la capacidad del agente para procesar el `diff` de la PR junto con los archivos de contexto del proyecto (como los diagramas `.puml` y los archivos `.md` de especificaciones). Esto permitirá evaluar de forma automatizada si el código propuesto respeta la separación de responsabilidades, validar la ausencia de lógica de negocio en la capa de vista y garantizar que los flujos cumplan con la arquitectura planificada antes de autorizar el merge hacia `develop`.

### 3. Criterios de Aceptación (Checklist)
- [x] Correcciones de la Actividad Obligatoria N°3 aplicadas satisfactoriamente.
- [x] Backport realizado desde la release aprobada hacia la rama `develop`.
- [x] ≥4 code reviews documentados e iterados con el estado `CHANGES_REQUESTED` sobre las PRs de los integrantes.
- [ ] Despliegue de GitHub Pages configurado, actualizado y activo para la rama de la cuarta entrega.
- [ ] Release final generada en GitHub bajo el tag correspondiente (`v1.2-cuarta-entrega`).

## MOMENTO 2: AT CLOSE (Cierre de Sprint y Code Reviews)

### Evidencias de Code Reviews Asistidas por IA (Copilot Agent Mode)

**1. Revisión de Lógica de Negocio (POO) - PR #87**
- **Prompt utilizado:**
  ```text
  Actúa como Senior Software Engineer y Tech Lead realizando un code review profesional de la PR #87.

  CONTEXTO Y ACCIÓN:
  Analiza los cambios de la Pull Request #87 (rama `feature/dev-poo-logica-negocio` contra `develop`). Esta PR implementa la capa de Lógica de Negocio mediante Programación Orientada a Objetos (POO) con las clases Content, Catalog, LibraryEntry y Library.
  Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados (especialmente los archivos `.js` dentro de `js/models/`) y publicar los hallazgos.

  INSTRUCCIONES DE PUBLICACIÓN:
  No solo respondas en este chat.
  DEBES PUBLICAR cada hallazgo detectado directamente como un comentario de revisión en la Pull Request en GitHub utilizando las capacidades de GitKraken/GitLens.
  Si no puedes publicar directamente, indícame qué error recibes de las herramientas de MCP y genera el output aquí en formato Markdown.

  REGLAS DE ANÁLISIS ESPECÍFICAS PARA ESTA PR:
  Identifica problemas reales del código evaluando estrictamente los siguientes criterios arquitectónicos:
  1. Desacoplamiento (CRÍTICO): Las clases de los modelos NO deben contener manipulación del DOM (`document...`, `window...`) ni llamadas a la API de Storage (`localStorage`, `sessionStorage`).
  2. Encapsulamiento: Uso correcto de campos privados (prefijo `#`) y exposición controlada mediante getters/setters.
  3. Serialización: Correcta implementación y retorno de los métodos `toJSON()` y `fromJSON()` para reconstruir instancias.
  4. Validaciones: Presencia de validaciones de reglas de negocio al instanciar o modificar propiedades.
  No inventes problemas hipotéticos ni sugieras tests. Cada hallazgo debe ser independiente y real.

  ESTRUCTURA DE CADA COMENTARIO EN GITHUB:
  **HALLAZGO #<numero> - <Título descriptivo>**

  - Tipo de problema: (arquitectura | encapsulamiento | validación | bug | legibilidad)
  - Severidad: (baja | media | alta | crítica)
  - Archivo: <Ruta del archivo implicado>

  Explicación técnica: <Por qué esto es un problema real o rompe los principios POO del proyecto>

  Sugerencia de mejora: <Cambio concreto recomendable>

  Ejemplo de código corregido:
  [Fragmento de código]

  DECISIÓN DE REVISOR HUMANO:
  - [ ] Aceptar sugerencia
  - [ ] Rechazar sugerencia

- **Hallazgos detectados por la IA y reportados:**

RESUMEN GENERAL DE LA PR

La capa POO cumple los criterios arquitectónicos evaluados:

Las cuatro clases mantienen sus responsabilidades sin DOM, Storage API, eventos ni cuadros de interfaz.
Los campos internos utilizan #, con getters controlados y modificaciones mediante métodos validados.
toJSON() devuelve datos planos y fromJSON() reconstruye instancias reales de dominio.
Las reglas principales de catálogo y biblioteca están validadas en constructores y setters.
Las colecciones devueltas por Catalog y Library no exponen entradas internas mutables de manera directa; Library aplica además copias independientes en constructor y consultas.
No se detectaron hallazgos reales que requieran cambios en esta revisión.

DECISIÓN FINAL SUGERIDA: APPROVE.

**2. Revisión de Eventos + DOM - PR #89**
- **Prompt utilizado (Primera revisión):**
  ```text
  Actúa como Senior Software Engineer y Tech Lead realizando un code review profesional de la PR #89 (rama `feature/dev-eventos-dom` contra `develop`). Analiza `script.js`, `index.html`, `spec-dev-eventos-dom.md` y `changelog.md` usando GitKraken (MCP). Verifica eliminación de `prompt()`/`alert()`, separación de responsabilidades respecto a POO y `StorageAPI`, seguridad DOM y bugs reales. Publica los hallazgos directamente en GitHub.

- **Hallazgos detectados y estado:**
Primera revisión (REQUEST CHANGES): Se detectaron dos casos reales en js/script.js vinculados a pérdida/integridad de estado de la biblioteca y feedback incorrecto ante fallos de persistencia.

Iteración y re-revisión (APPROVE): El desarrollador aplicó el commit 84ed06b (fix: preservar biblioteca y distinguir errores de storage). Se realizó una segunda revisión asistida por Copilot verificando que ambos problemas quedaron resueltos sin introducir regresiones, aprobando la PR para su integración.

### Cierre de Integración y Despliegue
- **Orden de integración ejecutado:** `feature/dev-poo-logica-negocio` → `feature/dev-storage` → `feature/dev-eventos-dom` → `feature/tester-qa-specs`.
- **GitHub Pages:** (Pendiente de verificación final tras el último merge).
- **Release final:** Tag `v1.2-cuarta-entrega` (Pendiente de generación).