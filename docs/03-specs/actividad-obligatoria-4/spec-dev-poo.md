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

El campo `initialStatus`, utilizado actualmente para inicializar los registros de ejemplo, será evaluado para evitar mezclar los datos propios del catálogo con el estado personal del usuario.

### 2.3 Identificación de clases

Se propone inicialmente una arquitectura de cuatro clases.

#### Clase Content

Representa una película o serie disponible en el catálogo.

**Propiedades previstas:**

- `id`
- `title`
- `type`
- `year`
- `genres`

**Métodos previstos:**

- `constructor()`
- Validaciones de sus propiedades.
- `toJSON()`
- `static fromJSON(json)`

#### Clase Catalog

Administra el conjunto de contenidos disponibles.

**Propiedades previstas:**

- `contents`: colección de instancias de `Content`.

**Métodos previstos:**

- `constructor(contents)`
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

- `constructor()`
- `addFavorite()`
- `removeFavorite()`
- `setStatus(status)`
- `setRating(rating)`
- Validaciones internas.
- `toJSON()`
- `static fromJSON(json)`

#### Clase Library

Administra la colección de registros personales del usuario.

**Propiedades previstas:**

- `entries`: colección de instancias de `LibraryEntry`.

**Métodos previstos:**

- `constructor(entries)`
- `addFavorite(content)`
- `removeFavorite(titleId)`
- `getFavorites()`
- `getUnratedWatchedContents()`
- `rateContent(titleId, rating)`
- `toJSON()`
- `static fromJSON(json)`

Los métodos y propiedades definitivos podrán ajustarse durante la implementación, justificando cualquier modificación en la sección AT CLOSE.

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
- [ ] El spec está commiteado antes de crear cualquier archivo dentro de `js/models/`.
- [ ] Se identifican al menos tres clases del dominio.
- [ ] Se definen sus propiedades, métodos y relaciones.
- [ ] Se acuerdan las interfaces públicas con los otros roles.

#### Diagrama de clases

- [ ] Se crea el diagrama UML mediante PlantUML.
- [ ] Se representan todas las clases implementadas.
- [ ] Se incluyen propiedades, métodos, tipos de datos y relaciones.
- [ ] Se incluyen las multiplicidades correspondientes.
- [ ] Se exportan los archivos `.puml` y `.png`.
- [ ] Se documentan las responsabilidades y decisiones de diseño.

#### Implementación POO

- [ ] Se crean al menos tres clases dentro de `js/models/`.
- [ ] Las clases poseen constructores apropiados.
- [ ] Se implementan propiedades y métodos con responsabilidades claras.
- [ ] Se aplican validaciones internas.
- [ ] Se utiliza encapsulamiento adecuado.
- [ ] Se documentan las clases y métodos relevantes mediante JSDoc.
- [ ] Se implementan `toJSON()` y `fromJSON()`.
- [ ] Se conserva la separación entre lógica de negocio, DOM, eventos y almacenamiento.
- [ ] Se coordina la integración con los demás desarrolladores.

### 2.10 Alcance y exclusiones

Este rol se concentra en la arquitectura orientada a objetos y la lógica de negocio.

Quedan fuera de su responsabilidad directa:

- La implementación de eventos y manipulación del DOM en `js/script.js`.
- La implementación de la capa de almacenamiento en `js/utils/storage.js`.
- La creación y ejecución de las suites de testing.
- La administración general de la release y la coordinación DevOps.

Estas tareas corresponden a los roles asignados en la Actividad Obligatoria N.º 4.

## 3. Momento 2 — AT CLOSE

**Se completará al finalizar la implementación.**

Se documentará:

- El prompt exacto utilizado en GitHub Copilot Agent Mode, en bloque de código.
- Los archivos adjuntos utilizados como contexto: diagramas de actividades `.puml`, `index.html` y este spec.
- Fragmentos representativos del código generado para al menos una clase.
- Los ajustes manuales efectuados y su justificación.
- Las decisiones finales sobre la arquitectura de clases.
- La coordinación realizada con los responsables de Eventos + DOM, Storage y Testing.
- Las evidencias del diagrama de clases y de la implementación final.

No se registrarán como completados los elementos que todavía no cuenten con evidencia verificable.