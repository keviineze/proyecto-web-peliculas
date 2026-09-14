# Plan de proyecto: Mini Letterboxd Front End

## 1. Descripción general

Este proyecto consiste en la creación de una aplicación web front-end de películas y series, inspirada en la experiencia de una mini versión de Letterboxd. La plataforma permitirá a los usuarios explorar un catálogo de contenidos, organizar una lista de pendientes, registrar qué títulos ya vieron, asignar calificaciones, escribir comentarios y compartir su biblioteca con otros usuarios.

El proyecto se desarrollará como una aplicación estática sin backend, orientada a la experiencia de usuario en navegador y a la gestión local en el cliente. Su objetivo es ofrecer una experiencia clara, visualmente atractiva y funcional para seguir el consumo de contenido y construir una lista personal con valor social.

El proyecto se organiza en un flujo de trabajo con Git Flow y revisión de pull requests (PRs) con criterio de calidad y revisión asistida por IA. El archivo `plan.md` es el especificación maestra del proyecto y será la referencia obligatoria para code reviews y para todos los specs funcionales de cada rol en `docs/specs/spec-[rol].md`.

## 2. Alcance del proyecto

### 2.1 Objetivo principal

Construir una aplicación front-end que permita:

- navegar por una colección de películas y series;
- marcar títulos como "para ver";
- marcar títulos como "ya vistos";
- asignar calificaciones por contenido;
- guardar comentarios personales;
- visualizar el estado de cada título en una lista personal;
- compartir la lista con otros usuarios mediante un enlace o representación compartible que pueda ser abierta en el navegador.

### 2.2 Tipo de aplicación

- Front End únicamente.
- Sin servidor ni base de datos.
- Persistencia del estado en el navegador usando almacenamiento local (`localStorage` o equivalente).
- Compatibilidad con navegadores modernos.
- Estilo visual minimalista, orientado a catalogación y seguimiento personal.

### 2.3 Equipo y roles

El equipo está conformado por 3 integrantes:

- Coordinador / DevOps
- Desarrollador Frontend
- Documentador / Diseñador UX
- Especialista en IA y Prompt Engineering

Cada integrante debe respetar este plan como fuente de verdad para la implementación y revisión.

## 3. Requisitos funcionales detallados

### 3.1 Estructura base del proyecto

La estructura base del repositorio debe cumplir con lo siguiente:

- `index.html` en la raíz del proyecto.
- Carpeta `/css` para estilos.
- Carpeta `/js` para lógica de la aplicación.
- Carpeta `/docs/specs` para specs funcionales por rol.
- Archivo `plan.md` en la raíz como referencia maestra.

### 3.2 Catálogo de películas y series

La aplicación debe contar con un catálogo de contenido que muestre, al menos:

- título;
- tipo (película o serie);
- año de estreno;
- género o categorías;
- poster o imagen representativa;
- sinopsis breve;
- estado del usuario respecto al título (pendiente, vista, favorito, etc., según la lógica definida).

La implementación debe mantener una estructura clara y reutilizable.

### 3.3 Lista de "Para ver"

El usuario debe poder agregar títulos a una lista personal llamada "Para ver".

Requisitos:

- cada contenido debe poder agregarse a la lista desde la vista del catálogo;
- la acción debe ser visible y consistente entre distintos elementos de la interfaz;
- el estado debe reflejarse de inmediato en la UI;
- el contenido agregado debe persistirse en el navegador para evitar pérdida al recargar la página.

### 3.4 Marcado de títulos como vistos

El sistema debe permitir marcar un título como ya visto.

Requisitos:

- el usuario debe poder cambiar el estado de un contenido de "para ver" a "visto";
- el estado debe reflejarse tanto en el catálogo como en la lista personal;
- debe existir una diferenciación visual clara entre contenido pendiente y contenido ya visto;
- una vez visto, el contenido puede seguir mostrándose en la colección con su estado actualizado.

### 3.5 Rating o calificación

El usuario debe poder asignar una calificación a cada contenido que haya visto.

Requisitos:

- la calificación debe ser numérica y consistente (por ejemplo: 1 a 10 o 1 a 5, según la decisión del equipo);
- el sistema debe mostrar el valor asignado claramente en la tarjeta del contenido o en la lista personal;
- la calificación debe persistirse de forma local;
- si el contenido no fue visto, la calificación debe mantenerse en un estado neutral o no habilitada.

### 3.6 Comentarios personales

El usuario debe poder registrar comentarios sobre cada título.

Requisitos:

- debe existir una zona de texto o interacción para agregar comentarios;
- el comentario debe asociarse al contenido correspondiente;
- el contenido debe mostrar el comentario en la vista de detalle o en la lista personal;
- la edición y eliminación del comentario debe ser posible según la lógica definida por el equipo.

### 3.7 Lista personal y visualización por estados

La app debe ofrecer una vista o panel con la lista personal del usuario organizada por estados.

Se recomienda que exista una separación entre:

- "Para ver";
- "Vistas";
- "Calificadas";
- "Comentarios agregados".

La UI debe permitir:

- visualizar el contenido agregado;
- ver su estado actual;
- acceder rápidamente a la acción de calificar o comentar;
- identificar la progresión del usuario en su colección.

### 3.8 Compartir la lista

El usuario debe poder compartir la lista de contenidos para que otros usuarios la visualicen.

Requisitos:

- debe existir una acción de compartir desde la UI;
- la lista compartida debe poder visualizarse por otros usuarios sin necesidad de backend;

Opciones válidas de implementación:

- serialización del estado en un enlace con query string o hash;
- generación de una URL compartible que reproduzca el estado de la lista;
- exportación de una versión legible para compartir en texto o archivo local.

Se debe garantizar que:

- la información compartida sea legible y reproducible;
- se mantenga el contexto del estado del usuario;
- la vista compartida no requiera autenticación ni persistencia de servidor.

### 3.9 Persistencia local

Dado que es un proyecto front-end sin backend, la app debe persistir la información del usuario localmente.

Requisitos:

- uso de `localStorage` o mecanismo equivalente;
- cada acción del usuario debe reflejarse en el almacenamiento;
- al recargar la página, el estado debe restaurarse sin pérdida.

### 3.10 Accesibilidad y UX

La interfaz debe ser usable y comprensible para diferentes perfiles de usuario.

Requisitos:

- botones y acciones claramente identificados;
- legibilidad de textos y contrastes adecuados;
- navegación clara en la pantalla;
- estados visibles para elementos activos, pendientes y completados;
- uso consistente de iconografía, etiquetas y textos.

## 4. Requisitos no funcionales

### 4.1 Mantenibilidad

- El código debe estructurarse por responsabilidades.
- Los archivos JS deben estar separados por lógica y renderización si es necesario.
- El CSS debe ser modular o seguir una estructura consistente.
- El trabajo debe favorecer reutilización y legibilidad.

### 4.2 Escalabilidad del front-end

- La lógica debe permitir agregar más títulos sin reestructurar la app completa.
- El estado debe estar centralizado o bien gestionado en un patrón consistente.
- El catálogo debe poder crecer sin romper la UI.

### 4.3 Rendimiento

- No deben existir renders redundantes ni loops innecesarios.
- Las actualizaciones de la interfaz deben ser eficientes.
- El uso de memoria y almacenamiento local debe ser razonable.

### 4.4 Compatibilidad

- El proyecto debe funcionar en navegadores modernos.
- El código debe evitar dependencias complejas no necesarias para una app front-end ligera.

## 5. Criterios de aceptación para las tareas

Todo ticket, feature o subtask del proyecto debe cumplir con los siguientes criterios mínimos de aceptación:

### 5.1 Requisitos generales

- La funcionalidad implementada cumple con el objetivo descrito en la tarea.
- La solución se alinea con `plan.md` como referencia maestra.
- El código se ajusta a la estructura del proyecto (`index.html`, `/css`, `/js`, `/docs/specs`).
- La tarea no introduce errores funcionales visibles.
- La interfaz es coherente con el diseño global de la aplicación.

### 5.2 Requisitos de calidad

- El código se escribe de forma legible, consistente y mantenible.
- No debe haber errores de consola relevantes durante la ejecución normal.
- Deben respetarse nombres claros para funciones, variables y archivos.
- El comportamiento debe ser probado manualmente antes de aceptar la tarea.
- La tarea debe estar documentada de forma mínima si implicó decisiones de implementación relevantes.

### 5.3 Requisitos de PR

- Todo cambio debe realizarse en una rama acorde al flujo Git Flow.
- El PR debe estar asociado a una tarea o issue clara.
- El PR debe incluir una descripción breve de la funcionalidad y el alcance.
- Debe existir revisión de calidad con IA y una revisión humana antes de cerrar el PR.
- Si se detecta un problema funcional, debe corregirse antes del merge.

### 5.4 Requisitos de validación funcional

Cada tarea debe validarse con al menos:

- comprobación visual en navegador;
- verificación del flujo principal de la funcionalidad;
- control de estado persistido;
- confirmación de que los cambios no rompen el comportamiento previo.

## 6. Git Flow y control de versiones

### 6.1 Ramas requeridas

El repositorio debe seguir un esquema de Git Flow con estas ramas principales:

- `master`: rama principal estable y de producción.
- `develop`: rama de integración para trabajo activo.
- `release/`: ramas de preparación de versiones para pruebas y validación antes del lanzamiento final.

### 6.2 Flujo esperado

- Las nuevas funcionalidades deben partir desde `develop`.
- Los hotfix o correcciones urgentes pueden originarse desde `master` o `develop`, según el caso.
- Las versiones listas para validación deben prepararse desde `release/`.
- Los cambios finales estables deben integrarse a `master`.

### 6.3 Política de Pull Requests

- Todo cambio debe abrirse como PR.
- Toda PR debe tener un objetivo claro.
- La revisión debe incluir:
  - validación funcional;
  - revisión de calidad de código;
  - revisión de consistencia con el plan maestro;
  - verificación de impacto en otras funcionalidades.

### 6.4 Revisión con IA de calidad

Los PRs deben utilizar revisión asistida por IA como parte de la etapa de control de calidad.

La revisión IA debe evaluar:

- errores lógicos;
- riesgo de regresión;
- legibilidad y mantenibilidad;
- cumplimiento del plan y los specs;
- consistencia con el diseño y la estructura del proyecto.

La revisión IA no reemplaza la aprobación humana, pero sí es requisito de calidad para mantener el estándar del equipo.

## 7. Especificación maestra y specs por rol

### 7.1 Rol del `plan.md`

El archivo `plan.md` es la especificación maestra del proyecto y debe usarse como referencia estricta para:

- revisión de PRs;
- evaluación de tareas;
- definición de features;
- validación de cambios en el front-end;
- revisión de specs individuales y de rol.

Si una tarea o PR entra en conflicto con este documento, debe resolverse antes de aprobarse.

### 7.2 Specs por rol

En `docs/specs/` deben crearse specs individuales siguiendo la convención:

- `docs/specs/spec-[noombre-del-rol].md`

Cada spec debe:

- definirse a partir de este `plan.md`;
- especificar el alcance, tareas y criterios de aceptación asociados a ese rol;
- no ampliar el proyecto más allá del alcance definido;
- servir como base para la ejecución y revisión del trabajo de ese rol.

Los specs no reemplazan al `plan.md`; lo complementan con detalle operativo por función.

## 8. Pautas técnicas y lineamientos de Code Review

### 8.1 Lineamientos de código

- Mantener código limpio, claro y consistente.
- Usar nombres descriptivos para variables, funciones, clases y elementos.
- Evitar lógica duplicada.
- Separar responsabilidades: UI, estados, y lógica de persistencia.
- No introducir dependencias innecesarias ni complejidad artificial.
- Preferir soluciones simples, mantenibles y con bajo acoplamiento.

### 8.2 Estilo y estructura

- Mantener una estructura consistente para archivos HTML, CSS y JS.
- Usar comentarios solo cuando aporten claridad real al mantenimiento del código.
- Evitar estilos inline si se puede mantener una separación clara entre estructura y presentación.
- Organizar el CSS de forma escalable y legible.

### 8.3 Validación de cambios

Antes de aprobar cualquier PR, el revisor debe verificar:

- que la funcionalidad cumple con lo descrito;
- que la interfaz responde correctamente a las interacciones;
- que no existen errores de lógica ni de renderizado;
- que la persistencia funciona correctamente;
- que el cambio no rompe la navegación ni la experiencia global.


### 8.4 Criterios de aprobación

Un PR podrá aprobarse solo si:

- cumple con los requisitos funcionales de la tarea;
- no introduce errores visibles;
- cuenta con revisión IA de calidad;
- cuenta con revisión humana;
- cumple con la política de flujo de ramas y con el `plan.md`.

Si un PR no cumple con estos criterios, debe devolverse con observaciones concretas y corregirse antes de fusionarse.


## 9. Resumen ejecutivo

Este proyecto busca crear una mini app de películas y series inspirada en Letterboxd, enfocada en la organización personal del usuario, la interacción visual y la posibilidad de compartir listas en un entorno sin backend. Para hacerlo sostenible y de calidad, se exige disciplina en Git Flow, en la definición de requisitos, en la revisión de pull requests y en la alineación de todas las implementaciones con el `plan.md` como especificación maestra.

La calidad del proyecto no dependerá solo de la funcionalidad final, sino también de la disciplina del proceso, la consistencia del diseño, la robustez del código y la correcta gestión de revisiones antes del merge.

> Spec maestro inicial configurado y validado para el flujo de trabajo.

 
<!-- Este archivo se ha subido anteriormente en develop -->