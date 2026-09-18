# Spec - Frontend / CSS

## 1. Planificación Previa

**¿Qué se va a hacer?**
Se generarán los archivos de estilos (`css/styles.css` y `css/components.css`) tomando como referencia el mockup actualizado de Figma. Se definirá la paleta de colores en variables, tipografías, layout base y estilos de componentes (botones, cards, navbar)[cite: 1]. 

**¿Por qué?**
Para aplicar la capa de presentación visual al documento HTML estructural creado en la Actividad 1, logrando fidelidad con el diseño UI propuesto por el equipo. Se utilizará Figma MCP junto con GitHub Copilot en modo Agente para acelerar la extracción de variables y estilos base.

**Criterios de Aceptación (Checklist):**
- [x] `css/styles.css` incluye variables CSS en `:root`, reset, tipografías y layout base.
- [x] `css/components.css` incluye estilos de componentes y estados hover/focus.
- [x] Selectores, herencia y especificidad aplicados correctamente.
- [x] Box model aplicado con control explícito de padding, margin y border.
- [x] Diferenciación clara de elementos en línea y en bloque mediante CSS.
- [x] Comentarios explicativos sobre decisiones de estilo incluidos en el código.

## 2. Evidencia de Ejecución (Figma MCP)

**Prompt utilizado:**
Actúa como Desarrollador Frontend experto. Utilizando el servidor MCP de Figma, analiza el mockup de este enlace: [https://www.figma.com/design/MUinkLOSBg71RCgez6ibro/Proyecto-Web-Peliculas?node-id=0-1&p=f&t=aN1zYGGIREYOb0AX-0] Apóyate estrictamente en esta guía de estilos ya definida para generar el código:Colores (Dark Mode): Fondo principal #14181C, Superficie cards #1D232A, Superficie inputs #2C3440, Primario #00E054, Secundario #40BCF4, Texto primario #FFFFFF, Texto secundario #9AB0C0, Bordes #303B47.Tipografía: Familia Inter o Roboto. H1: 2rem (Bold), H2: 1.5rem (SemiBold), H3: 1.125rem, Body: 0.875rem.Espaciados y Box Model: Base de 8px. Tarjetas con padding 16px, gap 12px, border-radius 12px. Botones con alto 40px, padding 8px 16px, border-radius 6px.Estados: Hover de botón primario (#02B845), Focus con borde cyan (#40BCF4 2px).Devuélveme el código dividido en dos bloques:Código para css/styles.css: Incluye todas las variables CSS en :root, un reset básico, la declaración de tipografías y el layout base. Código para css/components.css: Incluye los estilos de componentes (botones, cards, formularios, tablas) y sus respectivos estados hover/focus. Requisitos técnicos obligatorios: Aplicar el box model con control explícito de padding, margin y border, diferenciar elementos en línea y en bloque mediante display, y dejar breves comentarios explicativos en el código.

**Resultado Obtenido:**
La IA generó más de 380 líneas de código divididas en dos archivos:
- `styles.css`: Variables en `:root`, reset, layout base e importación de fuentes.
- `components.css`: Estilos de botones, inputs, cards y tablas con sus respectivos estados de interacción.

**Ajustes y Revisión Manual:**
Se verificó manualmente que el código generado respetara la especificidad, diferenciara correctamente los elementos block/inline y aplicara el box model explícito (padding, margin, border) según los requisitos técnicos. Se enlazaron las hojas en el `index.html`.