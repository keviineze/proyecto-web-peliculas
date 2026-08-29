# Prompt 4: Propuesta de Estructura Visual y Layout para Figma

- **Rol:** Documentador / UX (@GonzaloBarbano)
- **Modelo de IA utilizado:** Claude Sonnet 5
- **Método / Técnica:** Chain of Thought (Context-aware, referenciando un archivo de requerimientos)
- **Contexto Proveído:** Se le indicó a la IA el objetivo de construir un mockup en Figma, utilizando como única fuente de verdad los requerimientos y alcances ya definidos en el archivo `plan.md`.

## Prompt Exacto

> Tengo que realizar el mockup del producto final usando Figma.
> Teniendo en cuenta el archivo plan.md
> Propone una estructura visual inicial. Necesito sugerencias de layout general, secciones principales, navegacion y jerarquía visual para luego generar un mockup en figma.

📸 **Captura de pantalla**
![Orden del Prompt 4](img/Prompt-04-prompt.png)

## Resultado Esperado

Se buscaba obtener una guía estructural (un wireframe lógico o esqueleto) que tradujera los requerimientos técnicos del `plan.md` en componentes visuales concretos, facilitando así el diseño posterior de las pantallas en Figma.

## Resultado Obtenido

La IA entregó una propuesta de arquitectura de la información detallada. Estructuró la respuesta en tres ejes fundamentales:
1. Una estructura semántica mapeada directamente a etiquetas HTML5 (`<header>`, `<nav>`, `<main>`, `<aside>`, etc.).
2. El desglose de los componentes de la interfaz (Tarjetas de catálogo, estados de la biblioteca, formulario de búsqueda y tabla comparativa).
3. Pautas específicas de jerarquía visual y accesibilidad (uso de etiquetas de texto, contraste tipográfico y uso de layouts en grid/flexbox).

📸 **Captura de pantalla**
![Respuesta - Parte 1](img/Prompt-04-respuesta1.png)
![Respuesta - Parte 2](img/Prompt-04-respuesta2.png)

## Correcciones Manuales

No se requirieron correcciones al texto generado. La guía sirvió como base conceptual directa para comenzar a dibujar los componentes (frames) dentro de la herramienta Figma.

## Archivo o parte del proyecto donde se aplicó

Se aplicó como guía teórica para el diseño del mockup en Figma y sirvió como insumo principal para la redacción del archivo `docs/specs/spec-ux.md`.