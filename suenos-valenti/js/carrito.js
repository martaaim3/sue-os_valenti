// carrito.js
// Gestión del carrito usando localStorage
const KEY = "carrito_sv";

// Leer carrito
function leer() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

// Guardar carrito
function guardar(carrito) {
  localStorage.setItem(KEY, JSON.stringify(carrito));
}

//Obtener carrito
export function obtenerCarrito() {
  return leer();
}

// Añadir sesión (con cantidad)
export function agregarAlCarrito(sesion) {
  const carrito = leer();
  const idx = carrito.findIndex((x) => x.id === sesion.id);

  if (idx >= 0) {
    carrito[idx].qty += 1;
  } else {
    carrito.push({ ...sesion, qty: 1 });
  }

  guardar(carrito);
  return carrito;
}

// Quitar una unidad
export function quitarUnoDelCarrito(id) {
  const carrito = leer();
  const idx = carrito.findIndex((x) => x.id === id);
  if (idx === -1) return carrito;

  if (carrito[idx].qty > 1) carrito[idx].qty -= 1;
  else carrito.splice(idx, 1);

  guardar(carrito);
  return carrito;
}

// Vaciar carrito
export function vaciarCarrito() {
  localStorage.removeItem(KEY);
}

// Totales
export function totalItemsCarrito() {
  return leer().reduce((acc, it) => acc + it.qty, 0);
}

export function totalEurosCarrito() {
  return leer().reduce((acc, it) => acc + it.precio * it.qty, 0);
}