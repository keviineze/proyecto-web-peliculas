# Documentación de Estrategia de Almacenamiento (Storage API)

## 1. Estrategia de Almacenamiento y Justificación

Para la persistencia de datos de Mini Letterboxd, se ha implementado un enfoque híbrido:

### Datos en `localStorage` (Persistente)
*   **Qué se guarda:** La biblioteca personal del usuario (películas/series, estados, calificaciones).
*   **Justificación:** Garantiza que el progreso del usuario no se pierda al cerrar el navegador, actuando como base de datos principal cliente.

### Datos en `sessionStorage` (Temporal)
*   **Qué se guarda:** Datos volátiles como filtros de búsqueda activos.
*   **Justificación:** Mantiene limpia la memoria persistente y evita que filtros viejos afecten nuevas sesiones.

---

## 2. Convención de Nombres de Claves (Key Naming Convention)

Se aplica el patrón estructurado: `app:dominio:entidad`
*   `mlb:biblioteca:listaPersonal` (En localStorage)
*   `mlb:sesion:filtrosActivos` (En sessionStorage)

---

## 3. Estructura de Datos (JSON Schemas) y Coordinación con POO

### Integración con Clases del Dominio (`toJSON` y `fromJSON`)
`StorageAPI` serializa y parsea valores JSON. `LibraryStorage` coordina la persistencia de la biblioteca y utiliza los modelos para reconstruir el estado:
1. **Guardar:** `Library.toJSON()` devuelve un array de objetos planos `LibraryEntry`; `LibraryStorage.guardar()` entrega ese array a `StorageAPI.guardar()`.
2. **Recuperar:** `StorageAPI.obtener()` devuelve objetos literales. `LibraryStorage.cargar(catalog)` los valida con `LibraryEntry.fromJSON()`, descarta registros inválidos o de contenidos que no existen en el catálogo, fusiona los restantes sobre `Library.createInitial(catalog)` y guarda el resultado normalizado.
3. **Cambios:** `LibraryStorage.cambiar(library, cambio)` guarda el estado completo después de una mutación. Si la mutación es rechazada o la escritura falla, devuelve una copia del estado anterior junto con un error tipado (`domain` o `storage`).

### Esquemas serializados por los modelos

`Library.toJSON()` devuelve un array; cada elemento es exactamente el resultado de `LibraryEntry.toJSON()`. No contiene instancias `Content`, identificadores `id`/`entryId`, ni campos de fecha.

| Modelo | Forma que devuelve `toJSON()` |
| --- | --- |
| `Content` | `{ "id": string, "title": string, "type": "Película" \| "Serie", "year": number, "genres": string[], "initialStatus": "pending" \| "watched" }` |
| `Catalog` | Array de objetos `Content` con la forma anterior. |
| `LibraryEntry` | `{ "titleId": string, "status": "pending" \| "watched", "isFavorite": boolean, "rating": number \| null }` |
| `Library` | Array de objetos `LibraryEntry` con la forma anterior. |

`rating` es un entero entre 1 y 5 o `null`; un registro con calificación siempre tiene `status: "watched"`. Los estados serializados usan los valores de dominio `pending` y `watched`, no etiquetas traducidas.

### Ejemplo real guardado en `mlb:biblioteca:listaPersonal`

La clave contiene el array devuelto por `Library.toJSON()`. Este ejemplo corresponde al estado inicial del catálogo de la aplicación:

```json
[
  {
    "titleId": "interstellar",
    "status": "pending",
    "isFavorite": false,
    "rating": null
  },
  {
    "titleId": "el-viaje-de-chihiro",
    "status": "watched",
    "isFavorite": false,
    "rating": null
  },
  {
    "titleId": "dark",
    "status": "pending",
    "isFavorite": false,
    "rating": null
  }
]