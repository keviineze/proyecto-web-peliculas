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
- [ ] Correcciones de la Actividad Obligatoria N°3 aplicadas satisfactoriamente.
- [ ] Backport realizado desde la release aprobada hacia la rama `develop`.
- [ ] ≥4 code reviews documentados e iterados con el estado `CHANGES_REQUESTED` sobre las PRs de los integrantes.
- [ ] Despliegue de GitHub Pages configurado, actualizado y activo para la rama de la cuarta entrega.
- [ ] Release final generada en GitHub bajo el tag correspondiente (`v1.2-cuarta-entrega`).