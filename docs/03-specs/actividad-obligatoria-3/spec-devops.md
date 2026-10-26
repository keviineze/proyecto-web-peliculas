# Spec — Coordinador / DevOps

## 1. Datos de la tarea

- **Proyecto:** Mini Letterboxd Front End
- **Actividad:** Actividad Obligatoria N.º 3
- **Responsable:** Kevin Ezequiel Sosa
- **Rol:** Coordinador / DevOps
- **Rama:** `feature/coord-devops-tercera-entrega`
- **Rama destino:** `develop`
- **Repositorio:** [keviineze/proyecto-web-peliculas](https://github.com/keviineze/proyecto-web-peliculas)

## 2. Momento 1 — BEFORE: Plan de coordinación

### 2.1 Objetivo

Coordinar la integración de la Actividad Obligatoria N.º 3, mantener la calidad técnica y documental del proyecto, revisar los aportes de los integrantes y asegurar que las entregas respeten la consigna, `plan.md`, el mockup aprobado y el modelo de ramas Git establecido.

Esta tarea comienza sobre la rama `develop`, después del backport de las correcciones del Primer Parcial. Las correcciones pendientes de la rama `release/primer-parcial` se gestionan por separado, siguiendo el procedimiento de ramas `fix/` indicado en la consigna.

### 2.2 Plan de coordinación e integración

Las PR se revisarán e integrarán en este orden general:

1. **Preparación y especificaciones:** verificar que cada integrante haya creado y commiteado el spec de su rol antes de comenzar su implementación.
2. **Arquitectura de diagramas:** revisar la PR `feature/arq-diagramas-actividades`, contrastando los cuatro diagramas con `plan.md`, `index.html` y el mockup vigente.
3. **Desarrollo JavaScript:** revisar la PR `feature/dev-javascript-logica-negocio` y comprobar que los cuatro flujos implementados sean coherentes con los diagramas y que la lógica pueda probarse sin manipular el DOM.
4. **Testing JavaScript:** revisar la PR `feature/tester-javascript-jasmine`, verificando las suites Jasmine, la ejecución del test runner y las evidencias de Playwright MCP.
5. **Integración en develop:** integrar cada PR únicamente cuando haya sido revisada, resuelta la retroalimentación correspondiente y se cumplan los criterios de aceptación.
6. **Release de entrega:** crear `release/tercera-entrega` desde `develop`, verificar documentación, pruebas, GitHub Pages y changelog, y preparar la PR final hacia `master` para revisión del docente.

La secuencia se ajustará si aparecen dependencias o correcciones necesarias entre los integrantes. No se integrarán cambios que presenten defectos críticos pendientes.

### 2.3 Herramientas

- **Git y GitHub:** gestión de ramas, commits, Issues, PR y revisiones.
- **GitHub Copilot en Agent Mode:** apoyo para revisar el diff de cada PR, contrastar el código JavaScript con `plan.md`, los diagramas y el mockup, identificar defectos y redactar observaciones concretas.
- **GitHub Projects:** seguimiento de Issues y estado de las tareas.
- **GitHub Pages:** publicación y verificación de la versión correspondiente a la release.
- **VS Code:** inspección del código, documentación y resolución de conflictos.

Copilot se utilizará como apoyo a la revisión, no como sustituto de la evaluación técnica. Las observaciones se verificarán contra el código y la consigna antes de registrar una solicitud de cambios.

### 2.4 Criterios de aceptación

#### Correcciones del Primer Parcial

- [ ] Revisar y resolver los Request Changes asignados a la release del Primer Parcial.
- [ ] Crear las ramas `fix/` desde `release/primer-parcial`, según la consigna.
- [ ] Abrir las PR de corrección hacia `release/primer-parcial`.
- [ ] Registrar cada corrección bajo `### Fixed` en `changelog.md`, con su enlace a la PR.
- [ ] Comunicar al docente el estado de las correcciones en el hilo de Slack.

#### Coordinación de la Actividad N.º 3

- [ ] Mantener actualizados `README.md`, `plan.md` y `changelog.md` según corresponda.
- [ ] Verificar que cada rol tenga su spec commiteado antes de implementar.
- [ ] Realizar al menos cuatro code reviews asistidos por Copilot Agent Mode sobre PR de otros integrantes.
- [ ] Documentar los prompts exactos utilizados, el contexto adjuntado y los resultados de cada revisión.
- [ ] Registrar los `CHANGES_REQUESTED` relevantes con referencias a archivos y líneas del diff.
- [ ] Coordinar la resolución de defectos y conflictos antes de integrar las PR.
- [ ] Mantener el tablero Kanban de GitHub Projects actualizado con Issues y estados verificables.
- [ ] Verificar la publicación de GitHub Pages para `release/tercera-entrega`.
- [ ] Crear `release/tercera-entrega` desde `develop` cuando la integración esté completa.
- [ ] Preparar la PR final de release hacia `master` y comunicar sus enlaces en Slack y el campus.
- [ ] Crear el tag y la GitHub Release `v1.1-tercera-entrega` después de que la entrega haya sido aprobada y mergeada en `master`.
- [ ] Coordinar la limpieza final de ramas, conservando las ramas requeridas por la consigna.
- [ ] Verificar la navegación entre los índices de documentación, en particular `docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md` y `js/test/testing-doc.md`.

### 2.5 Alcance y dependencias

Las revisiones de código se realizarán cuando las PR de los demás integrantes estén disponibles. Los resultados, cambios solicitados, resoluciones y evidencias se registrarán en el cierre de este spec; no se consideran completados por el solo hecho de estar planificados.

### 2.6 Cierre de la tarea — AT CLOSE

**Se completará al finalizar las tareas de coordinación.**

- Prompts exactos utilizados en cada code review.
- Archivos del diff y documentación adjuntados como contexto.
- Resumen de qué se validó en cada PR.
- Solicitudes `CHANGES_REQUESTED` registradas y referencias al diff.
- Resultado de las correcciones y nueva revisión de los cambios.
- Obstáculos de integración encontrados y su resolución.
- Evidencia de GitHub Pages, release, tag, tablero Kanban y actualización documental.

No se registrarán como realizados los pasos que aún no cuenten con evidencia verificable.
