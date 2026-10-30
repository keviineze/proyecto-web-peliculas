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

- [x] Existen cuatro flujos completos y coherentes con los diagramas: búsqueda/filtrado, gestión de favoritos, exportar/compartir y calificación de vistos.
- [x] El menú `prompt()` permite elegir los cuatro flujos y salir; opciones inválidas y cancelaciones se manejan sin bloquear el procesamiento.
- [x] Búsqueda y filtrado combina el texto del título con un filtro opcional de tipo o género, informa resultados vacíos y permite repetir criterios.
- [x] Gestión de favoritos distingue contenido inexistente, favorito ya agregado, confirmación, cancelación, alta y baja; persiste los cambios confirmados y permite gestionar varios títulos.
- [x] Compartir informa cuando la lista está vacía, valida el formato en un ciclo, genera texto o enlace simulado y presenta el resultado para copiar manualmente.
- [x] Calificación procesa en orden los contenidos vistos sin rating; acepta solo enteros de 1 a 5, reintenta valores inválidos, persiste cada resultado y se interrumpe si se cancela.
- [x] Las funciones tienen nombres descriptivos, parámetros y valores de retorno explícitos.
- [x] La lógica de negocio no llama a `prompt()`, `alert()`, `console.log()` ni manipula el DOM.
- [x] Las funciones de negocio son puras, trabajan con arrays y objetos, y no mutan los argumentos recibidos.
- [x] Las funciones necesarias para Jasmine están disponibles en el nivel superior y no quedan encerradas en una IIFE.
- [x] Se emplean condicionales y ciclos para representar las decisiones y repeticiones de los cuatro diagramas.
- [x] El catálogo de partida utiliza únicamente títulos presentes en `index.html`.
- [x] Todo el código de aplicación se encuentra en `js/script.js`; `index.html` referencia correctamente ese archivo.
- [x] La biblioteca se carga y guarda mediante adaptadores de `localStorage`, sin incorporar ese efecto a las funciones de negocio.
- [x] No se agrega manipulación del DOM ni uso de eventos.
- [x] Las funciones complejas están documentadas con JSDoc y se mantiene la nomenclatura camelCase.
- [x] Los cuatro flujos y sus decisiones coinciden con `actividad-flujo-1-busqueda.puml`, `actividad-flujo-2-gestion.puml`, `actividad-flujo-3-compartir.puml` y `actividad-flujo-4-calificacion.puml`.
- [x] `js/script.js` puede cargarse en `js/test/test-runner.html` sin iniciar prompts ni impedir la ejecución de Jasmine, siempre que Jasmine se cargue antes del script.
- [x] Este spec quedó commiteado antes de comenzar la implementación de `js/script.js` (`548601b` antes de `86a3d01`).

### 2.5 Dependencias y coordinación

Los cuatro diagramas ya están definidos en `docs/05-diagramas/01-diagrama-de-actividades/`. La implementación debe reflejar sus decisiones y ciclos, que son el contrato funcional de la tarea. Si se acuerda una modificación posterior de los diagramas, primero se actualizará este spec para mantener ambos artefactos alineados.

Se coordinará con el Tester JavaScript para acordar los resultados esperados, los casos borde y los nombres de las funciones públicas de prueba. Los cambios de API necesarios para mejorar la testabilidad se comunicarán antes de cerrar la implementación.

### 2.6 Cierre de la tarea — AT CLOSE

**Completar esta sección al finalizar la implementación. No registrar como realizado ningún paso sin evidencia.**

#### Prompt utilizado en Copilot Agent

**Archivos adjuntados como contexto:**

- `docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md`
- `docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-1-busqueda.puml`
- `docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-2-gestion.puml`
- `docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-3-compartir.puml`
- `docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-4-calificacion.puml`

También se consultó `index.html` para reutilizar los títulos, tipos, géneros y estados existentes; no se adjuntó como parte del prompt.

**Prompt exacto utilizado:**

```text
Ahora teniendo en cuenta los  diagramas de la carpeta 05-diagramas .puml del Arquitecto de
Diagramas y el spec-dev-javascript.md como contexto genera
js/script.js. Los diagramas de actividades son el contrato de
implementación: el código debe reflejar los flujos, decisiones y ciclos
modelados. Revisar el output, verificar que las funciones sean testeables y
realizar los ajustes necesarios.
● Implementar los 4 flujos principales del proyecto en JavaScript puro,
basándose en los diagramas de actividades creados
● Crear archivo js/script.js con toda la lógica de negocio
● Implementar un menú principal mediante prompt() que permita al usuario
elegir entre los 4 flujos
● Desarrollar funciones específicas para cada flujo, siguiendo principios de
código limpio:
○ Nombres descriptivos
○ Funciones con responsabilidad única
○ Parámetros y valores de retorno apropiados
● Implementar algoritmos condicionales y ciclos de manera eficiente
● Crear y manipular arrays y objetos relevantes al contexto del proyecto
● Validar entradas del usuario
● Mostrar resultados mediante alert() y/o console.log()
● IMPORTANTE: No manipular el DOM ni usar eventos en esta entrega (solo
lógica con prompt/alert)
● CRÍTICO para testing: Estructurar el código de forma que las funciones sean
testeables:
○ Separar lógica de negocio de interacción con usuario (prompt/alert)
○ Crear funciones puras que reciban parámetros y retornen valores
○ Evitar side effects innecesarios
○ Exponer funciones necesarias para testing (no anidar todo en IIFE si se
va a testear)
● Documentar funciones complejas con comentarios JSDoc
```

#### Resultado y ajustes manuales

- **Output generado por Copilot:** se creó `js/script.js` con el catálogo inicial basado en `index.html`, el menú principal y los cuatro flujos `runSearchFlow`, `runFavoritesFlow`, `runSharingFlow` y `runRatingFlow`. Las reglas reutilizables están implementadas en funciones independientes para buscar, filtrar, gestionar favoritos, exportar, validar ratings y persistir la biblioteca.
- **Fragmento del flujo de calificación:**

```js
let contentIndex = 0;
while (contentIndex < unratedContents.length) {
  const content = unratedContents[contentIndex];
  let ratingInput = promptFunction(
    `Ingresá una calificación de 1 a 5 para ${content.title}, o cancelá para interrumpir:`,
  );

  if (ratingInput === null) {
    alertFunction("Proceso interrumpido.");
    return library;
  }

  while (!validateRating(ratingInput)) {
    alertFunction("La calificación debe ser un número entero entre 1 y 5.");
    ratingInput = promptFunction(
      `Ingresá nuevamente la calificación para ${content.title}:`,
    );

    if (ratingInput === null) {
      alertFunction("Proceso interrumpido.");
      return library;
    }
  }

  const result = rateWatchedContent(library, content.id, ratingInput);
  if (!result.success) {
    alertFunction(result.message);
    contentIndex += 1;
    continue;
  }

  if (!saveLibrary(storage, result.library)) {
    alertFunction(
      "No se pudo guardar la calificación en el almacenamiento local.",
    );
    return library;
  }

  library = result.library;
  alertFunction(`Calificación guardada para ${content.title}.`);
  contentIndex += 1;
}
```

- **Ajustes manuales realizados:** se mantuvieron las funciones de negocio en el nivel superior y sin IIFE; se inyectaron `promptFunction`, `alertFunction`, `storage` y `catalog` en los flujos para probarlos con dobles; las operaciones devuelven nuevas bibliotecas en vez de mutar sus argumentos; se separaron `loadLibrary`/`saveLibrary` de las reglas; se reemplazó el recorrido de calificación por `while` para seguir el diagrama; se agregó reintento de rating inválido y salida controlada ante cancelación; se normalizaron tildes en búsquedas y se documentaron las funciones complejas con JSDoc.
- **Decisiones finales:** la biblioteca usa registros `{ titleId, status, isFavorite, rating }`; `status` distingue `pending`/`watched` y `isFavorite` es independiente para no perder la calificación al quitar un favorito. Las funciones puras (`searchContents`, `addFavorite`, `removeFavorite`, `getUnratedWatchedContents`, `validateRating`, `rateWatchedContent`, `formatFavoritesAsText` y `createFavoritesLink`) quedan invocables directamente. El Tester puede pasar fixtures y dobles de almacenamiento/interacción sin disparar diálogos ni usar el DOM. El arranque automático está condicionado a que exista `window` y no esté definido `jasmine`.
- **Validación:** `node --check js/script.js` pasó. Se ejecutaron comprobaciones focalizadas con Node y `vm` sobre búsqueda/filtrado, inmutabilidad al agregar favoritos, alta y baja, exportación con reintento de formato, calificación con reintento de valor inválido y carga con `jasmine` presente sin abrir prompts. También se confirmó que no hay llamadas a APIs del DOM/eventos, que `index.html` referencia el script y que los commits `548601b` (spec) y `86a3d01` (script) respetan el orden requerido. No se ejecutó Jasmine: `js/test/test-runner.html` y `js/test/script.spec.js` todavía no existen.
