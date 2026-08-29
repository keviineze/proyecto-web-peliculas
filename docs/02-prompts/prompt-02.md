# Prompt 2: Estructura HTML5 desde Figma

- **Rol:** Desarrollador Front-end (@GonzaloBarbano)
- **Modelo de IA utilizado:** GitHub Copilot (Modo Agente Automático / Workspace)
- **Método / Técnica:** Context-Aware Prompting (proveyendo enlace externo a Figma) + Agentic Execution (ejecución autónoma de comandos).
- **Contexto Proveído:** Se le proporcionó a la IA el enlace directo al diseño (mockup) alojado en Figma y se le especificaron los requerimientos obligatorios de la consigna (uso estricto de etiquetas semánticas, tablas, listas y comentarios preparatorios).

## Prompt Exacto

> Teniendo en cuenta el mockup y el link de figma https://www.figma.com/design/MUiNklOSBg71RCgez6ibro/Proyecto-Web-Peliculas?node-id=0-1&p=f&t=DSXkjCuNYDij8m6f-0
>
>Construye la estructura HTML5 de la página, siguiendo los requisitos de la consigna.
>semánticas.
>Incluye título, párrafos, imágenes, enlaces, listas, tablas y etiquetas
>Deja comentarios en el código indicando dónde se aplicarán CSS y JavaScript en el futuro.

📸 **Captura de pantalla**
![Orden del Prompt 2](img/prompt-02-prompt.jpeg)

## Resultado Esperado

Se esperaba que la IA interpretara visualmente el diseño alojado en Figma y construyera desde cero el archivo index.html, maquetando toda la información con etiquetas semánticas correctas de HTML5 (header, nav, main, footer, etc.) y dejando los "ganchos" listos (en forma de comentarios) para que luego se trabaje el aspecto visual y la lógica.

## Resultado Obtenido

El Agente de IA realizó un trabajo exhaustivo de manera autónoma: se conectó a Figma (usando "Figma Dev Mode MCP"), inspeccionó la composición visual y luego editó directamente el archivo local index.html escribiendo más de 200 líneas de código. Finalizó entregando la estructura completa que incluye navegación, catálogo, biblioteca, tablas accesibles y formularios.

📸 **Captura de pantalla**
![Respuesta del Prompt 2](img/prompt-02-respuesta.jpeg)

## Correcciones Manuales

No se requirieron correcciones manuales estructurales por parte del equipo. El propio Agente de Copilot ejecutó validaciones locales (git diff --check y diagnósticos del editor) y se auto-corrigió errores sintácticos iniciales, como espacios en URLs de imágenes y rutas de enlaces internos, antes de entregar la versión final.

## Archivo o parte del proyecto donde se aplicó

Impactó directamente en la creación y estructuración del archivo index.html en la raíz del proyecto.