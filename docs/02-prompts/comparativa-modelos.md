# Comparativa de Modelos IA: Generación de HTML Semántico

## 1. Contexto de la Prueba

* **Tarea elegida:** Construcción de la estructura HTML5 semántica de la página principal a partir de un diseño.
* **Modelos evaluados:** Claude 3.5 Sonnet vs. Gemini 1.5 Pro.
* **Prompt base utilizado:** *"Teniendo en cuenta el mockup y el link de figma https://www.figma.com/design/MUiNklOSBg71RCgez6ibro/Proyecto-Web-Peliculas?node-id=0-1&p=f&t=DSXkjCuNYDij8m6f-0 Construye la estructura HTML5 de la página, siguiendo los requisitos de la consigna. semánticas. Incluye título, párrafos, imágenes, enlaces, listas, tablas y etiquetas Deja comentarios en el código indicando dónde se aplicarán CSS y JavaScript en el futuro."*

## 2. Análisis de Claude 5 Sonnet

* **Estructura generada:** Al no operar como un Agente dentro del editor, infirió el contexto basándose en el nombre de la URL ("Proyecto-Web-Peliculas") y los requisitos listados. Entregó un esqueleto HTML5 semánticamente muy bueno.
* **Uso Semántico:** Excelente. Utilizó `<header>`, `<nav>`, `<main>`, `<section>` para el catálogo, y estructuró una `<table>` accesible para organizar datos de películas, cumpliendo a rajatabla con las exigencias de la consigna.
* **Puntos fuertes:** Colocó comentarios HTML (`<!-- Hook para lógica JS: Filtrado de películas -->` o `<!-- CSS: Grid layout para el catálogo -->`) exactamente donde se requerían, intercalados en los componentes específicos.
* **Puntos débiles:** Al no poder hacer un escaneo visual profundo del lienzo de Figma, inventó el contenido de relleno (textos falsos) para las tarjetas de películas.

## 3. Análisis de Gemini 1.5 Pro

* **Estructura generada:** Entregó un HTML funcional y bien maquetado, estructurando de manera lógica una interfaz de catálogo audiovisual.
* **Uso Semántico:** Muy bueno. Construyó correctamente las listas (`<ul>`, `<li>`) para la navegación principal y aplicó etiquetas `<article>` individuales para cada tarjeta de contenido.
* **Puntos fuertes:** Generó una tabla de información muy completa usando `<thead>`, `<tbody>` y `<th>`. Además, incluyó de forma proactiva atributos `alt` descriptivos en todas las etiquetas `<img>`, demostrando un enfoque sólido en accesibilidad.
* **Puntos débiles:** Los comentarios preparatorios para CSS y JS fueron demasiado genéricos. En lugar de dejarlos sobre cada elemento clave, agrupó la mayoría al final del archivo antes del cierre del `<body>`.

## 4. Conclusión Técnica

Para esta tarea específica de estructuración, **Claude 5 Sonnet** resultó más útil. Aunque ambos modelos enfrentaron la limitación de no poder leer el lienzo de Figma de forma nativa (tarea que el Agente de Copilot sí logró en la prueba original), Claude interpretó con mucha mayor precisión la instrucción de los comentarios preparatorios. Dejó los "ganchos" para CSS y JS exactamente en las zonas de impacto, lo cual facilita la escalabilidad futura del proyecto planteada en el `plan.md`. Gemini generó una excelente estructura base, pero requirió acomodo manual para ubicar los comentarios en los nodos correctos del DOM.