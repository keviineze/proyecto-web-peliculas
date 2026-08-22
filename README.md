# 🎬 Mini Letterboxd Front End

## 🎓 Datos académicos

- **Carrera:** Tecnicatura Universitaria en Programación de Sistemas
- **Materia:** Programación Web I
- **Proyecto:** Mini Letterboxd Front End

## 📖 Descripción

Mini Letterboxd Front End es una aplicación web estática para explorar películas y series, organizar una biblioteca personal y registrar la experiencia del usuario con cada título. El proyecto toma como referencia la propuesta de Letterboxd y se desarrollará progresivamente durante la cursada.

La aplicación funcionará como un simulador de seguimiento de contenido audiovisual. Permitirá consultar un catálogo, crear una lista de títulos pendientes, marcar contenidos como vistos, asignar calificaciones, escribir comentarios y compartir una representación de la lista desde el navegador, sin utilizar backend ni base de datos.

## 🎯 Objetivo del entregable

Construir la estructura HTML5 inicial de la página, utilizando contenido relacionado con películas y series y etiquetas semánticas que permitan incorporar estilos e interactividad en futuras entregas.

Esta primera entrega incluye títulos, párrafos, imágenes, enlaces, listas, un formulario, una tabla y comentarios en el código HTML. CSS y JavaScript no son requisitos funcionales todavía, pero se dejarán marcadores para su futura integración.

## 📁 Documentación

- 📁 **[Mockup](docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png)** - **[Figma](https://www.figma.com/design/MUinkLOSBg71RCgez6ibro/Proyecto-Web-Peliculas?node-id=0-1&m=dev&t=yIfByMZitEHj3ruE-1)**

## 👥 Integrantes del grupo

| Nombre completo | N.º de matrícula | Usuario de GitHub                                    | Rol en esta entrega                                |
| --------------- | ---------------: | ---------------------------------------------------- | -------------------------------------------------- |
| Gonzalo Barbano |           152127 | [@GonzaloBarbano](https://github.com/GonzaloBarbano) | Desarrollo front-end y documentación/UXengineering |
| David Soria     |           153203 | [@Davidsoria99](https://github.com/Davidsoria99)     | IA y prompt engineering                            |
| Kevin Sosa      |           154080 | [@keviineze](https://github.com/keviineze)           | Coordinación/DevOps                                |

Los roles de coordinación/DevOps, desarrollo front-end, documentación/UX e IA y prompt engineering se distribuirán y rotarán entre los integrantes a lo largo de las entregas, de acuerdo con la dinámica de la materia.

## Objetivo

Construir una aplicación estática, clara y escalable que permita al usuario llevar un registro personal de las películas y series que desea ver o ya vio. La experiencia estará orientada a la catalogación, el seguimiento y la interacción con la biblioteca personal, sin requerir un servidor ni una cuenta de usuario.

## Alcance del proyecto

### Incluido en la primera entrega

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

La maquetación visual con CSS y la interactividad con JavaScript no son requisitos funcionales de esta entrega. Sin embargo, la estructura debe quedar preparada para incorporarlas en etapas posteriores.

### Evolución prevista

En las próximas entregas se incorporarán:

- catálogo reutilizable de películas y series con título, tipo, año, género, poster y sinopsis;
- lista personal de títulos **Para ver**;
- marcado de contenidos como **Vistos**;
- calificaciones persistidas para cada título visto;
- comentarios personales asociados a cada contenido;
- vistas organizadas por estado: pendientes, vistas, calificadas y comentadas;
- persistencia local mediante `localStorage` o una alternativa equivalente;
- generación de una representación compartible mediante URL, hash, texto o archivo local;
- estilos responsive y una interfaz accesible para navegadores modernos.

## Especificación técnica

El archivo [`plan.md`](plan.md) es la especificación maestra del proyecto. Define el alcance funcional, la estructura esperada, los criterios de aceptación y el flujo de trabajo. Toda tarea debe mantenerse alineada con ese documento.

Antes de comenzar cada tarea de desarrollo, el integrante responsable deberá crear la especificación técnica de su rol en `docs/specs/`. La especificación debe explicar:

- qué se va a desarrollar;
- por qué es necesario para el proyecto;
- cuál es el alcance de la tarea;
- cómo se validará;
- qué criterios determinan que está terminada.

Los archivos previstos son:

- `docs/specs/spec-devops.md`
- `docs/specs/spec-frontend.md`
- `docs/specs/spec-ux.md`
- `docs/specs/spec-ia.md`

Un Pull Request no se considerará completo sin el spec correspondiente.

## IA y Prompt Engineering

El repositorio incluirá la carpeta `docs/02-prompts/`, donde se documentarán al menos cinco prompts utilizados durante el desarrollo. Cada registro deberá indicar el modelo utilizado, el objetivo del prompt, el resultado obtenido y el aporte concreto al proyecto.

Los prompts deben corresponder a interacciones reales y podrán documentar el uso de herramientas como ChatGPT, Gemini, Claude, Copilot o Cursor. No se incluirán ejemplos ficticios.

## Estructura prevista

```text
.
├── index.html
├── plan.md
├── README.md
├── css/
├── js/
└── docs/
    ├── 02-prompts/
    └── specs/
        ├── spec-devops.md
        ├── spec-frontend.md
        ├── spec-ux.md
        └── spec-ia.md
```

En esta etapa, `index.html` es el punto de entrada de la página. La carpeta `css/` contendrá los estilos en futuras entregas y `js/` concentrará la lógica de interacción y persistencia.

## Tecnologías

- HTML5 para la estructura y el contenido semántico.
- CSS3 para la maquetación y los estilos de futuras entregas.
- JavaScript para la interactividad y la gestión del estado local.
- Git y GitHub para el control de versiones y la revisión mediante Pull Requests.
- Navegadores modernos como entorno de ejecución.

No se utilizará backend ni base de datos. El estado de la biblioteca se gestionará en el cliente mediante almacenamiento local.

## Flujo de trabajo

El equipo trabajará con ramas propias siguiendo el formato:

```text
feature/<rol>-<descripción>
```

Las reglas principales son:

1. Crear cada rama a partir de `develop`.
2. Realizar al menos un commit relevante por integrante en su Pull Request.
3. Abrir el Pull Request hacia `develop`.
4. Registrar en `changelog.md` quién realizó cada PR, qué aportó y el enlace correspondiente.
5. Incluir el spec técnico del rol antes de iniciar el desarrollo asociado.
6. Realizar revisión funcional, revisión de código y revisión asistida por IA.
7. Integrar cambios en `master` únicamente mediante una release formal aprobada por el profesor.

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

## Ejecución local

La primera entrega puede abrirse directamente en un navegador mediante el archivo `index.html`. Cuando se incorporen módulos JavaScript, persistencia o una configuración de desarrollo, se documentará aquí el comando correspondiente para iniciar la aplicación.

## Estado del proyecto

Actualmente se encuentra en la etapa de definición y estructura base. El próximo objetivo es completar la página HTML5 con contenido relacionado con el catálogo audiovisual y dejar preparados los puntos de extensión para CSS, JavaScript, documentación por roles y prompts reales.
