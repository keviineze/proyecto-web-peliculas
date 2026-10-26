# 🎬 Mini Letterboxd Front End

## 🎓 Datos académicos

- **Carrera:** Tecnicatura Universitaria en Programación de Sistemas
- **Materia:** Programación Web I
- **Proyecto:** Mini Letterboxd Front End

## 📖 Descripción

Mini Letterboxd Front End es una aplicación web estática para explorar películas y series, organizar una biblioteca personal y registrar la experiencia del usuario con cada título. El proyecto toma como referencia la propuesta de Letterboxd y se desarrollará progresivamente durante la cursada.

La aplicación funcionará como un simulador de seguimiento de contenido audiovisual. Permitirá consultar un catálogo, crear una lista de títulos pendientes, marcar contenidos como vistos, asignar calificaciones, escribir comentarios y compartir una representación de la lista desde el navegador, sin utilizar backend ni base de datos.

## 🎯 Objetivo de la tercera entrega

Incorporar la lógica de negocio principal con JavaScript puro, modelar cuatro flujos mediante diagramas de actividades y validar la lógica con pruebas automatizadas de Jasmine en navegador. La implementación debe mantenerse alineada con el mockup vigente, los diagramas aprobados y los requisitos de [`plan.md`](plan.md).

En esta etapa se trabaja con `prompt()`, `alert()` y/o `console.log()`. No se debe incorporar manipulación del DOM ni eventos, ya que están previstos para una entrega posterior.

## 📁 Documentación

- 📁 **[Mockup Bootstrap](docs/01-mockup/disenio-bootstrap.png)** - **[Figma](https://www.figma.com/design/aavw8ufOkinPXlXFVs9k7q/Proyecto-Web-Peliculas-Mockup-Bootstrap?node-id=2003-65&t=eVzgsTytu6vEXB5r-0)**

## 👥 Integrantes del grupo

| Nombre completo | N.º de matrícula | Usuario de GitHub                                    | Rol en esta entrega                                                            |
| --------------- | ---------------: | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| David Soria     |           153203 | [@Davidsoria99](https://github.com/Davidsoria99)     | Arquitecto de Diagramas de Actividades                                         |
| Kevin Sosa  |           154080 | [@keviineze](https://github.com/keviineze) | Coordinador/DevOps y Tester JavaScript/QA Engineer                                           |
| Gonzalo Barbano      |           152127 | [@GonzaloBarbano](https://github.com/GonzaloBarbano)           | Desarrollador Javascript                                    |

Los roles de la tercera entrega se asignan según la consigna de la Actividad Obligatoria N.° 3. En grupos de tres integrantes, el Coordinador / DevOps asume también las tareas de Tester JavaScript / QA Engineer, manteniendo una rama `feature/` separada para cada rol.

## Objetivo

Construir una aplicación estática, clara y escalable que permita al usuario llevar un registro personal de las películas y series que desea ver o ya vio. La experiencia estará orientada a la catalogación, el seguimiento y la interacción con la biblioteca personal, sin requerir un servidor ni una cuenta de usuario.

## Alcance del proyecto

### Primera entrega

Esta entrega establece la estructura HTML5 inicial de la página relacionada con películas y series. La interfaz deberá contemplar:

- título y presentación del proyecto;
- textos descriptivos sobre la temática;
- imágenes o posters representativos;
- enlaces de navegación o de consulta;
- listas para organizar información del catálogo y de la biblioteca;
- un formulario base para futuras acciones del usuario;
- una tabla con información de películas o series;
- etiquetas semánticas como `header`, `nav`, `main`, `section`, `article`, `aside` y `footer`, cuando correspondan;
- comentarios HTML que documenten la estructura y marquen las áreas reservadas para CSS y JavaScript.

Esta entrega toma esa estructura como base y agrega la capa visual y el control de calidad.

### Segunda entrega

- Archivos CSS separados por responsabilidad: `css/styles.css`, `css/components.css` y `css/responsive.css`.
- Tipografías, colores, espaciados, componentes y estados coherentes con el mockup.
- Layouts con Flexbox y/o CSS Grid, adaptados a mobile, tablet y desktop sin overflow horizontal.
- QA automatizado con Playwright MCP y registro de bugs mediante GitHub MCP.

## Especificación técnica

El archivo [`plan.md`](plan.md) es la especificación maestra del proyecto. Define el alcance funcional, la estructura esperada, los criterios de aceptación y el flujo de trabajo. Toda tarea debe mantenerse alineada con ese documento.

Antes de comenzar cada tarea, el integrante responsable deberá crear y commitear el spec de su rol antes de la implementación correspondiente. Para la tercera entrega se utilizan los archivos de `docs/03-specs/actividad-obligatoria-3/`. El spec debe explicar:

- qué se va a desarrollar;
- por qué es necesario para el proyecto;
- cuál es el alcance de la tarea;
- cómo se validará;
- qué criterios determinan que está terminada.

Los specs previstos para la tercera entrega son:

- `docs/03-specs/actividad-obligatoria-3/spec-devops.md`
- `docs/03-specs/actividad-obligatoria-3/spec-arq-diagramas.md`
- `docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md`
- `docs/03-specs/actividad-obligatoria-3/spec-tester.md`

Los specs de las entregas anteriores se conservan en sus respectivas carpetas como evidencia histórica.

Un Pull Request no se considerará completo sin el spec correspondiente.

## JavaScript, diagramas y testing — tercera entrega

- El Arquitecto de Diagramas utilizará GitHub Copilot en Agent Mode con `plan.md`, `index.html` y el mockup como contexto para crear cuatro diagramas de actividades PlantUML en formatos `.puml` y `.png`.
- El Desarrollador JavaScript implementará los cuatro flujos en `js/script.js`, utilizando los diagramas y su spec como referencia. La lógica debe ser testeable, separar las funciones de negocio de `prompt()`/`alert()` y no manipular el DOM ni utilizar eventos en esta entrega.
- El Tester JavaScript / QA Engineer generará `js/test/script.spec.js` con Jasmine, utilizando `js/script.js` como contexto; ejecutará `js/test/test-runner.html` en un navegador real mediante Playwright MCP y conservará capturas reales de los resultados.
- El Coordinador / DevOps revisará las PR con apoyo de Copilot Agent Mode, verificando coherencia con `plan.md`, los diagramas y el mockup, y documentará las observaciones y solicitudes de cambios.
- Cada rol documentará los prompts, resultados y ajustes manuales en su spec. Las métricas y evidencias de testing se registrarán en `js/test/testing-doc.md` siguiendo la plantilla del profesor.

## Tecnologías

- HTML5 para la estructura y el contenido semántico.
- CSS3 para la maquetación visual y responsive.
- JavaScript para la interactividad y la gestión del estado local.
- Git y GitHub para el control de versiones y la revisión mediante Pull Requests.
- Navegadores modernos como entorno de ejecución.

No se utilizará backend ni base de datos. El estado de la biblioteca se gestionará en el cliente mediante almacenamiento local.

## Flujo de trabajo de la entrega

El equipo trabajará con ramas propias siguiendo el formato:

```text
feature/<rol>-<descripción>
```

Las reglas principales son:

1. Crear cada rama a partir de `develop` y realizar al menos un commit relevante por integrante.
2. Abrir cada Pull Request hacia `develop`.
3. Registrar en `changelog.md` quién realizó cada PR, qué aportó y el enlace correspondiente.
4. Commitear el spec del rol antes de comenzar la implementación asociada.
5. Realizar revisiones funcionales, de código y asistidas por IA.
6. Crear `release/actividad-obligatoria-2` desde `develop` cuando todas las features estén integradas.
7. Integrar cambios en `master` únicamente mediante una release aprobada por el profesor.

`master` es la rama estable y protegida. `develop` es la rama de integración y también estará protegida; sus cambios requieren revisión y aprobación del Coordinador de Repositorio.

## Criterios de calidad

Cada cambio deberá:

- cumplir el objetivo de la tarea y respetar `plan.md`;
- mantener una estructura clara, semántica y accesible;
- utilizar nombres descriptivos y responsabilidades separadas;
- evitar dependencias o complejidad innecesarias;
- comprobarse visualmente en un navegador;
- evitar errores relevantes de consola;
- demostrar que no rompe el comportamiento existente;
- contar con revisión humana y revisión asistida por IA antes del merge.

## Ejecución y estado

El proyecto puede ejecutarse localmente mediante Live Preview en VS Code y validarse contra `http://localhost:3000` o el puerto configurado. También se verificará la integración final en GitHub Pages.

## Documentación de la tercera entrega

- [Plan maestro del proyecto](plan.md)
- [Índice de diagramas de actividades](docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md)
- [Documentación de tests JavaScript](js/test/testing-doc.md)
- [Spec Coordinador / DevOps](docs/03-specs/actividad-obligatoria-3/spec-devops.md)
- [Spec Arquitecto de Diagramas](docs/03-specs/actividad-obligatoria-3/spec-arq-diagramas.md)
- [Spec Desarrollador JavaScript](docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md)
- [Spec Tester JavaScript / QA Engineer](docs/03-specs/actividad-obligatoria-3/spec-tester.md)

Los enlaces a documentos que todavía no estén integrados en la rama actual se habilitarán al incorporarse esos archivos.

## Estado del proyecto

El proyecto mantiene la estructura HTML y el diseño Bootstrap de las entregas anteriores. La tercera entrega incorpora la planificación de cuatro flujos JavaScript, sus diagramas de actividades y las pruebas automatizadas con Jasmine. El avance debe verificarse en las ramas y PR vigentes.

