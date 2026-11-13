# Spec - Desarrollador JS Storage

## MOMENTO 1: ANTES de escribir código

### 1. Estrategia de almacenamiento
Para gestionar la persistencia de datos de Mini Letterboxd, la estrategia será:
- **`localStorage` (Persistente):** Se utilizará para guardar la biblioteca personal del usuario (títulos, estados y calificaciones). Esto garantiza que la información vital no se pierda al cerrar el navegador.
- **`sessionStorage` (Temporal):** Se utilizará para guardar datos volátiles de la sesión actual (como filtros aplicados o últimas búsquedas). Mantiene el storage principal limpio de datos descartables.

### 2. Convención de claves (Key Naming Convention)
Se aplicará el patrón estructurado `app:dominio:entidad` para evitar colisiones:
- `mlb:biblioteca:listaPersonal`
- `mlb:sesion:filtrosActivos`

### 3. Criterios de Aceptación (Checklist)
- [ ] Módulo `js/utils/storage.js` creado.
- [ ] Funciones CRUD completas (`guardar`, `obtener`, `actualizar`, `eliminar`, `listar`, `limpiar`).
- [ ] Manejo robusto de errores (`try-catch`, storage lleno).
- [ ] Serialización/deserialización automática de JSON.
- [ ] Documentación detallada en `docs/06-storage/storage-doc.md`.