# 🎬 Mini Letterboxd Front End

## 🎓 Datos académicos

- **Carrera:** Tecnicatura Universitaria en Programación de Sistemas
- **Materia:** Programación Web I
- **Proyecto:** Mini Letterboxd Front End

## 📖 Descripción

Mini Letterboxd Front End es una aplicación web estática para explorar películas y series, organizar una biblioteca personal y registrar la experiencia del usuario con cada título. El proyecto toma como referencia la propuesta de Letterboxd y se desarrollará progresivamente durante la cursada.

La aplicación funcionará como un simulador de seguimiento de contenido audiovisual. Permitirá consultar un catálogo, crear una lista de títulos pendientes, marcar contenidos como vistos, asignar calificaciones, escribir comentarios y compartir una representación de la lista desde el navegador, sin utilizar backend ni base de datos.

## 🎯 Objetivo de la segunda entrega

Incorporar estilos CSS, diseño responsive y un proceso de QA automatizado sobre la estructura HTML5 de la primera entrega. La implementación debe mantenerse alineada con el mockup actualizado de Figma y con los requisitos definidos en [`plan.md`](plan.md).

## 📁 Documentación

- 📁 **[Mockup](docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png)** - **[Figma](https://www.figma.com/design/MUinkLOSBg71RCgez6ibro/Proyecto-Web-Peliculas?node-id=2-62&m=dev&t=vcf4fPKlVi2i39Wn-1)**

## 👥 Integrantes del grupo

| Nombre completo | N.º de matrícula | Usuario de GitHub                                    | Rol en esta entrega                                            |
| --------------- | ---------------: | ---------------------------------------------------- | -------------------------------------------------------------- |
| Gonzalo Barbano |           152127 | [@GonzaloBarbano](https://github.com/GonzaloBarbano) | Coordinador / DevOps                                           |
| David Soria     |           153203 | [@Davidsoria99](https://github.com/Davidsoria99)     | Desarrollador Frontend/CSS y Especialista en Responsive Design |
| Kevin Sosa      |           154080 | [@keviineze](https://github.com/keviineze)           | Documentador / QA Tester                                       |

Los roles se asignan específicamente para esta entrega y se rotan respecto de la Actividad Obligatoria N.° 1.

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

Antes de comenzar cada tarea, el integrante responsable deberá crear el spec de su rol en `docs/03-specs/actividad-obligatoria-2/`. El spec debe explicar:

- qué se va a desarrollar;
- por qué es necesario para el proyecto;
- cuál es el alcance de la tarea;
- cómo se validará;
- qué criterios determinan que está terminada.

Los archivos previstos para esta entrega son:

- `docs/03-specs/actividad-obligatoria-2/spec-devops.md`
- `docs/03-specs/actividad-obligatoria-2/spec-frontend.md`
- `docs/03-specs/actividad-obligatoria-2/spec-responsive.md`
- `docs/03-specs/actividad-obligatoria-2/spec-qa.md`

Un Pull Request no se considerará completo sin el spec correspondiente.

## IA, MCP y testing

El Desarrollador Frontend/CSS utilizará Figma MCP y GitHub Copilot en Agent Mode para generar los estilos a partir del mockup. El Especialista en Responsive Design utilizará el mismo flujo para generar y validar `responsive.css`.

El Documentador / QA Tester ejecutará cinco casos con Playwright MCP y creará issues de tipo bug mediante GitHub MCP cuando corresponda. Los prompts, resultados y ajustes manuales se documentarán en cada spec.

Los casos de prueba se registrarán en `docs/04-testing/` y cubrirán desktop, responsive móvil, performance, accesibilidad y estructura HTML semántica. `testing-doc.md` será el índice central con el resumen de issues de los momentos pre-merge y post-merge.

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

## Estado del proyecto

Actualmente se encuentra en la segunda entrega: mockup actualizado, estilos CSS, responsive y documentación de QA automatizado en proceso.

