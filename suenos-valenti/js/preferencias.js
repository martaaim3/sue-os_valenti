// / Preferencias del usuario con validación
const KEY = "prefs_sv";

export function obtenerPreferencias() {
  try {
    return (
      JSON.parse(localStorage.getItem(KEY)) || {
        nombre: "",
        email: "",
        categoriaFav: "Todas",
        recordatorios: false,
      }
    );
  } catch {
    return { nombre: "", email: "", categoriaFav: "Todas", recordatorios: false };
  }
}

export function guardarPreferencias(prefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs));
}

export function validarPreferencias({ nombre, email }) {
  const errores = [];

  if (!nombre || nombre.trim().length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres.");
  }

  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!reEmail.test(email || "")) {
    errores.push("El email no es válido.");
  }

  return errores;
}