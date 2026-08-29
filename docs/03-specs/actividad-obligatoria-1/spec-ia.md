# Especificación Técnica: Especialista en IA y Prompt Engineering

## 1. ¿Qué se va a desarrollar?
Mi rol se ejecuta en dos etapas obligatorias:
* **Etapa 1 (PR Inicial):** Redactaré el documento de decisiones sobre Spec-Driven Development (`sdd-decisions.md`) para establecer las reglas de trabajo.
* **Etapa 2 (PR Final):** Documentaré 5 interacciones reales (prompts) del equipo con distintas IAs, armaré el índice `prompts.md`, y crearé una comparativa analítica entre dos modelos de IA (`comparativa-modelos.md`).

## 2. ¿Por qué es necesario?
* El **PR Inicial** garantiza que, antes de escribir código, todo el equipo planifique bajo la metodología SDD exigida en la cátedra.
* El **PR Final** demuestra la integración práctica de herramientas de IA en nuestro flujo de trabajo, cumpliendo con la cuota de evidencia requerida.

## 3. Criterios de Aceptación

**Para el PR Inicial:**
- [ ] El archivo `sdd-decisions.md` documenta el uso de SDD y la verificación del entorno (Copilot).
- [ ] El template `spec-[rol].md` está incrustado en el documento con su respectiva justificación.

**Para el PR Final:**
- [ ] La carpeta `02-prompts` contiene 5 archivos `prompt-x.md` documentando interacciones reales, con capturas y resultados.
- [ ] Existe el archivo `prompts.md` funcionando como índice con enlaces relativos correctos.
- [ ] Existe el archivo `comparativa-modelos.md` contrastando el rendimiento de dos IAs.