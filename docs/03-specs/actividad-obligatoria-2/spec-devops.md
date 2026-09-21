# Especificación técnica: Coordinación y DevOps

**Rol:** Coordinador / DevOps  
**Entrega:** Actividad Obligatoria N.° 2  
**Base de trabajo:** `develop` y `plan.md`

## 1. Qué se desarrollará

El Coordinador / DevOps preparará, coordinará y validará el flujo de trabajo de la segunda entrega. Esta etapa incorpora estilos CSS, diseño responsive y QA automatizado sobre la estructura HTML5 de la primera entrega.

El alcance del rol incluye:

- Resolver los Request Changes pendientes de la Actividad Obligatoria N.° 1.
- Actualizar el mockup de Figma con la paleta, tipografías, espaciados, componentes y estados definitivos.
- Mantener `plan.md` alineado con los requerimientos de esta entrega.
- Coordinar ramas, Pull Requests, revisiones e integración del equipo.
- Coordinar la documentación de testing y los enlaces entre sus índices.
- Realizar revisiones asistidas por GitHub Copilot Agent Mode.
- Preparar la release de la segunda entrega y su publicación en GitHub Pages.

## 2. Justificación

La segunda entrega involucra cambios visuales y pruebas realizadas por distintos integrantes. La coordinación DevOps permite mantener una base estable, asegurar la trazabilidad de los cambios, controlar la calidad de los PRs y verificar que la implementación coincida con el mockup y con `plan.md`.

## 3. Tareas y alcance

### 3.1 Resolución de Request Changes de la Actividad N.° 1

Por cada corrección solicitada por el docente se seguirá este flujo:

```bash
git checkout release/actividad-obligatoria-1
git pull
git checkout -b fix/nombre-descriptivo-del-fix
```

Luego se deberá:

1. Aplicar y probar la corrección.
2. Crear un PR desde la rama `fix/` hacia `release/actividad-obligatoria-1`.
3. Mergear el PR luego de su revisión.
4. Registrar la corrección en `changelog.md`, dentro de `[Fixed]`, incluyendo el enlace al PR.
5. Notificar al docente en Slack una vez resueltos los comentarios.
6. Repetir el proceso si se solicitan nuevas modificaciones.

Una vez aprobada la release anterior y mergeada contra `master`, se creará el backport hacia `develop`:

```bash
git checkout master
git pull
git checkout -b backport/release-actividad-obligatoria-1
git push origin backport/release-actividad-obligatoria-1
```

El PR del backport tendrá como base la rama `develop` y requerirá la aprobación de otro integrante.

### 3.2 Actualización del mockup y de `plan.md`

Antes de iniciar la implementación CSS se actualizará el mockup de Figma para definir:

- Paleta de colores primarios, secundarios y neutros.
- Familia tipográfica y tamaños para headings, body y labels.
- Espaciados, padding, margin, bordes, radios y tamaños de componentes.
- Estados hover, focus y disabled cuando correspondan.
- Adaptación visual para desktop, tablet y mobile.

La imagen exportada deberá guardarse en:

```text
docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png
```

También se actualizará `README.md` para incluir los enlaces al mockup exportado y al archivo de Figma. `plan.md` deberá permanecer alineado con los requisitos de CSS, responsive, QA y trazabilidad.

### 3.3 Coordinación de ramas y Pull Requests

Cada integrante trabajará en una rama propia con el formato:

```text
feature/<rol>-<descripción>
```

Cada integrante deberá realizar al menos un commit relevante y crear un PR hacia `develop`.

Los PRs previstos son:

- `backport/release-actividad-obligatoria-1` hacia `develop`.
- `feature/coord-devops-update-figma-and-readme` hacia `develop`.
- PR del Desarrollador Frontend/CSS hacia `develop`.
- PR del Especialista en Responsive Design hacia `develop`.
- PR del Documentador / QA Tester hacia `develop`.
- `release/actividad-obligatoria-2` hacia `master`.

Cada PR deberá incluir objetivo, alcance, relación con el spec, evidencia de validación y enlaces a issues relacionados cuando corresponda.

### 3.4 Code reviews asistidos

El Coordinador realizará como mínimo cuatro code reviews asistidos con GitHub Copilot Agent Mode sobre los PRs de los demás integrantes.

Las revisiones verificarán:

- Coherencia entre la implementación y el mockup actualizado.
- Separación entre `css/styles.css`, `css/components.css` y `css/responsive.css`.
- Uso adecuado de Flexbox y/o CSS Grid.
- Media queries para mobile, tablet y desktop.
- Ausencia de overflow horizontal y superposiciones.
- Accesibilidad básica y ausencia de errores de consola.
- Cumplimiento de `plan.md` y del spec correspondiente.
- Posibles regresiones en la estructura HTML y la funcionalidad existente.

Los Request Changes se cargarán sobre las líneas correspondientes del diff y se verificará su resolución antes de aprobar cada PR.

### 3.5 Testing y documentación

Se coordinará la creación de la carpeta `docs/04-testing/` y del índice:

```text
docs/04-testing/testing-doc.md
```

El índice deberá vincular cinco casos ejecutados con Playwright MCP:

1. Compatibilidad desktop.
2. Responsive móvil.
3. Performance.
4. Accesibilidad.
5. Estructura HTML semántica.

Cada caso deberá incluir el prompt utilizado, el resultado, los hallazgos, capturas de pantalla y enlaces a los issues de GitHub generados cuando corresponda.

`changelog.md` deberá registrar los aportes de cada integrante junto con los enlaces a PRs e issues.

### 3.6 Release y GitHub Pages

Cuando todas las ramas `feature/` estén integradas en `develop`, se creará la release:

```bash
git checkout develop
git pull
git checkout -b release/actividad-obligatoria-2
git push origin release/actividad-obligatoria-2
```

En la rama release se realizará la validación final y se habilitará GitHub Pages. La integración a `master` se realizará únicamente después de la revisión y aprobación del profesor.

## 4. Registro del uso de IA y MCP

### 4.1 Prompt utilizado

> Revisar el repositorio del proyecto Mini Letterboxd, `plan.md`, el mockup actualizado y los specs de la Actividad Obligatoria N.° 2. Proponer y verificar un flujo de coordinación DevOps que cubra la resolución de Request Changes, la actualización de Figma y README, la coordinación de ramas y PRs, cuatro code reviews asistidos, la documentación de cinco pruebas con Playwright MCP y la preparación de `release/actividad-obligatoria-2`. Señalar incumplimientos, riesgos de regresión y evidencias faltantes sin inventar enlaces ni resultados.

### 4.2 Herramientas utilizadas

- GitHub Copilot en modo Agent.
- Figma MCP.
- GitHub MCP.
- Playwright MCP.

### 4.3 Resultado obtenido

Completar durante la ejecución:

- **Resultado de la asistencia:** Pendiente.
- **Requisitos verificados:** Pendiente.
- **Incumplimientos detectados:** Pendiente.
- **Issues generados:** Pendiente.

### 4.4 Ajustes manuales realizados

Completar durante la ejecución:

- Ajustes realizados al mockup y sus exportaciones.
- Correcciones manuales en `README.md`, `plan.md` o índices.
- Cambios aplicados después de las revisiones asistidas.
- Motivo de cada ajuste y evidencia de validación.

## 5. Criterios de aceptación

- [ ] Se resolvieron y documentaron los Request Changes de la Actividad N.° 1.
- [ ] Se creó el backport hacia `develop`.
- [ ] El mockup actualizado contiene paleta, tipografías, espaciados, componentes y estados.
- [ ] Existe `docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png`.
- [ ] `README.md` enlaza el mockup y el archivo de Figma.
- [ ] `plan.md` está alineado con los requisitos de la segunda entrega.
- [ ] Cada integrante tiene una rama propia y un PR contra `develop`.
- [ ] Cada integrante realizó al menos un commit relevante.
- [ ] Se realizaron como mínimo cuatro code reviews asistidos.
- [ ] Se verificó la resolución de los Request Changes.
- [ ] Los cinco casos de Playwright MCP están documentados.
- [ ] `docs/04-testing/testing-doc.md` funciona como índice central.
- [ ] `changelog.md` incluye aportes, PRs e issues.
- [ ] Los specs de todos los roles incluyen prompts, resultados y ajustes manuales.
- [ ] Se creó `release/actividad-obligatoria-2` desde `develop`.
- [ ] Se habilitó GitHub Pages.
- [ ] La integración a `master` cuenta con la aprobación del profesor.

## 6. Definition of Done

La tarea del Coordinador / DevOps se considerará terminada cuando:

- La base de la segunda entrega esté actualizada y documentada.
- El mockup, `README.md` y `plan.md` sean consistentes.
- Todos los PRs requeridos hayan sido coordinados, revisados e integrados en `develop`.
- Las evidencias de testing, issues y changelog sean accesibles.
- La release de la Actividad N.° 2 esté preparada y validada.
- GitHub Pages esté habilitado.
- La integración final a `master` cuente con la aprobación del profesor.
