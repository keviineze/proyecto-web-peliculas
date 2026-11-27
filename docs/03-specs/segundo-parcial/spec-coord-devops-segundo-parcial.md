# Spec — Coordinador / DevOps — Segundo Parcial

## Datos de la tarea

- **Proyecto:** Mini Letterboxd
- **Actividad:** Segundo Parcial — asincronía, librerías y testing avanzado
- **Rol:** Coordinador / DevOps
- **Rama de trabajo:** `feature/coord-devops-segundo-parcial`
- **Rama destino:** `develop`
- **Issue:** pendiente de crear y vincular antes de comenzar la implementación
- **Plazo de correcciones:** hasta el 30 de noviembre a las 22:00 hs, según la consigna

## Momento 1 — BEFORE: planificación

> Esta planificación debe revisarse y commitearse antes de iniciar las tareas de coordinación e implementación. Los checks quedan pendientes hasta verificar la evidencia correspondiente.

### 1. Plan de coordinación e integración

La rama base de trabajo será `develop`, una vez integradas en ella las correcciones de la Actividad Obligatoria N.º 4 mediante el backport correspondiente. Cada integrante deberá abrir un Issue para su tarea, trabajar en una rama `feature/<rol>-<descripción>`, realizar al menos un commit relevante y dirigir su PR a `develop`.

Se esperan PRs para los siguientes aportes. Los nombres de las ramas son ejemplos de convención y deberán coincidir con las ramas que efectivamente abra el equipo:

| Orden | PR esperada | Alcance y dependencia |
| --- | --- | --- |
| 1 | `feature/dev-async-fetch` | Mover el catálogo a datos JSON y consumirlos con `fetch`/Promises. Definir el contrato de datos y estados de carga/error que utilizarán la interfaz y QA. Se recomienda `api/contenidos.json` para evitar claves, CORS y dependencia de disponibilidad de un servicio externo. |
| 2 | `feature/dev-libreria-js` | Integrar una librería JavaScript externa por CDN y justificar su uso. Se propone Toastify para notificaciones complementarias de éxito/error; los mensajes accesibles del DOM seguirán siendo la fuente principal de feedback. |
| 3 | `feature/tester-qa-segundo-parcial` | Añadir pruebas Jasmine de carga asíncrona con casos de éxito y error, integración de la librería y evidencias de Lighthouse antes/después de las integraciones. Depende de los contratos finales de las dos PR anteriores. |
| 4 | `feature/coord-devops-segundo-parcial` | Completar documentación y coordinación: actualizar `README.md`, `changelog.md`, enlaces a specs/evidencias y configuración/verificación de GitHub Pages. Integrar esta PR cuando los aportes funcionales y QA estén revisados. |

**Orden y reglas de integración:**

1. Verificar Issues, specs y ramas de cada rol antes de que comience su implementación.
2. Revisar e integrar primero la PR de asincronía, por establecer el formato de los datos, el uso de `fetch`, y los estados de carga y error.
3. Revisar e integrar la PR de librería sobre el contrato de interfaz ya acordado. La librería no deberá ocultar errores ni reemplazar los mensajes accesibles del DOM.
4. Integrar QA después de que ambas funcionalidades estén disponibles en `develop`; resolver y re-revisar los defectos antes de aceptar la PR.
5. Integrar la PR de coordinación/documentación una vez que los nombres de ramas, enlaces, comandos y resultados puedan confirmarse contra el estado real del proyecto.
6. Crear `release/segundo-parcial` desde `develop` cuando las PR estén integradas. Revisar allí la aplicación, la suite Jasmine, las auditorías, la documentación y GitHub Pages antes de abrir la PR de release hacia `master`.

El orden podrá ajustarse ante dependencias verificadas, pero no se integrará una PR con fallos críticos abiertos ni se presentarán como evidencia resultados todavía no ejecutados. El merge a `master` se hará únicamente luego del LGTM/aprobación docente.

**Criterios para aprobar las PR de desarrollo:**

- El catálogo se carga de forma asíncrona; se recorren/transforman colecciones con funciones de orden superior cuando corresponda.
- La interfaz representa estados de carga, éxito, vacío y error; el fallo de carga no deja la aplicación en un estado engañoso.
- La librería tiene una función observable, está cargada correctamente por CDN y no duplica innecesariamente código propio.
- Los mensajes importantes siguen disponibles en el DOM con semántica accesible; las notificaciones de la librería son complementarias.
- Jasmine cubre éxito y error de `fetch`, la integración de la librería y las regresiones relevantes.
- Las auditorías incluyen baseline y mediciones posteriores requeridas, con capturas/resultados reproducibles y performance mínimo de 95.
- El diff respeta la estructura del proyecto, no introduce errores de consola y documenta cambios en el `changelog.md`.

### 2. Plan para correcciones de la Actividad Obligatoria N.º 4

Antes de comenzar la nueva base de trabajo, se revisarán los Request Changes pendientes de `release/cuarta-entrega`. Las correcciones se implementarán mediante PRs `fix/` dirigidas a esa rama y se registrarán bajo `### Fixed` en `changelog.md`, con Issue y PR asociadas.

La release corregida deberá obtener LGTM/aprobación docente y mergearse a `master`. Luego se abrirá y completará el backport de `release/cuarta-entrega` hacia `develop`. Este backport es la condición de entrada para establecer la base del Segundo Parcial; no se dará por hecho hasta contar con enlaces y evidencia de los merges.

### 3. Plan de Fase 2 — recepción y asignación de Request Changes

Las correcciones de la revisión docente se recibirán en la PR `release/segundo-parcial` → `master`. Cada comentario accionable se registrará como Issue individual, enlazado al comentario de origen y a la PR de release, con estos datos: descripción reproducible, archivos/líneas afectados, prioridad, rol asignado, responsable, fecha objetivo, PR `fix/` y evidencia de validación.

**Prioridades:**

| Prioridad | Criterio | Tratamiento previsto |
| --- | --- | --- |
| **Crítico** | Impide usar o desplegar la aplicación, causa pérdida/corrupción de datos, expone un riesgo de seguridad, o incumple una condición obligatoria que bloquea la aprobación. | Atención inmediata; coordinación directa con el responsable y seguimiento hasta validar la solución. |
| **Alto** | Rompe una funcionalidad requerida, el flujo asíncrono, la librería, las pruebas obligatorias o una auditoría exigida, sin alternativa aceptable. | Resolver antes de abordar prioridades menores; verificar con pruebas específicas. |
| **Medio** | Defecto acotado que no bloquea la entrega, pero afecta un flujo secundario, documentación, accesibilidad o consistencia. | Asignar responsable y fecha; incluir en la próxima ronda de correcciones. |
| **Bajo** | Ajuste menor de presentación, redacción o mantenimiento que no altera requisitos ni bloquea el uso. | Resolver después de críticos/altos/medios, dentro del plazo disponible. |

**Asignación y ejecución:**

- Asignar cada Issue al rol con propiedad técnica sobre el área afectada; el Coordinador/DevOps mantiene la responsabilidad de seguimiento y cierre de todas las correcciones.
- Aplicar cada arreglo en una rama `fix/` creada desde `release/segundo-parcial`, abrir la PR hacia esa misma rama y registrar el cambio en `### Fixed` del changelog. Usar commits descriptivos que referencien la Issue o el comentario docente.
- Si se detectan baja participación, abandono o incumplimiento documentado, formalizar la reasignación en una Issue y en la PR de release: rol/persona original, nueva asignación, motivo, fecha y notificación al equipo. La reasignación no modifica el plazo general.
- Validar cada arreglo con el test, auditoría o comprobación de documentación que corresponda. Actualizar la Issue y responder/notificar al docente solo cuando todas las observaciones de la ronda estén atendidas.
- Repetir el ciclo por cada nueva ronda. No cerrar el proceso hasta obtener LGTM y aprobación final del docente.
- Reservar tiempo para la aprobación, merge y backport final. El objetivo operativo es cerrar las correcciones antes de las 22:00 hs del 30 de noviembre; la fecha límite oficial no se modifica.

**Cierre de la Fase 2:**

1. Cuando todos los comentarios estén resueltos, notificarlo en el hilo de Slack indicado por la cátedra y solicitar una nueva revisión.
2. Con LGTM/aprobación docente, mergear `release/segundo-parcial` → `master` y notificar el merge en Slack.
3. Crear y publicar el tag/release `v2.0-segundo-parcial` con el extracto pertinente de `changelog.md`.
4. Abrir y completar el backport de `release/segundo-parcial` hacia `develop`; notificar en Slack que el backport quedó completo.

### 4. Herramientas para code review y coordinación

- **GitHub Copilot Agent Mode:** analizar el diff de cada PR junto con la consigna, los specs, el contrato de datos y las pruebas pertinentes. Se elige porque permite revisar cambios en contexto con los archivos del repositorio y detectar inconsistencias entre código, documentación y requerimientos. Sus observaciones se verificarán manualmente; la IA no aprobará ni mergeará PRs por sí sola.
- **GitHub (PRs, Issues y revisiones):** fuente de trazabilidad de hallazgos, prioridades, responsables, decisiones, commits y aprobaciones.
- **Git y VS Code:** revisión de diffs, ejecución local, resolución de conflictos y comprobación de cambios.
- **Jasmine:** validación funcional, incluidos casos asíncronos de éxito/error y la integración externa.
- **Lighthouse:** registro comparable de accesibilidad y rendimiento en la baseline y después de cada integración solicitada.
- **GitHub Pages:** comprobación del despliegue de `release/segundo-parcial` y de sus rutas a JSON, scripts y recursos.
- **Slack:** notificaciones al equipo y al docente según el proceso de correcciones.

En cada code review asistido se guardarán en este spec el prompt exacto, los archivos del diff/contexto utilizados, los hallazgos con archivo y línea, la decisión humana, el estado de revisión y el resultado de la re-revisión. No se registrarán hallazgos hipotéticos como defectos confirmados.

### 5. Criterios de aceptación — checklist de coordinación

#### Base y desarrollo

- [ ] Este Momento 1 está revisado y commiteado antes de iniciar la coordinación/implementación.
- [ ] Cada integrante tiene Issue, spec y rama de trabajo; cada rol aporta al menos un commit relevante.
- [ ] Correcciones de Actividad Obligatoria N.º 4 aplicadas en PRs `fix/`, documentadas bajo `### Fixed` y aprobadas antes del merge a `master`.
- [ ] Backport de `release/cuarta-entrega` a `develop` completado y documentado antes de iniciar la integración del Segundo Parcial.
- [ ] PRs recibidas de los demás roles revisadas con Copilot Agent; se documentan al menos 4 instancias de revisión asistida, distribuidas en al menos 2 PR distintas, incluidas las re-revisiones necesarias.
- [ ] Fetch/JSON, estados de carga/error, librería externa y pruebas Jasmine integrados y validados en `develop`.
- [ ] Jasmine cubre casos de éxito y error de fetch y la integración de la librería; resultados y evidencias documentados.
- [ ] Lighthouse tiene baseline y resultados post-integración de fetch y librería; umbral de performance ≥95 documentado.
- [ ] `README.md` contiene funcionalidades del parcial, instrucciones, tecnologías/librerías y enlaces vigentes a la documentación.
- [ ] `changelog.md` registra aportes y correcciones con enlaces a Issues/PRs; estructura y documentación del proyecto quedan actualizadas.
- [ ] GitHub Pages está activo y verificado para `release/segundo-parcial`, incluida la carga de recursos y JSON.

#### Correcciones y release final

- [ ] Cada Request Change docente tiene Issue, prioridad, responsable, resolución y evidencia de validación.
- [ ] Toda reasignación por incidencia/baja participación está justificada, fechada, registrada en la PR de release y notificada al equipo.
- [ ] Todas las rondas de Request Changes están resueltas antes del 30 de noviembre a las 22:00 hs.
- [ ] Se obtuvo LGTM/aprobación docente en la PR `release/segundo-parcial` → `master` antes de la fecha límite.
- [ ] Release `v2.0-segundo-parcial` publicada con el extracto correspondiente del changelog.
- [ ] Backport final de `release/segundo-parcial` a `develop` completado y notificado en Slack.

### 6. Registro de responsables y fechas

Completar al abrir las Issues, sin asumir asignaciones que el equipo o la cátedra todavía no hayan confirmado:

| Rol | Responsable | Issue | Rama/PR |
| --- | --- | --- | --- |
| Coordinador / DevOps | Gonzalo Barbano | Pendiente | `feature/coord-devops-segundo-parcial` |
| Desarrollo de asincronía/fetch | Pendiente de confirmar | Pendiente | Pendiente |
| Integración de librería JavaScript | Pendiente de confirmar | Pendiente | Pendiente |
| Tester QA | Pendiente de confirmar o asignación del Coordinador en equipo de 3 | Pendiente | Pendiente |

> El Momento 2 — prompts exactos, resúmenes de reviews, Request Changes del docente, asignaciones/reasignaciones y obstáculos — se completará al cierre con evidencia real. No completar esa sección con resultados planificados.