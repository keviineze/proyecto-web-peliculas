# Spec — Desarrollador JS Asíncrono (Fetch & APIs)

## ANTES

### Fuente de datos
- **Fuente seleccionada:** Archivo JSON estático local ubicado en `api/data.json`, consumido de forma asíncrona mediante `fetch()`.
- **Justificación técnica:** Permite simular el consumo de una API REST manteniendo el catálogo curado del proyecto (Mini Letterboxd) y evita dependencias de servicios externos durante la evaluación.

### Diseño de estados y procesamiento
- **Estados de UI:**
  - `loading`: muestra un indicador visual de carga en el contenedor del catálogo mientras se resuelve la promesa.
  - `success`: confirma la carga con un mensaje visible y el número de títulos, renderiza las tarjetas y actualiza las métricas.
  - `error`: muestra un mensaje amigable con opción de reintentar y deja el catálogo y la biblioteca en un estado vacío seguro.
- **Funciones de orden superior:**
  - `map()`: normaliza y sanitiza los objetos crudos del JSON al formato esperado por las clases del dominio (`Content`).
  - `filter()`: descarta registros inválidos y permite filtrar por tipo, género o búsqueda.
  - `reduce()`: calcula estadísticas agregadas del catálogo (por ejemplo, conteo por tipo o duración promedio).

## AL CERRAR

### Criterios de aceptación
- [x] `js/api/apiService.js` implementado con `fetch`, `async/await`, `try-catch` y comentarios JSDoc.
- [x] Estados `loading`, `success` y `error` reflejados en la interfaz.
- [x] Datos sanitizados y procesados con `map()`, `filter()` y `reduce()`.
- [x] Integración con las clases POO existentes y el DOM; la suite Jasmine existente pasa.
- [x] Suite `api.spec.js` y auditoría Lighthouse post-fetch coordinadas para Tester QA (`@keviineze`) tras el merge a `develop`.

### Evidencia de cierre
#### Prompt utilizado
```text
Implementa el rol de Desarrollador JS Asíncrono (Fetch & APIs) siguiendo spec-dev-async-fetch.md: crear api/data.json con 6 títulos válidos, js/api/apiService.js con fetch/async-await/try-catch, JSDoc, validación/sanitización, map/filter/reduce y estados loading/success/error integrados con js/script.js y las clases POO.
```

#### Ajustes manuales realizados
- Se reemplazaron los pósters SVG generados inicialmente por imágenes reales en formato .webp en assets/images/ (la-la-land.webp, la-llegada.webp, stranger-things.webp).
- Se ajustó el sanitizador de `js/api/apiService.js` para aceptar extensiones locales .webp y asegurar el renderizado completo de sinopsis y duración/temporadas.
- Se inicializan `catalog` y `library` con instancias vacías seguras si falla la carga, y se muestra una confirmación visible del estado `success` junto al número de títulos cargados.

#### Integración con POO y Storage
Los ítems obtenidos de `api/data.json` se normalizan y sanitizan en `ApiService`, se instancian con las clases del dominio en `js/models/` y se sincronizan con la persistencia existente en `js/utils/storage.js`, manteniendo compatibilidad con el fixture de Jasmine.

#### Issues y coordinación
- Issue asociada: #108
- La suite `api.spec.js` y la auditoría Lighthouse post-fetch quedan coordinadas para el rol Tester QA (`@keviineze`) tras el merge a `develop`. No se crea `api.spec.js` ni se modifica `js/test/test-runner.html` en este cambio.
