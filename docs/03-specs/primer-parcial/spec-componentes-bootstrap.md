# Spec — Especialista en Componentes Bootstrap

## Metadata

| Campo | Valor |
|-------|-------|
| Responsable | Kevin Sosa |
| Rol | Especialista en Componentes Bootstrap |
| Rama | `feature/esp-componentes-bootstrap-add-components` |
| Fecha | 2026-10-05 |

---

## Objetivo

Implementar y validar componentes avanzados de Bootstrap que sean coherentes
con el mockup actualizado del proyecto, manteniendo la identidad visual
existente mediante `bootstrap-overrides.css`.

---

## Componentes Bootstrap seleccionados

### 1. Navbar

**Componente seleccionado:** Navbar

**Justificación:**

El Navbar corresponde al encabezado y sistema de navegación principal
representado en el mockup actualizado.

Se utilizará Bootstrap para estructurar el componente y permitir su adaptación
responsive, manteniendo la identidad visual definida por los estilos existentes
y `bootstrap-overrides.css`.

**Comportamiento esperado:**

- Mostrar la navegación principal del sitio.
- Mantener los enlaces existentes del proyecto.
- Adaptarse correctamente a los distintos tamaños de viewport.
- Mantener la identidad visual del proyecto.
- No generar scroll horizontal.

---

### 2. Carousel

**Componente seleccionado:** Carousel

**Justificación:**

El Carousel corresponde al área de películas destacadas representada en el
mockup actualizado.

Se utilizará el componente Carousel de Bootstrap para permitir la navegación
entre las películas destacadas y mantener una presentación responsive.

**Comportamiento esperado:**

- Mostrar las películas destacadas utilizando contenido existente del proyecto.
- Permitir avanzar y retroceder entre los elementos.
- Adaptarse correctamente a desktop, tablet y mobile.
- Mantener la identidad visual mediante `bootstrap-overrides.css`.
- No generar desbordamiento horizontal.
- Mantener las imágenes contenidas dentro del componente.

---

## Plan de pruebas

Los componentes serán validados mediante Playwright MCP utilizando los
viewports definidos por los templates oficiales de los Test Case 7 y 8:

- Desktop: 1280×800
- Mobile: 390×844
- Tablet: 768×1024

### Navbar

Se verificará:

- Visibilidad.
- Adaptación responsive.
- Funcionamiento de la navegación/interacción correspondiente.
- Aplicación de `bootstrap-overrides.css`.
- Ausencia de scroll horizontal.

### Carousel

Se verificará:

- Visibilidad.
- Renderizado de los elementos.
- Avance y retroceso de slides.
- Adaptación responsive.
- Aplicación de `bootstrap-overrides.css`.
- Ausencia de clipping o scroll horizontal.

---

## Criterios de aceptación

### Navbar

- [ ] El componente Navbar se encuentra implementado mediante clases de Bootstrap.
- [ ] La navegación existente se mantiene funcional.
- [ ] El componente se adapta a desktop, tablet y mobile.
- [ ] Los estilos personalizados del proyecto se mantienen.
- [ ] No existe scroll horizontal provocado por el componente.

### Carousel

- [ ] El componente Carousel se encuentra implementado mediante Bootstrap.
- [ ] Utiliza contenido existente del proyecto.
- [ ] Permite avanzar y retroceder entre slides.
- [ ] Se adapta a desktop, tablet y mobile.
- [ ] Los estilos personalizados del proyecto se mantienen.
- [ ] Las imágenes no generan overflow.
- [ ] No existe scroll horizontal provocado por el componente.

---

## Archivos previstos

La implementación podrá requerir modificaciones en:

- `index.html`
- `css/bootstrap-overrides.css`
- otros archivos CSS existentes únicamente si resultan necesarios para
  integrar correctamente los componentes.

No se deberán eliminar estilos existentes sin verificar previamente su
impacto sobre el resto del sitio.

---

## Coordinación con QA

Una vez implementados los componentes:

1. Se ejecutarán los Test Case 7 y 8 mediante Playwright MCP.
2. Los resultados reales serán documentados en los respectivos archivos.
3. Si se detectan problemas reales, se registrarán mediante GitHub MCP.
4. Los problemas deberán resolverse mediante ramas `fix/`.
5. Los resultados finales se incorporarán a esta especificación.

## Cierre y resultados

### Prompt utilizado para la implementación

```
Necesito implementar los dos componentes Bootstrap seleccionados para este rol:

1. Navbar
2. Carousel

El proyecto está en http://localhost:3000.

IMPORTANTE:
- Antes de modificar archivos, inspeccioná el estado actual del proyecto.
- Revisá index.html y los archivos CSS existentes.
- Revisá el mockup actualizado disponible en docs/01-mockup/disenio-bootstrap.png.
- NO inventes títulos de películas, enlaces, imágenes, textos ni contenido que no exista en el proyecto.
- Reutilizá el contenido existente siempre que sea posible.
- No elimines estilos existentes sin verificar su impacto.
- Bootstrap 5.3.8 ya está instalado mediante CDN.
- bootstrap-overrides.css ya existe y debe utilizarse para personalizaciones visuales.

OBJETIVO 1 — NAVBAR

Convertí/adaptá la navegación principal existente para utilizar el componente
Navbar de Bootstrap.

Requisitos:
- Mantener los enlaces existentes.
- Mantener la identidad visual del proyecto.
- Utilizar las clases oficiales de Bootstrap para la estructura responsive.
- Implementar el comportamiento responsive correspondiente al Navbar.
- No introducir scroll horizontal.
- No inventar enlaces ni contenido.
- Crear un selector/ID claro y único para poder utilizarlo posteriormente
  en el Test Case 7.

OBJETIVO 2 — CAROUSEL

Implementá el componente Carousel de Bootstrap para la sección de películas
destacadas representada en el mockup.

Antes de implementarlo:
- Inspeccioná si existe actualmente una sección o contenido que pueda utilizarse
  como películas destacadas.
- Reutilizá exclusivamente contenido existente en el proyecto.
- Si no existe contenido suficiente para construir el Carousel sin inventar
  información, informame primero cuál es el problema antes de crear contenido
  ficticio.

El Carousel debe:
- Utilizar las clases oficiales de Bootstrap.
- Permitir avanzar y retroceder entre slides.
- Utilizar imágenes/contenido existente.
- Adaptarse a desktop, tablet y mobile.
- No producir overflow horizontal.
- Mantener la identidad visual del proyecto mediante bootstrap-overrides.css.
- Tener un selector/ID claro y único para poder utilizarlo posteriormente
  en el Test Case 8.

PERSONALIZACIÓN

Realizá las personalizaciones visuales en:
css/bootstrap-overrides.css

No reemplaces innecesariamente styles.css, components.css o responsive.css.

Después de implementar:
1. Ejecutá git diff --check.
2. Verificá que Bootstrap JS siga cargando correctamente.
3. Abrí http://localhost:3000 con Playwright MCP.
4. Verificá Navbar y Carousel.
5. Probá como mínimo:
   - 1280x800
   - 768x1024
   - 390x844
6. Verificá que no exista scroll horizontal.
7. Verificá que los componentes sean funcionales.
8. Informame exactamente:
   - archivos modificados;
   - clases Bootstrap utilizadas;
   - selector/ID real del Navbar;
   - selector/ID real del Carousel;
   - contenido reutilizado;
   - comportamiento observado en cada viewport;
   - cualquier problema encontrado.

NO inventes resultados de pruebas que no hayas ejecutado.
NO crees GitHub Issues salvo que exista un hallazgo real.
```

### Resultado de la implementación

Se implementaron los siguientes componentes:

- **Navbar**
  - Selector: `#main-navbar`
  - Contenido colapsable: `#main-navbar-collapse`
  - Mantiene los enlaces existentes del proyecto.
  - Utiliza las clases responsive de Bootstrap.
  - En desktop mantiene la navegación visible y oculta el toggler.
  - En mobile y tablet permite expandir y cerrar la navegación.

- **Carousel**
  - Selector: `#featured-carousel`
  - Sección: Películas Destacadas.
  - Utiliza contenido existente del proyecto.
  - Incluye tres slides: Interstellar, El viaje de Chihiro y Dark.
  - Permite avanzar y retroceder entre las películas.
  - Utiliza los controles de navegación de Bootstrap.

### Ajustes manuales realizados

Durante la revisión visual de la implementación se detectó un conflicto
entre una regla global de botones existente y los controles del Carousel.

La regla global hacía que los controles del Carousel adoptaran el estilo
verde de los botones del proyecto. Se realizó un ajuste específico en
`bootstrap-overrides.css` para conservar la apariencia esperada de los
controles del Carousel.

Luego se volvió a validar el componente con Playwright y se comprobó que
el ajuste no generaba overflow horizontal.

### Resultado del Test Case 7 — Navbar

El Test Case 7 se ejecutó mediante Playwright MCP sobre los viewports
definidos por el template oficial:

- **1280×800:** PASS. El Navbar y sus enlaces fueron visibles. El toggler
  permaneció oculto por el breakpoint. No hubo overflow horizontal y se
  conservaron los estilos definidos en `bootstrap-overrides.css`.
- **390×844:** PASS. El toggler fue visible y permitió expandir y cerrar
  correctamente el contenido del Navbar. Los enlaces fueron visibles en
  el estado expandido. No hubo overflow horizontal.
- **768×1024:** PASS. El toggler fue visible y permitió expandir el
  contenido del Navbar. La transición del collapse se completó
  correctamente. No hubo overflow horizontal.

**Resultado final del TC7:** PASS CON OBSERVACIONES.

Como observación se registró un `404` correspondiente a `/favicon.ico`.
El problema es ajeno al componente Navbar y no se creó un GitHub Issue.

### Resultado del Test Case 8 — Carousel

El Test Case 8 se ejecutó mediante Playwright MCP sobre los viewports
definidos por el template oficial:

- **1280×800:** el Carousel fue visible. El avance y retroceso entre
  slides funcionaron correctamente. Se observaron las transiciones
  Bootstrap y no hubo overflow.
- **390×844:** el Carousel se adaptó correctamente al ancho disponible.
  El avance y retroceso funcionaron y las imágenes permanecieron
  contenidas.
- **768×1024:** el Carousel se adaptó correctamente. El avance y
  retroceso funcionaron sin clipping ni overflow.

En los tres viewports Playwright registró los eventos
`slide.bs.carousel` y `slid.bs.carousel`.

**Resultado final del TC8:** PASS CON OBSERVACIONES.

Como observación se registró nuevamente un `404` correspondiente a
`/favicon.ico`. El problema es ajeno al Carousel y no se creó un
GitHub Issue.

### Evidencias

Las evidencias de los tests se almacenaron en:

- `docs/04-testing/capturas/tc-7/`
- `docs/04-testing/capturas/tc-8/`

Los resultados detallados se encuentran en:

- `docs/04-testing/test-case-7.md`
- `docs/04-testing/test-case-8.md`

### Estado de los criterios de aceptación

#### Navbar

- [x] El componente Navbar se encuentra implementado mediante clases de Bootstrap.
- [x] La navegación existente se mantiene funcional.
- [x] El componente se adapta a desktop, tablet y mobile.
- [x] Los estilos personalizados del proyecto se mantienen.
- [x] No existe scroll horizontal provocado por el componente.

#### Carousel

- [x] El componente Carousel se encuentra implementado mediante Bootstrap.
- [x] Utiliza contenido existente del proyecto.
- [x] Permite avanzar y retroceder entre slides.
- [x] Se adapta a desktop, tablet y mobile.
- [x] Los estilos personalizados del proyecto se mantienen.
- [x] Las imágenes no generan overflow.
- [x] No existe scroll horizontal provocado por el componente.

### Estado final

Los componentes Bootstrap seleccionados fueron implementados y
validados mediante Playwright MCP. Los Test Case 7 y 8 fueron
completados utilizando los templates oficiales y sus resultados reales.

No se detectaron problemas que requirieran la creación de un GitHub
Issue durante estas pruebas.