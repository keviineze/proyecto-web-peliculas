# Spec — Desarrollador JS POO (Lógica de Negocio)

## 1. Datos de la tarea

- **Proyecto:** Mini Letterboxd
- **Actividad:** Actividad Obligatoria N.º 4
- **Responsable:** Kevin Ezequiel Sosa
- **Matrícula:** 154080
- **Rol:** Desarrollador JS POO (Lógica de Negocio)
- **Rama:** `feature/dev-poo-logica-negocio`
- **Rama destino:** `develop`
- **Issue:** #80
- **Repositorio:** https://github.com/keviineze/proyecto-web-peliculas

## 2. Momento 1 — BEFORE: planificación

### 2.1 Objetivo

Diseñar e implementar una arquitectura orientada a objetos para Mini Letterboxd, migrando las reglas de negocio actualmente concentradas en `js/script.js` hacia clases JavaScript organizadas en `js/models/`.

La implementación deberá mantener los cuatro flujos principales de la Actividad Obligatoria N.º 3:

1. Búsqueda y filtrado de contenidos.
2. Gestión de lista personal (favoritos).
3. Exportar y compartir lista personal.
4. Calificación de contenidos vistos.

El diseño deberá separar la lógica de negocio de la manipulación del DOM, el manejo de eventos y la persistencia de datos.

### 2.2 Análisis del dominio existente

A partir de la implementación de la Actividad Obligatoria N.º 3, se identifican dos estructuras principales.

**Catálogo de contenidos**

Actualmente contiene información como:

- `id`: identificador único.
- `title`: nombre del contenido.
- `type`: película o serie.
- `year`: año.
- `genres`: géneros asociados.

**Registro de biblioteca personal**

Actualmente contiene:

- `titleId`: identificador del contenido.
- `status`: estado pendiente o visto.
- `isFavorite`: indicador de favorito.
- `rating`: calificación entre 1 y 5, o `null`.

Estas estructuras serán la base para definir las nuevas entidades y clases del dominio.

`Content` conserva `initialStatus` como dato de inicialización de los registros de ejemplo. `Library.createInitial()` utiliza ese valor para crear las entradas iniciales de `Library`; el estado personal del usuario se mantiene en cada `LibraryEntry`.

### 2.3 Clases del dominio y API pública implementada

El diseño inicial propuso cuatro clases de dominio. Las propiedades y métodos siguientes corresponden al API público actualmente implementado; las diferencias respecto de la propuesta inicial y las decisiones finales se registran en AT CLOSE.

#### Clase Content

Representa una película o serie disponible en el catálogo.

**Propiedades previstas:**

- `id`
- `title`
- `type`
- `year`
- `genres`
- `initialStatus`: estado predeterminado que se usa al crear entradas iniciales de biblioteca.

**Métodos previstos:**

- `constructor(id, title, type, year, genres, initialStatus)`
- `getId()`, `getTitle()`, `getType()`, `getYear()`, `getGenres()` y `getInitialStatus()`.
- `toJSON()`
- `static fromJSON(json)`

#### Clase Catalog

Administra el conjunto de contenidos disponibles.

**Propiedades previstas:**

- `contents`: colección de instancias de `Content`.

**Métodos previstos:**

- `constructor(contents)`
- `getAll()`
- `findById(id)`: busca un contenido por identificador.
- `findByName(name)`: busca un contenido por título.
- `search(titleQuery, filterValue)`: permite buscar y filtrar contenidos.
- `toJSON()`
- `static fromJSON(json)`

#### Clase LibraryEntry

Representa el registro personal de un contenido dentro de la biblioteca.

**Propiedades previstas:**

- `titleId`
- `status`
- `isFavorite`
- `rating`

**Métodos previstos:**

- `constructor(titleId, status, isFavorite, rating)`
- `getTitleId()`, `getStatus()`, `getIsFavorite()` y `getRating()`.
- `setFavorite(value)`
- `setStatus(status)`
- `setRating(rating: number | null)`: asigna o quita una calificación.
- `toJSON()`
- `static fromJSON(json)`

#### Clase Library

Administra la colección de registros personales del usuario.

**Propiedades previstas:**

- `entries`: colección de instancias de `LibraryEntry`.

**Métodos previstos:**

- `constructor(entries)`
- `getEntries()`
- `findEntry(titleId)`
- `addFavorite(content)`
- `removeFavorite(titleId)`
- `getFavorites(catalog)`
- `getUnratedWatchedContents(catalog)`
- `rateContent(titleId, rating: number | null)`
- `setStatus(titleId, status)`
- `toJSON()`
- `static fromJSON(json)`
- `static createInitial(catalog)`

### 2.4 Relaciones entre clases

Se propone inicialmente:

- `Catalog` administra una colección de contenidos `Content`.
- `Library` administra una colección de registros `LibraryEntry`.
- Cada `LibraryEntry` se relaciona con un `Content` mediante el identificador `titleId`.

Se utilizarán relaciones de composición, agregación o asociación según la responsabilidad y el ciclo de vida de cada objeto.

No se incorporará herencia si no existe una justificación funcional para utilizarla.

### 2.5 Decisiones de arquitectura

La separación de responsabilidades será la siguiente:

**Clases del dominio — `js/models/`**

- Encapsular propiedades y reglas de negocio.
- Validar los datos recibidos.
- Gestionar las operaciones de catálogo y biblioteca.
- Implementar serialización y deserialización.
- Mantener independencia respecto de la interfaz visual.

**Controlador — `js/script.js`**

Será responsabilidad del Desarrollador JS Eventos + DOM.

El controlador deberá invocar los métodos públicos de las clases para responder a las acciones del usuario y actualizar la interfaz.

**Persistencia — `js/utils/storage.js`**

Será responsabilidad del Desarrollador JS Storage.

Las clases deberán proporcionar representaciones serializables mediante `toJSON()` y permitir la reconstrucción de instancias mediante `fromJSON()`, coordinando el formato con el responsable de Storage.

Las clases del dominio no deberán acceder directamente a `localStorage` ni `sessionStorage`.

Tampoco deberán utilizar `document`, registrar eventos, manipular elementos HTML ni invocar `prompt()` o `alert()`.

### 2.6 Diagrama de clases UML

Se desarrollará un diagrama mediante PlantUML que represente:

- Las cuatro clases propuestas.
- Sus propiedades y métodos.
- Los tipos de datos.
- Las relaciones entre las clases.
- Las multiplicidades correspondientes.
- La organización general de la arquitectura.

**Entregables:**

- `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases.puml`
- `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases.png`
- `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md`

### 2.7 Coordinación con otros roles

Se coordinarán las interfaces públicas de las clases con los responsables de los otros roles.

**Con Desarrollador JS Eventos + DOM:**

- Definir los métodos públicos que utilizará el controlador.
- Asegurar que los cuatro flujos puedan ejecutarse invocando métodos del dominio.
- Evitar duplicar reglas de negocio dentro de `js/script.js`.

**Con Desarrollador JS Storage:**

- Definir las estructuras que deberán persistirse.
- Acordar la representación JSON de las clases.
- Garantizar que `fromJSON()` permita reconstruir correctamente las instancias.

**Con Tester QA:**

- Facilitar el acceso a las clases y sus métodos para las pruebas Jasmine.
- Definir los comportamientos esperados y las validaciones.
- Coordinar la resolución de los problemas identificados durante testing.

### 2.8 Herramientas

- Git y GitHub para el control de versiones, Issues y Pull Requests.
- Visual Studio Code para el desarrollo.
- GitHub Copilot en modo Agente para asistir en la generación y revisión de las clases.
- PlantUML para el diseño y exportación del diagrama UML.
- Jasmine para verificar la testabilidad de las clases mediante el trabajo del rol Tester QA.

### 2.9 Criterios de aceptación

#### Especificación y arquitectura

- [x] El archivo `spec-dev-poo.md` contiene la planificación BEFORE.
- [ ] No verificable en los archivos revisados: el spec fue commiteado antes de crear archivos dentro de `js/models/`.
- [x] Se identifican cuatro clases del dominio y se definen sus propiedades, métodos y relaciones.
- [ ] Pendiente de evidencia de coordinación: acuerdo de las interfaces públicas con los otros roles.

#### Diagrama de clases

- [x] Se dispone del diagrama UML editable en PlantUML.
- [x] Se representan las cuatro clases implementadas.
- [x] Se incluyen propiedades, métodos, tipos de datos y relaciones.
- [x] Se incluyen las multiplicidades correspondientes.
- [x] Se dispone de los archivos `.puml` y `.png`.
- [x] Se documentan las responsabilidades y decisiones de diseño en `diagrama-clases-doc.md`.

#### Implementación POO

- [x] Se implementan cuatro clases dentro de `js/models/`, con constructores, responsabilidades y métodos de negocio definidos.
- [x] Se aplican validaciones internas y campos privados de JavaScript.
- [x] Se documentan las clases y métodos principales mediante JSDoc.
- [x] Se implementan `toJSON()` y `fromJSON()` para reconstruir instancias de dominio.
- [x] La inspección estática de los modelos confirma que no incluyen DOM, eventos ni APIs de almacenamiento.
- [ ] Pendiente de evidencia de coordinación: integración con Eventos + DOM y Storage.

### 2.10 Alcance y exclusiones

Este rol se concentra en la arquitectura orientada a objetos y la lógica de negocio.

Quedan fuera de su responsabilidad directa:

- La implementación de eventos y manipulación del DOM en `js/script.js`.
- La implementación de la capa de almacenamiento en `js/utils/storage.js`.
- La creación y ejecución de las suites de testing.
- La administración general de la release y la coordinación DevOps.

Estas tareas corresponden a los roles asignados en la Actividad Obligatoria N.º 4.

## 3. Momento 2 — AT CLOSE

### 3.1 Resultado y diferencias entre el diseño inicial y la implementación

La implementación final conserva las cuatro clases de dominio propuestas (`Content`, `Catalog`, `LibraryEntry` y `Library`) y sus responsabilidades principales. El diseño inicial no incluía `initialStatus` entre las propiedades de `Content`, aunque ya señalaba que ese campo debía evaluarse. En la implementación se conserva como dato del catálogo para inicializar registros mediante `Library.createInitial(catalog)` y al agregar un favorito sin entrada previa.

La propuesta inicial ubicaba operaciones genéricas de favoritos en `LibraryEntry`. En la implementación final, la entidad representa un registro individual y `Library` coordina `addFavorite(content)` y `removeFavorite(titleId)` sobre su colección. `Library` también incorpora `setStatus(titleId, status)` para actualizar un registro interno sin devolver una referencia mutable. Las consultas de favoritos y contenidos vistos pendientes de calificación reciben un `Catalog` para resolver identificadores.

### 3.2 Decisiones finales de arquitectura

- Se implementan exactamente las cuatro clases de dominio; no se añade herencia.
- Se utilizan campos privados de JavaScript (`#`) para encapsular el estado de cada instancia.
- `Content` valida identificador, título, tipo, año, géneros e `initialStatus`, y devuelve una copia del array `genres`.
- `Catalog` administra instancias `Content`, rechaza identificadores duplicados y normaliza mayúsculas y tildes al buscar.
- `LibraryEntry` valida estado, tipo de favorito y rating. Solo acepta ratings enteros entre 1 y 5 o `null`, y no permite calificar entradas que no estén en estado `watched`.
- Un registro que tiene rating no puede volver a `pending`. `setRating(null)` permite quitar una calificación existente.
- `Library` rechaza entradas inválidas o `titleId` duplicados y clona cada entrada recibida en el constructor mediante `LibraryEntry.fromJSON(entry.toJSON())`. `getEntries()` y `findEntry()` devuelven copias independientes. Las modificaciones del estado interno se realizan mediante métodos de `Library`.
- Todas las clases implementan `toJSON()` y `fromJSON()`. La deserialización reconstruye instancias reales: `Catalog.fromJSON()` crea instancias de `Content`; `Library.fromJSON()` crea instancias de `LibraryEntry`. `LibraryEntry.titleId` enlaza el registro con `Content`, y `Library` consulta `Catalog` para resolver esa asociación.
- La lógica de dominio no manipula la interfaz ni persiste directamente: no utiliza DOM, eventos, `prompt()`, `alert()` ni Storage API.

Fragmento real que muestra la copia independiente de los registros durante la construcción de `Library`:

```js
this.#entries = entries.map((entry) =>
  LibraryEntry.fromJSON(entry.toJSON()),
);
```

### 3.3 Evidencia documental y registro de prompts

Se revisaron las cuatro clases de `js/models/`, `diagrama-clases.puml` y `diagrama-clases-doc.md`. El diagrama representa las clases, sus firmas, relaciones y multiplicidades; también existe el archivo exportado `diagrama-clases.png`.

#### Prompts efectivamente utilizados en GitHub Copilot Agent Mode

No se pudo verificar el texto literal del prompt utilizado en Agent Mode a partir de los archivos revisados. Pegá manualmente aquí cada prompt efectivamente usado, sin reconstruirlo de memoria:

```text
Actuá como un Desarrollador JavaScript Senior especializado en Programación Orientada a Objetos (POO), arquitectura de software y diseño de modelos de dominio.

Estoy desarrollando Mini Letterboxd, una aplicación web académica para administrar un catálogo y una biblioteca personal de películas y series.

Tu tarea corresponde exclusivamente al rol **Desarrollador JS POO (Lógica de Negocio)** de la Actividad Obligatoria N.º 4 de Programación Web I.

## 1. Contexto que tenés que analizar
Antes de escribir código, analizá todos los archivos adjuntos:

- `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`
- `index.html`
- `js/script.js`
- Los cuatro diagramas de actividades de la Actividad 3:

- `actividad-flujo-1-busqueda.puml`
- `actividad-flujo-2-gestion.puml`
- `actividad-flujo-3-compartir.puml`
- `actividad-flujo-4-calificacion.puml`
- `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases.puml`
- `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md`
Utilizá estos archivos como referencia obligatoria. No inventes funcionalidades que no estén contempladas en el proyecto ni contradigas las decisiones del diagrama de clases.

## 2. Objetivo de la implementación
Migrar la lógica de negocio actualmente concentrada en `js/script.js` hacia clases JavaScript organizadas en la carpeta:

`js/models/`

La implementación debe mantener los cuatro flujos funcionales existentes:

1. Búsqueda y filtrado de contenidos.
2. Gestión de lista personal (favoritos).
3. Exportar y compartir lista personal.
4. Calificación de contenidos vistos.
La lógica debe quedar encapsulada en las clases del dominio y ser independiente de la interfaz de usuario.

## 3. Clases que tenés que implementar
Implementá exactamente las cuatro clases definidas en el diagrama de clases:

### Content.js
Representa una película o serie.

Propiedades privadas:

- `id`
- `title`
- `type`
- `year`
- `genres`
- `initialStatus`
Responsabilidades:

- Validar los datos recibidos en el constructor.
- Restringir `type` a los tipos contemplados por el catálogo: `Película` y `Serie`.
- Validar el año y la colección de géneros.
- Validar `initialStatus` como `pending` o `watched`.
- Proporcionar getters públicos que no permitan modificar accidentalmente las propiedades internas.
- Implementar `toJSON()`.
- Implementar `static fromJSON(data)`.
El getter de `genres` debe devolver una copia del array para evitar modificaciones externas.

### Catalog.js
Administra una colección de instancias de `Content`.

Propiedades privadas:

- `contents`
Métodos públicos:

- `constructor(contents)`
- `getAll()`
- `findById(id)`
- `findByName(name)`
- `search(titleQuery, filterValue)`
- `toJSON()`
- `static fromJSON(data)`
Requisitos:

- Validar que los elementos sean instancias válidas de `Content`.
- Evitar identificadores duplicados.
- `findById()` y `findByName()` deben devolver `null` cuando no exista coincidencia.
- `search()` debe conservar el comportamiento de `searchContents()` de la Actividad 3: búsqueda parcial por título y filtro opcional por tipo o género.
- Normalizar mayúsculas, minúsculas y tildes para las búsquedas.
- No modificar el contenido original de la colección.
- `fromJSON()` debe reconstruir instancias reales de `Content`.

### LibraryEntry.js
Representa el registro personal de un contenido.

Propiedades privadas:

- `titleId`
- `status`
- `isFavorite`
- `rating`
Métodos públicos:

- `constructor(titleId, status, isFavorite, rating)`
- `getTitleId()`
- `getStatus()`
- `getIsFavorite()`
- `getRating()`
- `setFavorite(value)`
- `setStatus(status)`
- `setRating(rating)`
- `toJSON()`
- `static fromJSON(data)`
Reglas de negocio:

- `status` solamente admite `pending` o `watched`.
- `isFavorite` debe ser booleano.
- `rating` puede ser `null` o un entero entre 1 y 5.
- No se permite calificar un contenido que no esté marcado como `watched`.
- `setRating()` debe devolver `false` ante una calificación inválida y `true` si la operación se completa.
- `setFavorite()` y `setStatus()` deben validar los valores recibidos.
- No permitir que código externo modifique directamente las propiedades privadas.

### Library.js
Administra la colección de registros personales `LibraryEntry`.

Propiedad privada:

- `entries`
Métodos públicos:

- `constructor(entries)`
- `getEntries()`
- `findEntry(titleId)`
- `addFavorite(content)`
- `removeFavorite(titleId)`
- `getFavorites(catalog)`
- `getUnratedWatchedContents(catalog)`
- `rateContent(titleId, rating)`
- `toJSON()`
- `static fromJSON(data)`
- `static createInitial(catalog)`
Reglas de negocio:

- No permitir dos registros para un mismo `titleId`.
- `findEntry()` debe devolver `null` cuando no se encuentre el registro.
- `addFavorite(content)` debe agregar el contenido como favorito. Si ya existe un registro, debe conservar su estado y calificación.
- Si el registro ya está marcado como favorito, la operación debe rechazarse sin duplicarlo.
- Si se remueve un favorito, no se debe borrar su estado de visto ni su calificación.
- `getFavorites(catalog)` debe devolver los contenidos correspondientes a los registros favoritos.
- `getUnratedWatchedContents(catalog)` debe devolver los contenidos vistos que todavía no tienen calificación.
- `rateContent(titleId, rating)` debe delegar las validaciones correspondientes a `LibraryEntry`.
- `createInitial(catalog)` debe generar una biblioteca inicial utilizando el `initialStatus` de cada contenido, con `isFavorite = false` y `rating = null`.
- La deserialización debe reconstruir instancias reales de `LibraryEntry`.

## 4. Encapsulamiento y arquitectura
Utilizá campos privados de JavaScript con la sintaxis `#propiedad`.

No expongas arrays internos directamente. Los métodos que devuelvan colecciones deberán devolver copias seguras, evitando que el consumidor pueda alterar accidentalmente el estado interno.

Las clases deben utilizar métodos públicos para comunicarse entre sí.

No utilices herencia artificial si no existe una justificación funcional.

Mantené las relaciones, responsabilidades y multiplicidades definidas en el diagrama UML adjunto.

## 5. Serialización y deserialización
Todas las clases deben implementar:

- `toJSON()`: devolver un objeto plano serializable mediante `JSON.stringify()`.
- `static fromJSON(data)`: validar la información recibida y reconstruir una instancia de la clase correspondiente.
No devuelvas objetos planos cuando la operación requiera una instancia de `Content`, `Catalog`, `LibraryEntry` o `Library`.

Prestá especial atención a la reconstrucción de las relaciones entre las clases.

## 6. Separación de responsabilidades
MUY IMPORTANTE:

Estas clases contienen exclusivamente lógica de dominio y reglas de negocio.

Está prohibido utilizar:

- `document`
- `window`
- `querySelector`
- `addEventListener`
- `prompt()`
- `alert()`
- `localStorage`
- `sessionStorage`
Tampoco implementes interfaces gráficas, eventos ni persistencia directamente.

Esas responsabilidades pertenecen a los otros roles de la actividad:

- Desarrollador JS Eventos + DOM.
- Desarrollador JS Storage.
Las clases deberán ser reutilizables y testeables sin necesitar un navegador ni manipulación del DOM.

## 7. Módulos JavaScript
Implementá las clases como módulos ES6.

Cada archivo debe exportar su clase mediante exportaciones nombradas (`export class ...`).

Utilizá imports relativos cuando una clase necesite utilizar otra, respetando las rutas y los nombres de archivos exactos:

- `Content.js`
- `Catalog.js`
- `LibraryEntry.js`
- `Library.js`
No agregues dependencias externas.

No modifiques todavía el controlador `js/script.js`. El responsable de Eventos + DOM se encargará de integrarlo utilizando imports ES6 y el atributo `type="module"` en el punto de entrada HTML.

Tampoco modifiques `index.html`, `js/utils/storage.js` ni los archivos de testing: pertenecen a responsabilidades compartidas con los otros roles.

## 8. Calidad del código

- Utilizá nombres descriptivos en inglés, respetando PascalCase para las clases y camelCase para sus métodos.
- Documentá las clases, constructores y métodos principales con JSDoc.
- Utilizá tipos correctos en los comentarios JSDoc.
- Validá entradas y manejá errores de manera consistente.
- Evitá duplicación de código.
- Mantené un diseño simple y mantenible.
- No introduzcas métodos o funcionalidades que no estén justificadas por el dominio.
- Conservá los comportamientos de la lógica original de la Actividad 3.
Cuando una operación falle, utilizá excepciones apropiadas en los constructores o métodos de creación de objetos inválidos. En las operaciones de negocio que el diagrama define con retorno booleano, devolvé `true` o `false` según el resultado.

## 9. Archivos que tenés que crear
Creá únicamente estos cuatro archivos nuevos:

- `js/models/Content.js`
- `js/models/Catalog.js`
- `js/models/LibraryEntry.js`
- `js/models/Library.js`
No crees otros archivos ni modifiques documentos existentes.

## 10. Verificación antes de finalizar
Después de generar los archivos:

1. Revisá que las cuatro clases coincidan con el diagrama de clases.
2. Verificá que los imports y exports sean correctos.
3. Comprobá que no existan accesos al DOM, eventos, prompt, alert o Storage API.
4. Revisá los métodos `toJSON()` y `fromJSON()`.
5. Verificá que las reglas de negocio originales se mantengan.
6. Señalá cualquier diferencia entre el diagrama y la implementación.
7. Indicá cómo se pueden utilizar las clases desde el futuro controlador.
No inventes resultados de ejecución de pruebas que todavía no se hayan realizado.

Al finalizar, proporcioná un resumen de los archivos creados, las responsabilidades de cada clase, las decisiones de diseño y cualquier observación que deba revisar manualmente.

Comenzá analizando todo el contexto adjunto y luego implementá las cuatro clases en `js/models/`.
```

Los archivos especificados como contexto de la implementación fueron `index.html`, `js/script.js`, este spec, los cuatro diagramas de actividades de la Actividad 3 y los archivos del diagrama de clases. Este registro de archivos no sustituye el registro literal del prompt.

### 3.4 Integración y coordinación pendiente

- **Eventos + DOM:** se espera que el controlador importe las clases ES6, cree el `Catalog` desde instancias `Content`, inicialice la biblioteca con `Library.createInitial(catalog)` o la reconstruya desde datos, y utilice los métodos públicos para buscar, administrar favoritos, cambiar estados y calificar. La coordinación del contrato final y la integración con `js/script.js` todavía debe confirmarse con el responsable de ese rol.
- **Storage:** se espera que la capa de persistencia almacene las representaciones serializables de catálogo y biblioteca y reconstruya las instancias con sus respectivos `fromJSON()`. El formato persistido, las claves y el flujo de recuperación deben acordarse con el responsable de Storage. Los modelos no acceden directamente a `localStorage` ni `sessionStorage`.
- **Testing:** las clases son independientes del navegador y se pueden importar para pruebas. Jasmine no se ejecutó ni se declara como ejecutado en este cierre.

### 3.5 Alcance de los criterios marcados

Los checks de la sección 2.9 se basan en inspección estática de los archivos indicados y en la existencia del PNG. No certifican ejecución de pruebas ni coordinación externa. Los criterios que dependen del historial Git o de acuerdos con otros roles permanecen pendientes de evidencia.
