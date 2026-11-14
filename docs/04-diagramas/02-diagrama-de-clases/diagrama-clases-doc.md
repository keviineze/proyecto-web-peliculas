# Diagrama de Clases — Mini Letterboxd

## 1. Objetivo

Este diagrama representa la arquitectura orientada a objetos desarrollada para la Actividad Obligatoria N.º 4.

Su objetivo es separar las entidades y reglas de negocio de la aplicación, facilitando la integración con el controlador principal, la capa de almacenamiento y las pruebas automatizadas.

## 2. Clases identificadas

### Content

Representa un contenido audiovisual del catálogo, ya sea una película o una serie.

Contiene información general como identificador, título, tipo, año y géneros.

No administra favoritos ni calificaciones, ya que esos datos pertenecen al estado personal del usuario.

También contiene `initialStatus` (`pending` o `watched`), utilizado como estado predeterminado para inicializar la biblioteca.

### Catalog

Administra la colección de objetos Content.

Permite consultar todos los contenidos, buscar por identificador o título y filtrar el catálogo.

### LibraryEntry

Representa el registro personal de un contenido dentro de la biblioteca.

Almacena el identificador del contenido, su estado, si está marcado como favorito y su calificación.

Incluye validaciones para impedir estados y calificaciones inválidos. Sus campos son `titleId`, `status`, `isFavorite` y `rating`. `setStatus()` no permite cambiar el estado a `pending` si el registro ya tiene una calificación. `setRating(null)` permite quitar una calificación existente.

### Library

Administra los registros personales mediante una colección de objetos LibraryEntry.

Centraliza las operaciones de favoritos, estados y calificación, y permite recuperar los contenidos correspondientes mediante Catalog. Clona los registros recibidos en el constructor; `getEntries()` y `findEntry()` también devuelven copias independientes. El método `setStatus(titleId, status)` busca el registro interno y delega la validación del nuevo estado a `LibraryEntry.setStatus()`, sin exponer referencias a los registros internos.

## 3. Relaciones entre clases

- **Catalog y Content — Agregación:** el catálogo agrupa contenidos disponibles.
- **Library y LibraryEntry — Composición:** los registros personales pertenecen a una biblioteca.
- **LibraryEntry y Content — Asociación:** cada registro identifica un contenido mediante titleId.
- **Library y Catalog — Dependencia:** la biblioteca consulta el catálogo para resolver los contenidos asociados.

No se utiliza herencia porque las clases identificadas no presentan una relación de especialización que la justifique.

## 4. Encapsulamiento

Las propiedades internas de las clases se mantendrán privadas.

El acceso a los datos se realizará mediante métodos públicos y getters, evitando que otros módulos modifiquen directamente el estado interno de los objetos.

## 5. Separación de responsabilidades

- `js/models/`: contiene las clases y la lógica de negocio.
- `js/script.js`: actúa como controlador de eventos y manipulación del DOM.
- `js/utils/storage.js`: administra la persistencia mediante localStorage y sessionStorage.

Las clases del dominio no accederán directamente al DOM, a eventos ni a las APIs de almacenamiento.

## 6. Serialización

Las clases implementarán:

- `toJSON()`: devuelve una representación plana de la instancia.
- `fromJSON(json)`: reconstruye una instancia a partir de datos serializados.

Esto permitirá que el módulo Storage almacene y recupere objetos sin perder su comportamiento de clase.

## 7. Archivos relacionados

- `diagrama-clases.puml`: código fuente editable de PlantUML.
- `diagrama-clases.png`: representación visual del diagrama.
- `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`: planificación y evidencias del rol.
