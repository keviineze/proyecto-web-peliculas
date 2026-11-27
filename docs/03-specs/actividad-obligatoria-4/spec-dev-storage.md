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
- [x] Módulo `js/utils/storage.js` creado.
- [x] Funciones CRUD completas (`guardar`, `obtener`, `actualizar`, `eliminar`, `listar`, `limpiar`).
- [x] Manejo robusto de errores (`try-catch`, storage lleno).
- [x] Serialización/deserialización automática de JSON.
- [x] Documentación detallada en `docs/06-storage/storage-doc.md`.

## MOMENTO 2: AT CLOSE (Después de la ejecución)

### Evidencias de Generación (Copilot Agent Mode)
- **Archivos adjuntados como contexto:** `js/models/` y `docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md`.
- **Prompt utilizado:**
  ```text
  Generame el módulo js/utils/storage.js exportando un objeto StorageAPI. Debe incluir las funciones CRUD (guardar, obtener, actualizar, eliminar, listar y limpiar). Agregá try-catch en todas las funciones. En guardar() manejá el error QuotaExceededError. En obtener() parseá el JSON y si falla lanzá un error de datos corruptos. Permití elegir entre localStorage y sessionStorage mediante un parámetro.
  ```

  - **Fragmento generado por Copilot (`js/utils/storage.js`):**
  ```javascript
  guardar(clave, valor, tipo = 'local') {
    try {
      const storage = obtenerStorage(tipo);
      const serializado = JSON.stringify(valor);
      storage.setItem(clave, serializado);
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error(`[Storage Error] Cuota excedida al guardar "${clave}".`, error);
      } else {
        console.error(`[Storage Error] No se pudo serializar o guardar "${clave}".`, error);
      }
      return false;
    }
  }

### Ajustes Manuales y Coordinación
- Mejora de errores: Se añadieron prefijos [Storage Error] y [Storage Warning] en los console.error para identificar rápidamente problemas de persistencia en la consola, diferenciándolos de errores de UI.
- Coordinación con POO: Se acordó con el desarrollador de POO que el Storage solo guarda y devuelve objetos literales (JSON). La reconstrucción a instancias de clases (Content, LibraryEntry) es responsabilidad del módulo POO usando sus propios métodos fromJSON().