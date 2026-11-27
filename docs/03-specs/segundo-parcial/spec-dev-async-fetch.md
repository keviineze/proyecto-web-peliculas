# Spec — Desarrollador JS Asíncrono (Fetch & APIs)

## 1. Selección y justificación de la fuente de datos
- **Fuente seleccionada:** Archivo JSON estático local ubicado en `api/data.json`, consumido de forma asíncrona mediante `fetch()`.
- **Justificación técnica:** Permite simular el consumo de una API REST manteniendo el catálogo curado del proyecto (Mini Letterboxd), evita bloqueos por CORS, límites de peticiones (rate limits) o caídas de servicios externos durante la evaluación y facilita las pruebas automatizadas con Jasmine y Lighthouse.

## 2. Diseño de estados de carga y procesamiento de datos
- **Estados de UI:**
  - `loading`: muestra un indicador visual de carga en el contenedor del catálogo mientras se resuelve la promesa.
  - `success`: oculta el indicador, renderiza las tarjetas en el DOM y actualiza las métricas del catálogo.
  - `error`: oculta el indicador y muestra un mensaje amigable con opción de reintentar la carga.
- **Funciones de orden superior:**
  - `map()`: normalizar y sanitizar los objetos crudos del JSON al formato esperado por las clases del dominio (`Content`).
  - `filter()`: descartar registros inválidos o incompletos y filtrar por tipo/género/búsqueda.
  - `reduce()`: calcular estadísticas agregadas del catálogo (por ejemplo, conteo por tipo o duración promedio).

## 3. Criterios de aceptación
- [ ] `js/api/apiService.js` implementado con `fetch`, `async/await`, `try-catch` y comentarios JSDoc.
- [ ] Estados `loading`, `success` y `error` reflejados en la interfaz.
- [ ] Datos sanitizados y procesados con `map()`, `filter()` y `reduce()`.
- [ ] Integración con las clases POO existentes y el DOM sin romper la suite de Jasmine actual.
- [ ] Casos de test coordinados con Tester QA (`@keviineze`) para `api.spec.js`.