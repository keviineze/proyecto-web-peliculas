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

Se agregará un control de calificación de 1 a 5 para un título marcado como
visto. El valor seleccionado se mostrará en un elemento `output` asociado al
control. La etiqueta accesible identificará claramente el título calificado.

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
- Que el `output` asociado refleja el valor seleccionado.
- Que el control se puede utilizar con teclado y no causa desbordamiento
  horizontal en ninguno de los viewports.

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

- [ ] Se implementan los dos componentes definidos en este spec, utilizando
  elementos HTML nativos.
- [ ] El `input type="range"` permite seleccionar una calificación de 1 a 5 y
  su valor visible se actualiza al cambiar la selección.
- [ ] El control de calificación tiene una etiqueta accesible asociada y puede
  operarse con teclado.
- [ ] `details` y `summary` presentan la ficha técnica cerrada inicialmente y
  permiten expandirla y contraerla con ratón y teclado.
- [ ] Ambos componentes se integran con contenido existente del proyecto, sin
  inventar títulos ni datos de películas.
- [ ] Los componentes son legibles y utilizables en desktop, tablet y mobile,
  sin provocar overflow horizontal.
- [ ] Se ejecutan y documentan las pruebas con Playwright MCP, con capturas y
  hallazgos reales.
- [ ] La implementación no introduce errores relevantes de consola ni rompe
  el contenido o las interacciones existentes.

## 3. Momento 2 — Cierre de implementación y pruebas

Completar esta sección después de implementar los componentes y ejecutar las
pruebas. No registrar resultados anticipados.

### 3.1 Prompt exacto utilizado

Pendiente de completar al cerrar la implementación.

### 3.2 Resultado obtenido

Pendiente de completar con el resultado observado.

### 3.3 Ajustes manuales

Pendiente de completar con los ajustes realizados, o indicar que no fueron
necesarios.

### 3.4 Hallazgos de Playwright MCP

Pendiente de completar con los resultados por viewport, las capturas y los
hallazgos observados. No se deben asumir resultados PASS antes de ejecutar las
pruebas.

## 4. Archivos previstos

La implementación podrá requerir modificaciones en:

- `index.html`
- Archivos de CSS existentes, únicamente si hacen falta ajustes visuales o
  responsive.
- JavaScript del proyecto, únicamente si hace falta sincronizar el valor del
  control con el `output`.

Los cambios deben limitarse a la integración y presentación de los dos
componentes seleccionados.