# Testing Doc — Actividad Obligatoria N°2

**Proyecto:** Mini Letterboxd — Películas y series  
**Repositorio:** `keviineze/proyecto-web-peliculas`  
**Rol:** Documentador / QA Tester  
**Rama de trabajo:** `feature/doc-qa-tester-add-test-cases`  
**URL local:** http://localhost:3000  
**Estado:** En preparación

---

# Índice de Test Cases

1. [Test Case 1 — Compatibilidad en navegadores desktop](./test-case-1.md)
2. [Test Case 2 — Responsive en dispositivos móviles](./test-case-2.md)
3. [Test Case 3 — Performance y carga](./test-case-3.md)
4. [Test Case 4 — Accesibilidad web](./test-case-4.md)
5. [Test Case 5 — Estructura HTML semántica y CSS](./test-case-5.md)

---

# Resumen

Este documento centraliza la documentación de las pruebas de QA realizadas sobre el proyecto durante la Actividad Obligatoria N°2.

El testing se divide en dos momentos:

- **Momento 1:** Testing de integración parcial, antes del merge de las ramas feature/ a `develop`.
- **Momento 2:** Testing de integración final, después del merge de las ramas feature/ a `develop`.

La consigna establece que los test cases deben ejecutarse mediante Playwright MCP contra `http://localhost:3000`, documentando capturas, resultados e issues correspondientes. :contentReference[oaicite:6]{index=6}

---

# Herramientas utilizadas

## Playwright MCP

Se utiliza Playwright MCP para ejecutar las pruebas automatizadas mediante Copilot Agent y controlar el navegador.

Usos previstos:

- compatibilidad entre navegadores;
- emulación de viewport;
- pruebas responsive;
- medición de performance;
- evaluación de accesibilidad;
- snapshot de accesibilidad;
- inspección de la aplicación.

## GitHub MCP

Se utiliza GitHub MCP para crear los issues correspondientes a los bugs relevantes detectados durante las pruebas.

Los issues serán creados solamente cuando exista un hallazgo real y reproducible.

---

# Test Cases

| Test Case | Prueba | Herramienta | Momento 1 | Momento 2 | Estado |
|---|---|---|---|---|---|
| TC1 | Compatibilidad desktop | Playwright MCP | Pendiente | Pendiente | Pendiente |
| TC2 | Responsive | Playwright MCP + viewport emulation | Pendiente | Pendiente | Pendiente |
| TC3 | Performance y carga | Playwright MCP + Performance API | Pendiente | Pendiente | Pendiente |
| TC4 | Accesibilidad | Playwright MCP + axe-core | Pendiente | Pendiente | Pendiente |
| TC5 | HTML semántico y CSS | Playwright MCP + W3C | Pendiente | Pendiente | Pendiente |

---

# Momento 1 — Testing pre-merge

## Objetivo

Ejecutar los cinco test cases sobre las ramas feature/ del Desarrollador Frontend y del Especialista en Responsive Design antes de realizar el merge a `develop`.

El flujo indicado por la consigna contempla hacer checkout de las ramas feature/, levantar el proyecto con Live Preview y ejecutar los test cases contra `http://localhost:3000`. :contentReference[oaicite:7]{index=7}

## Estado

**Pendiente.**

## Issues generados

Todavía no se han generado issues.

### Resumen de issues

| Issue | Test Case | Descripción | Responsable | Estado |
|---|---|---|---|---|
| Ninguno | — | Todavía no se ejecutaron las pruebas | — | — |

---

# Momento 2 — Testing post-merge

## Objetivo

Ejecutar nuevamente los cinco test cases sobre `develop` una vez que las ramas feature/ hayan sido integradas.

Este momento busca detectar problemas de integración que puedan aparecer cuando todos los cambios se encuentran juntos. :contentReference[oaicite:8]{index=8}

## Estado

**Pendiente.**

## Issues generados

Todavía no se han generado issues.

### Resumen de issues

| Issue | Test Case | Descripción | Responsable | Estado |
|---|---|---|---|---|
| Ninguno | — | Todavía no se ejecutaron las pruebas | — | — |

---

# Resumen general de Issues

## Momento 1

**Issues creados:** 0

Todavía no se han ejecutado los test cases.

## Momento 2

**Issues creados:** 0

Todavía no se han ejecutado los test cases.

---

# Evidencias

Las capturas de las pruebas deberán almacenarse dentro de:

```text
docs/04-testing/capturas/