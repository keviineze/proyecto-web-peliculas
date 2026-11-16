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
El módulo `StorageAPI` opera exclusivamente con strings JSON. La responsabilidad de la serialización recae en las clases del dominio:
1. **Guardar:** Antes de llamar a `StorageAPI.guardar()`, las instancias de `Library` llaman internamente a su método `toJSON()`, devolviendo objetos literales puros.
2. **Recuperar:** Tras llamar a `StorageAPI.obtener()`, los datos recuperados son devueltos como objetos literales. El Desarrollador POO debe pasarlos por el método estático `LibraryEntry.fromJSON()` para reconstruir los prototipos y métodos.

### Ejemplo Real de Schema (`mlb:biblioteca:listaPersonal`)
El siguiente esquema muestra cómo se guardan las instancias de `LibraryEntry` (conteniendo `Content`) en el array principal de la biblioteca:

```json
[
  {
    "id": "entry-169990123",
    "content": {
      "id": "c-101",
      "title": "Inception",
      "type": "Movie"
    },
    "status": "Visto",
    "rating": 5,
    "addedAt": "2026-11-15T20:00:00.000Z"
  }
]