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

- [ ] Esta spec fue revisada y commiteada antes de abrir Copilot Agent o escribir el código de implementación.
- [ ] No quedan llamadas a `prompt()` ni `alert()` en el código de la aplicación.
- [ ] `js/script.js` funciona como controlador: maneja eventos y DOM, sin duplicar reglas de negocio de los modelos.
- [ ] Los listeners cubren todos los controles relevantes de los cuatro flujos y siguen un patrón homogéneo.
- [ ] La búsqueda responde a cambios de título y filtro, y muestra resultados o estado vacío en el DOM.
- [ ] Agregar/quitar favoritos y cambiar estado actualiza la biblioteca en el DOM y persiste el cambio mediante la capa Storage.
- [ ] La exportación permite elegir formato y presenta texto/enlace en HTML; informa cuando no hay favoritos.
- [ ] La calificación valida en tiempo real, solo acepta enteros de 1 a 5 y presenta el resultado/error visualmente.
- [ ] Los cuatro flujos funcionan desde la interfaz, sin recargar la página ni depender de diálogos del navegador.
- [ ] Los mensajes y errores son visibles y accesibles; los controles inválidos tienen feedback visual y semántico.
- [ ] Las vistas dinámicas reflejan el estado del dominio y no incorporan lógica de negocio al renderizado.
- [ ] El controlador integra las clases exportadas como módulos y coordina correctamente la API acordada de Storage.
- [ ] Las referencias de scripts/importaciones en `index.html` son correctas y no generan errores en consola.
- [ ] Las pruebas existentes y las nuevas suites relacionadas con el controlador pasan.

## Momento 2 — AT CLOSE: evidencia de ejecución

> Completar después de la implementación. No registrar como evidencia texto sugerido o resultados que no se hayan observado. Si el prompt real difiere del previsto, copiar aquí el prompt efectivamente enviado.

### Archivos adjuntados como contexto en Copilot Agent

- [ ] `js/models/Content.js`
- [ ] `js/models/Catalog.js`
- [ ] `js/models/LibraryEntry.js`
- [ ] `js/models/Library.js`
- [ ] `docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md`
- [ ] Otros archivos usados como contexto: **************\_\_**************

### Prompt exacto utilizado

```text
[Pegar aquí el prompt exacto enviado a Copilot Agent, sin resumirlo.]
```

### Fragmento generado por Copilot

Registrar al menos un listener generado, indicando el archivo y el flujo al que pertenece:

```js
// [Reemplazar por el fragmento real generado por Copilot.]
```

- **Archivo/ubicación:** **************\_\_**************
- **Flujo/evento:** **************\_\_**************

### Ajustes manuales y justificación

| Ajuste manual                                        | Justificación / comportamiento corregido |
| ---------------------------------------------------- | ---------------------------------------- |
| [Completar con cada ajuste efectivamente realizado.] | [Explicar el motivo y el resultado.]     |

### Decisiones finales de estructura e integración

- **Estructura final de `js/script.js`:** [Describir inicialización, estado del controlador, registro de listeners y funciones de renderizado implementadas.]
- **Integración con `Catalog` y `Library`:** [Indicar métodos invocados por flujo y cómo se evita duplicar lógica de negocio.]
- **Integración con Storage:** [Indicar la API acordada y cuándo se persisten los cambios.]
- **Controles y selectores finales:** [Registrar formularios, regiones DOM y atributos `data-*` definitivos.]
- **Manejo de errores/validación:** [Describir el feedback final presentado al usuario.]

### Verificación final

- [ ] Búsqueda y filtros verificados desde la interfaz.
- [ ] Alta/baja de favoritos y actualización de biblioteca verificados.
- [ ] Exportación en los formatos implementados verificada.
- [ ] Validación y guardado de calificación verificados.
- [ ] No se encontraron llamadas a `prompt()`/`alert()` en la aplicación.
- [ ] Pruebas ejecutadas: **************\_\_**************
- [ ] Resultado de pruebas y observaciones: **************\_\_**************
- [ ] Capturas/evidencias: **************\_\_**************
