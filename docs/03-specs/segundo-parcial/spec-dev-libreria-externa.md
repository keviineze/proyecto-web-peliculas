# Spec — Desarrollador JS Librerías Externas (Toastify-js)

## ANTES

### 1. Selección y justificación de la librería
- **Librería seleccionada:** Toastify-js (`v1.12.0`) vía CDN (`jsdelivr`).
- **Issue asociada:** `#109`
- **Justificación técnica:** Es una librería liviana sin dependencias externas que agrega notificaciones flotantes (toasts) no intrusivas, mejora el feedback visual del usuario ante acciones clave, mantiene la estética oscura del proyecto y tiene un impacto mínimo en el rendimiento (Lighthouse).

### 2. Puntos de integración en la aplicación
1. **Gestión de "Mi Lista" (`Agregar` / `Quitar`):** Mostrar una notificación toast confirmando el título agregado o eliminado de la lista.
2. **Acciones de Biblioteca (cambio de estado/calificación o exportación):** Mostrar una notificación toast al actualizar el estado de visualización/calificación o al exportar/copiar la lista.

### 3. Criterios de aceptación
- [ ] CDN (CSS y JS) integrado en `index.html` y configuración encapsulada en `js/utils/notifications.js` con JSDoc.
- [ ] Integración funcional en al menos 2 puntos visibles de la app manteniendo consistencia visual.
- [ ] Documentación técnica completa en `docs/07-librerias/libreria-doc.md` con 2 capturas en `docs/07-librerias/screenshots/`.
- [ ] Suite de Jasmine existente sin regresiones y coordinación con Tester QA (`@keviineze`) para `library.spec.js`.