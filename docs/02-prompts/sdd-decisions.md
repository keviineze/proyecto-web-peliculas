# Decisiones sobre Spec-Driven Development (SDD)

## ¿Qué es SDD y por qué lo usamos?
El Spec-Driven Development (SDD) es una metodología de trabajo que exige que cada tarea sea especificada antes de ser ejecutada. Usamos SDD para garantizar que el trabajo de cada rol esté alineado estrictamente con los requerimientos funcionales del archivo maestro plan.md.

## Implementación en el Proyecto
* Ningún integrante puede comenzar a escribir código o diseñar sin antes redactar su especificación en la carpeta docs/03-specs/actividad-obligatoria-1/.
* Las especificaciones se redactarán utilizando una plantilla estandarizada (spec-[rol].md).
* Un Pull Request (PR) no será aprobado si no incluye la especificación técnica correspondiente.
* Durante los Code Reviews, el archivo plan.md funcionará como la referencia oficial.

## Template Adoptado por el Equipo
**Justificación del diseño:** Se optó por una estructura ágil de tres ejes (Qué, Por qué y Criterios) para evitar burocracia innecesaria. Esta plantilla obliga al desarrollador a justificar su trabajo contra el `plan.md` y le entrega al revisor un checklist objetivo para aprobar o rechazar la Pull Request rápidamente.

> # Especificación Técnica: [Nombre del Rol]
> 
> ## 1. ¿Qué se va a desarrollar?
> *(Describe de forma concreta y detallada la tarea que vas a realizar en esta entrega. Si vas a generar código, diseñar un mockup o documentar prompts, explicalo acá).*
> 
> ## 2. ¿Por qué es necesario?
> *(Justifica cómo esta tarea aporta valor al proyecto y de qué manera responde a los requerimientos funcionales y objetivos definidos en el archivo maestro plan.md).*
> 
> ## 3. Criterios de Aceptación
> *(Listado de condiciones verificables que determinan que la tarea está formalmente terminada y lista para revisión. Reemplaza los ejemplos con tus propios criterios):*
> 
> - [ ] La estructura cumple con lo detallado en el plan.md.
> - [ ] El código/documentación no presenta errores y es accesible.
> - [ ] Se incluye la evidencia o los enlaces correspondientes (ej. enlace al mockup o archivos .md).

## Verificación de Entorno
Verificamos que todos los integrantes del equipo cuentan con las herramientas instaladas y operativas:
* Extensión de GitHub Copilot en Visual Studio Code configurada en modo Agente.
* Extensión de GitHub Pull Requests.