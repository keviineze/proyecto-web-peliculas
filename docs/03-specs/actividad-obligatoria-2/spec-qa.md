# Especificación de Testing & QA

**Proyecto:** Proyecto Web Películas (Mini Letterboxd).

**Actividad:** Actividad Obligatoria N.º 2

**Rol:** Documentador / QA Tester

**Versión:** 1.1

**Estado:** Completado

**Rama de trabajo:** `feature/doc-qa-tester-add-test-cases`

**Rama base:** `release/actividad-obligatoria-1`

**Rama de integración para Momento 2:** `develop`

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
11. [Evidencia de Ejecución](#evidencia-de-ejecución)
12. [Conclusión](#conclusión)

---

## 🎯 Objetivo

El objetivo de este documento es definir y documentar el proceso de testing y aseguramiento de calidad para el proyecto web de películas.

Como Documentador / QA Tester, se realizaron pruebas sobre las funcionalidades y la interfaz desarrollada por los integrantes responsables del Frontend/CSS y Responsive Design.

El testing tuvo como objetivos principales:

- Detectar errores funcionales y visuales.
- Verificar el comportamiento responsive.
- Comprobar compatibilidad entre navegadores y diferentes tamaños de viewport.
- Evaluar aspectos básicos de rendimiento.
- Detectar problemas de accesibilidad.
- Verificar la estructura y semántica del HTML.
- Validar los archivos CSS correspondientes.
- Documentar los resultados obtenidos.
- Registrar mediante issues los bugs relevantes encontrados durante las pruebas.
- Verificar posteriormente las correcciones realizadas antes del merge.

---

## 🔎 Alcance del Testing

El testing se realizó en dos momentos definidos por la actividad:

### Momento 1 — Testing Pre-Merge

Se probaron las ramas de los integrantes responsables de Frontend/CSS y Responsive Design antes de que sus cambios fueran integrados a `develop`.

El objetivo fue detectar problemas antes de la integración.

### Momento 2 — Testing Post-Merge

Una vez que los cambios fueron integrados en `develop`, se volvieron a ejecutar los cinco test cases sobre la versión integrada.

El objetivo fue detectar problemas producidos por la integración, problemas que persistieran o nuevos problemas que solamente aparecieran en la versión integrada.

---

## 🛠️ Herramientas

### Playwright MCP

Se utilizó Playwright MCP para automatizar la interacción con el navegador y realizar las pruebas sobre el proyecto local.

Se utilizó para:

- Abrir `http://localhost:3000`.
- Interactuar con la página.
- Verificar elementos y comportamiento.
- Realizar pruebas responsive mediante diferentes tamaños de viewport.
- Simular diferentes condiciones de visualización desktop.
- Obtener capturas de pantalla como evidencia.
- Obtener información de la estructura de la página.
- Obtener el accessibility snapshot.

La configuración se encuentra en: **.vscode/mcp.json**

### GitHub MCP

Se utilizó GitHub MCP para gestionar los issues correspondientes a los bugs encontrados durante las pruebas.

Los issues fueron creados cuando el hallazgo representó un problema real y reproducible.

**axe-core**: Se utilizó axe-core 4.7.2 durante el Test Case 4 para realizar la evaluación automatizada de accesibilidad.

**W3C Validator**: Se utilizó la validación W3C para comprobar la estructura HTML y los archivos CSS correspondientes al Test Case 5.

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

* [x] Ejecutar los 5 test cases contra las ramas correspondientes.
* [x] Utilizar Playwright MCP durante las pruebas.
* [x] Documentar los resultados de cada test case.
* [x] Incorporar capturas de pantalla como evidencia.
* [x] Registrar los bugs relevantes encontrados.
* [x] Crear los issues correspondientes mediante GitHub MCP.
* [x] Notificar a los responsables de los componentes afectados.

### Momento 2 — Post-Merge

* [x] Verificar que los cambios hayan sido integrados en `develop`.
* [x] Ejecutar nuevamente los 5 test cases.
* [x] Comparar los resultados con el Momento 1.
* [x] Registrar nuevos problemas de integración, si existen.
* [x] Crear los issues correspondientes mediante GitHub MCP.
* [x] Completar `testing-doc.md`.
* [x] Dejar documentados los resultados finales del testing.

---

## 🔄 Momento 1: Testing Pre-Merge

El Momento 1 se realizó antes del merge de las ramas correspondientes a Frontend/CSS y Responsive Design.

### Flujo realizado

1. Obtener las ramas de los responsables.   
2. Preparar el entorno local correspondiente.
3. Levantar el proyecto localmente. 
4. Verificar que la aplicación esté disponible en `http://localhost:3000`.
5. Utilizar Playwright MCP mediante Copilot Agent Mode.
6. Ejecutar los cinco test cases.
7. Documentar los resultados y evidencias.
8. Identificar los hallazgos relevantes.
9. Crear los issues de bugs correspondientes mediante GitHub MCP.
10. Notificar a los responsables.

### Resultados del Momento 1

| # | Test Case                             | Resultado                                                               | Issues                                 
| - | ------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- 
| 1 | TC1 | PASS                   | Ninguno                              
| 2 | TC2            | PASS | Ninguno                              
| 3 | TC3                   | PASS           | Ninguno            
| 4 | TC4                     | FAIL                                    | #27                   
| 5 | TC5                        | FAIL                    | #29 

### Issues generados

**Issue #27** — Accesibilidad

* Durante TC4 se detectaron tres violaciones de la regla link-in-text-block mediante axe-core.

* Las tres detecciones correspondían al mismo problema de accesibilidad en enlaces del catálogo.

* El issue fue creado y comunicado al responsable correspondiente.

* Posteriormente, el problema fue corregido antes del merge a develop.

**Issue #29** — Validación CSS

* Durante TC5 se detectaron errores de validación en responsive.css.

* Los errores estaban relacionados con contenido que no correspondía a código CSS dentro del archivo.

* El issue fue creado y comunicado al responsable correspondiente.

* Posteriormente, el problema fue corregido antes del merge a develop.

### Evidencia

Las evidencias correspondientes se encuentran en:

* docs/04-testing/capturas/tc-1/momento-1/
* docs/04-testing/capturas/tc-2/momento-1/
* docs/04-testing/capturas/tc-3/momento-1/
* docs/04-testing/capturas/tc-4/momento-1/
* docs/04-testing/capturas/tc-5/momento-1/

---

## 🔄 Momento 2: Testing Post-Merge

El Momento 2 se realizó después de que las ramas de Frontend/CSS y Responsive Design fueron integradas en `develop` .

Las pruebas se realizaron contra la versión integrada mediante: 

```text
http://localhost:3000
```

### Flujo realizado

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

### Resultados del Momento 2

| # | Test Case                             | Resultado                                                               | Issues                                 
| - | ------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- 
| 1 | TC1 | PASS | Ninguno                              
| 2 | TC2 | PASS* | #31                              
| 3 | TC3 | PASS | Ninguno            
| 4 | TC4 | PASS | Ninguno                  
| 5 | TC5 | PASS | Ninguno 

\* TC2 — Momento 2 — PASS después del retest Issue #31 — Corregido y verificado

### Verificación de problemas anteriores
El problema registrado en el Issue #27 durante el Momento 1 no volvió a presentarse durante TC4 en `develop`.
El problema registrado en el Issue #29 durante el Momento 1 no volvió a presentarse durante TC5 en `develop`.

**Nuevo issue detectado** 
Issue #31 — Responsive de la tabla del catálogo
Durante TC2 se detectó que la tabla del catálogo excede el espacio disponible en:
* iPhone 14 Pro — 390×844.
* Samsung Galaxy S23 — 412×915.

La tabla presenta un ancho de 482 px mientras que el espacio disponible es menor.

No se detectó scroll horizontal global de la página ni un contenedor desplazable que permitiera consultar las columnas restantes.

En iPad Air — 820×1180 — la tabla se visualizó correctamente.

El problema fue registrado mediante GitHub Issue #31 y comunicado al responsable correspondiente.

### Evidencia
Las evidencias correspondientes se encuentran en:
* docs/04-testing/capturas/tc-1/momento-2/
* docs/04-testing/capturas/tc-2/momento-2/
* docs/04-testing/capturas/tc-3/momento-2/
* docs/04-testing/capturas/tc-4/momento-2/
* docs/04-testing/capturas/tc-5/momento-2/

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

### Test Case 1 — Compatibilidad Desktop

Se verificó la visualización de la aplicación utilizando los tamaños de viewport definidos para el test.

No se detectaron bugs relevantes en ninguno de los dos momentos.

### Test Case 2 — Responsive

Se verificó la adaptación de la interfaz utilizando los viewports correspondientes a iPhone 14 Pro, Samsung Galaxy S23 e iPad Air.

Durante el Momento 1 no se detectaron problemas.

Durante el Momento 2 se detectó el problema de la tabla del catálogo en los dos viewports móviles, registrado como Issue #31.

### Test Case 3 — Performance

Se analizaron métricas mediante Performance API:
* domContentLoadedEventEnd
* loadEventEnd 
* domInteractive
* recursos cargados 
* tamaño de recursos
* duración de recursos

No se detectaron problemas relevantes en ninguno de los dos momentos.

### Test Case 4 — Accesibilidad

Se realizó una evaluación mediante axe-core.

Durante el Momento 1 se detectaron tres violaciones correspondientes a la regla link-in-text-block, registradas en el Issue #27.

Después de la corrección, el Momento 2 no presentó nuevas violaciones relevantes.

### Test Case 5 — HTML Semántico

Se verificó:
* estructura semántica;
* headings; 
* landmarks;
* labels;
* caption de tablas;
* validación HTML;
* styles.css;
* components.css;
* responsive.css.

Durante el Momento 1 se detectaron errores de validación en responsive.css, registrados en el Issue #29.

Después de la corrección y del merge, el Momento 2 no presentó nuevos errores relevantes.

---

## 🐛 Gestión de Bugs

Se consideró crear un issue cuando el hallazgo representó un problema real, reproducible y relacionado con los criterios establecidos para el test.

Cada bug registrado incluyó, cuando correspondía:

* Descripción del problema.
* Test case donde fue detectado.
* Rama donde fue encontrado.
* Pasos para reproducirlo.
* Resultado esperado.
* Resultado actual.
* Navegador/dispositivo, cuando corresponda.
* Captura de pantalla o evidencia.
* Responsable, si puede determinarse.

No se crearon issues por preferencias personales de diseño ni por warnings que no representaran un incumplimiento relevante.
---

## 📊 Resultados

Esta sección será completada durante la ejecución de los test cases.

### Momento 1

| Test Case   | Resultado | Issues    | Evidencia |
| ----------- | --------- | --------- | --------- |
| Test Case 1 | PASS | Ninguno | capturas/tc-1/momento-1/ |
| Test Case 2 | PASS | Ninguno | capturas/tc-2/momento-1/ |
| Test Case 3 | PASS | Ninguno | capturas/tc-3/momento-1/ |
| Test Case 4 | FAIL | #27 | capturas/tc-4/momento-1/ |
| Test Case 5 | FAIL | #29 | capturas/tc-5/momento-1/ |

### Momento 2

| Test Case   | Resultado | Issues    | Evidencia |
| ----------- | --------- | --------- | --------- |
| Test Case 1 | PASS | Ninguno | capturas/tc-1/momento-2/ |
| Test Case 2 | FAIL | #31 | capturas/tc-2/momento-2/ |
| Test Case 3 | PASS | Ninguno | capturas/tc-3/momento-2/ |
| Test Case 4 | PASS | Ninguno | capturas/tc-4/momento-2/ |
| Test Case 5 | PASS | Ninguno | capturas/tc-5/momento-2/ |

### Retest del Issue #31

Luego de la corrección implementada por el equipo de desarrollo e integrada en `develop`, se realizó una prueba de regresión específica del TC2 mediante Playwright MCP.

Los viewports afectados originalmente fueron nuevamente evaluados:

- iPhone 14 Pro — 390×844
- Samsung Galaxy S23 — 412×915
- iPad Air — 820×1180

La tabla del catálogo dispone ahora de desplazamiento horizontal propio en los dos viewports móviles donde se había detectado el problema. Se pudo alcanzar la columna final "Estado" mediante `scrollLeft`, sin generar scroll horizontal global de la página.

Resultado: **PASS — Issue #31 corregido y verificado.**

---

## 📌 Estado final

La planificación de QA fue ejecutada y completada.

Los cinco Test Cases fueron ejecutados en Momento 1 y Momento 2, documentando resultados y evidencias.

Durante el Momento 1 se detectaron dos bugs, registrados en los Issues #27 y #29, que posteriormente fueron corregidos y verificados después del merge.

Durante el Momento 2 se detectó un nuevo bug responsive, registrado en el Issue #31, relacionado con la visualización de la tabla del catálogo en dispositivos móviles.

La documentación de testing queda consolidada en los cinco Test Cases, testing-doc.md y este documento de especificación.

### Resumen Final
- 5 Test Cases
- 10 ejecuciones iniciales
- 1 retest específico de Issue #31
- 3 Issues detectados
- 3 Issues corregidos
- 0 Issues pendientes