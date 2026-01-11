# suenos_valenti
Proyecto de Desarrollo en Entorno Cliente realizado íntegramente con JavaScript en el navegador, sin backend, utilizando DOM, fetch, localStorage y Módulos ES6.
Descripción

La aplicación permite al usuario consultar sesiones espirituales, filtrarlas dinámicamente, añadirlas a un carrito persistente y guardar preferencias personales. Todo el contenido se renderiza sin recargar la página (SPA básica).

🛠️ Tecnologías utilizadas

HTML5: estructura base de la aplicación

CSS3: estilos y presentación

JavaScript (ES6+):

Manipulación avanzada del DOM

Eventos

fetch() con async/await

localStorage

Módulos ES (import / export)

📁 Estructura del proyecto
suenos-valenti/
│
├─ index.html
├─ styles/
│  └─ style.css
├─ data/
│  └─ sesiones.json
└─ js/
   ├─ main.js
   ├─ api.js
   ├─ ui.js
   ├─ carrito.js
   ├─ preferencias.js
   └─ utils.js
📦 Funcionalidades
1️⃣ Interfaz inicial (SPA)

Navegación mediante botones sin recargar la página

Vista de inicio, sesiones, carrito y preferencias

2️⃣ Carga de sesiones (fetch + JSON)

Lectura de datos desde data/sesiones.json

Uso de fetch() con async/await

Renderizado dinámico de sesiones

3️⃣ Filtros y buscador

Búsqueda por nombre

Filtro por precio máximo

Filtro por categoría

Ordenación por precio (ascendente / descendente)

4️⃣ Carrito espiritual (localStorage)

Añadir sesiones

Incrementar cantidad por sesión

Eliminar una unidad

Vaciar carrito

Persistencia entre recargas

Cálculo de total de ítems y total en euros

5️⃣ Preferencias del usuario

Formulario con validación (nombre y email)

Selección de categoría favorita

Opción de recordatorios

Guardado persistente en localStorage

🧩 Modularización

main.js → módulo coordinador (navegación y control principal)

api.js → carga de datos mediante fetch

ui.js → renderizado de vistas y eventos

carrito.js → lógica del carrito y localStorage

preferencias.js → gestión y validación de preferencias

utils.js → funciones reutilizables (formato €, utilidades DOM)

▶️ Ejecución del proyecto

⚠️ Para que fetch() funcione correctamente es necesario usar un servidor local.

Recomendado:

Visual Studio Code + extensión Live Server

Abrir index.html con Open with Live Server

📊 Criterios de evaluación cubiertos

JavaScript básico (variables, funciones, arrays, objetos)

Manipulación avanzada del DOM

Consumo de JSON mediante fetch

Uso correcto de localStorage

Modularización con ES6

Código limpio, organizado y comentado
