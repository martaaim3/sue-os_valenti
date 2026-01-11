// Módulo coordinador (SPA)
import { cargarSesiones } from "./api.js";
import { actualizarContador, pintarSesiones, pintarCarrito, pintarPreferencias } from "./ui.js";

const app = document.getElementById("app");

let sesionesCache = [];

function mostrarInicio() {
  app.innerHTML = `
    <div class="card">
      <h2>Bienvenido a Sueños Valenti</h2>
      <p>
        Portal 100% cliente con <b>fetch</b>, <b>DOM</b>, <b>eventos</b>, <b>localStorage</b> y <b>módulos ES</b>.
      </p>
      <p>Usa el menú para ver sesiones, gestionar carrito o guardar preferencias.</p>
    </div>
  `;
}

async function mostrarSesiones() {
  app.innerHTML = `<div class="card"><p>Cargando sesiones...</p></div>`;
  try {
    if (sesionesCache.length === 0) sesionesCache = await cargarSesiones();
    pintarSesiones(app, sesionesCache);
  } catch (err) {
    console.error(err);
    app.innerHTML = `
      <div class="card">
        <h2>Error</h2>
        <p>No se pudieron cargar las sesiones. Asegúrate de usar Live Server.</p>
      </div>
    `;
  }
}

function mostrarCarrito() {
  pintarCarrito(app);
}

async function mostrarPreferencias() {
 
  if (sesionesCache.length === 0) {
    try {
      sesionesCache = await cargarSesiones();
    } catch {
      sesionesCache = [];
    }
  }
  pintarPreferencias(app, sesionesCache);
}

// Eventos menú
document.getElementById("btnInicio").addEventListener("click", mostrarInicio);
document.getElementById("btnSesiones").addEventListener("click", mostrarSesiones);
document.getElementById("btnCarrito").addEventListener("click", mostrarCarrito);
document.getElementById("btnPreferencias").addEventListener("click", mostrarPreferencias);


actualizarContador();
mostrarInicio();
