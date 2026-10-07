# ESTÁNDARES DEL EQUIPO — EL PATRON DEL MAL

## 1. Guía de estilo y nombres

El proyecto será una página web para la presentación y consulta de productos para el control de plagas.

### Tecnologías

- HTML
- CSS
- JavaScript
- React
- MySQL

### Guía de estilo

Se utilizará JavaScript Standard Style como guía de estilo para JavaScript.

### Formateador

Se utilizará Prettier para mantener un formato uniforme en el código.

### Idioma del código

Los nombres de variables, funciones, componentes y archivos relacionados con el código estarán escritos en inglés.

### Reglas propias de nombres

1. Los componentes de React utilizarán `PascalCase`.
   Ejemplo: `ProductCard.jsx`.

2. Las variables y funciones utilizarán `camelCase`.
   Ejemplo: `getProducts()`.

3. Los nombres de archivos deberán ser claros y estar relacionados con su función.
   Ejemplo: `productService.js`, `ProductList.jsx`.


## 2. Convención de commits y ramas

Los mensajes de commit utilizarán el siguiente formato:

`tipo: descripción`

### Tipos permitidos

- `feat`: nueva funcionalidad.
- `fix`: corrección de errores.
- `docs`: cambios en documentación.
- `style`: cambios de estilos o formato.
- `refactor`: reorganización del código sin modificar su funcionamiento.
- `test`: creación o modificación de pruebas.
- `chore`: tareas de mantenimiento.

### Ejemplo

`feat: agregar catálogo de productos`

### Ramas

- `main`: versión estable del proyecto.
- `develop`: integración de los cambios del equipo.
- `feature/nombre`: desarrollo de nuevas funcionalidades.
- `fix/nombre`: corrección de errores.


## 3. Definition of Ready

Una tarea estará lista para comenzar cuando:

- El objetivo de la tarea esté claramente definido.
- Se conozca qué funcionalidad debe desarrollarse.
- Se hayan definido los criterios de aceptación.
- La tarea tenga un integrante responsable.
- Los recursos necesarios para realizarla estén disponibles.


## 4. Definition of Done

Una tarea se considerará terminada cuando:

- La funcionalidad cumpla los criterios de aceptación definidos.
- El código haya sido formateado utilizando Prettier.
- La funcionalidad haya sido probada en la página web.
- No existan errores que impidan utilizar la funcionalidad.
- Los cambios hayan sido revisados por otro integrante del equipo.
- El cambio haya sido integrado correctamente al repositorio.
- La documentación relacionada haya sido actualizada cuando sea necesario.


## 5. Política de revisión

Todo cambio realizado por un integrante deberá ser revisado por otro integrante antes de integrarse a la rama `main`.

### Plazo de revisión

La revisión deberá realizarse en un plazo máximo de 24 horas.

### Causales de bloqueo

Un cambio no podrá ser aprobado cuando:

- No cumpla los criterios de aceptación.
- Presente errores que impidan utilizar una funcionalidad.
- No cumpla los estándares de código establecidos.
- Existan conflictos de integración sin resolver.

### Aspectos que no bloquean

No bloquearán la aprobación:

- Sugerencias de mejora que no sean necesarias para cumplir la tarea.
- Cambios visuales opcionales.
- Mejoras que puedan realizarse posteriormente sin afectar la funcionalidad.

### Comentarios

Los comentarios de revisión deberán ser claros, específicos y estar relacionados directamente con el cambio realizado.


## 6. Aceptación

Los integrantes del equipo declaran:

"Conozco y acepto estos estándares".

- Santiago Gutiérrez Henao — conozco y acepto estos estándares.
- Miguel Moreno Serna — conozco y acepto estos estándares.
