// Formatação de datas em português — usada no agendamento e no calendário.
// Feito à mão de propósito: o Intl do Hermes nem sempre traz os dados de
// locale pt-BR no bundle do Expo Go.

export const DIAS_SEMANA = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// "Qui., 2 de Maio de 2026" — texto do campo de data do agendamento
export function formatarDataLonga(data) {
  return `${DIAS_SEMANA[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]} de ${data.getFullYear()}`;
}

// "Qui., 2 de Maio" — texto do card na lista de agendamentos
export function formatarDataCurta(data) {
  return `${DIAS_SEMANA[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]}`;
}

// Aceita "2/5/2026" ou "02/05/2026" e devolve null se a data não existir.
// Só é usada no alvo web, onde o DateTimePicker nativo não está disponível.
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
