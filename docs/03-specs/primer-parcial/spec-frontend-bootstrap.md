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

- [x] Bootstrap 5.3.8 está integrado mediante CDN jsDelivr.
- [x] Bootstrap CSS se carga antes de los estilos propios.
- [x] Bootstrap Bundle JS se carga antes del cierre de `body`.
- [x] `styles.css` continúa cargándose.
- [x] `components.css` continúa cargándose.
- [x] `responsive.css` continúa cargándose.
- [x] La integración no requiere modificar el código fuente de Bootstrap.

#### Bootstrap Grid

- [x] Biblioteca y catálogo utilizan Bootstrap Grid.
- [x] Desktop conserva la composición de dos columnas del mockup.
- [x] En móvil biblioteca y catálogo se apilan.
- [x] Las tarjetas del catálogo utilizan columnas responsive Bootstrap.
- [x] No aparece overflow horizontal de página.

#### Identidad visual

- [x] Se mantiene la paleta del proyecto.
- [x] Se mantiene el fondo oscuro.
- [x] Los botones conservan el verde característico.
- [x] Se mantienen bordes, radios y contraste coherentes.
- [x] `bootstrap-overrides.css` concentra las personalizaciones de Bootstrap.

#### Responsive

- [x] Se valida iPhone 14 Pro — 390 × 844.
- [x] Se valida Samsung Galaxy S23 — 412 × 915.
- [x] Se valida iPad Air — 820 × 1180.
- [x] Se valida desktop.
- [x] No existe scroll horizontal global.
- [x] El contenido principal permanece accesible en todos los tamaños.

#### Calidad

- [x] La aplicación funciona en `http://localhost:3000`.
- [x] No se introducen errores relevantes de consola.
- [x] El test case 6 está documentado.
- [x] Los hallazgos reales se registran como issues mediante GitHub MCP.
- [x] Las correcciones reales se documentan como `[Fixed]` en `changelog.md`.

## 3. Herramientas

- Figma MCP.
- GitHub Copilot en Agent Mode.
- Playwright MCP (`@playwright/mcp`).
- GitHub MCP.

## 4. Momento 2 — Cierre

### 4.2 Prompt utilizado con GitHub Copilot Agent Mode

El prompt utilizado para la implementación solicitó:

- integrar Bootstrap 5.3.8 mediante CDN jsDelivr;
- mantener `styles.css`, `components.css` y `responsive.css`;
- crear `css/bootstrap-overrides.css`;
- migrar Biblioteca y Catálogo al sistema de columnas Bootstrap;
- adaptar las tarjetas del catálogo a columnas responsive;
- mantener la identidad visual del mockup;
- revisar el resultado mediante Playwright MCP;
- comprobar los viewports responsive;
- evitar overflow horizontal.

### 4.3 Resultado obtenido

La migración del frontend fue implementada correctamente.

Se integró Bootstrap 5.3.8 mediante CDN jsDelivr y se conservaron los
archivos CSS existentes del proyecto.

La sección Biblioteca/Catálogo fue migrada al sistema de columnas
Bootstrap:

- `col-12 col-lg-3` para Biblioteca.
- `col-12 col-lg-9` para Catálogo.

Las tarjetas del catálogo utilizan columnas responsive Bootstrap:

- una columna en móvil;
- dos columnas desde `md`;
- tres columnas desde `lg`.

Se creó `css/bootstrap-overrides.css` para centralizar las
personalizaciones de Bootstrap y conservar la identidad visual del
proyecto.

Durante la validación se comprobó que Bootstrap se cargara correctamente,
que el layout responsive funcionara y que no existiera overflow horizontal
en los tamaños evaluados.

### 4.4 Ajustes manuales y revisión

Durante la revisión de la implementación se conservaron los estilos
existentes que continuaban siendo necesarios para el proyecto y se
utilizó `bootstrap-overrides.css` para adaptar Bootstrap a la identidad
visual existente.

La revisión realizada mediante Playwright comprobó el comportamiento
responsive del layout y la ausencia de overflow horizontal.

También se verificó mediante `git diff --check` que no existieran errores
de whitespace en los cambios.

### 4.5 Resultado del Test Case 6

El Test Case 6 se documentó en:

`docs/04-testing/test-case-6.md`

Se realizaron comprobaciones del layout Bootstrap en los tamaños definidos
por el template del test.

Los resultados principales fueron:

- Bootstrap cargado correctamente.
- Biblioteca y Catálogo utilizan Bootstrap Grid.
- En tamaños móviles las secciones se apilan.
- Las tarjetas se adaptan a las columnas responsive.
- No se detectó overflow horizontal.
- Los estilos existentes del proyecto se conservaron.
- `bootstrap-overrides.css` se utilizó para las personalizaciones de
  Bootstrap.

Durante la validación se observó que el favicon `/favicon.ico` devuelve 404. Esta observación es ajena a la migración Bootstrap y no se creó un
Issue por ella.

### 4.6 Evidencia final

- Test Case:
  `docs/04-testing/test-case-6.md`

- Capturas:
  `docs/04-testing/capturas/tc-6/`

- Mockup:
  `docs/01-mockup/disenio-bootstrap.png`

- Overrides:
  `css/bootstrap-overrides.css`

- Implementación principal:
  `index.html`

Los Issues y PR correspondientes se completarán según el flujo de ramas
del proyecto cuando se realice la integración.
