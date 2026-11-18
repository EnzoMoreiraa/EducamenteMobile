import { COLORS } from "../styles/theme";

export const HUMORES = {
  muito_triste: { label: "Me sinto muito mal", color: COLORS.moodVeryBad },
  triste: { label: "Me sinto mal", color: COLORS.moodSad },
  neutro: { label: "Me sinto neutro", color: COLORS.moodNeutral },
  bem: { label: "Me sinto bem", color: COLORS.moodHappy },
  muito_bem: { label: "Me sinto muito bem", color: COLORS.moodHappy },
};

function diasAtras(quantidade) {
  const data = new Date();
  data.setHours(12, 0, 0, 0);
  data.setDate(data.getDate() - quantidade);
  return data;
}

function mesmoDia(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

let checkins = [
  { id: "seed-1", data: diasAtras(1), humor: "bem" },
  { id: "seed-2", data: diasAtras(2), humor: "neutro" },
  { id: "seed-3", data: diasAtras(3), humor: "triste" },
  { id: "seed-4", data: diasAtras(4), humor: "muito_bem" },
  { id: "seed-5", data: diasAtras(5), humor: "neutro" },
  { id: "seed-6", data: diasAtras(6), humor: "muito_triste" },
];

export function registrarCheckin(humor) {
  const agora = new Date();
  const novo = { id: `checkin-${agora.getTime()}`, data: agora, humor };
  checkins = [novo, ...checkins.filter((item) => !mesmoDia(item.data, agora))];
  return novo;
}

export function getCheckins() {
  return [...checkins].sort((a, b) => b.data - a.data);
}
