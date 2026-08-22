# Especificación UX: Mini Letterboxd Front End

## 1. Datos de la especificación

- **Rol responsable:** Documentador / Diseñador UX
- **Proyecto:** Mini Letterboxd Front End
- **Fuente de verdad:** [`plan.md`](../../plan.md)
- **Estado:** Especificación previa al desarrollo
- **Entrega asociada:** Estructura HTML5 inicial y mockup visual del producto
- **Mockup previsto:** [`docs/01-mockup/diseño-inicial.png`](../01-mockup/diseño-inicial.png)

Esta especificación se redacta antes de iniciar nuevas tareas de desarrollo. Su objetivo es registrar las decisiones de experiencia y servir como referencia para el diseño en Figma, la estructura HTML y las revisiones del Pull Request.

## 2. Objetivo

Definir una experiencia clara, accesible y escalable para una aplicación web de seguimiento personal de películas y series. La interfaz debe permitir que una persona entienda rápidamente el propósito del producto, explore contenido audiovisual y reconozca la futura organización de su biblioteca.

La primera entrega se enfoca en la estructura y jerarquía del contenido. No se implementarán estilos CSS ni interacciones JavaScript como requisitos funcionales, pero la organización propuesta debe dejar puntos de extensión claros para las siguientes entregas.

## 3. Consulta realizada a GitHub Copilot

Antes de diseñar el mockup en Figma, se utilizó GitHub Copilot en modo Agente con `plan.md` como contexto.

### Pedido realizado

> Analiza el archivo `plan.md` del proyecto Mini Letterboxd Front End y propone una estructura UX para la primera entrega HTML5. Sugiere el layout general, las secciones principales, la jerarquía visual, los componentes de contenido y los puntos de extensión para CSS y JavaScript. Ten en cuenta que la aplicación debe permitir explorar películas y series, organizar una lista de títulos para ver, marcar contenidos como vistos, calificarlos, comentarlos y compartir la biblioteca, aunque en esta etapa solo se construirá la estructura HTML semántica. Indica también criterios de accesibilidad y qué decisiones conviene reservar para futuras entregas.

## 4. Sugerencias obtenidas

Las sugerencias principales fueron:

1. Organizar la página con una estructura semántica compuesta por `header`, `nav`, `main`, `section`, `article`, `aside` y `footer` según la responsabilidad de cada bloque.
2. Presentar una cabecera con el nombre del proyecto, una breve descripción y navegación hacia las áreas principales de la aplicación.
3. Incluir una sección de introducción que explique el propósito de la biblioteca personal.
4. Mostrar un catálogo inicial mediante tarjetas o artículos repetibles con poster, título, tipo, año, género y sinopsis.
5. Incorporar una sección o panel de biblioteca personal para diferenciar contenidos pendientes y vistos.
6. Dejar un formulario base para una futura búsqueda, filtrado o registro de una valoración y comentario.
7. Usar una tabla para resumir información comparable de películas y series, cumpliendo el requisito académico de la entrega.
8. Mantener acciones y estados identificables mediante texto, etiquetas y una jerarquía consistente, sin depender únicamente del color o de iconos.
9. Preparar puntos de extensión para estilos responsive, persistencia con `localStorage`, calificaciones, comentarios y la función de compartir.
10. Priorizar contenido realista y una interfaz de catálogo antes que una portada de tipo publicitario.

## 5. Decisiones adoptadas

### 5.1 Layout general

Se adoptará un layout vertical de una sola página para la primera entrega, con este orden:

1. **`header`:** nombre de la aplicación y descripción breve.
2. **`nav`:** enlaces internos a Inicio, Catálogo, Mi biblioteca y Acerca del proyecto.
3. **`main`:** contenido principal dividido en secciones independientes.
4. **Sección de bienvenida:** contexto de uso y objetivo de la aplicación.
5. **Sección de catálogo:** contenidos representados como artículos repetibles.
6. **Sección de biblioteca personal:** listas separadas conceptualmente en Para ver y Vistas.
7. **Sección de formulario:** base para buscar, filtrar o registrar información del usuario en etapas posteriores.
8. **Sección de resumen:** tabla con datos comparables del catálogo.
9. **`footer`:** datos del proyecto académico y enlaces relevantes.

Esta disposición permite cumplir los requisitos de la entrega sin bloquear una futura conversión a un layout responsive con CSS.

### 5.2 Jerarquía visual

- Se utilizará un único `h1` para el nombre de la aplicación.
- Cada área principal tendrá un `h2` descriptivo.
- Los artículos de películas y series utilizarán `h3` para sus títulos.
- La información secundaria se agrupará mediante párrafos, listas y datos etiquetados.
- Las acciones futuras se expresarán como controles identificables y con nombres claros.
- Los posters funcionarán como apoyo visual y tendrán texto alternativo descriptivo.
- La jerarquía se basará primero en títulos y contenido semántico; el color, el tamaño y la distribución quedarán para la etapa CSS.

### 5.3 Catálogo

El catálogo se modelará con artículos reutilizables. Cada artículo deberá contemplar, cuando corresponda:

- imagen o poster;
- título;
- tipo de contenido: película o serie;
- año de estreno;
- género;
- sinopsis breve;
- estado del usuario;
- acciones reservadas para agregar a Para ver, marcar como vista, calificar o comentar.

La estructura repetible facilitará que el desarrollador frontend pueda generar más contenidos sin modificar la organización general de la página.

### 5.4 Biblioteca personal

La biblioteca se dividirá en estados reconocibles: **Para ver** y **Vistas** en la primera estructura. Se reservarán referencias para **Calificadas** y **Comentadas**, porque forman parte de la evolución prevista en `plan.md`.

La diferenciación de estados deberá estar disponible mediante texto y estructura HTML, para que más adelante pueda reforzarse con CSS y actualizarse con JavaScript sin depender solo de señales visuales.

### 5.5 Formulario y tabla

Se incluirá un formulario base con etiquetas asociadas a sus controles. En esta entrega podrá ser estático, pero su estructura debe permitir incorporar búsqueda, filtros o carga de comentarios y calificaciones.

La tabla se utilizará para comparar datos del catálogo como título, tipo, año, género y estado. Tendrá encabezados explícitos y una estructura accesible con `caption`, `thead`, `tbody` y `th` cuando corresponda.

### 5.6 Accesibilidad y navegación

- Se emplearán elementos HTML5 semánticos en lugar de contenedores genéricos cuando exista una etiqueta adecuada.
- Los enlaces internos tendrán destinos identificables mediante atributos `id`.
- Cada control de formulario tendrá un `label` asociado.
- Las imágenes tendrán atributos `alt` útiles; las imágenes decorativas podrán usar un texto alternativo vacío.
- Las tablas tendrán encabezados claros.
- No se comunicará un estado únicamente mediante color, iconografía o posición.
- El orden del contenido deberá ser comprensible al recorrerlo con teclado o tecnologías asistivas.
- Se evitarán textos ambiguos en enlaces y acciones.

## 6. Decisiones descartadas o postergadas

- **Dashboard complejo en la primera entrega:** se posterga porque agregaría complejidad visual antes de contar con estilos, datos y lógica de estado.
- **Pantalla de inicio tipo landing page:** se descarta porque el objetivo es que el usuario acceda directamente al catálogo y a su biblioteca, no a una presentación comercial.
- **Sistema de autenticación y perfiles:** queda fuera de alcance porque el proyecto no tendrá backend.
- **Filtros funcionales, calificaciones y comentarios activos:** se dejan preparados en la estructura, pero se implementarán con JavaScript en futuras entregas.
- **Compartir mediante una URL real:** se reserva para la etapa de lógica de aplicación; en esta entrega solo se documentará el espacio de la acción.
- **Dependencia de un framework o una librería visual:** se descarta para mantener la entrega inicial centrada en HTML5 y facilitar la comprensión de la estructura.
- **Decidir una paleta y tipografías definitivas en este documento:** se posterga hasta el diseño visual en Figma y la posterior implementación CSS.

## 7. Alcance de trabajo

### Incluido

- Documentar la propuesta UX previa al desarrollo.
- Definir el layout y la jerarquía visual de la primera pantalla.
- Diseñar en Figma el mockup inicial del producto.
- Exportar el mockup como `docs/01-mockup/diseño-inicial.png`.
- Incluir el enlace al mockup en `README.md`.
- Orientar la estructura semántica de `index.html`.
- Identificar puntos de integración futura con CSS y JavaScript.

### No incluido

- Implementación de estilos CSS.
- Programación de interacciones con JavaScript.
- Persistencia con `localStorage`.
- Backend, autenticación o base de datos.
- Implementación funcional del enlace compartible.
- Carga automática de un catálogo externo.

## 8. Criterios de aceptación

La tarea UX se considerará terminada cuando se cumplan todos los siguientes criterios:

- [ ] Existe `docs/specs/spec-ux.md` y fue redactado antes de iniciar la tarea de desarrollo asociada.
- [ ] El documento explica qué se hará, por qué, el alcance y la forma de validación.
- [ ] Se registra el pedido realizado a GitHub Copilot en modo Agente usando `plan.md` como contexto.
- [ ] Se documentan las sugerencias recibidas, las decisiones adoptadas y las alternativas descartadas o postergadas.
- [ ] El layout propuesto contempla navegación, catálogo, biblioteca personal, formulario, tabla y pie de página.
- [ ] La propuesta respeta el alcance de la primera entrega HTML5 y no presenta como implementadas las funciones futuras.
- [ ] Se definen criterios básicos de accesibilidad para semántica, navegación, imágenes, formularios y tablas.
- [ ] El mockup final se exporta a `docs/01-mockup/diseño-inicial.png`.
- [ ] `README.md` incluye un enlace funcional al mockup.
- [ ] El mockup y la estructura propuesta permiten reconocer las futuras funciones de estados, calificaciones, comentarios y compartir.
- [ ] La propuesta puede validarse visualmente en Figma y revisarse contra este documento durante el Pull Request.

## 9. Validación

La validación se realizará mediante:

1. Revisión manual del contenido de este spec contra `plan.md`.
2. Revisión del mockup en Figma para comprobar el orden de las secciones, la jerarquía y la presencia de las áreas definidas.
3. Verificación de que la imagen exportada existe en `docs/01-mockup/` y que el enlace agregado al `README.md` funciona.
4. Revisión del `index.html` para comprobar que la estructura implementada sigue la propuesta semántica y conserva los puntos de extensión para CSS y JavaScript.
5. Comprobación visual en un navegador moderno y revisión de navegación, legibilidad y estados identificables.

## 10. Resultado esperado

Al finalizar esta tarea, el equipo contará con una referencia UX compartida para construir la primera entrega de la mini biblioteca audiovisual. El documento y el mockup deberán reducir ambigüedades de implementación, mantener la experiencia alineada con `plan.md` y permitir que las próximas entregas agreguen estilos, interactividad y persistencia sin rehacer la estructura principal.
