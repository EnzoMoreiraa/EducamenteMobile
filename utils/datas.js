export const DIAS_SEMANA = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function formatarDataLonga(data) {
  return `${DIAS_SEMANA[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]} de ${data.getFullYear()}`;
}

export function formatarDataCurta(data) {
  return `${DIAS_SEMANA[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]}`;
}

export function parseDataBR(texto) {
  const partes = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((texto ?? "").trim());
  if (!partes) return null;

  const dia = Number(partes[1]);
  const mes = Number(partes[2]) - 1;
  const ano = Number(partes[3]);
  const data = new Date(ano, mes, dia);

  if (data.getDate() !== dia || data.getMonth() !== mes) return null;
  return data;
}
