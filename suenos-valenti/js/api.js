
export async function cargarSesiones() {
  const resp = await fetch("./data/sesiones.json");
  if (!resp.ok) throw new Error("No se pudo cargar sesiones.json");
  return await resp.json();
}
