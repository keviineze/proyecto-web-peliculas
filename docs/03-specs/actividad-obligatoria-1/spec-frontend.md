# Especificación Técnica: Estructura HTML Inicial

**Rol:** Desarrollador Frontend  
**Entrega:** Actividad Obligatoria N° 1  
**Rama:** `feature/frontend-add-html-structure`

## 1. Qué se hará

Se construirá la estructura HTML5 inicial de la página web de películas y series, inspirada en una mini versión de Letterboxd. La implementación se realizará a partir del mockup entregado por el Documentador/UX y respetará la organización visual y los contenidos definidos para esta primera entrega.

El alcance incluye:

- definir la estructura mínima del documento HTML5 (`doctype`, idioma, metadatos y título);
- organizar la página mediante etiquetas semánticas como `header`, `nav`, `main`, `section`, `article`, `aside` y `footer`;
- incorporar una cabecera con el nombre del proyecto y enlaces de navegación;
- agregar una presentación del proyecto mediante títulos y párrafos;
- incluir un catálogo inicial de películas o series con títulos, imágenes, sinopsis, géneros y datos relevantes;
- incorporar listas para géneros, categorías o estados de la biblioteca;
- agregar una tabla con información comparable del catálogo, como título, tipo, año y estado;
- incluir un formulario HTML relacionado con la búsqueda o filtrado del catálogo;
- utilizar textos alternativos descriptivos en las imágenes y enlaces con destinos identificables;
- agregar comentarios claros que indiquen dónde se aplicarán CSS y JavaScript en futuras entregas.

No se implementarán estilos visuales ni lógica interactiva en esta tarea. La estructura deberá quedar preparada para que el CSS y el JavaScript puedan incorporarse sin modificar la organización semántica principal.

## 2. Por qué

La estructura HTML es la base del proyecto interactivo y permite validar primero el contenido, la jerarquía de la información y la accesibilidad antes de incorporar presentación y comportamiento. El uso de HTML semántico favorece la navegación con tecnologías de asistencia, mejora la comprensión del documento por parte de los buscadores y facilita la evolución futura hacia un catálogo dinámico.

Además, dejar identificadas las áreas de CSS y JavaScript permite que los próximos roles trabajen sobre puntos de integración conocidos, manteniendo la separación entre estructura, presentación y comportamiento.

## 3. Criterios de implementación

- El archivo principal será `index.html` en la raíz del repositorio.
- El documento utilizará HTML5 válido y declarará `lang="es"`.
- La jerarquía de encabezados será lógica, con un único `h1` principal y subtítulos ordenados.
- Los elementos de navegación se implementarán con enlaces reales y textos comprensibles fuera de contexto.
- Cada imagen tendrá un atributo `alt` pertinente; las imágenes decorativas podrán utilizar `alt=""`.
- El formulario tendrá etiquetas `label` asociadas a sus controles y un botón de envío identificable.
- La tabla tendrá encabezados mediante `th` y una relación clara entre encabezados y datos.
- Las listas se utilizarán para colecciones de elementos, no como recurso de maquetación.
- Los comentarios del código marcarán las futuras zonas de estilos CSS y comportamiento JavaScript.
- El contenido será coherente con el proyecto definido en `plan.md` y con el mockup de UX.
- No se agregarán dependencias ni código JavaScript funcional en esta entrega.

## 4. Criterios de aceptación

- [ ] Existe `docs/specs/spec-frontend.md` y fue redactado antes de modificar la estructura principal.
- [ ] `index.html` contiene una estructura HTML5 completa y semántica.
- [ ] La página incluye título, párrafos, imágenes, enlaces, listas, formulario y tabla relacionados con películas o series.
- [ ] La página incluye metadatos básicos, idioma declarado y una jerarquía de encabezados accesible.
- [ ] Las imágenes poseen texto alternativo y los controles del formulario poseen etiquetas asociadas.
- [ ] La tabla contiene encabezados y datos legibles.
- [ ] El código HTML incluye comentarios concisos sobre las futuras integraciones de CSS y JavaScript.
- [ ] La estructura permite agregar posteriormente tarjetas, filtros, estados de visualización, calificaciones y comentarios sin rehacer el documento.
- [ ] El archivo se puede abrir en un navegador moderno sin errores de marcado visibles.
- [ ] El PR incluye esta especificación y la actualización de `index.html`.

## 5. Validación prevista

Antes de solicitar la revisión del PR se realizará una comprobación manual de `index.html` en un navegador moderno para verificar la jerarquía visual sin estilos, la navegación de los enlaces, la lectura del formulario y la correcta interpretación de la tabla. También se revisará el marcado con un validador HTML5 y se comprobará que no existan referencias rotas a recursos incluidos en esta entrega.

## 6. Fuera de alcance

- estilos CSS, diseño responsive y adaptación visual completa del mockup;
- filtros, búsqueda dinámica o cambios de estado en tiempo real;
- persistencia mediante `localStorage`;
- calificaciones, comentarios editables y listas personalizadas funcionales;
- conexión con APIs, backend o base de datos;
- documentación de prompts de IA, responsabilidad correspondiente al rol de IA y Prompt Engineering.
