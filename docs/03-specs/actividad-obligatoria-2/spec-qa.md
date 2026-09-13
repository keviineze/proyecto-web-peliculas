# Especificación de Testing & QA

**Proyecto:** Proyecto Web Películas (Mini Letterboxd).
**Actividad:** Actividad Obligatoria N.º 2
**Rol:** Documentador / QA Tester
**Versión:** 1.0
**Estado:** Planificación inicial
**Rama de trabajo:** `feature/doc-qa-tester-add-test-cases`
**Rama base:** `release/actividad-obligatoria-1`
**URL de testing local:** `http://localhost:3000`

---

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Alcance del Testing](#alcance-del-testing)
3. [Herramientas](#herramientas)
4. [Plan de Testing](#plan-de-testing)
5. [Criterios de Aceptación](#criterios-de-aceptación)
6. [Momento 1: Testing Pre-Merge](#momento-1-testing-pre-merge)
7. [Momento 2: Testing Post-Merge](#momento-2-testing-post-merge)
8. [Documentación de Test Cases](#documentación-de-test-cases)
9. [Gestión de Bugs](#gestión-de-bugs)
10. [Resultados](#resultados)

---

## 🎯 Objetivo

El objetivo de este documento es definir el plan de testing y aseguramiento de calidad para el proyecto web de películas.

Como Documentador / QA Tester, se realizarán pruebas sobre las funcionalidades y la interfaz desarrollada por los integrantes responsables del Frontend/CSS y Responsive Design.

El testing tendrá como objetivos principales:

* Detectar errores funcionales y visuales.
* Verificar el comportamiento responsive.
* Comprobar compatibilidad entre navegadores.
* Evaluar aspectos básicos de rendimiento.
* Detectar problemas de accesibilidad.
* Verificar la estructura y semántica del HTML.
* Documentar los resultados obtenidos.
* Registrar mediante issues los bugs relevantes encontrados durante las pruebas.

---

## 🔎 Alcance del Testing

El testing se realizará en dos momentos definidos por la actividad:

### Momento 1 — Testing Pre-Merge

Se probarán las ramas de los integrantes responsables de Frontend/CSS y Responsive Design antes de que sus cambios sean integrados a `develop`.

El objetivo será detectar problemas antes de la integración.

### Momento 2 — Testing Post-Merge

Una vez que los cambios hayan sido integrados en `develop`, se volverán a ejecutar las pruebas para verificar el funcionamiento de la versión integrada.

El objetivo será detectar problemas producidos por la integración o problemas que no hayan sido detectados durante el Momento 1.

---

## 🛠️ Herramientas

### Playwright MCP

Se utilizará Playwright MCP para automatizar la interacción con el navegador y realizar las pruebas sobre el proyecto local.

Se utilizará para:

* Abrir `http://localhost:3000`.
* Interactuar con la página.
* Verificar elementos y comportamiento.
* Realizar pruebas responsive mediante diferentes tamaños de viewport.
* Realizar pruebas en distintos navegadores.
* Obtener capturas de pantalla como evidencia.
* Obtener información de la estructura de la página.

La configuración se encuentra en:

```text
.vscode/mcp.json
```

### GitHub MCP

Se utilizará GitHub MCP para gestionar los issues correspondientes a los bugs encontrados durante las pruebas, de acuerdo con lo establecido por la actividad.

Los issues deberán contener información suficiente para reproducir y comprender el problema encontrado.

---

## 📊 Plan de Testing

Se planifican los siguientes cinco test cases:

| # | Test Case                             | Objetivo                                                               | Herramienta                                 | Momento |
| - | ------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- | ------- |
| 1 | Compatibilidad de navegadores Desktop | Verificar el funcionamiento en distintos navegadores                   | Playwright MCP                              | 1 y 2   |
| 2 | Responsive en dispositivos            | Verificar la adaptación de la interfaz a distintos tamaños de pantalla | Playwright MCP                              | 1 y 2   |
| 3 | Performance y carga                   | Obtener información básica sobre el rendimiento de la página           | Playwright MCP + Performance API            | 1 y 2   |
| 4 | Accesibilidad Web                     | Detectar problemas de accesibilidad                                    | Playwright MCP + axe-core                   | 1 y 2   |
| 5 | HTML semántico                        | Verificar estructura y semántica del documento HTML                    | Playwright MCP + herramientas de validación | 1 y 2   |

Los resultados concretos de cada prueba serán registrados posteriormente en sus respectivos archivos dentro de:

```text
docs/04-testing/
```

---

## ✅ Criterios de Aceptación

Antes de considerar finalizada la actividad deberán cumplirse los siguientes puntos:

### Momento 1 — Pre-Merge

* [ ] Ejecutar los 5 test cases contra las ramas correspondientes.
* [ ] Utilizar Playwright MCP durante las pruebas.
* [ ] Documentar los resultados de cada test case.
* [ ] Incorporar capturas de pantalla como evidencia.
* [ ] Registrar los bugs relevantes encontrados.
* [ ] Crear los issues correspondientes mediante GitHub MCP.
* [ ] Notificar a los responsables de los componentes afectados.

### Momento 2 — Post-Merge

* [ ] Verificar que los cambios hayan sido integrados en `develop`.
* [ ] Ejecutar nuevamente los 5 test cases.
* [ ] Comparar los resultados con el Momento 1.
* [ ] Registrar nuevos problemas de integración, si existen.
* [ ] Crear los issues correspondientes mediante GitHub MCP.
* [ ] Completar `testing-doc.md`.
* [ ] Dejar documentados los resultados finales del testing.

---

## 🔄 Momento 1: Testing Pre-Merge

El Momento 1 se realizará cuando los integrantes responsables de Frontend/CSS y Responsive Design tengan sus ramas disponibles para testing.

### Flujo previsto

1. Obtener las ramas de los responsables.
2. Realizar checkout de la rama correspondiente.
3. Levantar el proyecto localmente.
4. Verificar que la aplicación esté disponible en `http://localhost:3000`.
5. Conectar y utilizar Playwright MCP mediante Copilot Agent Mode.
6. Ejecutar los cinco test cases.
7. Documentar los resultados y evidencias.
8. Identificar los hallazgos relevantes.
9. Crear los issues de bugs correspondientes mediante GitHub MCP.
10. Notificar a los responsables.

### Evidencia

Cada test case deberá registrar:

* Fecha y hora.
* Rama testeada.
* URL utilizada.
* Navegador/dispositivo, cuando corresponda.
* Resultado de la prueba.
* Hallazgos.
* Capturas de pantalla.
* Issue asociado, si corresponde.

---

## 🔄 Momento 2: Testing Post-Merge

El Momento 2 se realizará una vez que los cambios correspondientes hayan sido integrados en `develop`.

### Flujo previsto

1. Confirmar que los cambios fueron integrados.
2. Cambiar a la rama `develop`.
3. Actualizar la rama local.
4. Levantar nuevamente el proyecto.
5. Ejecutar los cinco test cases.
6. Comparar los resultados con el Momento 1.
7. Registrar problemas nuevos o problemas que persistan.
8. Crear los issues correspondientes mediante GitHub MCP.
9. Documentar los resultados finales.
10. Completar `testing-doc.md`.

---

## 📝 Documentación de Test Cases

Los resultados serán documentados en los siguientes archivos:

```text
docs/04-testing/
├── test-case-1.md
├── test-case-2.md
├── test-case-3.md
├── test-case-4.md
├── test-case-5.md
└── testing-doc.md
```

Estos archivos serán creados y completados durante la ejecución del testing.

### Test Case 1 — Compatibilidad Desktop

Se verificará el comportamiento del sitio utilizando diferentes navegadores.

Se analizará:

* Carga de la página.
* Visualización de los elementos.
* Interacciones principales.
* Diferencias de comportamiento o visualización.

### Test Case 2 — Responsive

Se verificará la adaptación de la interfaz utilizando diferentes tamaños de viewport correspondientes a dispositivos móviles y tablets.

Se analizará:

* Distribución de elementos.
* Contenido visible.
* Overflow horizontal.
* Tamaños y posiciones.
* Interacciones.

### Test Case 3 — Performance

Se analizarán métricas básicas relacionadas con la carga y rendimiento de la página utilizando las herramientas disponibles mediante Playwright MCP y Performance API.

### Test Case 4 — Accesibilidad

Se analizarán posibles problemas de accesibilidad mediante Playwright MCP y axe-core.

Se documentarán las violaciones encontradas y su gravedad.

### Test Case 5 — HTML Semántico

Se verificará la estructura HTML de la página y el uso correcto de elementos semánticos.

También se registrarán errores o advertencias relevantes encontrados durante la validación.

---

## 🐛 Gestión de Bugs

Se considerará crear un issue cuando el hallazgo represente un problema real que deba ser corregido.

Cada bug deberá documentar, como mínimo:

* Descripción del problema.
* Test case donde fue detectado.
* Rama donde fue encontrado.
* Pasos para reproducirlo.
* Resultado esperado.
* Resultado actual.
* Navegador/dispositivo, cuando corresponda.
* Captura de pantalla o evidencia.
* Responsable, si puede determinarse.

No se crearán issues simplemente por preferencias personales de diseño si estas no contradicen las especificaciones del proyecto.

---

## 📊 Resultados

Esta sección será completada durante la ejecución de los test cases.

### Momento 1

| Test Case   | Resultado | Issues    | Evidencia |
| ----------- | --------- | --------- | --------- |
| Test Case 1 | Pendiente | Pendiente | Pendiente |
| Test Case 2 | Pendiente | Pendiente | Pendiente |
| Test Case 3 | Pendiente | Pendiente | Pendiente |
| Test Case 4 | Pendiente | Pendiente | Pendiente |
| Test Case 5 | Pendiente | Pendiente | Pendiente |

### Momento 2

| Test Case   | Resultado | Issues    | Evidencia |
| ----------- | --------- | --------- | --------- |
| Test Case 1 | Pendiente | Pendiente | Pendiente |
| Test Case 2 | Pendiente | Pendiente | Pendiente |
| Test Case 3 | Pendiente | Pendiente | Pendiente |
| Test Case 4 | Pendiente | Pendiente | Pendiente |
| Test Case 5 | Pendiente | Pendiente | Pendiente |

---

## 📌 Estado actual

El documento corresponde a la etapa inicial de planificación.

Todavía no se registran resultados de testing, bugs ni issues, ya que las pruebas serán ejecutadas posteriormente sobre las ramas correspondientes y, en el Momento 2, sobre `develop`.

**Próximo paso:** configurar y verificar las herramientas MCP y comenzar el testing cuando las ramas de Frontend/CSS y Responsive Design estén disponibles.