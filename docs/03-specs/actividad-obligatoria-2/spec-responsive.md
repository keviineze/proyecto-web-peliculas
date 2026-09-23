# Especificación de Responsive Design - Actividad Obligatoria 2

## 1. Planificación Previa

### Breakpoints a Implementar
Se definen los siguientes breakpoints basados en las prácticas Mobile-First para garantizar la correcta adaptación del contenido del mockup:

*   **Mobile (por defecto):** `< 768px`. La estructura base del sitio y de los componentes asume una disposición vertical de una sola columna para maximizar el espacio de lectura en celulares.
*   **Tablet (`min-width: 768px`):** Para pantallas medianas. Ajustaremos márgenes, redistribuiremos elementos en filas de dos columnas cuando sea necesario y reescalaremos la tipografía.
*   **Desktop (`min-width: 1024px`):** Para pantallas grandes. Se aprovechará todo el ancho del diseño del mockup, desplegando los elementos complejos en múltiples columnas y manteniendo los márgenes laterales de contención (contenedores máximos).

### Enfoque de Layout
*   **CSS Flexbox:** Se utilizará como motor principal para alineaciones de 1 dimensión, como las barras de navegación, alineación de botones con textos, y la disposición de las tarjetas dentro de los contenedores.
*   **CSS Grid:** Se utilizará estratégicamente para la disposición general de la página (2 dimensiones), especialmente en la grilla de las películas donde necesitamos mantener filas y columnas rígidas y simétricas en resoluciones de Tablet y Desktop.

### Criterios de Aceptación
- [ ] Breakpoints definidos y documentados (mobile, tablet, desktop).
- [ ] Layout mobile-first implementado.
- [ ] Todas las secciones del mockup se adaptan correctamente en los tres breakpoints.
- [ ] No hay overflow horizontal en ningún dispositivo.
- [ ] Pruebas de integración realizadas con el Desarrollador Frontend en GitHub Pages y localhost.