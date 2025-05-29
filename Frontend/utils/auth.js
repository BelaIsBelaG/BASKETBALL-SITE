export function guardarToken(token) {
  localStorage.setItem('token', token);
}

export function obtenerToken() {
  return localStorage.getItem('token');
}

export function eliminarToken() {
  localStorage.removeItem('token');
}

export function obtenerUsuarioDesdeToken() {
  const token = obtenerToken();
  if (!token) return null;

  const payloadBase64 = token.split('.')[1];
  const payload = JSON.parse(atob(payloadBase64));
  return payload;
}
