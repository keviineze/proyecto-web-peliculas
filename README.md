# 🎬 Mini Letterboxd Front End

## 🎓 Datos académicos

- **Carrera:** Tecnicatura Universitaria en Programación de Sistemas
- **Materia:** Programación Web I
- **Proyecto:** Mini Letterboxd Front End

## 📖 Descripción

Mini Letterboxd Front End es una aplicación web estática para explorar películas y series, organizar una biblioteca personal y registrar la experiencia del usuario con cada título. El proyecto toma como referencia la propuesta de Letterboxd y se desarrollará progresivamente durante la cursada.

La aplicación funcionará como un simulador de seguimiento de contenido audiovisual. Permitirá consultar un catálogo, crear una lista de títulos pendientes, marcar contenidos como vistos, asignar calificaciones, escribir comentarios y compartir una representación de la lista desde el navegador, sin utilizar backend ni base de datos.

## 🎯 Objetivo de la cuarta entrega

Migrar el proyecto de un simulador basado en consola a una aplicación web interactiva completa. Esta fase elimina el uso de `prompt()` y `alert()` para implementar una arquitectura orientada a objetos (POO), persistencia de datos mediante la Storage API (`localStorage` y `sessionStorage`), manipulación dinámica del DOM y manejo avanzado de eventos del usuario, manteniendo la cobertura de pruebas automatizadas con Jasmine.

## 📁 Documentación

- 📁 **[Mockup Bootstrap](docs/01-mockup/disenio-bootstrap.png)** - **[Figma](https://www.figma.com/design/aavw8ufOkinPXlXFVs9k7q/Proyecto-Web-Peliculas-Mockup-Bootstrap?node-id=2003-65&t=eVzgsTytu6vEXB5r-0)**

## 👥 Integrantes del grupo

| Nombre completo | N.º de matrícula | Usuario de GitHub                                    | Rol en esta entrega                                                            |
| --------------- | ---------------: | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| David Soria     |           153203 | [@Davidsoria99](https://github.com/Davidsoria99)     | Coordinador / DevOps + Tester QA + Desarrollador JS Storage                                         |
| Kevin Sosa  |           154080 | [@keviineze](https://github.com/keviineze) | Desarrollador JS POO                                           |
| Gonzalo Barbano      |           152127 | [@GonzaloBarbano](https://github.com/GonzaloBarbano)           | Desarrollador JS Eventos + DOM                                    |

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

### Tercera entrega
- Esta entrega integró la lógica de negocio principal con JavaScript puro mediante `prompt()` y `alert()`, modeló cuatro flujos mediante diagramas de actividades UML y validó la lógica con pruebas automatizadas en Jasmine.

### Cuarta entrega
Esta entrega transforma el proyecto en una aplicación interactiva. Se estructura en cuatro pilares principales:
- **Manipulación del DOM y Eventos:** Interfaz responsiva que reacciona a las acciones del usuario sin bloqueos.
- **Programación Orientada a Objetos (POO):** Lógica de negocio encapsulada en clases dentro de `js/models/`.
- **Storage API:** Almacenamiento persistente y de sesión mediante una capa de abstracción en `js/utils/storage.js`.
- **Testing Automatizado:** Refactorización de pruebas y creación de nuevas suites para evaluar el comportamiento de las clases y del storage.

## Especificación técnica

El archivo [`plan.md`](plan.md) es la especificación maestra del proyecto.
Para la cuarta entrega se utilizan los archivos de `docs/03-specs/actividad-obligatoria-4/`.

Los specs previstos para la cuarta entrega son:
- `docs/03-specs/actividad-obligatoria-4/spec-devops.md`
- `docs/03-specs/actividad-obligatoria-4/spec-tester-qa.md`
- `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`
- `docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md`
- `docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md`

## JavaScript, diagramas y testing – Cuarta entrega

- El **Desarrollador JS POO** diseñará el diagrama de clases UML y generará la lógica de negocio en `js/models/` mediante Copilot Agent Mode.
- El **Desarrollador JS Eventos + DOM** refactorizará `js/script.js` para que actúe únicamente como controlador de UI.
- El **Desarrollador JS Storage** implementará las operaciones CRUD en `js/utils/storage.js` para la persistencia local.
- El **Tester QA** generará las nuevas suites de prueba (`models.spec.js`, `storage.spec.js`) y ejecutará Playwright MCP para validar los resultados.
- El **Coordinador / DevOps** realizará Code Reviews exhaustivas asistidas por IA para garantizar la arquitectura y gestionará los despliegues.

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
6. Crear release/cuarta-entrega desde develop cuando todas las features estén integradas.
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

## Documentación de la cuarta entrega

- [Plan maestro del proyecto](plan.md)
- [Spec Coordinador / DevOps](docs/03-specs/actividad-obligatoria-4/spec-devops.md)
- [Spec Tester QA](docs/03-specs/actividad-obligatoria-4/spec-tester-qa.md)
- [Spec Desarrollador JS Eventos + DOM](docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md)
- [Spec Desarrollador JS POO](docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md)
- [Spec Desarrollador JS Storage](docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md)
- [Diagrama de Clases UML](docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md)
- [Documentación de Storage](docs/06-storage/storage-doc.md)
- [Documentación de testing con Jasmine](js/test/testing-doc.md)


## Estado del proyecto

La Cuarta Entrega refactoriza la aplicación para implementar POO y persistencia local. Actualmente, el equipo se encuentra en fase de desarrollo de las features y specs iniciales, coordinadas mediante GitHub Projects.