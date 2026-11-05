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

- [x] Revisar y resolver los Request Changes asignados a la release del Primer Parcial.
- [x] Crear las ramas `fix/` desde `release/primer-parcial`, según la consigna.
- [x] Abrir las PR de corrección hacia `release/primer-parcial`.
- [x] Registrar cada corrección bajo `### Fixed` en `changelog.md`, con su enlace a la PR.
- [x] Comunicar al docente el estado de las correcciones en el hilo de Slack.

#### Coordinación de la Actividad N.º 3

- [x] Mantener actualizados `README.md`, `plan.md` y `changelog.md` según corresponda.
- [x] Verificar que cada rol tenga su spec commiteado antes de implementar.
- [x] Realizar al menos cuatro code reviews asistidos por Copilot Agent Mode sobre PR de otros integrantes.
- [x] Documentar los prompts exactos utilizados, el contexto adjuntado y los resultados de cada revisión.
- [x] Registrar los `CHANGES_REQUESTED` relevantes con referencias a archivos y líneas del diff.
- [x] Coordinar la resolución de defectos y conflictos antes de integrar las PR.
- [x] Mantener el tablero Kanban de GitHub Projects actualizado con Issues y estados verificables.
- [x] Verificar la publicación de GitHub Pages para `release/tercera-entrega`.
- [x] Crear `release/tercera-entrega` desde `develop` cuando la integración esté completa.
- [x] Preparar la PR final de release hacia `master` y comunicar sus enlaces en Slack y el campus.
- [ ] Crear el tag y la GitHub Release `v1.1-tercera-entrega` después de que la entrega haya sido aprobada y mergeada en `master`.
- [ ] Coordinar la limpieza final de ramas, conservando las ramas requeridas por la consigna.
- [ ] Verificar la navegación entre los índices de documentación, en particular `docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md` y `js/test/testing-doc.md`.

### 2.5 Alcance y dependencias

Las revisiones de código se realizarán cuando las PR de los demás integrantes estén disponibles. Los resultados, cambios solicitados, resoluciones y evidencias se registrarán en el cierre de este spec; no se consideran completados por el solo hecho de estar planificados.


### 2.6 Cierre de la tarea — AT CLOSE

#### 2.6.1 Resumen de Code Reviews realizados

Se realizaron seis rondas de revisión de código asistidas por GitHub Copilot en Agent Mode, distribuidas en tres instancias de revisión para cada una de las dos PR de los otros integrantes del grupo.

Las revisiones se realizaron contrastando los cambios con `plan.md`, los diagramas de actividades, la estructura del proyecto y los requisitos de la Actividad Obligatoria N.º 3. Las observaciones fueron verificadas antes de registrarse en GitHub.

#### 2.6.2 Revisión de la PR #72 — Arquitecto de Diagramas de Actividades

**PR:** https://github.com/keviineze/proyecto-web-peliculas/pull/72

**Primera revisión — CHANGES_REQUESTED (29/10/2026)**

Se identificaron los siguientes problemas:

- Los flujos de compra de entradas y autenticación no correspondían al alcance funcional de Mini Letterboxd.
- El diagrama de búsqueda no contemplaba el caso sin resultados.
- El flujo de calificación no representaba el recorrido de todos los contenidos vistos ni contemplaba películas y series.
- Era necesario mantener alineados los diagramas, el spec y su índice documental.

Se registraron comentarios específicos en el diff y se solicitó corregir los cuatro aspectos.

**Segunda revisión — CHANGES_REQUESTED (30/10/2026)**

Se verificó que los principales problemas funcionales habían sido corregidos. Sin embargo, se solicitaron nuevos ajustes:

- Incorporar un ciclo `while` o `repeat` en la gestión de la lista personal.
- Actualizar el spec del flujo de calificación.
- Documentar los ajustes manuales posteriores al primer review.
- Corregir los nombres visibles de enlaces del índice de diagramas.
- Actualizar la descripción de la PR y su checklist.

**Tercera revisión — APPROVED (30/10/2026)**

Se verificó que los cambios solicitados estaban resueltos:

- Se reemplazaron los flujos que no correspondían al alcance.
- Se contemplaron búsquedas sin coincidencias.
- Se generalizó la calificación para incluir películas y series.
- Se incorporó el ciclo iterativo en la gestión de favoritos.
- Se actualizaron las especificaciones y los enlaces documentales.

La PR quedó aprobada y posteriormente fue mergeada en `develop`.

#### 2.6.3 Revisión de la PR #73 — Desarrollador JavaScript

**PR:** https://github.com/keviineze/proyecto-web-peliculas/pull/73

**Primera revisión — CHANGES_REQUESTED (30/10/2026)**

Se identificaron dos problemas funcionales:

- La función `askYesNo()` interpretaba cualquier respuesta no afirmativa como una respuesta negativa, sin validar entradas inválidas.
- La función `getWorkingLibrary()` reemplazaba una biblioteca válida vacía (`[]`) por la biblioteca inicial.

Se solicitaron correcciones para validar las respuestas y preservar el estado persistido.

**Segunda revisión — CHANGES_REQUESTED (30/10/2026)**

Se verificó que los dos problemas iniciales habían sido corregidos. Se encontraron otros aspectos pendientes:

- `readStoredLibrary()` descartaba todos los registros si encontraba uno inválido, incluso los registros válidos.
- El JSDoc de esa función no reflejaba correctamente su comportamiento.
- La descripción de la PR contenía errores en rutas, archivos y enlaces Markdown.

Se solicitaron los ajustes correspondientes antes de aprobar la integración.

**Tercera revisión — APPROVED (30/10/2026)**

Se verificó satisfactoriamente que:

- Se corrigió la validación de respuestas sí/no.
- Se preservaron las bibliotecas válidas vacías.
- Se conservaron los registros válidos aunque existieran registros inválidos.
- Se actualizó el JSDoc.
- Se corrigieron los metadatos y enlaces de la PR.
- Se mantuvo la coherencia entre los cuatro flujos JavaScript y sus diagramas.

No se identificaron nuevos defectos que impidieran la integración. La revisión fue estática y la ejecución automatizada quedó a cargo del Tester JavaScript / QA Engineer.

La PR quedó aprobada y posteriormente fue mergeada en `develop`.

#### 2.6.4 Prompts utilizados en GitHub Copilot Agent Mode

Se conservaron los resultados de las revisiones y las observaciones registradas en GitHub.

**IMPORTANTE:** incorporar aquí los prompts exactos utilizados en cada instancia de revisión, copiándolos desde el historial de Copilot Agent Mode. No reconstruirlos de memoria ni reemplazarlos por prompts inventados.

##### PR #72 — Arquitecto de Diagramas

**Primera revisión:**
```text
Actúa como Senior Software Engineer realizando un code review profesional para la Actividad Obligatoria N.º 3 del proyecto Mini Letterboxd.

PR A REVISAR:
- Número: #72
- URL: https://github.com/keviineze/proyecto-web-peliculas/pull/72
- Rama de origen: feature/arq-diagramas-actividades
- Rama destino: develop

OBJETIVO:
Revisar el diff real de esta PR, contrastándolo con plan.md, lo que se plantea en README.md, index.html y los archivos modificados en la PR.

HERRAMIENTAS:
Utiliza las herramientas MCP de GitHub/GitLens/GitKraken que estén
disponibles para consultar el diff y los archivos. No supongas que la
rama actual del workspace es la rama de origen de la PR.

ALCANCE DE LA REVISIÓN:
1. Verificar que los cuatro flujos correspondan a funcionalidades
   previstas en plan.md y en el proyecto.
2. Comprobar coherencia entre spec-arq-diagramas.md y cada diagrama.
3. Revisar decisiones condicionales, ciclos, casos de cancelación,
   validaciones y límites de intentos.
4. Verificar que cada archivo .puml y su .png correspondiente existan.
5. Revisar que diagramas-doc.md tenga enlaces y referencias correctos.
6. Verificar la actualización de changelog.md y la trazabilidad con la PR.
7. Validar la sintaxis PlantUML si las herramientas disponibles lo permiten.
   No afirmes que un diagrama fue ejecutado o validado si no lo hiciste.

REGLAS:
- Identifica únicamente problemas concretos y reproducibles.
- No inventes bugs ni conviertas preferencias de estilo en bloqueos.
- Cada hallazgo debe ser independiente.
- Indica archivo y línea o actividad del diagrama afectada.
- Explica el comportamiento observado, el esperado y una corrección concreta.
- Si un punto no puede verificarse con el contexto disponible, decláralo.
- No edites archivos, no hagas commits, no hagas push y no ejecutes el merge.

FORMATO DE CADA HALLAZGO:
HALLAZGO #<n>
Tipo: bug | diseño | coherencia documental | otro
Severidad: baja | media | alta | crítica
Archivo y ubicación:
Problema observado:
Comportamiento esperado:
Explicación técnica:
Sugerencia de corrección:
Fragmento corregido, solo si aporta claridad:

PROCESO DE PUBLICACIÓN:
Primero presenta los hallazgos en el chat para que pueda revisarlos.
No publiques hallazgos que no estén respaldados por el diff.
Cuando estén verificados, prepara comentarios de revisión vinculados
a las líneas correspondientes de la PR.
No envíes un APPROVE si existen bloqueos relevantes sin resolver.

CIERRE:
Proporciona un resumen de los archivos revisados, hallazgos verificados,
riesgos pendientes y decisión sugerida: APPROVE o REQUEST CHANGES.

No envíes el merge ni modifiques el repositorio.
```

**Segunda revisión:**
```text
ctúa como Senior Software Engineer y revisor de código para la Actividad Obligatoria N.º 3 del proyecto Mini Letterboxd.

## CONTEXTO DE LA REVISIÓN

- Pull Request: #72 — Creación de flujos y spec
- URL: https://github.com/keviineze/proyecto-web-peliculas/pull/72
- Rama de origen: `feature/arq-diagramas-actividades`
- Rama destino: `develop`
- Último commit verificado previamente: `03902206bf401b3b37dff9b989b191560bad5c2b`

Revisa el estado más reciente de la PR. Si hay un commit posterior, utiliza ese estado actualizado. No te limites a revisar la versión anterior.

## OBJETIVO

Comprobar si el compañero resolvió correctamente los cuatro hallazgos del primer Code Review y determinar si la PR cumple la consigna y está lista para aprobarse e integrarse en `develop`.

## 1. VERIFICAR LOS HALLAZGOS ANTERIORES

**Hallazgo 1 — Flujo de compra de entradas**

Verifica que `actividad-flujo-2-compra.puml` haya sido reemplazado por una funcionalidad coherente con el alcance de Mini Letterboxd, y que el spec, el índice de diagramas y la imagen correspondiente reflejen el cambio.

**Hallazgo 2 — Flujo de autenticación**

Verifica que `actividad-flujo-3-login.puml` haya sido reemplazado por una funcionalidad prevista en el proyecto, sin introducir autenticación no definida en el alcance. Comprueba la coherencia entre el nuevo diagrama, el spec y la documentación.

**Hallazgo 3 — Búsqueda sin coincidencias**

Verifica que `actividad-flujo-1-busqueda.puml` tenga una decisión explícita para el caso en que no haya resultados y que el flujo termine o continúe de forma coherente.

**Hallazgo 4 — Calificación de contenidos**

Verifica que `actividad-flujo-4-calificacion.puml` recorra la colección de contenidos vistos, contemple películas y series, permita validar las calificaciones y mantenga la coherencia con el spec.

Para cada hallazgo anterior, indica:
- RESUELTO, PARCIALMENTE RESUELTO o NO RESUELTO.
- Evidencia concreta del archivo y del comportamiento modelado.
- Cualquier problema que todavía persista.

## 2. NUEVAS VERIFICACIONES OBLIGATORIAS

**A. Cumplimiento de la consigna**

Consulta la consigna de la Actividad Obligatoria N.º 3 y verifica que los cuatro diagramas incluyan los elementos requeridos: `start`, `stop`, actividades, decisiones `if/else` y ciclos mediante `while` o `repeat`, según corresponda a cada diagrama.

Presta especial atención a `actividad-flujo-2-gestion.puml`: revisa si cumple el requisito de incluir un ciclo. No des por válido que no se necesita un ciclo sin contrastarlo con el texto de la consigna.

**B. Coherencia del spec**

Revisa `docs/03-specs/actividad-obligatoria-3/spec-arq-diagramas.md`.

Comprueba que la identificación de los cuatro flujos, los actores, las decisiones y los ciclos coincide con los diagramas actuales.

El prompt original de Copilot debe conservarse como evidencia histórica si realmente fue el utilizado. No lo reescribas para simular que desde el principio se generaron los flujos nuevos. En su lugar, verifica que los ajustes manuales posteriores y las correcciones realizadas tras el primer Code Review estén documentados de manera fiel.

**C. Documentación y enlaces**

Revisa `docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md`.

Comprueba que:
- Los cuatro enlaces a archivos `.puml` existan y apunten a las rutas exactas.
- Las cuatro imágenes `.png` correspondan a los diagramas actuales.
- Los nombres que se muestran en los enlaces coincidan con los nombres reales de los archivos.
- Las descripciones reflejen los flujos actuales.

**D. Sintaxis y correspondencia visual**

Verifica la sintaxis de los `.puml` utilizando PlantUML si dispones de una herramienta de validación. Comprueba también que las imágenes `.png` representen los fuentes actualizados.

No afirmes haber compilado ni inspeccionado visualmente un archivo si no has podido hacerlo.

**E. Changelog y alcance**

Comprueba la entrada de `changelog.md`, los archivos incluidos en la PR y su coherencia con el rol de Arquitecto de Diagramas de Actividades.

## 3. REGLAS DEL CODE REVIEW

- Basa los hallazgos en los archivos y el diff actuales.
- No repitas hallazgos que estén correctamente resueltos.
- No inventes problemas hipotéticos.
- Diferencia errores bloqueantes, problemas menores y mejoras opcionales.
- Indica la ruta exacta del archivo y la línea del diff cuando sea posible.
- Si no puedes confirmar algo, indícalo expresamente.

## 4. FORMATO DE RESPUESTA

### Estado de los hallazgos anteriores
Presenta una tabla con número, estado, evidencia y observaciones.

### Nuevos hallazgos
Para cada problema nuevo, indica:
- Número y severidad.
- Archivo y línea exacta, si se puede comprobar.
- Problema observado.
- Comportamiento esperado.
- Corrección concreta solicitada.

### Decisión final sugerida
Selecciona una de estas opciones:
- APPROVE: todos los criterios obligatorios están cumplidos y no hay bloqueos pendientes.
- REQUEST CHANGES: quedan incumplimientos o problemas relevantes que deben corregirse.
- COMMENT: no hay bloqueos, pero quedan observaciones no bloqueantes.

Explica brevemente la decisión y enumera las correcciones que todavía serían necesarias.

## RESTRICCIONES

No edites ni generes archivos. No hagas commits, push ni merge. No publiques comentarios ni una review en GitHub. Limítate a analizar el estado actual y entregar el informe para que yo pueda revisarlo y publicar manualmente la decisión.
```

**Tercera revisión:**
```text
Realiza una tercera y última revisión ahora de la PR #72 ya que se acaba ahora de actualizar con un nuevo commit [adead87](https://github.com/keviineze/proyecto-web-peliculas/pull/72/commits/adead87dc39fdfb25873301621c12287ad1febfe) del proyecto Mini Letterboxd, comparando la rama `feature/arq-diagramas-actividades` con `develop`.

Verifica específicamente que se hayan corregido los cinco puntos de la segunda revisión:

1. El diagrama `actividad-flujo-2-gestion.puml` debe incluir un ciclo `while` o `repeat` que permita gestionar varios contenidos. Contrasta este requisito con la consigna A3, que establece que cada diagrama debe incluir ciclos.
2. El spec debe describir la calificación de contenidos vistos, incluyendo películas y series.
3. El spec debe documentar los ajustes manuales posteriores al primer Code Review y las decisiones finales, conservando el prompt original como evidencia histórica.
4. Los nombres visibles de los enlaces `.puml` de los flujos 2 y 3 deben coincidir con los nombres reales de los archivos.
5. La descripción y el checklist de la PR deben reflejar los cuatro flujos actuales y no mencionar los antiguos flujos de compra y login.
Además, verifica:

- Existencia de los cuatro archivos `.puml` y sus respectivos `.png`.
- Coherencia entre los diagramas, `spec-arq-diagramas.md` y `diagramas-doc.md`.
- Sintaxis PlantUML y correspondencia entre fuentes e imágenes, utilizando una herramienta de validación cuando esté disponible.
- Actualización del changelog.
Para cada punto, indica RESUELTO, PARCIALMENTE RESUELTO o NO RESUELTO, proporcionando evidencia concreta.

La decisión final debe ser:

- APPROVE, si se cumplen todos los requisitos obligatorios y no hay bloqueos.
- REQUEST CHANGES, si todavía existen incumplimientos.
No modifiques el repositorio, no publiques comentarios ni reviews, no hagas commits, push ni merge. Entrega únicamente el informe de revisión.
```

##### PR #73 — Desarrollador JavaScript

**Primera revisión:**
```text
Actuá como un Senior JavaScript Developer y QA Code Reviewer. Necesito que realices un Code Review exhaustivo de la PR #73 (https://github.com/keviineze/proyecto-web-peliculas/pull/73), correspondiente al rol Desarrollador JavaScript de la Actividad Obligatoria N.º 3.

**IMPORTANTE:**

- Realizá únicamente una revisión de código en modo lectura.
- No modifiques archivos.
- No generes commits ni ejecutes operaciones de Git que alteren el repositorio.
- No supongas que algo funciona si no hay evidencia.
- Revisá las diferencias entre la rama feature/dev-javascript-logica-negocio y develop.
**Contexto obligatorio:**
Contrastá la implementación con:

- plan.md
- index.html
- spec-dev-javascript.md
- Los cuatro diagramas PlantUML del Arquitecto
- Los requisitos de la Actividad Obligatoria N.º 3.
**Puntos que debés verificar:**

1. Los cuatro flujos implementados coinciden con sus diagramas:

- Búsqueda y filtrado de contenidos.
- Gestión de lista personal (favoritos).
- Exportar y compartir lista personal.
- Calificación de contenidos vistos.
2. Se utiliza un menú principal mediante prompt() que permite acceder a los cuatro flujos y salir.
3. Se implementan correctamente las estructuras condicionales if/else, switch y los ciclos for/while necesarios.
4. Se capturan y validan las entradas del usuario, contemplando valores inválidos, cancelaciones y casos límite.
5. Se utilizan arrays y objetos de manera coherente con el proyecto.
6. Las funciones tienen nombres descriptivos, parámetros apropiados, valores de retorno y responsabilidad única.
7. La lógica de negocio está separada de la interacción con el usuario. Las funciones de negocio no deben depender directamente de prompt(), alert(), console.log() ni del DOM.
8. Las funciones necesarias para Jasmine están expuestas y pueden probarse sin ejecutar automáticamente los prompts.
9. Se utilizan funciones puras y se evita modificar directamente los arrays u objetos recibidos cuando corresponda.
10. La persistencia en localStorage funciona correctamente y no introduce errores en las operaciones de los cuatro flujos.
11. No se utiliza manipulación del DOM ni eventos, porque esta entrega todavía no los permite.
12. El archivo index.html referencia correctamente js/script.js.
13. El spec-dev-javascript.md contiene la planificación BEFORE, el prompt utilizado, los archivos de contexto, el output generado y los ajustes manuales realizados.
14. El changelog.md registra correctamente la contribución y su relación con la PR y la Issue correspondiente.
**Revisá especialmente los casos borde de las funciones askYesNo(), getWorkingLibrary() y searchContents().** Determiná si su comportamiento actual es correcto o si puede provocar resultados inesperados.

**Formato de respuesta:**

Presentá una tabla con:

- Hallazgo.
- Severidad: crítico, alto, medio o bajo.
- Archivo y línea exacta.
- Explicación del problema.
- Requisito de la consigna relacionado.
- Corrección recomendada.
Separá los defectos reales de las simples sugerencias de estilo.

Al final, emití una conclusión:

- APPROVE: si no hay defectos pendientes que impidan integrar.
- REQUEST CHANGES: si hay defectos o incumplimientos que deben corregirse antes del merge.
No realices ninguna modificación. Solamente entregá el informe del Code Review.
```

**Segunda revisión:**
```text
Actuá como Senior JavaScript Developer y QA Code Reviewer.

Necesito realizar el SEGUNDO CODE REVIEW de la PR #73, correspondiente al rol Desarrollador JavaScript de la Actividad Obligatoria N.º 3.

En la primera revisión se solicitaron tres correcciones:

1. **Validación de respuestas sí/no:** la función askYesNo() interpretaba cualquier respuesta distinta de una afirmativa como negativa. Se solicitó reconocer explícitamente respuestas afirmativas y negativas, volver a consultar ante entradas inválidas y contemplar la cancelación.
2. **Persistencia de biblioteca vacía:** la función getWorkingLibrary() reemplazaba una biblioteca válida vacía (`[]`) por los datos iniciales. Se solicitó diferenciar una biblioteca válida vacía de una inexistente o inválida.
3. **Trazabilidad en changelog:** se solicitó agregar el enlace a la Issue #63 en la entrada correspondiente a la PR #73. Pero esta vez no revises esto del changelog ya que no corresponde que en el registro se incluya una Issue, solamente tiene que estar la PR

### OBJETIVO DE ESTA SEGUNDA REVISIÓN
Verificar si las tres correcciones fueron implementadas correctamente y determinar si la PR está en condiciones de recibir APPROVE y realizar el merge hacia develop.

### 1. Verificación de correcciones anteriores
Revisá específicamente:

- askYesNo(): comprobar respuestas afirmativas, negativas, inválidas y cancelación.
- readStoredLibrary() y getWorkingLibrary(): comprobar que una biblioteca válida vacía se conserve y que los datos iniciales solo se creen cuando corresponda.
- changelog.md: comprobar que la entrada de la PR #73 incluya los enlaces correctos a la PR y a la Issue #63.
No te limites a comprobar que el código cambió: verificá que el nuevo comportamiento resuelva realmente los problemas detectados.

### 2. Verificación de regresiones
Comprobá que las correcciones no hayan introducido nuevos problemas en:

- Flujo de búsqueda y filtrado.
- Flujo de gestión de favoritos.
- Flujo de exportación y uso compartido.
- Flujo de calificación de contenidos vistos.
- Persistencia en localStorage.
- Cancelaciones y validaciones de entradas.
- Separación entre lógica de negocio e interacción.
- Funciones puras y testabilidad con Jasmine.
Contrastá nuevamente los cuatro flujos con sus respectivos diagramas PlantUML, el plan.md y el spec-dev-javascript.md.

### 3. Verificación documental de la PR
Revisá también los metadatos de la PR:

- Que la ruta del spec figure correctamente como `docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md`.
- Que changelog.md figure en la lista de archivos modificados.
- Que la descripción de la PR tenga un enlace Markdown válido a plan.md.
- Que la contribución esté vinculada a la Issue #63.

### 4. Restricciones

- Realizá la revisión en modo lectura.
- No modifiques ningún archivo.
- No generes commits ni ejecutes push.
- No publiques comentarios, reviews ni aprobaciones en GitHub.
- No ejecutes el merge.
- No inventes pruebas ejecutadas ni resultados que no hayas comprobado.
- Diferenciá defectos reales de sugerencias de estilo.

### 5. Formato del informe
Presentá una tabla con:

| Hallazgo | Severidad | Archivo y línea | Estado | Observación |

Separá los hallazgos en:

A. Correcciones anteriores resueltas.
B. Correcciones anteriores pendientes.
C. Nuevos defectos encontrados.
D. Sugerencias menores de documentación o estilo.

Al final, emití una única conclusión:

- **APPROVE:** si las tres correcciones están resueltas y no quedan defectos que impidan integrar la PR.
- **REQUEST CHANGES:** si persiste algún incumplimiento o defecto que debe corregirse antes del merge.
Justificá la conclusión con evidencia concreta del código y la documentación.

Recordá que esta es una segunda revisión: prestá especial atención a los cambios realizados después del primer CHANGES_REQUESTED.
```

**Tercera revisión:**
```text
Actuá como Senior JavaScript Developer y QA Code Reviewer.

Necesito realizar el **TERCER CODE REVIEW de la PR #73**(https://github.com/keviineze/proyecto-web-peliculas/pull/73), correspondiente al rol Desarrollador JavaScript de la Actividad Obligatoria N.º 3 de la rama feature/dev-javascript-logica-negocio .

En la segunda revisión se solicitaron las siguientes correcciones:

### 1. Corrección de persistencia en readStoredLibrary()
Problema anterior:
Si el array almacenado contenía registros válidos junto con uno inválido, la función descartaba todos los registros. Esto podía provocar la pérdida de favoritos y calificaciones.

Corrección solicitada:

- Filtrar los registros inválidos.
- Conservar y normalizar los registros válidos.
- Mantener una biblioteca válida vacía (`[]`) como resultado válido.
- Devolver null únicamente cuando el almacenamiento no exista, el JSON sea ilegible o la estructura principal no sea un array.
**Verificá que esta solución esté correctamente implementada y que no provoque pérdida de datos.**

### 2. Actualización del JSDoc de readStoredLibrary()
Problema anterior:
La documentación indicaba que la función devolvía un array vacío ante datos inválidos, pero su comportamiento real contempla también el retorno null.

Corrección solicitada:

- Actualizar el tipo de retorno para reflejar `Array<object> | null`.
- Explicar cuándo devuelve null y cuándo devuelve un array.
**Verificá que el JSDoc coincida con el comportamiento real del código.**

### 3. Correcciones de la descripción de la PR #73
Se solicitaron tres ajustes:

- Corregir la ruta del spec a `docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md`.
- Incorporar `changelog.md` a la lista de archivos modificados de la descripción.
- Corregir la sintaxis Markdown del enlace a `plan.md`.
**Verificá estos tres puntos directamente en la descripción actual de la PR #73 en GitHub.**

### IMPORTANTE: criterio del changelog
No solicites agregar enlaces a Issues en `changelog.md`. El formato utilizado en este repositorio registra las contribuciones mediante enlaces a las Pull Requests y el responsable. La entrada actual de la PR #73 debe evaluarse respetando esa convención.

### 4. Verificación final de la implementación
Además de comprobar las correcciones anteriores, realizá una inspección breve para confirmar que no se hayan introducido regresiones en:

- Búsqueda y filtrado de contenidos.
- Gestión de favoritos.
- Exportación y uso compartido.
- Calificación de contenidos vistos.
- Persistencia en localStorage.
- Validación de entradas y cancelaciones.
- Separación entre lógica de negocio e interacción.
- Testabilidad mediante Jasmine.
- Referencia de `js/script.js` desde `index.html`.
- Coherencia con los cuatro diagramas PlantUML y `plan.md`.
No vuelvas a realizar innecesariamente toda la revisión desde cero. Concentrate principalmente en las correcciones solicitadas en la segunda revisión y comprobá que los cambios no hayan afectado el resto de la implementación.

### 5. Restricciones

- Trabajá exclusivamente en modo lectura.
- No modifiques archivos.
- No realices commits ni push.
- No publiques comentarios en GitHub.
- No envíes reviews ni aprobaciones.
- No ejecutes el merge.
- No inventes pruebas ejecutadas ni resultados.
- Diferenciá defectos reales de sugerencias menores de estilo.

### 6. Formato del informe
Presentá una tabla con:

| Corrección solicitada | Archivo o ubicación | Estado | Evidencia y observaciones |

Separá los resultados en:

A. Correcciones de la segunda revisión verificadas.

B. Nuevos defectos encontrados, si existen.

C. Sugerencias menores, si existen.

D. Resultado de la revisión de la descripción de la PR.

Finalizá con una conclusión clara:

- **APPROVE:** si todas las correcciones solicitadas están correctamente implementadas, la descripción de la PR está actualizada y no quedan defectos que impidan integrar los cambios.
- **REQUEST CHANGES:** si todavía existe algún defecto o incumplimiento que deba corregirse.
Justificá la conclusión con evidencia concreta del código y de la PR con el ultimo commit actual. No hagas ninguna modificación en la rama ni en la PR.
```

#### 2.6.5 Resultados de la coordinación

- Se revisaron las PR #72 y #73 en tres instancias cada una.
- Se documentaron solicitudes de cambios y observaciones específicas.
- Se verificó la resolución de los hallazgos antes de aprobar las integraciones.
- Se aprobaron las PR #72 y #73, que fueron mergeadas en `develop`.
- La PR #74, correspondiente al rol Tester JavaScript / QA Engineer, fue revisada por otro integrante y también fue mergeada en `develop`.
- Las cuatro contribuciones de la Actividad N.º 3 quedaron registradas en `changelog.md`.
- La rama `develop` fue actualizada y verificada. El último commit comprobado fue `18fd69b`.
- Se creó la rama `release/tercera-entrega` a partir de `develop`.
- Se actualizaron los enlaces y la documentación del README para reflejar los entregables de la actividad.
- Se preparó el changelog para identificar la Release de la Tercera Entrega.

#### 2.6.6 Tareas de cierre pendientes de verificación

Los siguientes puntos se completarán cuando exista evidencia de su ejecución:

- Verificación de GitHub Pages utilizando la rama `release/tercera-entrega`.
- Verificación final de la PR de release hacia `master`.
- Publicación del enlace de la PR y GitHub Pages en Slack y en el campus virtual.
- Actualización final del tablero Kanban de GitHub Projects.
- Aprobación del docente mediante LGTM.
- Merge de la release hacia `master`.
- Creación del tag y GitHub Release `v1.1-tercera-entrega`.
- Limpieza final de ramas innecesarias, conservando las ramas requeridas.

No se consideran completadas las tareas que todavía no cuentan con evidencia verificable.