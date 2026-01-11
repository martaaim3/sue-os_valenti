import { formatoEuro } from "./utils.js";
import {
  agregarAlCarrito,
  quitarUnoDelCarrito,
  obtenerCarrito,
  vaciarCarrito,
  totalItemsCarrito,
  totalEurosCarrito,
} from "./carrito.js";

import {
  obtenerPreferencias,
  guardarPreferencias,
  validarPreferencias,
} from "./preferencias.js";


export function actualizarContador() {
  document.getElementById("contadorCarrito").textContent = totalItemsCarrito();
}


export function pintarSesiones(app, sesiones) {
  const categorias = ["Todas", ...new Set(sesiones.map((s) => s.categoria))];

  app.innerHTML = `
    <div class="card">
      <h2>Sesiones</h2>
      <p>Busca, filtra y ordena sesiones. Luego añádelas al carrito.</p>

      <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
        <input id="buscador" type="text" placeholder="Buscar por nombre..."
               style="padding:10px; width:260px;">

        <label>
          Precio máx:
          <input id="precioMax" type="number" min="0" value="9999"
                 style="padding:10px; width:140px;">
        </label>

        <label>
          Categoría:
          <select id="categoria" style="padding:10px; width:160px;">
            ${categorias.map((c) => `<option value="${c}">${c}</option>`).join("")}
          </select>
        </label>

        <label>
          Orden:
          <select id="orden" style="padding:10px; width:180px;">
            <option value="ninguno">Sin ordenar</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </label>

        <span id="infoFiltrado" style="align-self:center;"></span>
      </div>
    </div>

    <section id="listaSesiones"></section>
  `;

  const lista = document.getElementById("listaSesiones");
  const buscador = document.getElementById("buscador");
  const precioMax = document.getElementById("precioMax");
  const categoria = document.getElementById("categoria");
  const orden = document.getElementById("orden");
  const info = document.getElementById("infoFiltrado");

  function renderLista() {
    const texto = buscador.value.trim().toLowerCase();
    const max = Number(precioMax.value);
    const cat = categoria.value;
    const ord = orden.value;

    let filtradas = sesiones.filter((s) => {
      const okNombre = s.nombre.toLowerCase().includes(texto);
      const okPrecio = s.precio <= max;
      const okCat = cat === "Todas" || s.categoria === cat;
      return okNombre && okPrecio && okCat;
    });

    if (ord === "asc") filtradas.sort((a, b) => a.precio - b.precio);
    if (ord === "desc") filtradas.sort((a, b) => b.precio - a.precio);

    info.textContent = `Mostrando: ${filtradas.length} sesión(es)`;
    lista.innerHTML = "";

    filtradas.forEach((s) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${s.nombre}</h3>
        <p>Categoría: <b>${s.categoria}</b></p>
        <p><b>${formatoEuro(s.precio)}</b></p>
        <button class="btn">Añadir al carrito</button>
      `;
      lista.appendChild(div);

      div.querySelector("button").addEventListener("click", () => {
        agregarAlCarrito(s);
        actualizarContador();
      });
    });
  }

  buscador.addEventListener("input", renderLista);
  precioMax.addEventListener("input", renderLista);
  categoria.addEventListener("change", renderLista);
  orden.addEventListener("change", renderLista);

  renderLista();
}


export function pintarCarrito(app) {
  const carrito = obtenerCarrito();
  const totalItems = totalItemsCarrito();
  const totalEuros = totalEurosCarrito();

  if (carrito.length === 0) {
    app.innerHTML = `
      <div class="card">
        <h2>Carrito</h2>
        <p>El carrito está vacío.</p>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="card">
      <h2>Carrito</h2>
      <p>Elimina una unidad o vacía el carrito completo.</p>

      <table class="table">
        <thead>
          <tr>
            <th>Sesión</th>
            <th class="right">Precio</th>
            <th class="right">Cantidad</th>
            <th class="right">Subtotal</th>
            <th class="right">Acción</th>
          </tr>
        </thead>
        <tbody id="tbodyCarrito">
          ${carrito
            .map(
              (it) => `
            <tr data-id="${it.id}">
              <td>${it.nombre}</td>
              <td class="right">${formatoEuro(it.precio)}</td>
              <td class="right">${it.qty}</td>
              <td class="right">${formatoEuro(it.precio * it.qty)}</td>
              
              <td class="right">
                <button class="btn" data-action="remove">Quitar 1</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <hr/>

      <div class="card" style="background:#fff;">
        <p><b>Total items:</b> ${totalItems}</p>
        <p><b>Total €:</b> ${formatoEuro(totalEuros)}</p>
        <button class="btn" id="btnVaciar">Vaciar carrito</button>
      </div>
    </div>
  `;

  const tbody = document.getElementById("tbodyCarrito");
  tbody.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-action='remove']");
    if (!btn) return;

    const tr = ev.target.closest("tr[data-id]");
    const id = Number(tr.dataset.id);

    quitarUnoDelCarrito(id);
    actualizarContador();
    pintarCarrito(app);
  });

  document.getElementById("btnVaciar").addEventListener("click", () => {
    vaciarCarrito();
    actualizarContador();
    pintarCarrito(app);
  });
}


export function pintarPreferencias(app, sesiones) {
  const prefs = obtenerPreferencias();
  const categorias = ["Todas", ...new Set(sesiones.map((s) => s.categoria))];

  app.innerHTML = `
    <div class="card">
      <h2>Preferencias</h2>
      <p>Se guardan en localStorage. Incluye validación del formulario.</p>

      <form id="formPrefs" novalidate>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
          <input class="input" name="nombre" placeholder="Tu nombre" value="${prefs.nombre}" />
          <input class="input" name="email" placeholder="Tu email" value="${prefs.email}" />
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; align-items:center;">
          <label>Categoría favorita:</label>
          <select name="categoriaFav" style="padding:10px; width:180px;">
            ${categorias
              .map(
                (c) =>
                  `<option value="${c}" ${prefs.categoriaFav === c ? "selected" : ""}>${c}</option>`
              )
              .join("")}
          </select>

          <label style="margin-left:10px;">
            <input type="checkbox" name="recordatorios" ${prefs.recordatorios ? "checked" : ""} />
            Quiero recordatorios
          </label>
        </div>

        <div style="margin-top:12px;">
          <button class="btn" type="submit">Guardar</button>
        </div>

        <div id="errores" style="margin-top:12px;"></div>
        <div id="ok" style="margin-top:12px;"></div>
      </form>
    </div>
  `;

  const form = document.getElementById("formPrefs");
  const erroresDiv = document.getElementById("errores");
  const okDiv = document.getElementById("ok");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    erroresDiv.innerHTML = "";
    okDiv.innerHTML = "";

    const fd = new FormData(form);
    const nuevo = {
      nombre: String(fd.get("nombre") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      categoriaFav: String(fd.get("categoriaFav") || "Todas"),
      recordatorios: fd.get("recordatorios") === "on",
    };

    const errores = validarPreferencias(nuevo);
    if (errores.length) {
      erroresDiv.innerHTML = `
        <div class="alert bad">
          <b>Errores:</b>
          <ul>${errores.map((e) => `<li>${e}</li>`).join("")}</ul>
        </div>
      `;
      return;
    }

    guardarPreferencias(nuevo);
    okDiv.innerHTML = `<div class="alert ok">Preferencias guardadas ✓</div>`;
  });
}
