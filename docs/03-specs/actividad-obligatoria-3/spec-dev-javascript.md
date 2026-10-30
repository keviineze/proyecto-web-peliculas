# Spec — Desarrollador JavaScript

## 1. Datos de la tarea

- **Proyecto:** Mini Letterboxd Front End
- **Actividad:** Actividad Obligatoria N.º 3
- **Responsable:** Gonzalo Barbano
- **Rol:** Desarrollador JavaScript
- **Rama:** `feature/dev-javascript-logica-negocio`
- **Rama destino:** `develop`
- **Repositorio:** [keviineze/proyecto-web-peliculas](https://github.com/keviineze/proyecto-web-peliculas)

## 2. Momento 1 — BEFORE: planificación

### 2.1 Objetivo y alcance

Implementar en `js/script.js` la lógica de negocio de Mini Letterboxd mediante cuatro flujos simulados con `prompt()`, `alert()` y/o `console.log()`. Los flujos tomarán como referencia `plan.md`, el catálogo y la biblioteca definidos en `index.html`, y los cuatro diagramas de actividades actuales del Arquitecto, que establecen el contrato de implementación.

La entrega no manipulará el DOM ni utilizará eventos. El catálogo y el estado personal se representarán con arrays de objetos. La lógica deberá poder probarse desde Jasmine sin abrir prompts ni depender de la interfaz.

### 2.2 Flujos principales y menú

El menú principal ofrecerá las cuatro opciones de los diagramas y continuará en un ciclo hasta que el usuario elija salir o cancele el prompt:

| Opción | Flujo                                 | Entrada                                                          | Proceso                                                                                                                                                                                                                                                   | Salida                                                                                                    |
| ------ | ------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1      | Búsqueda y filtrado de contenidos     | Texto de título y filtro opcional de tipo o género               | Buscar en el catálogo usando ambos criterios; informar si hay coincidencias; permitir cambiar criterios y repetir la búsqueda. Si se cancela la entrada del título, informar la cancelación y finalizar el flujo.                                         | Resultados o aviso de que no hubo coincidencias; aviso de fin al salir del ciclo.                         |
| 2      | Gestión de lista personal (favoritos) | Título y confirmación de agregar o remover                       | Buscar el título en el catálogo; si no existe, informar el error. Si ya está en favoritos, pedir confirmación para removerlo; si no está, pedir confirmación para agregarlo. Persistir cada cambio confirmado y consultar si desea gestionar otro título. | Confirmación de alta/baja, cancelación o título inexistente.                                              |
| 3      | Exportar y compartir lista personal   | Formato `texto` o `enlace`                                       | Recuperar favoritos de `localStorage`; si no hay, informar y finalizar. Validar el formato en un ciclo; generar texto con los títulos o un enlace simulado con sus identificadores.                                                                       | Mostrar el resultado en un `prompt()` para copiarlo manualmente y confirmar la exportación con `alert()`. |
| 4      | Calificación de contenidos vistos     | Una calificación por cada contenido visto pendiente de calificar | Recuperar los contenidos vistos sin rating; recorrerlos secuencialmente; validar cada calificación como entero entre 1 y 5, repitiendo el prompt si es inválida; persistir cada calificación antes de continuar. La cancelación interrumpe el proceso.    | Aviso si no hay pendientes, confirmación por título y mensaje final al completar el lote.                 |
| 0      | Salir                                 | Opción del menú o cancelación                                    | Finalizar el ciclo del menú sin error.                                                                                                                                                                                                                    | Mensaje de cierre opcional.                                                                               |

El catálogo inicial se basará en los títulos que ya aparecen en `index.html`: Interstellar, El viaje de Chihiro y Dark. No se agregarán títulos ni metadatos ajenos al proyecto. La búsqueda combinará el criterio de título con el filtro opcional de tipo o género. La exportación de enlace será una simulación basada en identificadores, no requerirá backend, clipboard, DOM ni eventos.

### 2.3 Arquitectura y testabilidad

La implementación separará tres responsabilidades:

1. **Datos y reglas de negocio:** funciones puras que reciben el catálogo o la biblioteca como argumentos y devuelven resultados. No llamarán a `prompt()`, `alert()`, `console.log()`, `localStorage` ni modificarán los arrays u objetos recibidos.
2. **Interacción:** funciones de flujo que solicitan entradas, llaman a las funciones de negocio y muestran resultados. Los ciclos del menú, búsqueda, gestión, validación de formato y calificación seguirán los ciclos de los diagramas; no se usará recursión para repetirlos.
3. **Persistencia local:** se conservará el requisito general de `plan.md` mediante funciones adaptadoras independientes de las reglas de negocio. `loadLibrary(storage)` devolverá un array vacío si no hay datos guardados o si el JSON almacenado no es válido; `saveLibrary(storage, library)` serializará la biblioteca. Los flujos cargarán el estado al iniciar y persistirán cada cambio confirmado. Las funciones puras no accederán directamente a `localStorage`.

Las funciones puras se declararán en el nivel superior de `js/script.js`, sin encapsularlas en una IIFE, para que `js/test/script.spec.js` pueda invocarlas directamente. El estado se actualizará de forma inmutable: cada operación devolverá un nuevo resultado y no alterará los argumentos originales. Las funciones adaptadoras de persistencia recibirán el objeto `storage` como parámetro para poder probarse sin depender del almacenamiento real del navegador.

Funciones de negocio previstas:

- `searchContents(catalog, titleQuery, filterValue)`: filtra por título y, si se indicó, por tipo o género; devuelve un array nuevo de coincidencias.
- `findTitleByName(catalog, titleName)`: devuelve el título encontrado o `null`.
- `addFavorite(catalog, library, titleName)` y `removeFavorite(library, titleId)`: devuelven un resultado con `success`, `message` y la biblioteca actualizada, sin mutar los argumentos.
- `getUnratedWatchedContents(catalog, library)`: devuelve los contenidos marcados como vistos que todavía no tienen calificación.
- `validateRating(value)`: indica si el valor es un entero entre 1 y 5.
- `rateWatchedContent(library, titleId, rating)`: asigna una calificación válida a un contenido visto y devuelve el resultado con la biblioteca actualizada.
- `formatFavoritesAsText(catalog, library)` y `createFavoritesLink(library)`: devuelven, respectivamente, una representación textual y un enlace simulado de los favoritos.

La biblioteca se representará con registros de forma consistente, equivalente a `{ titleId, status, isFavorite, rating }`: `status` podrá identificar un contenido pendiente o visto, `isFavorite` permitirá agregarlo/removerlo de favoritos y `rating` será `null` o un entero de 1 a 5. La exportación se basará en los registros favoritos; la calificación procesará únicamente contenidos vistos sin calificación. Las funciones auxiliares de interacción, el menú, `startApp()`, `loadLibrary(storage)` y `saveLibrary(storage, library)` tendrán efectos de entrada/salida y no se considerarán funciones puras. Se expondrán mediante declaraciones de nivel superior, al igual que las funciones de negocio.

Para evitar que Jasmine dispare prompts al cargar `js/script.js`, el test runner cargará Jasmine antes que el script de aplicación y el arranque automático llamará a `startApp()` solo cuando `typeof jasmine === "undefined"`. Así, `index.html` iniciará la simulación normalmente y `js/test/test-runner.html` podrá cargar las funciones sin abrir prompts.

### 2.4 Criterios de aceptación

- [ ] Existen cuatro flujos completos y coherentes con los diagramas: búsqueda/filtrado, gestión de favoritos, exportar/compartir y calificación de vistos.
- [ ] El menú `prompt()` permite elegir los cuatro flujos y salir; opciones inválidas y cancelaciones se manejan sin bloquear el procesamiento.
- [ ] Búsqueda y filtrado combina el texto del título con un filtro opcional de tipo o género, informa resultados vacíos y permite repetir criterios.
- [ ] Gestión de favoritos distingue contenido inexistente, favorito ya agregado, confirmación, cancelación, alta y baja; persiste los cambios confirmados y permite gestionar varios títulos.
- [ ] Compartir informa cuando la lista está vacía, valida el formato en un ciclo, genera texto o enlace simulado y presenta el resultado para copiar manualmente.
- [ ] Calificación procesa en orden los contenidos vistos sin rating; acepta solo enteros de 1 a 5, reintenta valores inválidos, persiste cada resultado y se interrumpe si se cancela.
- [ ] Las funciones tienen nombres descriptivos, parámetros y valores de retorno explícitos.
- [ ] La lógica de negocio no llama a `prompt()`, `alert()`, `console.log()` ni manipula el DOM.
- [ ] Las funciones de negocio son puras, trabajan con arrays y objetos, y no mutan los argumentos recibidos.
- [ ] Las funciones necesarias para Jasmine están disponibles en el nivel superior y no quedan encerradas en una IIFE.
- [ ] Se emplean condicionales y ciclos para representar las decisiones y repeticiones de los cuatro diagramas.
- [ ] El catálogo de partida utiliza únicamente títulos presentes en `index.html`.
- [ ] Todo el código de aplicación se encuentra en `js/script.js`; `index.html` referencia correctamente ese archivo.
- [ ] La biblioteca se carga y guarda mediante adaptadores de `localStorage`, sin incorporar ese efecto a las funciones de negocio.
- [ ] No se agrega manipulación del DOM ni uso de eventos.
- [ ] Las funciones complejas están documentadas con JSDoc y se mantiene la nomenclatura camelCase.
- [ ] Los cuatro flujos y sus decisiones coinciden con `actividad-flujo-1-busqueda.puml`, `actividad-flujo-2-gestion.puml`, `actividad-flujo-3-compartir.puml` y `actividad-flujo-4-calificacion.puml`.
- [ ] `js/script.js` puede cargarse en `js/test/test-runner.html` sin iniciar prompts ni impedir la ejecución de Jasmine.
- [ ] Este spec queda commiteado antes de comenzar la implementación de `js/script.js`.

### 2.5 Dependencias y coordinación

Los cuatro diagramas ya están definidos en `docs/05-diagramas/01-diagrama-de-actividades/`. La implementación debe reflejar sus decisiones y ciclos, que son el contrato funcional de la tarea. Si se acuerda una modificación posterior de los diagramas, primero se actualizará este spec para mantener ambos artefactos alineados.

Se coordinará con el Tester JavaScript para acordar los resultados esperados, los casos borde y los nombres de las funciones públicas de prueba. Los cambios de API necesarios para mejorar la testabilidad se comunicarán antes de cerrar la implementación.

### 2.6 Cierre de la tarea — AT CLOSE

**Completar esta sección al finalizar la implementación. No registrar como realizado ningún paso sin evidencia.**

#### Prompt utilizado en Copilot Agent

Incluir la transcripción exacta del prompt usado y enumerar los archivos adjuntados como contexto, incluidos los cuatro diagramas `.puml` del Arquitecto y este `spec-dev-javascript.md`.

```text
Pendiente: reemplazar por el prompt exacto utilizado al generar js/script.js.
```

#### Resultado y ajustes manuales

- **Output generado por Copilot:** pendiente; describir el resultado real y señalar el flujo del que se incluirá un fragmento.
- **Fragmento de código generado:** pendiente; agregar un fragmento real de al menos uno de los cuatro flujos.
- **Ajustes manuales:** pendiente; documentar los cambios hechos para separar la lógica de negocio de la interacción y facilitar las pruebas con Jasmine.
- **Decisiones finales:** pendiente; registrar la estructura definitiva, las funciones expuestas para testing y cómo se coordinó el contrato con el Tester.
- **Validación:** pendiente; anotar las comprobaciones realizadas sobre los cuatro diagramas, el menú, `index.html` y la carga desde Jasmine.
