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

## 3. Estructura de Datos (JSON Schemas)

Los objetos serializados respetarán este schema base:
```json
[
  {
    "id": "12345",
    "titulo": "Inception",
    "estado": "visto",
    "calificacion": 5
  }
]