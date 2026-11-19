# Spec — Desarrollador JS Eventos + DOM

## Datos de la tarea

- **Proyecto:** Mini Letterboxd
- **Actividad:** Actividad Obligatoria N.º 4
- **Rol:** Desarrollador JS Eventos + DOM
- **Rama de trabajo:** `feature/dev-eventos-dom`
- **Responsabilidad principal:** refactorizar `js/script.js` como controlador de interfaz, integrando los modelos de `js/models/` y actualizando el DOM ante las acciones del usuario.

## Momento 1 — BEFORE: planificación

> Esta sección debe revisarse y commitearse antes de abrir Copilot Agent o escribir código de implementación. Los controles que se detallan son el contrato funcional previsto; varios todavía no existen en el `index.html` actual.

### Objetivo

Reemplazar la interacción basada en `prompt()` y `alert()` por una interfaz web accesible e interactiva. `js/script.js` será el punto de entrada y controlador: registrará eventos, leerá valores de controles, invocará las clases del dominio, coordinará la persistencia acordada con el rol Storage y renderizará el resultado en el DOM. Las reglas de negocio permanecerán en `js/models/`.

Los cuatro flujos a soportar son:

1. Buscar y filtrar contenidos.
2. Gestionar favoritos de la biblioteca personal.
3. Exportar y compartir la lista personal.
4. Calificar contenidos vistos.

### Estado de la interfaz existente

`index.html` contiene el catálogo estático, las secciones `#lista-pendientes` y `#lista-vistas`, enlaces de navegación y un rango de calificación para Chihiro. Aún no contiene un formulario de búsqueda, controles operativos para agregar/quitar favoritos ni una interfaz para elegir y mostrar un formato de exportación. Los enlaces “Agregar a Mi Lista” tampoco identifican el contenido mediante un control de acción.

Por lo tanto, la integración deberá acordar e implementar los controles HTML necesarios y sus identificadores/atributos `data-*`. Los cambios de marcado requeridos se limitarán a habilitar los cuatro flujos y mantener semántica, accesibilidad y responsive design.

### Eventos y controles por flujo

#### 1. Búsqueda y filtrado

- **Controles previstos:** formulario de búsqueda con campo de título y selector de tipo/género; botón para limpiar criterios.
- **Eventos:** `submit` para ejecutar la búsqueda sin recargar la página; `input` en el título y `change` en el filtro para actualizar resultados en tiempo real; `click` para limpiar.
- **Modelo:** `Catalog.search(titleQuery, filterValue)` devuelve las instancias `Content` coincidentes.
- **Salida DOM:** actualizar la grilla de catálogo, mostrar un estado vacío cuando no haya coincidencias y conservar el orden del catálogo.
- **Validación/feedback:** permitir criterios vacíos (muestran todos los títulos); no tratar la búsqueda sin coincidencias como error de entrada.

#### 2. Gestión de la lista personal

- **Controles previstos:** botones para agregar o quitar un favorito asociados al `Content` correspondiente mediante `data-title-id`; controles para cambiar entre `pending` y `watched` cuando estén presentes en la interfaz.
- **Eventos:** `click` delegado desde un contenedor estable para agregar/quitar; `change` delegado para actualizar el estado de visualización.
- **Modelo:** resolver el título con `Catalog.findById(id)`; invocar `Library.addFavorite(content)`, `Library.removeFavorite(titleId)` y, si se expone el control de estado, `Library.setStatus(titleId, status)`. Consultar `Library.findEntry()` o `Library.getEntries()` para representar el estado actualizado.
- **Salida DOM:** renderizar los favoritos y estados en las secciones de biblioteca; actualizar el texto/estado accesible de la acción; presentar confirmación o error junto al flujo mediante una región de estado.
- **Validación/feedback:** ignorar identificadores no resueltos, informar si el título ya está en la lista o no se encontraba como favorito y no mutar manualmente las entidades desde el controlador.

#### 3. Exportar y compartir

- **Controles previstos:** botón para iniciar la exportación, selector de formato (`texto` o `enlace`) y una región de salida visible con el resultado.
- **Eventos:** `click` para generar la salida y `change` para actualizarla al cambiar el formato, si el diseño permite selección anticipada.
- **Modelo:** obtener los favoritos mediante `Library.getFavorites(catalog)`. El controlador solo presenta el formato elegido: texto con título/año o enlace simulado con los identificadores favoritos, acorde con el flujo anterior.
- **Salida DOM:** insertar el resultado en un elemento de salida seleccionable y anunciar el estado. Si no hay favoritos, mostrar el mensaje en la misma región y no producir un resultado vacío engañoso.
- **Validación/feedback:** aceptar únicamente los formatos ofrecidos por el selector; no utilizar `prompt()` como ventana de copia.

#### 4. Calificación

- **Controles previstos:** rango o selector con valor entero de 1 a 5 asociado a un `titleId`, con valor visible, mensaje de validación y acción de guardar cuando corresponda.
- **Eventos:** `input` para reflejar el valor y validar en tiempo real; `change` o `submit` para confirmar la calificación según el marcado final.
- **Modelo:** invocar `Library.rateContent(titleId, rating)`. La regla que solo permite calificar contenidos vistos y las restricciones del rango pertenecen a `Library`/`LibraryEntry`.
- **Salida DOM:** mostrar el valor elegido, la calificación guardada y los errores de operación en la región asociada al control; actualizar la vista de biblioteca.
- **Validación/feedback:** comprobar que el valor sea un entero entre 1 y 5 y que el contenido esté marcado como visto; aplicar/remover estados visuales y actualizar `aria-invalid`/mensaje asociado.

### Patrón homogéneo de eventos

- Registrar listeners una sola vez al inicializar el controlador, después de que el DOM esté disponible.
- Usar `submit` en formularios y ejecutar `preventDefault()` para evitar recargas.
- Usar delegación de eventos para acciones de catálogo y biblioteca que se renderizan dinámicamente; identificar la acción mediante `data-action` y el contenido mediante `data-title-id`.
- Usar listeners `input` para validación/actualización inmediata y `change` para filtros o confirmaciones de valores, manteniendo una responsabilidad clara por evento.
- Centralizar lectura de controles, actualización de estados de validación y mensajes de feedback en funciones DOM reutilizables.
- No crear listeners dentro de cada renderizado ni asignar manejadores inline en HTML.
- Si se inicializa repetidamente, prevenir listeners duplicados mediante una única función de inicialización del controlador.

### Decisiones de arquitectura

#### Responsabilidades

**`js/script.js` — controlador**

- Crear o reconstruir las instancias de `Catalog` y `Library` usando las clases del dominio.
- Cargar/guardar el estado mediante la API acordada con `js/utils/storage.js`; no implementar serialización ni reglas CRUD dentro de los handlers.
- Traducir eventos de interfaz a llamadas de métodos públicos del modelo.
- Renderizar los datos que devuelven los modelos y actualizar el estado visual de los controles.
- Gestionar errores de interfaz y de almacenamiento con feedback HTML, nunca con `alert()`.

**`js/models/*.js` — dominio**

- Mantener búsqueda, gestión de favoritos, estados y calificaciones.
- Validar las reglas de negocio y encapsular el estado de las entidades.
- No depender de `document`, eventos, HTML ni Storage API.

**`js/utils/storage.js` — persistencia**

- Proveer la abstracción de lectura y escritura acordada por el equipo.
- El controlador coordinará la persistencia después de una operación de dominio exitosa y mostrará feedback si la operación de almacenamiento falla.

Como los modelos usan `export`/`import`, la integración del controlador requiere cargar `js/script.js` como módulo (`type="module"`) y ajustar las referencias/importaciones necesarias en `index.html`. Este cambio se coordinará con los otros roles.

#### Funciones DOM reutilizables previstas

- `renderCatalog(contents)`: crea las tarjetas y sus acciones a partir de instancias `Content`.
- `renderLibrary(library, catalog)`: actualiza favoritos, estados y calificaciones sin duplicar la lógica de negocio.
- `renderMessage(container, message, type)`: presenta estados de éxito, validación, lista vacía o error en una región visible y accesible.
- `setFieldFeedback(input, message, isValid)`: actualiza clases, `aria-invalid` y el texto asociado al campo.
- `renderShareResult(value, format)`: presenta el resultado de exportación en el DOM.

Estas funciones se mantendrán enfocadas en presentación: no buscarán títulos ni decidirán si una operación de dominio es válida. Para contenido proveniente de usuarios/modelos se priorizará crear nodos y asignar `textContent`, evitando interpolar datos en `innerHTML`.

#### Integración con las clases del dominio

- `Catalog`: `getAll()`, `findById(id)`, `findByName(name)` y `search(titleQuery, filterValue)`.
- `Library`: `getEntries()`, `findEntry(titleId)`, `addFavorite(content)`, `removeFavorite(titleId)`, `getFavorites(catalog)`, `getUnratedWatchedContents(catalog)`, `rateContent(titleId, rating)`, `setStatus(titleId, status)`, `toJSON()` y `fromJSON(data)`.
- `Content`: getters como `getId()`, `getTitle()`, `getType()`, `getYear()` y `getGenres()`.
- `LibraryEntry`: getters como `getTitleId()`, `getStatus()`, `getIsFavorite()` y `getRating()`.

Los métodos mutadores de `Library`/`LibraryEntry` informan el resultado de la operación. El controlador usará ese resultado para renderizar y persistir; no accederá a campos privados ni modificará objetos internos directamente.

### Criterios de aceptación

- [x] Esta spec fue revisada y commiteada antes de abrir Copilot Agent o escribir el código de implementación.
- [x] No quedan llamadas a `prompt()` ni `alert()` en el código de la aplicación.
- [x] `js/script.js` funciona como controlador: maneja eventos y DOM, sin duplicar reglas de negocio de los modelos.
- [x] Los listeners cubren los controles de los cuatro flujos y siguen un patrón homogéneo con delegación desde `document`.
- [x] La búsqueda responde a cambios de título y filtro, y muestra resultados o estado vacío en el DOM.
- [x] Agregar/quitar favoritos y cambiar estado actualiza la biblioteca en el DOM y persiste el cambio mediante Storage.
- [x] La exportación permite elegir formato y presenta texto/enlace en HTML; informa cuando no hay favoritos.
- [x] La calificación valida en tiempo real, solo acepta enteros de 1 a 5 y presenta el resultado visualmente.
- [x] Los cuatro flujos implementados funcionan desde la interfaz sin recargar la página ni depender de diálogos del navegador.
- [x] Los mensajes y errores se presentan en regiones accesibles; la calificación actualiza su feedback visual y semántico.
- [x] Las vistas dinámicas reflejan el estado del dominio y usan los métodos públicos de los modelos.
- [x] El controlador integra las clases como módulos y coordina `StorageAPI.guardar()`/`obtener()`.
- [x] Las referencias de scripts/importaciones en `index.html` funcionan en navegador y no generan errores de consola.
- [ ] Jasmine: pendiente de ejecutar tras la refactorización de `js/test/script.spec.js` y `js/test/test-runner.html` por el rol Tester QA.

## Momento 2 — AT CLOSE: evidencia de ejecución

> Completar después de la implementación. No registrar como evidencia texto sugerido o resultados que no se hayan observado. Si el prompt real difiere del previsto, copiar aquí el prompt efectivamente enviado.

### Archivos consultados como contexto

Los siguientes archivos se leyeron desde el workspace durante esta implementación. No se adjuntó un conjunto de archivos por separado a un prompt independiente de Copilot Agent.

- [x] `js/models/Content.js`
- [x] `js/models/Catalog.js`
- [x] `js/models/LibraryEntry.js`
- [x] `js/models/Library.js`
- [x] `docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md`
- [x] `js/utils/storage.js`
- [x] `index.html`

### Prompt exacto utilizado

```text
TAREAS PRINCIPALES
● Transformar js/script.js en controlador principal:
○ Eliminar toda lógica de negocio
○ Mantener solo código de manejo de eventos y manipulación del DOM
○ Actuar como orquestador: invocar métodos de las clases del dominio
● Implementar sistema de eventos:
○ Definir event listeners para todos los eventos relevantes
○ Establecer un patrón homogéneo para el manejo de eventos
○ Implementar delegación de eventos cuando sea apropiado
● Manipulación del DOM:
○ Capturar entradas del usuario desde formularios/inputs
○ Validar entradas en tiempo real con feedback visual
○ Mostrar resultados modificando el DOM dinámicamente
○ Crear, actualizar y eliminar elementos según el flujo
○ Aplicar clases CSS para estados (loading, error, success, etc.)
● Eliminar prompt/alert: Reemplazar todas las llamadas por interacciones HTML
● Gestión de estados de UI:
○ Mostrar/ocultar secciones según el contexto
○ Deshabilitar/habilitar controles según validaciones
○ Implementar mensajes de error y éxito en la interfaz
● Coordinación:
○ Trabajar con Desarrollador JS POO para definir interfaces de las clases
○ Trabajar con Desarrollador JS Storage para persistir datos desde la UI
○ Responder a issues reportadas por Tester QA
Estructura del archivo js/script.js
// Importar clases del dominio (usando módulos ES6)
// Variables globales de estado (mínimas)
let miInstancia = null;
// Event listeners
document.addEventListener('DOMContentLoaded', inicializarApp);
document.getElementById('miFormulario').addEventListener('submit',
manejarSubmit);
// ... más listeners
// Funciones de inicialización
function inicializarApp() {
// Configuración inicial
cargarDatosIniciales();
configurarEventos();
}
// Funciones manejadoras de eventos
function manejarSubmit(event) {
event.preventDefault();
// Capturar datos del formulario
// Validar
// Invocar método de clase del dominio
// Actualizar DOM con resultado
}
// Funciones de manipulación del DOM
function mostrarResultado(datos) {
// Modificar el DOM para mostrar datos
}
function mostrarError(mensaje) {
// Mostrar mensaje de error en la UI
}
// Funciones auxiliares de UI
function limpiarFormulario() { }
function deshabilitarControles() { }
function habilitarControles() { }
```

### Fragmento generado por Copilot

Fragmento del controlador implementado, indicando el archivo y los eventos delegados:

```js
function configureEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
}
```

- **Archivo:** `js/script.js`
- **Flujos/eventos:** click delegado para favoritos/limpieza/compartir; submit para búsqueda; input para búsqueda y preview de rating; change para filtros, estados y rating.

### Ajustes manuales y justificación

| Ajuste manual                                                                                                    | Justificación / comportamiento corregido                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Se usaron listeners delegados en `document` y atributos `data-action`/`data-title-id`.                           | Los controles de catálogo y biblioteca se recrean durante el renderizado; la delegación evita listeners duplicados y mantiene las acciones operativas. |
| El renderizado crea nodos y asigna texto con `textContent`/`replaceChildren`.                                    | Evita interpolar títulos o valores en `innerHTML` y concentra la manipulación de interfaz en funciones de presentación.                                |
| Si Storage rechaza una escritura, se reconstruye la instancia anterior de `Library` y se vuelve a renderizar.    | Evita que la interfaz muestre como persistido un cambio que no pudo guardarse.                                                                         |
| El feedback de rating se vuelve a aplicar al control recién renderizado y muestra el valor guardado al recargar. | El renderizado reemplaza el nodo de entrada; el feedback debe reflejar el estado persistido, no el control desconectado.                               |

### Decisiones finales de estructura e integración

- **Estructura final de `js/script.js`:** importa `Catalog`, `Content`, `Library` y `StorageAPI`; inicializa una instancia de catálogo y biblioteca; registra cuatro listeners delegados; separa handlers, coordinación de mutaciones y funciones DOM (`renderCatalog`, `renderLibrary`, `renderMessage`, entre otras).
- **Integración con `Catalog` y `Library`:** búsqueda con `Catalog.search`; resolución por `findById`; gestión con `addFavorite`/`removeFavorite`; cambios con `setStatus`/`rateContent`; exportación desde `getFavorites`. No se accede a campos privados.
- **Integración con Storage:** usa `StorageAPI.obtener("miniLetterboxdLibrary")` al iniciar y `StorageAPI.guardar(...)` tras mutaciones exitosas, serializando con `Library.toJSON()` y reconstruyendo con `Library.fromJSON()`.
- **Controles y selectores finales:** `#search-form`, `#search-query`, `#search-filter`, `.catalog-grid`, `#pending-items`, `#watched-items`, `[data-action="toggle-favorite"]`, `[data-action="update-status"]`, `[data-action="rate-content"]`, `#share-format` y `#share-output`.
- **Manejo de errores/validación:** mensajes Bootstrap en regiones `role=status`/`alert`; rating entero de 1 a 5 con feedback `aria-invalid`/clases; rollback visual si falla Storage; estados vacíos para búsqueda y compartir.

### Verificación final

- [x] Búsqueda por título/filtro y estado sin resultados verificados en Playwright.
- [x] Alta de favorito, cambio de estado y persistencia tras recargar verificados en Playwright.
- [x] Exportación en texto/enlace y estado sin favoritos verificados en Playwright.
- [x] Rating de 1 a 5 y persistencia tras recargar verificados en Playwright.
- [x] No se encontraron llamadas a `prompt()`/`alert()` en `js/` mediante búsqueda del workspace.
- [x] Sintaxis de `js/script.js` validada como módulo con Node; `get_errors` no reportó errores en JS/HTML; consola del navegador sin errores.
- [x] Viewport móvil de 390 px verificado sin desbordamiento horizontal.
- [ ] Jasmine no ejecutado: `js/test/test-runner.html` aún carga `js/script.js` como script clásico y `js/test/script.spec.js` depende de funciones legacy; requiere refactor del rol Tester QA.
- **Estado de prueba del navegador:** restaurado a los datos iniciales de la biblioteca después de verificar los flujos.
- **Capturas/evidencias:** snapshot de accesibilidad y comprobaciones de interacción realizadas con Playwright MCP durante esta sesión.
