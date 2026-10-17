# Spec - Desarrollador Frontend / Bootstrap

## 1. Datos de la tarea

- **Rol:** Desarrollador Frontend / Bootstrap
- **Entrega:** Primer Parcial
- **Proyecto:** Mini Letterboxd Front End
- **Rama:** `feature/dev-frontend-bootstrap-migration`
- **Rama destino:** `develop`

## 2. Momento 1 — Antes de implementar

Este spec se registra y se commitea antes de comenzar la implementación de Bootstrap.

### 2.1 Objetivo

Migrar la estructura de layout del proyecto hacia el sistema de columnas de Bootstrap, incorporar Bootstrap mediante CDN jsDelivr y mantener la identidad visual del proyecto según el mockup actualizado entregado por el Coordinador.

La migración debe realizarse sin romper los archivos existentes:

- `css/styles.css`
- `css/components.css`
- `css/responsive.css`

También se incorporará:

- `css/bootstrap-overrides.css`

para centralizar las personalizaciones visuales de Bootstrap.

### 2.2 Versión e instalación de Bootstrap

Para esta implementación se selecciona **Bootstrap 5.3.8**, cargado mediante CDN jsDelivr.

Recursos previstos:

- Bootstrap CSS 5.3.8
- Bootstrap Bundle JS 5.3.8, necesario para los componentes interactivos utilizados por el proyecto.

La versión seleccionada es una decisión de implementación; la consigna exige documentar la versión y especifica el uso de CDN jsDelivr, pero no fija una versión concreta.

### 2.3 Secciones que se migrarán al sistema de columnas

La migración se concentrará en las estructuras que actualmente dependen de CSS Grid propio.

#### Biblioteca + catálogo

La estructura actual utiliza:

```text
main
└── div
    ├── aside#biblioteca
    └── section#catalogo
```

Se migrará a Bootstrap Grid:

```text
row
├── col-12 col-lg-3
│   └── biblioteca
└── col-12 col-lg-9
    └── catálogo
```

#### Tarjetas del catálogo

La grilla actual de tarjetas será migrada a filas/columnas Bootstrap utilizando clases responsive, manteniendo una tarjeta por columna en móvil y aumentando progresivamente la cantidad de columnas en tablet/desktop.

### 2.4 Revisión de CSS existente

No se eliminarán reglas de Flexbox o Grid de forma automática.

Después de aplicar Bootstrap se revisará cada regla para determinar si:

- queda redundante;
- entra en conflicto con Bootstrap;
- sigue aportando comportamiento específico del proyecto;
- debe modificarse para convivir con Bootstrap.

La eliminación de una regla se realizará únicamente cuando exista un reemplazo equivalente y verificable.

### 2.5 Identidad visual

Se conservarán los tokens visuales existentes del proyecto:

- `#14181c` — fondo principal
- `#1d232a` — superficie
- `#2c3440` — input
- `#00e054` — primario
- `#02b845` — primario hover
- `#40bcf4` — secundario
- `#ffffff` — texto
- `#9ab0c0` — texto muted
- `#303b47` — borde

Las personalizaciones de Bootstrap se centralizarán en `css/bootstrap-overrides.css`.

### 2.6 Criterios de aceptación

#### Bootstrap

- [ ] Bootstrap 5.3.8 está integrado mediante CDN jsDelivr.
- [ ] Bootstrap CSS se carga antes de los estilos propios.
- [ ] Bootstrap Bundle JS se carga antes del cierre de `body`.
- [ ] `styles.css` continúa cargándose.
- [ ] `components.css` continúa cargándose.
- [ ] `responsive.css` continúa cargándose.
- [ ] La integración no requiere modificar el código fuente de Bootstrap.

#### Bootstrap Grid

- [ ] Biblioteca y catálogo utilizan Bootstrap Grid.
- [ ] Desktop conserva la composición de dos columnas del mockup.
- [ ] En móvil biblioteca y catálogo se apilan.
- [ ] Las tarjetas del catálogo utilizan columnas responsive Bootstrap.
- [ ] No aparece overflow horizontal de página.

#### Identidad visual

- [ ] Se mantiene la paleta del proyecto.
- [ ] Se mantiene el fondo oscuro.
- [ ] Los botones conservan el verde característico.
- [ ] Se mantienen bordes, radios y contraste coherentes.
- [ ] `bootstrap-overrides.css` concentra las personalizaciones de Bootstrap.

#### Responsive

- [ ] Se valida iPhone 14 Pro — 390 × 844.
- [ ] Se valida Samsung Galaxy S23 — 412 × 915.
- [ ] Se valida iPad Air — 820 × 1180.
- [ ] Se valida desktop.
- [ ] No existe scroll horizontal global.
- [ ] El contenido principal permanece accesible en todos los tamaños.

#### Calidad

- [ ] La aplicación funciona en `http://localhost:3000`.
- [ ] No se introducen errores relevantes de consola.
- [ ] El test case 6 está documentado.
- [ ] Los hallazgos reales se registran como issues mediante GitHub MCP.
- [ ] Las correcciones reales se documentan como `[Fixed]` en `changelog.md`.

## 3. Herramientas

- Figma MCP.
- GitHub Copilot en Agent Mode.
- Playwright MCP (`@playwright/mcp`).
- GitHub MCP.

## 4. Momento 2 — Cierre

### 4.1 Contexto Figma utilizado

Mockup Bootstrap: [Proyecto Web Películas — Figma, nodo 2003:65](https://www.figma.com/design/aavw8ufOkinPXlXFVs9k7q/Proyecto-Web-Peliculas-Mockup-Bootstrap?node-id=2003-65&t=eVzgsTytu6vEXB5r-0), también enlazado desde `README.md`.

El PNG `docs/01-mockup/disenio-bootstrap.png` se utilizó como referencia visual local. Este enlace identifica el mockup; no acredita por sí solo una sesión de Figma MCP.

### 4.2 Prompt exacto utilizado con Figma MCP + Copilot

```
Analiza el mockup de Figma enlazado y genera la estructura HTML base integrando las clases de grilla de Bootstrap 5 para lograr un diseño responsive (mobile-first), asegurando que las tarjetas del catálogo utilicen la clase 'card' y el menú principal use 'navbar'.
```
### 4.3 Resultado obtenido

La IA generó correctamente la estructura anidada con .container, .row y .col-md-4 para las tarjetas, y aplicó las clases base del componente Navbar.

### 4.4 Ajustes manuales realizados

Se debieron ajustar manualmente los márgenes (mb-4, mt-3) y sobreescribir colores específicos en bootstrap-overrides.css para que coincidan con la paleta oscura del diseño de Figma, ya que la IA utilizó los colores por defecto de Bootstrap.

### 4.5 Evidencia final

- Test case: `docs/04-testing/test-case-6.md`
- Capturas: `docs/04-testing/capturas/tc-6/`
- Issues: [Implementar componentes avanzados de Bootstrap
 #54](https://github.com/keviineze/proyecto-web-peliculas/issues/54#issue-5745192704)
- PR: [Feature/esp componentes bootstrap add components- #53
#53](https://github.com/keviineze/proyecto-web-peliculas/pull/53#issue-5745120875)

## 5. Correcciones RC6, RC10 y RC12

- Se retiró el modal de Interstellar, que no está representado en el mockup disponible. Se quitaron los disparadores y el marcado de los modales. Se conserva Bootstrap Bundle para el Navbar y el Carousel.
- Las imágenes del carrusel se muestran completas con object-fit: contain; el contenedor tiene altura limitada y fondo para áreas libres.
- Se añadió separación vertical entre Películas Destacadas y Biblioteca/Catálogo.
- La validación visual posterior queda pendiente con el mockup aprobado como referencia.
- No se inventa un prompt ni contexto de Figma MCP que no esté disponible en el historial.