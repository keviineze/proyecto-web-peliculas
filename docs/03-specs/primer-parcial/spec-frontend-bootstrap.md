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

**Pendiente de completar con el enlace/nodo real del mockup actualizado cuando esté disponible en Figma.**

> El PNG entregado por el Coordinador se utilizó como referencia visual local durante la preparación/implementación. Para acreditar el uso de Figma MCP debe registrarse el enlace o nodo real utilizado con el MCP.

### 4.2 Prompt exacto utilizado con Figma MCP + Copilot

```text
PENDIENTE: pegar aquí literalmente el prompt utilizado durante la sesión real de Copilot/Figma MCP.
```

### 4.3 Resultado obtenido

PENDIENTE. Registrar el resultado real generado por Copilot/Figma MCP.

### 4.4 Ajustes manuales realizados

PENDIENTE. Registrar solamente los ajustes realmente realizados después de revisar el resultado generado.

### 4.5 Evidencia final

- Test case: `docs/04-testing/test-case-6.md`
- Capturas: `docs/04-testing/capturas/tc-6/`
- Issues: registrar solamente los hallazgos reales.
- PR: completar al abrir la PR.