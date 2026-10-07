# Spec - Desarrollador de Componentes HTML Avanzados

## 1. Datos de la tarea

- **Responsable:** Gonzalo Barbano
- **Rol:** Desarrollador de Componentes HTML Avanzados
- **Entrega:** Primer Parcial
- **Proyecto:** Mini Letterboxd Front End
- **Rama:** `feature/dev-comp-html-avanzados-add-components`
- **Rama destino:** `develop`
- **Fecha:** 2026-10-07

## 2. Momento 1 — Antes de implementar

Este spec debe quedar registrado y commiteado antes de modificar el código de
la aplicación o comenzar la implementación asistida por Copilot.

### 2.1 Objetivo

Incorporar dos componentes HTML avanzados que aporten funciones coherentes con
el catálogo y la biblioteca personal de Mini Letterboxd, manteniendo la
estructura semántica, la accesibilidad y el diseño responsive existentes.

### 2.2 Componentes seleccionados

#### 1. `input type="range"` — Calificación

Se agregará un control nativo de calificación de 1 a 5 para un título marcado
como visto. La etiqueta accesible identificará claramente el título y una
escala visual indicará los cinco valores disponibles. El control funcionará
sin JavaScript y no persistirá la selección.

**Justificación:** El plan del proyecto contempla que el usuario califique los
contenidos que ya vio, pero esa acción todavía no está representada en la
interfaz. El control permite registrar la puntuación de forma directa y hace
visible el valor elegido.

#### 2. `details` y `summary` — Ficha técnica desplegable

Se utilizará un elemento `details` con un `summary` descriptivo para agrupar y
mostrar u ocultar la ficha técnica de una película dentro de su vista de
detalles. El contenido permanecerá cerrado inicialmente y se podrá abrir y
cerrar con ratón o teclado.

**Justificación:** La ficha técnica complementa los datos del catálogo y el
componente nativo permite consultarla bajo demanda, manteniendo la interfaz
compacta y evitando depender de JavaScript para abrir o cerrar ese contenido.

### 2.3 Plan de pruebas con Playwright MCP

Se probará la aplicación en `http://localhost:3000` usando los viewports ya
adoptados en los casos de prueba del proyecto:

- Desktop: 1280×800.
- Mobile: 390×844.
- Tablet: 768×1024.

Para el control de calificación se comprobará:

- Que el control aparece asociado a un título visto y tiene una etiqueta
  accesible.
- Que el rango permite seleccionar los valores mínimo y máximo y valores
  intermedios.
- Que se pueden seleccionar valores mínimo, máximo e intermedio con ratón y
  teclado.
- Que el control no causa desbordamiento horizontal en ninguno de los
  viewports.

Para la ficha técnica se comprobará:

- Que `details` aparece cerrado inicialmente y `summary` muestra un nombre
  descriptivo.
- Que la ficha se abre y se cierra con ratón y teclado, y su contenido solo se
  muestra cuando está abierta.
- Que el contenido permanece legible y dentro del viewport en los tres
  tamaños.

En cada viewport se revisarán también errores relevantes de consola, estado
visual de los controles y ausencia de overflow horizontal. Las capturas de los
estados iniciales e interactivos se guardarán en
`docs/04-testing/capturas/tc-html-avanzados/`.

### 2.4 Criterios de aceptación

- [x] Se implementan los dos componentes definidos en este spec, utilizando
      elementos HTML nativos.
- [x] El `input type="range"` permite seleccionar una calificación de 1 a 5
      mediante el comportamiento nativo del navegador, sin JavaScript.
- [x] El control de calificación tiene una etiqueta accesible asociada y puede
      operarse con teclado.
- [x] `details` y `summary` presentan la ficha técnica cerrada inicialmente y
      permiten expandirla y contraerla con ratón y teclado.
- [x] Ambos componentes se integran con contenido existente del proyecto, sin
      inventar títulos ni datos de películas.
- [x] Los componentes son legibles y utilizables en desktop, tablet y mobile,
      sin provocar overflow horizontal.
- [x] Se ejecutan y documentan las pruebas con Playwright MCP, con capturas y
      hallazgos reales.
- [x] La implementación no rompe el contenido o las interacciones existentes.
- [x] No se agregan archivos, dependencias ni lógica JavaScript para estos
      componentes.

## 3. Momento 2 — Cierre de implementación y pruebas

Completar esta sección después de implementar los componentes y ejecutar las
pruebas. No registrar resultados anticipados.

### 3.1 Prompt exacto utilizado

La instrucción exacta recibida para esta tarea fue:

```
Perfecto, ahora vamos con lo siguiente

2. Implementar componentes HTML avanzados: Agregar al menos dos
3. Integrar componentes HTML avanzados coherentemente con el diseño
existente y Bootstrap
4. Asegurar que los componentes funcionen correctamente en diferentes
dispositivos
5. Ejecutar tests con Playwright MCP contra http://localhost:3000 para validar
cada componente. Documentar y testear cómo se ve la integración del
componente elegido en diferentes dispositivos.
6. Por cada hallazgo, crear issue bug con GitHub MCP desde Copilot Agent
Mode.
7. Documentar en docs/04-testing/test-case-9.md y
test-case-10.md.
8. Resolver estos issues mediante ramas fix/ contra develop, documentada
en [Fixed] en el changelog.md.

Espera, es sin incropar js
```

### 3.2 Resultado obtenido

Se integraron un `input type="range"` nativo de 1 a 5 en la tarjeta vista de
El viaje de Chihiro, y un `details`/`summary` con su ficha técnica en el modal
de esa película. Se utilizó la clase Bootstrap `form-range` y estilos de los
tokens existentes. No se agregó JavaScript. Las pruebas de los componentes
pasaron en desktop, tablet y mobile; el error de consola del favicon quedó
registrado aparte como Issue [#55](https://github.com/keviineze/proyecto-web-peliculas/issues/55).

### 3.3 Ajustes manuales

Se adaptó `components.css` para conservar el estilo del proyecto y mejorar el
foco visible de `summary`. Durante la revisión de capturas se corrigió un
bloque duplicado de atributos que se mostraba como texto junto al rango; las
capturas finales se volvieron a generar. No se incorporó JavaScript, tal como
se aclaró para la tarea.

### 3.4 Hallazgos de Playwright MCP

Playwright MCP confirmó el rango etiquetado y utilizable con teclado (Home y
End seleccionaron 1 y 5), y `details` cerrado inicialmente, expandible con
Enter/clic y contraíble con Espacio. En 1280×800, 768×1024 y 390×844 ambos
componentes permanecieron dentro del viewport y no se observó overflow
horizontal. Se guardaron capturas en
`docs/04-testing/capturas/tc-html-avanzados/` y se detallan los resultados en
`docs/04-testing/test-case-9.md` y `test-case-10.md`.

El único error de consola observado fue la solicitud preexistente de
`/favicon.ico` con respuesta 404, ajena a los componentes. Se creó el Issue
[#55](https://github.com/keviineze/proyecto-web-peliculas/issues/55); su
resolución y retest se documentarán cuando se integre la rama `fix/`.

## 4. Archivos previstos

La implementación podrá requerir modificaciones en:

- `index.html`
- Archivos de CSS existentes, únicamente si hacen falta ajustes visuales o
  responsive.

Los cambios deben limitarse a la integración y presentación de los dos
componentes seleccionados mediante HTML y CSS.
