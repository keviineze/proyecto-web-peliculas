# Spec DevOps - Primer Parcial

## 1. Planificación Previa

### Correcciones de la Actividad N°2 a integrar
Se resolvieron los Request Changes mediante ramas `fix/` contra la release anterior. Estas correcciones abarcaron la reparación de anclajes rotos, ajustes en reglas CSS para imágenes verticales, eliminación de enlaces inexistentes y actualización de la documentación para garantizar congruencia con la maqueta final. Todo esto fue integrado en `develop` mediante un backport.

### Cambios a incorporar en el Mockup
El diseño se migrará para reflejar la utilización de Bootstrap. Se ajustará la estructura visual basándose en una grilla de 12 columnas. Además, se adaptarán los componentes actuales a sus equivalentes de Bootstrap (Navbar, Cards, Botones) y se incorporarán componentes avanzados requeridos (como un Carrusel o un Modal), adaptando la paleta de colores y la tipografía a las clases nativas del framework.

### Criterios de aceptación (Checklist)
- [x] Mockup actualizado en Figma reflejando la grilla y los componentes de Bootstrap.
- [x] Exportación del mockup en `docs/01-mockup/disenio-bootstrap.png`.
- [x] Enlace de Figma actualizado correctamente en `README.md`.
- [ ] Ejecución de al menos 4 Code Reviews asistidos con Copilot Agent Mode sobre las PRs del equipo.

## 2. Al cerrar la tarea

### Registro de Code Reviews

1. **PR #49 (Preparación de entorno- #49)**
   - **Revisor:** @Davidsoria99
   - **Prompt utilizado:**
     > Actúa como Senior Software Engineer realizando un code review profesional. Analiza los cambios de la Pull Request activa comparando la rama actual con develop. Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados y publicar los hallazgos. CRÍTICO PARA ESTE SPRINT: Verifica si el código HTML utiliza correctamente el sistema de columnas y clases de Bootstrap, y evalúa si la implementación visual y los overrides de CSS son coherentes con la imagen de referencia `docs/01-mockup/disenio-bootstrap.png`.
   - **Resumen de hallazgos:** Se publicaron 3 hallazgos mediante comentarios en línea evaluando la referencia del mockup (carrusel/grilla), errores de legibilidad en el README, y la falta de actualización de los checkboxes de tareas en el spec-devops.
   - **Acción tomada:** Se dejó como "Comment" debido a ser una PR propia y se corrigieron los hallazgos.

   2. **PR #51 (Migración Frontend a Bootstrap)**
   - **Revisor:** @Davidsoria99
   - **Prompt utilizado:**
     > Actúa como Senior Software Engineer realizando un code review profesional. Analiza los cambios de la Pull Request activa comparando la rama actual con develop. Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados y publicar los hallazgos. CRÍTICO PARA ESTE SPRINT: Verifica si el código HTML utiliza correctamente el sistema de columnas y clases de Bootstrap, y evalúa si la implementación visual y los overrides de CSS son coherentes con la imagen de referencia `docs/01-mockup/disenio-bootstrap.png`.
   - **Resumen de hallazgos:** La IA logró detectar bugs funcionales (pérdida de IDs en las tarjetas, lo que rompía los anclajes internos) y errores en la documentación del QA Tester (discrepancias en resoluciones y tablas).
   - **Acción tomada:** Se publicaron los hallazgos solicitando cambios (Request Changes). Tras una segunda revisión validando los nuevos commits, se aprobó (Approve) y se mergeó a `develop`.

3. **PR #53 (Componentes Bootstrap - Navbar y Carrusel)**
   - **Revisor:** @Davidsoria99
   - **Prompt utilizado:**
     > Actúa como Senior Software Engineer realizando un code review profesional. Analiza los cambios de la Pull Request activa comparando la rama actual con develop. Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados y publicar los hallazgos. CRÍTICO PARA ESTE SPRINT: Verifica si el código HTML utiliza correctamente el sistema de columnas y clases de Bootstrap, y evalúa si la implementación visual y los overrides de CSS son coherentes con la imagen de referencia `docs/01-mockup/disenio-bootstrap.png`.
   - **Resumen de hallazgos:** La IA detectó discrepancias visuales graves contra el mockup (omisión del enlace "Mi Lista", enlaces del Navbar mal distribuidos, flechas del Carrusel superpuestas), un problema de accesibilidad (foco del teclado invisible en los controles), y capturas de QA desactualizadas.
   - **Acción tomada:** Se documentaron los hallazgos de forma manual debido a un fallo temporal de publicación automática de la herramienta MCP. Se solicitaron cambios (Request Changes), bloqueando la integración en espera de las correcciones y la resolución de conflictos.

   4. **PR #57 (Componentes HTML Avanzados - Range y Details)**
   - **Revisor:** @Davidsoria99
   - **Prompt utilizado:**
     > Actúa como Senior Software Engineer realizando un code review profesional. Analiza los cambios de la Pull Request activa comparando la rama actual con develop. Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados y publicar los hallazgos. CRÍTICO PARA ESTE SPRINT: Verifica si el desarrollador implementó correctamente los componentes HTML avanzados solicitados (`<input type="range">` para el sistema de calificación y la estructura `<details>` con `<summary>` para la ficha técnica). Evalúa si se aplicaron adecuadamente las clases de Bootstrap para su integración y si la implementación visual, junto con los overrides de CSS, son coherentes con la imagen de referencia `docs/01-mockup/disenio-bootstrap.png`.
   - **Resumen de hallazgos:** La IA detectó un bug de severidad media en el catálogo de películas: se insertó un elemento `<details>` duplicado y sin cerrar en la tarjeta de "Interstellar", sobrescribiendo incorrectamente sus metadatos (duración y estado) con los de otra película ("El viaje de Chihiro"). 
   - **Acción tomada:** Se publicó el hallazgo bloqueando la PR para exigir la restauración de los datos originales y corregir el anidamiento HTML. Una vez que el desarrollador subió los commits con las correcciones, se reevaluó el código, se aprobó y se mergeó exitosamente a `develop`.