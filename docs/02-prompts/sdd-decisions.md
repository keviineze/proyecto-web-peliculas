# Decisiones sobre Spec-Driven Development (SDD)

## ¿Qué es SDD y por qué lo usamos?
El Spec-Driven Development (SDD) es una metodología de trabajo que exige que cada tarea sea especificada antes de ser ejecutada. Usamos SDD para garantizar que el trabajo de cada rol esté alineado estrictamente con los requerimientos funcionales del archivo maestro plan.md.

## Implementación en el Proyecto
* Ningún integrante puede comenzar a escribir código o diseñar sin antes redactar su especificación en la carpeta docs/specs/.
* Las especificaciones se redactarán utilizando una plantilla estandarizada (spec-[rol].md).
* Un Pull Request (PR) no será aprobado si no incluye la especificación técnica correspondiente.
* Durante los Code Reviews, el archivo plan.md funcionará como la referencia oficial.

## Verificación de Entorno
Verificamos que todos los integrantes del equipo cuentan con las herramientas instaladas y operativas:
* Extensión de GitHub Copilot en Visual Studio Code configurada en modo Agente.
* Extensión de GitHub Pull Requests.