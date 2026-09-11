# Spec QA — Actividad Obligatoria N.º 2

## 1. Información general

* **Actividad:** Actividad Obligatoria N.º 2
* **Rol:** Documentador / QA Tester
* **Proyecto:** Proyecto Web Películas (Mini Letterboxd)
* **Responsable:** Kevin Ezequiel Sosa
* **Rama de trabajo:** `feature/doc-qa-tester-add-test-cases`
* **Rama base:** `release/actividad-obligatoria-1`
* **Entorno de testing:** aplicación web ejecutándose localmente
* **URL de testing:** `http://localhost:3000`

---

## 2. Objetivo

El objetivo de esta tarea es verificar la calidad de la interfaz web del proyecto de películas mediante pruebas automatizadas asistidas por MCP.

El testing se realizará principalmente sobre los cambios desarrollados por los integrantes responsables de:

* Desarrollo Frontend / CSS.
* Responsive Design.

Las pruebas buscarán detectar problemas funcionales, visuales, de responsive design, rendimiento, accesibilidad y estructura semántica antes de que los cambios sean integrados a la rama `develop`.

Los hallazgos relevantes serán documentados y, cuando corresponda, registrados como issues de tipo `bug` en GitHub.

---

## 3. Alcance del testing

El testing contempla los siguientes aspectos:

1. Compatibilidad entre navegadores de escritorio.
2. Adaptación responsive en dispositivos móviles y tablets.
3. Rendimiento y tiempos de carga.
4. Accesibilidad web.
5. Estructura HTML semántica.

Las pruebas se ejecutarán inicialmente durante el **Momento 1 — Testing pre-merge** y posteriormente durante el **Momento 2 — Testing post-merge a develop**.

---

## 4. Plan de testing

### Test Case 1 — Compatibilidad en navegadores desktop

Se verificará el comportamiento y la presentación de la aplicación utilizando navegadores de escritorio compatibles con Playwright.

Navegadores a verificar:

* Chrome / Chromium
* Firefox
* Safari / WebKit
* Edge

### Objetivo

Comprobar que la interfaz principal y sus elementos visuales se comporten correctamente independientemente del navegador utilizado.

Se verificarán especialmente:

* carga de la página;
* navegación;
* visualización de contenido;
* botones y enlaces;
* estilos CSS;
* ausencia de errores visibles;
* comportamiento de componentes principales.

---

### Test Case 2 — Responsive en dispositivos móviles

Se verificará la adaptación de la interfaz utilizando diferentes tamaños de viewport mediante emulación de dispositivos.

Dispositivos de referencia:

* iPhone
* Samsung Galaxy
* iPad

### Objetivo

Comprobar que la interfaz se adapte correctamente a diferentes resoluciones y tamaños de pantalla.

Se verificará:

* ausencia de scroll horizontal no deseado;
* correcta distribución de elementos;
* legibilidad del contenido;
* tamaño y posición de botones;
* navegación;
* imágenes;
* tarjetas de películas;
* encabezado y demás componentes;
* ausencia de elementos superpuestos o cortados.

---

### Test Case 3 — Performance y carga

Se evaluará el rendimiento inicial de la aplicación utilizando información disponible mediante la Performance API del navegador.

### Objetivo

Detectar problemas relacionados con:

* tiempo de carga;
* recursos excesivamente pesados;
* carga de imágenes;
* tiempos de renderizado;
* comportamiento general durante la carga inicial.

---

### Test Case 4 — Accesibilidad web

Se realizará una evaluación automatizada de accesibilidad utilizando Playwright MCP junto con la evaluación mediante `axe-core`.

### Objetivo

Detectar problemas relacionados con accesibilidad, incluyendo:

* elementos sin nombre accesible;
* problemas de contraste;
* estructura incorrecta de encabezados;
* imágenes sin texto alternativo;
* problemas de navegación;
* atributos ARIA incorrectos o ausentes cuando sean necesarios.

---

### Test Case 5 — Estructura HTML semántica

Se verificará la estructura semántica del documento mediante snapshot de accesibilidad y validaciones HTML/CSS.

### Objetivo

Detectar problemas relacionados con:

* estructura HTML incorrecta;
* uso inadecuado de elementos semánticos;
* jerarquía de encabezados;
* elementos duplicados o innecesarios;
* atributos inválidos;
* errores de HTML;
* errores relevantes de CSS.

---

## 5. Herramientas

### Playwright MCP

Se utilizará Playwright MCP para automatizar la interacción con la aplicación web mediante un navegador real.

Permitirá realizar navegación, inspección de la interfaz, interacción con elementos, evaluación del contenido y captura de evidencia.

La aplicación será ejecutada localmente y Playwright MCP apuntará inicialmente a:

`http://localhost:3000`

---

### GitHub MCP

Se utilizará GitHub MCP para registrar los hallazgos que correspondan como issues de tipo `bug`.

Cada issue deberá incluir información suficiente para que el desarrollador pueda reproducir y corregir el problema.

---

## 6. Criterios de aceptación

### Testing

* [ ] Ejecutar los 5 test cases definidos.
* [ ] Ejecutar los tests contra `http://localhost:3000`.
* [ ] Registrar el momento de ejecución de cada test.
* [ ] Ejecutar el Momento 1 sobre las ramas `feature/` correspondientes.
* [ ] Ejecutar el Momento 2 después de la integración en `develop`.
* [ ] Verificar compatibilidad desktop.
* [ ] Verificar responsive.
* [ ] Verificar performance.
* [ ] Verificar accesibilidad.
* [ ] Verificar estructura HTML semántica.

### Evidencia

* [ ] Documentar cada test case.
* [ ] Incorporar capturas de pantalla como evidencia.
* [ ] Registrar los resultados obtenidos.
* [ ] Registrar los prompts utilizados con Copilot Agent Mode.
* [ ] Documentar cualquier ajuste manual realizado.

### Issues

* [ ] Crear un issue de tipo `bug` para cada hallazgo relevante.
* [ ] Incluir pasos para reproducir el problema.
* [ ] Incluir resultado esperado.
* [ ] Incluir resultado obtenido.
* [ ] Incluir evidencia cuando corresponda.
* [ ] Vincular el issue con la PR correspondiente cuando sea posible.
* [ ] Notificar al responsable del desarrollo del componente afectado.

### Documentación

* [ ] Completar `testing-doc.md`.
* [ ] Incluir enlaces a los cinco test cases.
* [ ] Incluir resumen de issues encontrados.
* [ ] Registrar los resultados del Momento 1.
* [ ] Registrar los resultados del Momento 2.
* [ ] Completar este `spec-qa.md` con la evidencia final.

---

## 7. Estrategia de ejecución

El testing se realizará en dos momentos.

### Momento 1 — Testing pre-merge

Se realizará sobre las ramas `feature/` de los integrantes responsables del desarrollo Frontend/CSS y Responsive Design.

Flujo:

1. Obtener la versión actual de las ramas de los desarrolladores.
2. Realizar checkout de las ramas correspondientes.
3. Ejecutar la aplicación localmente.
4. Verificar que la aplicación esté disponible en `http://localhost:3000`.
5. Conectar Playwright MCP mediante Copilot Agent Mode.
6. Ejecutar los cinco test cases.
7. Registrar resultados y capturas.
8. Crear issues de tipo `bug` para los hallazgos relevantes.
9. Notificar a los responsables correspondientes.

### Momento 2 — Testing post-merge

Una vez que las ramas de los desarrolladores hayan sido integradas a `develop`, se realizará una nueva ronda de pruebas.

Flujo:

1. Confirmar que los cambios hayan sido mergeados a `develop`.
2. Realizar checkout de `develop`.
3. Ejecutar la aplicación localmente.
4. Verificar `http://localhost:3000`.
5. Ejecutar nuevamente los cinco test cases.
6. Comparar los resultados con el Momento 1.
7. Registrar nuevos hallazgos.
8. Crear issues de tipo `bug` cuando corresponda.
9. Notificar al Coordinador y a los responsables.
10. Completar la documentación final.

---

## 8. Registro de resultados

Esta sección será completada durante la ejecución de los test cases.

| Test Case   | Momento   | Resultado | Bugs      | Evidencia |
| ----------- | --------- | --------- | --------- | --------- |
| Test Case 1 | Pendiente | Pendiente | Pendiente | Pendiente |
| Test Case 2 | Pendiente | Pendiente | Pendiente | Pendiente |
| Test Case 3 | Pendiente | Pendiente | Pendiente | Pendiente |
| Test Case 4 | Pendiente | Pendiente | Pendiente | Pendiente |
| Test Case 5 | Pendiente | Pendiente | Pendiente | Pendiente |

---

## 9. Resumen final

> Esta sección se completará al finalizar los Momentos 1 y 2.

* **Tests ejecutados:** Pendiente
* **Tests aprobados:** Pendiente
* **Tests fallidos:** Pendiente
* **Bugs encontrados:** Pendiente
* **Issues creados:** Pendiente
* **Issues resueltos:** Pendiente

---

## 10. Prompts utilizados

> Los prompts utilizados durante la ejecución de Playwright MCP se incorporarán aquí al finalizar cada test case.

### Test Case 1

```text
Pendiente
```

### Test Case 2

```text
Pendiente
```

### Test Case 3

```text
Pendiente
```

### Test Case 4

```text
Pendiente
```

### Test Case 5

```text
Pendiente
```

---

## 11. Decisiones y ajustes manuales

Esta sección documentará:

* hallazgos considerados bugs;
* hallazgos considerados mejoras;
* falsos positivos;
* problemas del entorno;
* ajustes realizados manualmente;
* decisiones tomadas durante el proceso de testing.

> Pendiente de completar durante la ejecución.
