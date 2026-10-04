# Test Case 6 — Responsive: Migración a Bootstrap

## Metadata

| Campo | Valor |
|---|---|
| Responsable | Kevin Sosa |
| Fecha de ejecución | PENDIENTE |
| Rama | `feature/dev-frontend-bootstrap-migration` |
| URL | `http://localhost:3000` |
| Herramienta | Playwright MCP (`@playwright/mcp`) + GitHub Copilot Agent Mode |

## Objetivo

Verificar que la migración del layout al sistema de columnas de Bootstrap mantiene la composición del mockup, se adapta a dispositivos obligatorios y no genera overflow horizontal.

## Dispositivos obligatorios

- iPhone 14 Pro — 390 × 844
- Samsung Galaxy S23 — 412 × 915
- iPad Air — 820 × 1180

## Prompt para Copilot Agent Mode

Copiar este prompt en Copilot Agent Mode con Playwright MCP activo:

```text
Usando Playwright MCP, ejecutá el test responsive de la migración a Bootstrap contra http://localhost:3000.

Probá estos dispositivos/viewport:
1. iPhone 14 Pro — 390x844
2. Samsung Galaxy S23 — 412x915
3. iPad Air — 820x1180

Para cada dispositivo:
- Navegá a http://localhost:3000 y esperá a que termine la carga.
- Tomá una captura de pantalla completa.
- Verificá que no exista overflow horizontal global:
  document.documentElement.scrollWidth <= document.documentElement.clientWidth
- Verificá que la sección Biblioteca y la sección Catálogo se apilen correctamente en móvil.
- Verificá que en iPad la composición pueda utilizar el espacio horizontal sin cortar contenido.
- Verificá que las tarjetas del catálogo permanezcan dentro de sus columnas.
- Verificá que las imágenes no desborden sus contenedores.
- Verificá que el Navbar siga siendo accesible.
- Verificá que la sección Películas Destacadas permanezca visible y usable.
- Verificá que Mi Lista permanezca accesible.
- Verificá que el footer permanezca dentro del viewport.

Además, inspeccioná el DOM y confirmá que la estructura principal utiliza clases del sistema Grid de Bootstrap (row/col-*).

Guardá las capturas en:
docs/04-testing/capturas/tc-6/

Reportá para cada dispositivo:
- PASS o FAIL
- viewport
- overflow horizontal
- comportamiento de columnas
- comportamiento de tarjetas
- comportamiento de Navbar
- comportamiento del Carousel
- hallazgos
```

## Momento 1 — Pre-merge

### iPhone 14 Pro — 390 × 844

- Status: PENDIENTE
- Screenshot: `capturas/tc-6/momento-1/iphone-14-pro.png`
- Overflow horizontal: PENDIENTE
- Grid: PENDIENTE
- Cards: PENDIENTE
- Navbar: PENDIENTE
- Carousel: PENDIENTE
- Hallazgos: PENDIENTE

### Samsung Galaxy S23 — 412 × 915

- Status: PENDIENTE
- Screenshot: `capturas/tc-6/momento-1/samsung-galaxy-s23.png`
- Overflow horizontal: PENDIENTE
- Grid: PENDIENTE
- Cards: PENDIENTE
- Navbar: PENDIENTE
- Carousel: PENDIENTE
- Hallazgos: PENDIENTE

### iPad Air — 820 × 1180

- Status: PENDIENTE
- Screenshot: `capturas/tc-6/momento-1/ipad-air.png`
- Overflow horizontal: PENDIENTE
- Grid: PENDIENTE
- Cards: PENDIENTE
- Navbar: PENDIENTE
- Carousel: PENDIENTE
- Hallazgos: PENDIENTE

## Issues creados

- PENDIENTE — crear solamente si Playwright detecta un hallazgo real.

## Conclusión

PENDIENTE de ejecución real mediante Playwright MCP.