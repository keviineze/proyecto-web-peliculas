# Spec - Arquitecto de Diagramas de Actividades

## MOMENTO 1: Planificación Inicial

### 1. Identificación de los 4 flujos principales
Considerando el contexto del proyecto de películas y la restricción de usar `prompt()` y `alert()` para la simulación de lógica de negocio, se definen los siguientes flujos:

1. **Flujo de Búsqueda y Filtrado de Películas**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿Se encontraron películas que coincidan con el género/título ingresado?
   * **Ciclos (while/repeat):** Ciclo para preguntar si desea realizar otra búsqueda o volver al menú principal.

2. **Flujo de Gestión de Lista Personal (Favoritos)**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿El contenido ya está en la lista personal? ¿Confirma la adición o remoción?
   * **Ciclos (while/repeat):** No aplica ciclos iterativos bloqueantes, solo validaciones directas.

3. **Flujo de Exportar y Compartir Lista Personal**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿La lista está vacía? ¿El formato elegido es texto o enlace?
   * **Ciclos (while/repeat):** Ciclo de validación para solicitar nuevamente el formato si ingresa uno inválido.

4. **Flujo de Calificación de Contenidos Vistos**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿El puntaje ingresado está dentro del rango permitido (1 a 5)?
   * **Ciclos (while/repeat):** Ciclo iterativo para procesar un array de contenidos (películas y series) marcados como vistos y solicitar calificación para cada uno secuencialmente.

### 2. Decisión sobre Swimlanes
Se utilizarán **particiones (swimlanes)** en los 4 diagramas dividiendo el modelo en `|Usuario|` y `|Sistema|`. 
**Justificación:** Al requerirse simulación mediante `prompt()` y `alert()`, es fundamental que el Desarrollador JavaScript tenga claro qué acciones son un input/output que bloquea la pantalla (Usuario) y cuáles representan procesamiento lógico interno, cálculos o manipulación de arrays (Sistema).

### 3. Criterios de Aceptación (Checklist)
- [x] 4 diagramas con start, stop, actividades, decisiones if-then-else y ciclos.
- [x] Swimlanes donde el flujo involucra al usuario y al sistema.
- [x] Flujo lógico coherente con la implementación planificada en plan.md.
- [x] Archivos .puml y .png exportados para cada diagrama.

---

## MOMENTO 2: Evidencia de Ejecución

### 1. Prompt exacto utilizado en Copilot Agent
**Contexto adjunto:** `plan.md`, `index.html`.

```text
Actúa como Arquitecto de Software experto en UML. Analiza los archivos adjuntos (plan.md, index.html y el mockup) y genera el código PlantUML exacto para los 4 flujos de actividades de este proyecto: 
1. Búsqueda y filtrado de películas
2. Simulación de compra de entradas
3. Autenticación (Login)
4. Calificación de películas

REGLAS ESTRICTAS DE SINTAXIS PLANTUML:
- Usa particiones (swimlanes) estrictamente divididas en |Usuario| y |Sistema|.
- Usa `start` para iniciar y `stop` para finalizar cada flujo.
- Escribe las actividades correctamente con `:` al inicio y `;` al final.
- Incluye decisiones condicionales usando `if (...) then (sí)` y `else (no)`.
- Incluye bucles iterativos usando `while (...)` o `repeat`.
- El flujo debe simularse pensando en inputs vía `prompt()` y outputs vía `alert()` de JavaScript.
```

### 2. Fragmento del código generado y ajustes manuales
La IA generó exitosamente los 4 flujos. A continuación, un fragmento del flujo de búsqueda generado:
```plantuml
|Sistema|
start
:Mostrar prompt() para ingresar un título;
|Usuario|
:Ingresar el título o cancelar;
|Sistema|
if (¿Se canceló la búsqueda?) then (sí)
  :Mostrar alert() de cancelación;
  stop
else (no)
endif
```
**Ajustes manuales:** La sintaxis devuelta fue impecable y no requirió correcciones de compilación. Se revisó exhaustivamente la lógica de los ciclos `while` para asegurar que el Desarrollador JavaScript tenga un mapa exacto de cómo implementar los loops con `prompt()`.

### 3. Decisiones de diseño finales
Los flujos quedaron modelados con una fuerte división entre las acciones bloqueantes de interfaz (Usuario) y la lógica de procesamiento (Sistema). Esto garantiza que la lógica de negocio quede completamente aislada y estructurada, facilitando el desarrollo y asegurando que las funciones puras puedan ser testeadas con Jasmine sin interferencia de la UI.

**Ajustes manuales tras Code Review:** Luego de la revisión del Coordinador, se realizaron ajustes para adecuar los diagramas al alcance real del proyecto. 
- El flujo de "Compra de entradas" se reemplazó por "Gestión de Lista Personal" agregando un ciclo iterativo `while` para gestionar múltiples contenidos.
- El flujo de "Login" se reemplazó por "Exportar/Compartir Lista".
- Se generalizó el término "película" a "contenido" y se cubrieron los caminos alternativos de búsqueda sin resultados.