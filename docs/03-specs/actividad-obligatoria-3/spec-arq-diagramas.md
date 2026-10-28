# Spec - Arquitecto de Diagramas de Actividades

## MOMENTO 1: Planificación Inicial

### 1. Identificación de los 4 flujos principales
Considerando el contexto del proyecto de películas y la restricción de usar `prompt()` y `alert()` para la simulación de lógica de negocio, se definen los siguientes flujos:

1. **Flujo de Búsqueda y Filtrado de Películas**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿Se encontraron películas que coincidan con el género/título ingresado?
   * **Ciclos (while/repeat):** Ciclo para preguntar si desea realizar otra búsqueda o volver al menú principal.

2. **Flujo de Simulación de Compra de Entradas**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿La cantidad de entradas solicitadas es mayor a 0? ¿Aplica descuento por cantidad?
   * **Ciclos (while/repeat):** Ciclo de validación para solicitar nuevamente la cantidad si el usuario ingresa un dato inválido o nulo.

3. **Flujo de Autenticación**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿Las credenciales coinciden con los registros del sistema? 
   * **Ciclos (while/repeat):** Ciclo que permite un máximo de 3 intentos fallidos antes de bloquear el acceso temporalmente.

4. **Flujo de Calificación de Películas**
   * **Actores:** Usuario, Sistema.
   * **Decisiones (if-then-else):** ¿El puntaje ingresado está dentro del rango permitido (1 a 5)?
   * **Ciclos (while/repeat):** Ciclo iterativo para procesar un array de películas vistas y solicitar calificación para cada una secuencialmente.

### 2. Decisión sobre Swimlanes
Se utilizarán **particiones (swimlanes)** en los 4 diagramas dividiendo el modelo en `|Usuario|` y `|Sistema|`. 
**Justificación:** Al requerirse simulación mediante `prompt()` y `alert()`, es fundamental que el Desarrollador JavaScript tenga claro qué acciones son un input/output que bloquea la pantalla (Usuario) y cuáles representan procesamiento lógico interno, cálculos o manipulación de arrays (Sistema).

### 3. Criterios de Aceptación (Checklist)
- [ ] 4 diagramas con start, stop, actividades, decisiones if-then-else y ciclos.
- [ ] Swimlanes donde el flujo involucra al usuario y al sistema.
- [ ] Flujo lógico coherente con la implementación planificada en plan.md.
- [ ] Archivos .puml y .png exportados para cada diagrama.

---

## MOMENTO 2: AL CERRAR (Pendiente de ejecución)
*(Esta sección se completará luego de utilizar Copilot Agent y exportar los archivos .puml)*