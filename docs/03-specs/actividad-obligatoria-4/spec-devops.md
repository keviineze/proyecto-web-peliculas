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
- [ ] Backport realizado desde la release aprobada hacia la rama `develop`.
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

- **Archivos adjuntos como contexto:** `js/models/Content.js`, `js/models/Catalog.js`, `js/models/LibraryEntry.js`, `js/models/Library.js`, `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`.
- **Estado cargado:** `APPROVE` (no se cargó `CHANGES_REQUESTED` porque no se encontraron hallazgos reales que requirieran cambios).

| Archivo revisado | Alcance del diff | Estado |
| --- | --- | --- |
| `js/models/Content.js` | Constructor, campos privados `#`, validaciones y `toJSON`/`fromJSON` | APPROVE |
| `js/models/Catalog.js` | Encapsulamiento de colección, búsqueda/filtros y serialización | APPROVE |
| `js/models/LibraryEntry.js` | Validación de estado, favoritos, ratings y serialización | APPROVE |
| `js/models/Library.js` | Copias defensivas, gestión de entradas y reconstrucción desde JSON | APPROVE |

**2. Revisión de Eventos + DOM - PR #89**
- **Archivos adjuntos como contexto:** `js/script.js`, `index.html`, `docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md`, `changelog.md`.
- **Prompt utilizado:**
```text
Actúa como Senior Software Engineer y Tech Lead realizando un code review profesional de la PR #89.

CONTEXTO Y ACCIÓN:
Analiza los cambios de la Pull Request #89 (rama feature/dev-eventos-dom contra develop), correspondiente al rol de Desarrollador JS Eventos + DOM. Esta PR reemplaza el simulador por prompt()/alert() por una interfaz web interactiva en index.html y convierte a script.js en controlador de eventos y DOM integrado con las clases POO y StorageAPI.
Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados (script.js, index.html, docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md, changelog.md) y publicar los hallazgos.

INSTRUCCIONES DE PUBLICACIÓN:
No solo respondas en este chat.
DEBES PUBLICAR cada hallazgo detectado directamente como un comentario de revisión en la Pull Request en GitHub utilizando las capacidades de GitKraken/GitLens.
Si no puedes publicar directamente, indícame qué error recibes de las herramientas de MCP y genera el output aquí en formato Markdown.

REGLAS DE ANÁLISIS ESPECÍFICAS PARA ESTA PR:
Identifica problemas reales del código evaluando estrictamente:

Eliminación de código legacy: Verificar que no queden restos de prompt(), alert() o confirm() en el flujo principal.
Separación de responsabilidades (CRÍTICO): script.js debe actuar solo como controlador de UI/eventos. NO debe duplicar lógica de negocio que corresponde a js/models/ ni acceder directamente a localStorage/sessionStorage saltándose StorageAPI.
Seguridad y DOM: Uso seguro del DOM (prevenir XSS si inyecta strings de usuario con innerHTML), correcta delegación de eventos y manejo de estados vacíos o errores de entrada.
Bugs, performance y legibilidad: Errores reales en filtros, búsqueda en tiempo real, favoritos, calificaciones o exportación.
Documentación: Verificar que changelog.md no pise entradas anteriores y que spec-dev-eventos-dom.md esté completo.
No inventes problemas hipotéticos ni sugieras tests. Cada hallazgo debe ser independiente.
ESTRUCTURA DE CADA COMENTARIO EN GITHUB:
HALLAZGO #<numero> - <Título descriptivo>

Tipo de problema: (bug | performance | seguridad | legibilidad | diseño | otro)
Severidad: (baja | media | alta | crítica)
Archivo: <Ruta del archivo implicado>
Explicación técnica: <Por qué esto es un problema real>

Sugerencia de mejora: <Cambio concreto recomendable>

Ejemplo de código corregido:

// Código sugerido

**DECISIÓN DE REVISOR HUMANO:**

- [ ] Aceptar sugerencia
- [ ] Rechazar sugerencia
*(Justificación del revisor humano: )*
AL FINALIZAR:
Proporciona aquí en el chat un "RESUMEN GENERAL DE LA PR" con evaluación de riesgos y tu "DECISIÓN FINAL SUGERIDA (APPROVE / REQUEST CHANGES)".
```

- **Trazabilidad de hallazgos, iteración y estado:**

| Iteración | Archivo afectado | Hallazgo / Resultado | Estado cargado | Commit asociado |
| --- | --- | --- | --- | --- |
| 1ra revisión | `js/script.js` | Hallazgo 1: pérdida/integridad de estado de la biblioteca al actualizar entradas. | `CHANGES_REQUESTED` | Previo a `84ed06b` |
| 1ra revisión | `js/script.js` | Hallazgo 2: feedback incorrecto en interfaz ante fallos de persistencia en `StorageAPI`. | `CHANGES_REQUESTED` | Previo a `84ed06b` |
| Re-revisión | `js/script.js` | Ambos hallazgos resueltos sin introducir regresiones. | `APPROVE` | `84ed06b` (`fix: preservar biblioteca y distinguir errores de storage`) |


### Cierre de Integración y Despliegue
- **Orden de integración ejecutado:** `feature/dev-poo-logica-negocio` → `feature/dev-storage` → `feature/dev-eventos-dom` → `feature/tester-qa-specs`.
- **GitHub Pages:** (Pendiente de verificación final tras el último merge).
- **Release final:** Tag `v1.2-cuarta-entrega` (Pendiente de generación).

### Obstáculos de coordinación y resolución
- **Obstáculo 1 (Conflictos en `changelog.md`):** Al integrarse múltiples PRs en paralelo sobre `develop` (PR #89 y PR #90), se produjo un conflicto de merge en las primeras líneas de `changelog.md` junto con una entrada duplicada de la PR #84.
  - **Resolución:** Se resolvieron los conflictos manualmente conservando todas las entradas vigentes y eliminando el duplicado antes del merge.
- **Obstáculo 2 (Dependencia de contratos entre módulos):** La integración de Eventos/DOM dependía de los métodos definitivos de POO y del contrato de errores de `StorageAPI`, lo que derivó en los dos hallazgos detectados en la PR #89.
  - **Resolución:** Se aplicó el orden de integración secuencial planificado (`POO` → `Storage` → `Eventos/DOM`) y se iteró la revisión hasta validar la corrección en el commit `84ed06b`.