export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmailValido(email) {
  return EMAIL_REGEX.test((email ?? "").trim());
}

export function isVazio(valor) {
  return (valor ?? "").trim().length === 0;
}

export function rotaInicialPorTipo(tipoUsuario) {
  return tipoUsuario === "pedagogo" ? "HomeEducador" : "Home";
}
