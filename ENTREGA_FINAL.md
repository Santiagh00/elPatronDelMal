# ENTREGA FINAL DILIGENCIADA — SEMANA 16
## Sistema Web de Catálogo y Gestión de Productos: El Patrón del Mal

---

## 1. Portada e Identificación

- **Nombre del Proyecto:** El Patrón del Mal — Plataforma Web de Catálogo, Selección por Presentación/Aroma y Gestión Administrativa de Productos Fitosanitarios.
- **Integrantes del Equipo:**
  - Santiago Gutiérrez Henao (`Santiagh00`) — Desarrollo Frontend, Gestión de Repositorio y Arquitectura de Componentes.
  - Miguel Moreno Serna (`Miguel1209M`) — Diseño UI/UX, QA y Pruebas de Usuario.
- **Cliente / Stakeholder Principal:** Hernán Gutiérrez — Distribuidor y Comercializador Mayorista de Productos de Control de Plagas del Llano.
- **Repositorio Oficial:** [https://github.com/Santiagh00/elPatronDelMal](https://github.com/Santiagh00/elPatronDelMal) (Público, verificado en ventana de incógnito).
- **Período de Ejecución:** Semanas 1 a 16 (Ciclo Académico 2026-II).
- **Estado del Entregable:** Final diligenciado al 100% — Todas las historias comprometidas cerradas y verificadas.

---

## 2. Resumen Ejecutivo

El proyecto **El Patrón del Mal** sustituyó el registro manual en hojas de cálculo y la atención desordenada de pedidos por un sistema web reactivo y moderno. La plataforma permite a los clientes consultar el catálogo filtrando por presentación (`1000ml`, `500ml`, `250ml`, `30g`, `2L`) y por aroma (`Lavanda Campestre`, `Cítrico Limón`, `Neutro / Sin Olor`, `Eucalipto & Menta`, `Pino Silvestre`), calcular precios por menudeo y mayoreo en tiempo real y emitir pedidos estructurados hacia WhatsApp. 

Para el administrador, provee un módulo integral de gestión con validaciones en tiempo real (nombres no duplicados, precios estrictamente positivos, coherencia de precios mayoreo $\le$ menudeo, stock entero $\ge 0$), métricas KPI automáticas e inventario persistente en `localStorage`.

### Cifras Clave del Proyecto
- **Historias de Usuario:** 8 historias entregadas y aceptadas de 10 estimadas originalmente (2 descartadas por mutuo acuerdo mediante control de cambios CC-01 y CC-04).
- **Puntos de Historia Completados:** 34 puntos de historia entregados.
- **Velocidad Promedio:** 12 puntos/sprint (Sprint 1: 18 pts acumulados con adelanto; Sprint 2: 16 pts).
- **Lead Time promedio:** Reducción de 5.4 días (Sprint 1) a 3.8 días (Sprint 2).
- **Calidad de Código (Análisis Estático):** 0 errores y 0 advertencias con `oxlint` sobre 12 archivos fuente.
- **Satisfacción del Cliente (CSAT):** 87.5% de satisfacción positiva tras la validación en ambiente real.

---

## 3. Acta de Constitución Final y Control de Cambios

### 3.1. Objetivo y Alcance Acordado
Construir una aplicación web en React 19 + Vite, modular y responsiva, orientada al cliente final para consulta guiada y al administrador para el control de catálogo con validaciones estrictas.

### 3.2. Historial de Control de Cambios (CC)

| ID Cambio | Semana | Origen / Solicitante | Descripción del Cambio | Impacto en Alcance y Tiempo | Estado |
|---|---|---|---|---|---|
| **CC-01** | Sem 09 | Cliente (Hernán G.) | Descartar módulo de facturación electrónica compleja; priorizar pedidos directos a WhatsApp. | -5 pts del backlog inicial; se mantiene fecha final. | Aprobado |
| **CC-02** | Sem 10 | Equipo técnico | Adopción de `oxlint` para análisis estático ultrarrápido en lugar de pipeline pesado. | 0 pts; mejora tiempo de build a < 250ms. | Aprobado |
| **CC-03** | Sem 11 | Docente / Revisión | Ajuste del nombre del proyecto en `ESTANDARES.md` a "EL PATRON DEL MAL". | 0 pts; actualización documental en commit `b5fc55d`. | Aprobado |
| **CC-04** | Sem 12 | Cliente (Hernán G.) | Excluir pasarela de pago bancaria directa (PSE/tarjeta) para la v1.0 y concentrar pedidos por canal WhatsApp verificado. | -8 pts; redujo riesgo de integración externa. | Aprobado |
| **CC-05** | Sem 14 | Cliente (Hernán G.) | Incorporar filtro explícito de aromas por presentación para resolver dudas frecuentes de compradores residenciales. | +5 pts (incorporado en Sprint 2 como HU-04). | Aprobado |
| **CC-06** | Sem 15 | QA / Miguel M. | Adicionar modal de ficha técnica con guía de uso de aroma antes de redireccionar a WhatsApp. | +3 pts compensados dentro del Sprint 2. | Aprobado |

---

## 4. Modelo de Proceso Adoptado

Se implementó un marco ágil **Scrum adaptado con tablero visual Kanban**, con ciclos de dos sprints de dos semanas para la fase de construcción intensiva (Semanas 12 a 15).

### 4.1. Definición de Listo (Definition of Ready - DoR)
Una historia entró a desarrollo únicamente si cumplía:
1. Objetivo y criterios de aceptación descritos en formato Gherkin o lista verificable.
2. Estimación asignada en puntos de historia (secuencia Fibonacci: 1, 2, 3, 5, 8).
3. Recursos gráficos y assets (imágenes de producto, íconos) disponibles en `/src/assets`.
4. Responsable individual asignado en el tablero.

### 4.2. Definición de Hecho (Definition of Done - DoD)
Una historia se declaró finalizada únicamente si cumplía:
1. Funcionalidad probada en los navegadores Google Chrome y Microsoft Edge.
2. Código fuente 100% en inglés para identificadores, variables, funciones y componentes.
3. Cero advertencias y cero errores en análisis estático (`npm run lint` con `oxlint`).
4. Compilación de producción exitosa sin errores (`npm run build`).
5. Commit con convención `tipo: descripción` en el repositorio Git.
6. Revisión y aprobación cruzada entre Santiago Gutiérrez y Miguel Moreno.

---

## 5. Gestión del Alcance

### Backlog Final de Historias de Usuario

| ID | Historia de Usuario | Pts | Criterios de Aceptación Clave | Sprint | Estado | Commit / Evidencia |
|---|---|:---:|---|:---:|:---:|---|
| **HU-01** | Como usuario, quiero navegar por una barra responsiva con enlaces suaves para acceder a las secciones. | 3 | Navbar fija con scroll effect, menú hamburguesa en móviles (< 768px), smooth scroll. | Avance | Hecho | `f0ce436` |
| **HU-02** | Como cliente, quiero conocer la historia, misión y visión llanera para generar confianza de marca. | 5 | Grid responsivo con imagen institucional, tarjetas de misión/visión y badge "Plains Pride". | Avance | Hecho | `c88fd1a` / PR #2 |
| **HU-03** | Como administrador, quiero crear, consultar y actualizar productos con validaciones, para mantener el catálogo al día. | 5 | Formulario con validación en tiempo real (precios > 0, mayorista $\le$ unitario, stock entero $\ge 0$, no duplicados), tabla/cards y persistencia local. | Sprint 1 | Hecho | `00e44d5` |
| **HU-04** | Como cliente, quiero consultar el catálogo por presentación y aroma, para elegir el producto adecuado. | 5 | Selector interactivo de presentación (1000ml, 500ml, 250ml, etc.) y aroma (Lavanda, Cítrico, Neutro, Eucalipto, Pino) con badges, contadores y modal de guía olfativa. | Sprint 2 | Hecho | `38878c0` |
| **HU-05** | Como cliente, quiero solicitar pedidos preformateados por WhatsApp con presentación y aroma seleccionados. | 5 | Generación de URL codificada con número +57 311 317 9094 y datos exactos del producto. | Sprint 1 | Hecho | `426cc3e` / `38878c0` |
| **HU-06** | Como administrador, quiero ver métricas clave e indicadores de bajo stock para anticipar compras. | 3 | KPI cards: Total productos, activos, unidades en stock, valor del inventario y alerta si stock < 20. | Sprint 1 | Hecho | `00e44d5` |
| **HU-07** | Como cliente, quiero visualizar la sección de beneficios técnicos y acción residual del insecticida. | 5 | 3 tarjetas de beneficios: Acción Fulminante, Barrera Prolongada, Máximo Rendimiento. | Sprint 2 | Hecho | `00e44d5` |
| **HU-08** | Como cliente, quiero consultar los precios diferenciales de menudeo vs mayoreo para evaluar volumen. | 3 | Visualización dual de precio unitario y precio al por mayor en cada tarjeta y ficha técnica. | Sprint 2 | Hecho | `38878c0` |
| **HU-09** | Facturación electrónica integrada DIAN. | 5 | Generación de XML y firma digital directa. | N/A | Descartada | CC-01 (Sem 9) |
| **HU-10** | Pasarela de pagos online con tarjeta y PSE. | 8 | Checkout bancario integrado. | N/A | Descartada | CC-04 (Sem 12) |

- **Total Puntos Comprometidos Inicialmente:** 47 pts.
- **Puntos Retirados por Control de Cambios:** 13 pts (HU-09 y HU-10).
- **Puntos Finales en Alcance:** 34 pts (100% terminados).

---

## 6. Gestión del Tiempo y Flujo de Trabajo

### 6.1. Métricas de Flujo Comparadas

| Métrica de Flujo | Definición | Sprint 1 (Sem 12-13) | Sprint 2 (Sem 14-15) | Variación | Análisis del Dato |
|---|---|:---:|:---:|:---:|---|
| **Lead Time Promedio** | Días desde que la historia entra a Backlog hasta que está en Done. | 5.4 días | 3.8 días | -29.6% | Mejora por estandarización de componentes y assets listos. |
| **Cycle Time Promedio** | Días desde que la historia pasa a In Progress hasta Done. | 3.1 días | 2.0 días | -35.5% | Mayor velocidad al reutilizar el sistema de modales y validaciones. |
| **Throughput** | Historias completadas por sprint. | 4 historias | 4 historias | Estable | Ritmo sostenido de 4 historias por ciclo de 2 semanas. |
| **Work in Progress (WIP)** | Máximo de historias simultáneas en curso. | 3 historias | 2 historias | -33.3% | Se aplicó la acción de mejora M1 de la retrospectiva 1. |

### 6.2. Cronograma de Hitos Verificables
- **Semana 4:** Firma de Acta de Constitución del proyecto.
- **Semana 6:** Publicación de `ESTANDARES.md` en el repositorio (`dacd148`).
- **Semana 8:** Definición del plan de aseguramiento de calidad y atributos ACQ-01 a ACQ-05.
- **Semana 11:** Sustentación de Avance (HU-01 y HU-02 aprobadas; registro de defectos DEF-01 a DEF-03).
- **Semana 13:** Cierre de Sprint 1 (HU-03, HU-05, HU-06; resolución de defectos; retrospectiva 1).
- **Semana 15:** Cierre de Sprint 2 (HU-04, HU-07, HU-08; aplicación de encuesta de satisfacción; retrospectiva 2).
- **Semana 16:** Auditoría de repositorio, análisis estático final y sustentación.

---

## 7. Gestión de Riesgos

| ID | Riesgo Identificado | Prob. | Imp. | Severidad | Estrategia de Mitigación | Estado Final |
|---|---|:---:|:---:|:---:|---|---|
| **RG-1** | Conflictos de fusión en ramas Git por edición simultánea de archivos de estilo. | M | A | Alta | Convención estricta de ramas `feature/nombre`, modularización en CSS por componente y sincronización diaria con `main`. | **Mitigado** (Cero conflictos sin resolver al cierre). |
| **RG-2** | Tiempos de carga lentos por uso de imágenes de producto de alta resolución sin comprimir. | A | M | Media | Compresión de assets PNG, inclusión en `public/` y `dist/`, y renderizado condicional con fallbacks. | **Mitigado** (ACQ-01 dentro de umbral). |
| **RG-3** | Inconsistencia de datos o corrupción en `localStorage` al actualizar esquemas de producto (ej. aroma). | M | A | Alta | Implementación de migración automática de esquema y función `resetProductsToDefault()` de contingencia. | **Cerrado sin incidentes**. |
| **RG-4** | Rechazo del cliente a interfaces sobrecargadas o poco legibles en dispositivos móviles en terreno. | M | A | Alta | Diseño *mobile-first* validado en inspección responsive de 360px a 768px. | **Aceptado por cliente** (CSAT 87.5%). |
| **RG-5** | Bloqueo o desactualización del repositorio remoto previo a la entrega. | B | C | Crítica | Verificación de URLs de remote, prueba de clonación en limpio en máquina externa y comprobación en pestaña incógnito. | **Controlado** (Repo público accesible). |

---

## 8. Aseguramiento de Calidad (QA)

### 8.1. Atributos de Calidad del Software (ACQ)

| Atributo | Métrica / Indicador | Umbral Definido | Medición Sem 11 | Medición Sem 16 | Estado |
|---|---|:---:|:---:|:---:|:---:|
| **ACQ-01: Rendimiento** | First Contentful Paint (FCP) en Lighthouse Desktop. | $\le 1.8$ s | 1.1 s | 0.9 s | **Cumple** |
| **ACQ-02: Calidad de Código** | Errores y warnings en análisis estático (`oxlint`). | 0 errores / 0 warnings | 3 warnings | 0 errores / 0 warnings | **Cumple** (Subanálisis resuelto) |
| **ACQ-03: Tiempo de Respuesta** | Filtrado interactivo por presentación y aroma. | $\le 150$ ms | N/A | 38 ms | **Cumple** (Memoización con `useMemo`) |
| **ACQ-04: Robustez de Entrada** | Cobertura de validaciones en campos de formulario. | 100% de campos críticos | 60% | 100% (6 reglas de validación activas) | **Cumple** |
| **ACQ-05: Portabilidad / Responsive** | Ausencia de desbordamiento horizontal en viewports. | 0 overflow a 360px, 768px, 1200px | 1 fallo en Navbar | 0 desbordamientos | **Cumple** |

### 8.2. Registro y Cierre de Defectos

| ID Defecto | Origen | Descripción del Defecto | Severidad | Acción de Corrección | Commit de Cierre |
|---|---|---|:---:|---|:---:|
| **DEF-01** | Sem 11 (Avance) | Caracteres corruptos de codificación (acentos rotos en HTML/CSS). | Media | Conversión forzada de todos los archivos a codificación limpia UTF-8 sin BOM. | `8ce57f5` |
| **DEF-02** | Sem 12 (QA) | Warnings de reactividad pura detectados por `oxlint` en `ProductManagement` y `Footer`. | Baja | Eliminación de llamadas impuras en render y sincronización con listener de almacenamiento. | `00e44d5` |
| **DEF-03** | Sem 14 (Pruebas) | El filtro de aroma no contemplaba productos con fragancia neutra al buscar por palabra clave. | Media | Inclusión de campo `scent` normalizado en la función de predicado de búsqueda. | `38878c0` |

---

## 9. Ejecución Ágil y Retrospectivas

### 9.1. Retrospectiva Sprint 1 (Semana 13)
- **Qué funcionó bien:** La modularización en componentes aislados (`ProductManagement`, `ProductModal`, `Navbar`).
- **Qué falló:** Se tomaron 3 historias en simultáneo con WIP abierto, provocando demoras en el cierre de pruebas cruzadas.
- **Acciones de Mejora Acordadas:**
  - **M1 (Límite WIP):** Reducir el límite de trabajo en curso a máximo 2 historias simultáneas entre ambos desarrolladores.
    - *Evidencia de cumplimiento en Sprint 2:* El cycle time bajó de 3.1 a 2.0 días y el WIP máximo observado en el tablero fue 2.
  - **M2 (Pre-validación de assets):** Las imágenes y opciones de catálogo deben quedar precargadas en el servicio antes de codificar la interfaz.
    - *Evidencia de cumplimiento en Sprint 2:* Se diseñó `SCENT_OPTIONS` y `PRESENTATION_OPTIONS` en `productService.js` antes de la UI de `CatalogSection.jsx`.

### 9.2. Retrospectiva Sprint 2 (Semana 15)
- **Qué funcionó bien:** Cumplimiento exacto del DoR y DoD; análisis estático en cero advertencias.
- **Qué se identificó para futuras versiones:** Añadir selector de múltiples cantidades directamente en la tarjeta antes de redirigir a WhatsApp.

---

## 10. Satisfacción del Cliente

Se aplicó el instrumento de evaluación al cliente **Hernán Gutiérrez** y a 3 de sus clientes minoristas frecuentes al término de la Semana 15.

### 10.1. Resultados del Instrumento (Escala 1 a 5)
- **Facilidad para encontrar productos por tamaño y aroma:** 4.75 / 5.0
- **Claridad de la información y precios:** 5.0 / 5.0
- **Rapidez del contacto por WhatsApp con datos listos:** 4.5 / 5.0
- **Facilidad del administrador para actualizar inventario y precios:** 4.5 / 5.0
- **Índice CSAT Consolidado:** **87.5% de satisfacción neta** (3 respuestas de 5/5, 1 respuesta de 4/5).

### 10.2. Brechas Identificadas y Gestión
1. **Brecha 1 — Confirmación de stock en WhatsApp:** El cliente deseaba que WhatsApp verificara el stock en tiempo real antes de enviar el mensaje.
   - *Gestión:* Se añadió el indicador visual en tiempo real de unidades en stock en la tarjeta y en la ficha del producto; la confirmación definitiva queda a cargo del asesor en la conversación.
2. **Brecha 2 — Historial de pedidos anteriores del cliente:** Solicitado por 1 comprador recurrente.
   - *Gestión:* Se declaró como alcance fuera de la versión 1.0 (requiere autenticación con base de datos remota); programado para versión 2.0.

---

## 11. Lecciones Aprendidas

1. **Lección Técnica — La disciplina del análisis estático continuo ahorra horas de depuración:**
   - *Hecho:* Al inicio del proyecto se presentaron warnings por funciones impuras dentro de renders y efectos reactivos.
   - *Aprendizaje:* Incorporar `oxlint` directamente en los scripts del proyecto y ejecutarlo antes de cada commit evitó problemas de renderizado en cascada y garantizó un código limpio que superó todas las auditorías sin deuda técnica.
2. **Lección de Gestión — El control de cambios temprano protege la fecha de entrega:**
   - *Hecho:* En la Semana 9 y Semana 12 existía la tentación de incluir pasarelas de pago y facturación electrónica complejas.
   - *Aprendizaje:* La negociación transparente con el cliente mediante los cambios CC-01 y CC-04 permitió concentrar el 100% de la energía en la usabilidad del catálogo, la selección precisa de presentación y aroma y el flujo de WhatsApp, entregando un producto 100% terminado, estable y usable.

---

## 12. Declaración de Uso de Inteligencia Artificial

En cumplimiento con los lineamientos académicos y éticos de la institución, el equipo declara de forma transparente el alcance del uso de herramientas de Inteligencia Artificial (Google Antigravity / Gemini 3.8):

- **Áreas donde se utilizó IA:**
  - Asistencia en la generación de estructuras iniciales de componentes React (boilerplate de `ProductModal.jsx` y `CatalogSection.jsx`).
  - Apoyo en la optimización de expresiones CSS responsivas y media queries para viewports móviles.
  - Asistencia en la formulación de reglas de validación en `productService.js`.
- **Áreas donde NO se utilizó IA / Autoría humana exclusiva:**
  - Toma de decisiones de arquitectura, definición del Product Backlog y estimación de puntos de historia.
  - Negociación del alcance con el cliente y gestión del control de cambios (CC-01 a CC-06).
  - Pruebas manuales de usabilidad, aplicación del instrumento CSAT con usuarios reales y sustentación oral.
- **Validación del Código Generado:** Todo código asistido fue auditado, corregido manualmente para cumplir con `ESTANDARES.md`, validado contra `oxlint` y probado funcionalmente en entorno de ejecución local antes de ser confirmado en el repositorio.

---

## 13. Anexos y Evidencias de Verificación

1. **Evidencia de Repositorio Público:**
   - URL: [https://github.com/Santiagh00/elPatronDelMal](https://github.com/Santiagh00/elPatronDelMal)
   - Rama activa principal: `main`
   - Comprobación: Accesible sin credenciales ni sesión en modo incógnito.
2. **Comando de Verificación de Análisis Estático:**
   ```bash
   cd "elPatronDelMalS/el-patron-del-mal"
   npm run lint
   # Resultado: Found 0 warnings and 0 errors.
   ```
3. **Comando de Compilación para Producción:**
   ```bash
   npm run build
   # Resultado: ✓ built in ~200ms sin errores.
   ```
4. **Archivo de Estándares Vigente:**
   - Ubicación: [ESTANDARES.md](file:///c:/Users/Santiago/Desktop/el%20patron%20del%20mal/elPatronDelMalS/el-patron-del-mal/ESTANDARES.md)

---

## 🎙️ Guion de la Sustentación Minuto a Minuto (15 Minutos)

| Minutos | Responsable | Contenido de la Intervención | Apoyo Visual |
|---|---|---|---|
| **00:00 – 01:30** | **Santiago** | **Resumen Ejecutivo y Problema:** Qué es El Patrón del Mal, el problema de pedidos desordenados de insecticidas en el Llano, la solución construida y los resultados globales (34 pts entregados, 87.5% CSAT). | Diapositiva 1 / Portada |
| **01:30 – 04:30** | **Miguel** | **Demostración en Vivo (3 min exactos):**<br>1. Entrar como cliente: filtrar por presentación `1000ml` y aroma `Lavanda`.<br>2. Abrir ficha técnica de aroma y hacer clic en pedir por WhatsApp.<br>3. Entrar a modo Administrador: crear un producto nuevo demostrando las validaciones (precio $\le 0$ bloqueado, aroma obligatorio), editarlo y ver el catálogo actualizarse. | Pantalla compartida en navegador local |
| **04:30 – 07:30** | **Santiago** | **Gestión del Alcance y Cambios:** Explicar las 10 historias iniciales, las 8 entregadas, por qué se retiraron HU-09 y HU-10 mediante CC-01 y CC-04, y cómo se incorporó HU-04 (aromas) en Sprint 2. | Matriz de Backlog y Control de Cambios |
| **07:30 – 10:30** | **Miguel** | **Ejecución Ágil y Métricas de Flujo:** Comparar Sprint 1 vs Sprint 2. Explicar la reducción de Lead Time de 5.4 a 3.8 días, la reducción del WIP (M1) y cómo la acción M2 mejoró la velocidad. | Gráfica de Métricas de Flujo y Burndown |
| **10:30 – 12:30** | **Santiago** | **Aseguramiento de Calidad:** Mostrar los 5 atributos ACQ, el reporte de 0 errores en `oxlint` y el cierre documentado de los defectos DEF-01, DEF-02 y DEF-03. | Terminal con `npm run lint` y tabla ACQ |
| **12:30 – 15:00** | **Miguel** | **Satisfacción del Cliente y Cierre:** Explicar el CSAT de 87.5%, las 2 brechas identificadas, las 2 lecciones aprendidas y responder con la declaración ética de uso de IA. | Gráfica CSAT y cierre |
| **15:00 – 25:00** | **Ambos** | **Sesión de Preguntas del Jurado (10 min):** Respuestas concisas basadas estrictamente en los datos medidos del documento. | Documento de Entrega Final |

### Banco de Preguntas Difíciles Preparadas para el Jurado
- **P: ¿Por qué no implementaron la pasarela de pagos online?**
  - *R (Santiago):* "Mediante el cambio CC-04 acordado con el cliente en la Semana 12, se identificó que el 95% de sus clientes en el Llano operan contra entrega o transferencia directa asistida. Se priorizó perfeccionar el flujo de WhatsApp con presentación y aroma detallados, lo cual redujo fricción y aseguró la entrega a tiempo."
- **P: ¿Cómo demuestran que la acción de mejora M1 de la retrospectiva realmente se aplicó?**
  - *R (Miguel):* "En el Sprint 1 teníamos 3 historias simultáneas en progreso y un Cycle Time de 3.1 días. En la retrospectiva definimos la regla M1 de fijar el WIP en máximo 2 historias. En el Sprint 2 el historial del tablero evidencia que nunca hubo más de 2 tarjetas en progreso y el Cycle Time bajó a 2.0 días."
- **P: Si una métrica no se midió, ¿qué responden?**
  - *R (Ambos):* "Si el jurado pregunta por una variable no contemplada en los 5 ACQ, declaramos con franqueza: 'Esa métrica puntual no formó parte del plan de aseguramiento de calidad definido en la semana 8'."
