// Guarda o usuário logado em memória, pra outras telas lerem nome/e-mail/id
let usuarioLogado = null;

export function setUsuarioLogado(usuario) {
  usuarioLogado = usuario;
}

export function getUsuarioLogado() {
  return usuarioLogado;
}
