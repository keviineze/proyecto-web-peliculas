# Test Case 3 — Performance y Carga

## Metadata
| Campo | Valor |
|-------|-------|
| Responsable | Kevin Ezequiel Sosa|
| Fecha Momento 1 |24-09-26 |
| Fecha Momento 2 | 27-09-26 |
| Rama Momento 1 | `feature/dev-frontend-css-add-styles` |
| Rama Momento 2 | `develop` |
| URL testeada | `http://localhost:3000` |

## Objetivo
Medir los tiempos de carga y el tamaño de los recursos principales de la página
para detectar problemas de performance antes del merge a develop.

## Herramientas utilizadas
- Playwright MCP (`@playwright/mcp`) con evaluación de la Performance API del navegador
- GitHub Copilot Agent Mode

---

## Prompt para Copilot Agent Mode

Copiá este prompt en Copilot Agent Mode con Playwright MCP activo:

```
Usando Playwright MCP, necesito analizar la performance de http://localhost:3000

Ejecutá estos pasos en orden:

1. Navegá a la URL esperando Network idle
2. Usá evaluate() para ejecutar:
   window.performance.getEntriesByType("navigation")[0]
   y extraé: domContentLoadedEventEnd, loadEventEnd, domInteractive
3. Usá evaluate() para obtener window.performance.getEntriesByType("resource")
   y listá cada recurso con su name, transferSize y duration
4. Tomá una captura de pantalla del estado final cargado
5. Reportá:
   - Tiempo hasta DOMContentLoaded (ms)
   - Tiempo hasta Load completo (ms)
   - Tiempo hasta DOM Interactive (ms)
   - Listado de recursos: nombre, tipo, tamaño (KB) y tiempo de descarga (ms)
   - Total de recursos y tamaño total acumulado
   - ¿Hay recursos que superen 500KB?
   - ¿Hay recursos que tarden más de 500ms en descargar?
6. Generá un resumen con estado OK o con problemas por cada métrica

Guardá las capturas en docs/04-testing/capturas/tc-3/momento-X/
(reemplazá X por 1 o 2 según el momento de ejecución)
```

---

## MOMENTO 1 — Pre-merge (rama `feature/`)

### Métricas de performance
| Métrica | Valor medido | Umbral recomendado | Estado |
|---------|-------------|-------------------|--------|
| DOMContentLoaded | 16,2 ms | < 800 ms | OK |
| DOM Interactive | 16,1 ms | < 600 ms | OK |
| Load completo | 18,9 ms | < 2000 ms | OK |
| Total de recursos | 7 | — | OK |
| Tamaño total | 2,051 KB | < 1 MB | OK |

### Recursos analizados
| Recurso | Tipo | Tamaño (KB) | Tiempo descarga (ms) | Estado |
|---------|------|-------------|----------------------|--------|
| `http://localhost:3000/css/styles.css` | CSS / link | 0,293 | 4,6 | OK |
| `http://localhost:3000/css/components.css` | CSS / link | 0,293 | 5,0 | OK |
| `http://localhost:3000/assets/images/interestellar.jpeg` | Imagen / img | 0,293 | 4,9 | OK |
| `http://localhost:3000/assets/images/chihiro-2.jpeg` | Imagen / img | 0,293 | 7,2 | OK |
| `http://localhost:3000/assets/images/chihiro.jpeg` | Imagen / img | 0,293 | 7,4 | OK |
| `http://localhost:3000/assets/images/interestellar-2.jpeg` | Imagen / img | 0,293 | 7,7 | OK |
| `http://localhost:3000/assets/images/dark.jpeg` | Imagen / img | 0,293 | 8,2 | OK |

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Estado final cargado | ![](capturas/tc-3/momento-1/performance-momento-1.png) |

### Hallazgos
| # | Métrica / Recurso | Valor | Descripción | Severidad |
|---|-------------------|-------|-------------|-----------|
| — | — | — | No se detectaron recursos superiores a 500 KB ni recursos con tiempo de descarga mayor a 500 ms. | — |

### Resultado Momento 1
- [x] ✅ PASS — Sin hallazgos
- [ ] ⚠️ FAIL CON OBSERVACIONES
- [ ] ❌ FAIL

---

## MOMENTO 2 — Post-merge (`develop`)

### Métricas de performance
| Métrica | Valor medido | Umbral recomendado | Estado |
|---------|-------------|-------------------|--------|
| DOMContentLoaded | 22 ms | < 800 ms | OK |
| DOM Interactive | 21,9 ms | < 600 ms | OK |
| Load completo | 35,1 ms | < 2000 ms | OK |
| Total de recursos | 8 | — | OK |
| Tamaño total transferido (suma de `transferSize`) | 300 bytes (0,293 KiB) | < 1 MiB | OK |
| Tamaño total de cuerpos codificados (`encodedBodySize`) | 213.237 bytes (208,24 KiB) | < 1 MiB | OK |

**Nota sobre caché:** `transferSize` fue 0 para 7 de los 8 recursos, consistente con respuestas servidas desde caché. Por eso se informa también el tamaño de los cuerpos codificados, que refleja el contenido de los recursos aunque no se transfiriera de nuevo durante esta navegación.

### Recursos analizados
| Recurso | Tipo | `transferSize` (KiB) | `encodedBodySize` (KiB) | Duración (ms) | Estado |
|---------|------|-----------------------|-------------------------|----------------|--------|
| `http://localhost:3000/css/styles.css` | CSS (`link`) | 0 | 3,77 | 5,9 | OK |
| `http://localhost:3000/css/components.css` | CSS (`link`) | 0,293 | 3,47 | 10,1 | OK |
| `http://localhost:3000/css/responsive.css` | CSS (`link`) | 0 | 1,24 | 11,7 | OK |
| `http://localhost:3000/assets/images/interestellar.jpeg` | Imagen (`img`) | 0 | 43,34 | 1,9 | OK |
| `http://localhost:3000/assets/images/chihiro.jpeg` | Imagen (`img`) | 0 | 33,03 | 3,1 | OK |
| `http://localhost:3000/assets/images/interestellar-2.jpeg` | Imagen (`img`) | 0 | 44,06 | 4,1 | OK |
| `http://localhost:3000/assets/images/chihiro-2.jpeg` | Imagen (`img`) | 0 | 6,96 | 7,9 | OK |
| `http://localhost:3000/assets/images/dark.jpeg` | Imagen (`img`) | 0 | 72,36 | 9,2 | OK |

No se encontraron recursos con tamaño transferido superior a 500 KiB ni con duración superior a 500 ms.

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Estado final cargado | ![](capturas/tc-3/momento-2/performance-estado-final.png) |

### Hallazgos
| # | Métrica / Recurso | Valor | Descripción | Severidad |
|---|-------------------|-------|-------------|-----------|
| — | — | — | No se detectaron métricas fuera de los umbrales ni recursos superiores a 500 KiB o 500 ms. Los `transferSize` en cero se atribuyen a caché; los cuerpos codificados suman 208,24 KiB. | — |

### Resultado Momento 2
- [x] ✅ PASS — Sin hallazgos
- [ ] ⚠️ FAIL CON OBSERVACIONES
- [ ] ❌ FAIL

---

## Issues creados
| Issue | Momento | Métrica / Recurso | Severidad | Estado |
|-------|---------|-------------------|-----------|--------|
| — | Momento 2 | No se crearon Issues; no se detectaron problemas de performance que requieran seguimiento | — | — |

## Conclusión general
**Resultado final:** PASS — Momento 1 y Momento 2 quedaron dentro de los umbrales documentados. En Momento 2 se midieron 22 ms para DOMContentLoaded, 21,9 ms para DOM Interactive y 35,1 ms para Load completo. Los 8 recursos registraron 300 bytes acumulados de transferencia según la Performance API, con respuestas cacheadas; los cuerpos codificados sumaron 208,24 KiB. Ningún recurso excedió 500 KiB ni 500 ms. No se encontraron hallazgos que requieran Issue.