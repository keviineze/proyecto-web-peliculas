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
- [x] CDN (CSS y JS) integrado en `index.html` y configuración encapsulada en `js/utils/notifications.js` con JSDoc.
- [x] Integración funcional en al menos 2 puntos visibles de la app manteniendo consistencia visual.
- [x] Documentación técnica completa en `docs/07-librerias/libreria-doc.md` con 2 capturas en `docs/07-librerias/screenshots/`.
- [x] Suite de Jasmine existente sin regresiones y coordinación con Tester QA (`@keviineze`) para `library.spec.js`.

## AL CERRAR

### Checklist de cierre
- [x] CDN de Toastify-js `v1.12.0` integrado con `defer` para el JavaScript.
- [x] Notificaciones integradas en puntos visibles, incluyendo Mi Lista y acciones de Biblioteca/exportación.
- [x] Documentación técnica disponible en `docs/07-librerias/libreria-doc.md`.
- [x] Dos capturas disponibles en `docs/07-librerias/screenshots/`.
- [x] Suite Jasmine sin regresiones: 66 specs, 0 failures.

### Prompt utilizado
```text
Implementa el rol de Desarrollador JS Librerías Externas siguiendo docs/03-specs/segundo-parcial/spec-dev-libreria-externa.md: agregar Toastify-js v1.12.0 por CDN con defer en index.html, crear js/utils/notifications.js con JSDoc y fallback seguro para Jasmine, integrar showToast en js/script.js (Mi Lista, estado/calificación y exportación), documentar en docs/07-librerias/libreria-doc.md con 2 capturas y verificar que pasen los tests existentes sin crear library.spec.js.
```

### Evidencia de verificación
- Jasmine: 66 specs, 0 failures (0.445s) sin regresiones.

- Navegador local: Toasts visibles con estética oscura/verde en las acciones integradas y sin errores en consola.

- Documentación: docs/07-librerias/libreria-doc.md y capturas en docs/07-librerias/screenshots/.

### Issues y coordinación
- Issue asociada: #109

- Coordinación QA: Queda disponible tras el merge a develop para que @keviineze (Tester QA) implemente library.spec.js y ejecute la auditoría final.