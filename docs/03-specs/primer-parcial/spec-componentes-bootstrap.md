# Spec — Especialista en Componentes Bootstrap

## Metadata

| Campo | Valor |
|-------|-------|
| Responsable | Kevin Sosa |
| Rol | Especialista en Componentes Bootstrap |
| Rama | `feature/esp-componentes-bootstrap-add-components` |
| Fecha | 2026-10-04 |

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