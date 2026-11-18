import { COLORS } from "../styles/theme";

export const HUMORES = {
  muito_bem: { label: "Muito bem", color: COLORS.moodHappy },
  bem: { label: "Bem", color: COLORS.moodHappy },
  neutro: { label: "Neutro", color: COLORS.moodNeutral },
  mal: { label: "Mal", color: COLORS.moodSad },
  muito_mal: { label: "Muito mal", color: COLORS.moodVeryBad },
};

const HUMORES_DE_ATENCAO = ["mal", "muito_mal"];

export function humorInfo(chave) {
  return HUMORES[chave] ?? HUMORES.neutro;
}

export const TURMAS = [
  {
    id: "t1",
    nome: "1º Ano A",
    turno: "Manhã",
    curso: "Ensino Médio",
    alunos: [
      {
        id: "a1",
        nome: "Ana Beatriz",
        sobrenome: "Ramos",
        email: "ana.ramos@aluno.senac.br",
        anoEscolar: "1º ano",
        faixaEtaria: "15 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "muito_mal" },
        historico: [
          { id: "c1", data: "20/08/2026", humor: "muito_mal", nota: "Semana de provas, não durmo direito." },
          { id: "c2", data: "19/08/2026", humor: "mal", nota: "" },
          { id: "c3", data: "18/08/2026", humor: "mal", nota: "Briga com uma amiga da turma." },
          { id: "c4", data: "15/08/2026", humor: "neutro", nota: "" },
          { id: "c5", data: "14/08/2026", humor: "bem", nota: "" },
        ],
        agendamentos: [
          { id: "g1", data: "25/08/2026", hora: "10:20", motivo: "Ansiedade com as provas", status: "pendente" },
        ],
      },
      {
        id: "a2",
        nome: "Bruno",
        sobrenome: "Carvalho",
        email: "bruno.carvalho@aluno.senac.br",
        anoEscolar: "1º ano",
        faixaEtaria: "15 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "bem" },
        historico: [
          { id: "c6", data: "20/08/2026", humor: "bem", nota: "" },
          { id: "c7", data: "19/08/2026", humor: "bem", nota: "" },
          { id: "c8", data: "18/08/2026", humor: "neutro", nota: "" },
        ],
        agendamentos: [],
      },
      {
        id: "a3",
        nome: "Camila",
        sobrenome: "Duarte",
        email: "camila.duarte@aluno.senac.br",
        anoEscolar: "1º ano",
        faixaEtaria: "16 anos",
        ultimoCheckin: { data: "19/08/2026", humor: "neutro" },
        historico: [
          { id: "c9", data: "19/08/2026", humor: "neutro", nota: "" },
          { id: "c10", data: "18/08/2026", humor: "neutro", nota: "" },
          { id: "c11", data: "15/08/2026", humor: "bem", nota: "" },
        ],
        agendamentos: [
          { id: "g2", data: "27/08/2026", hora: "14:00", motivo: "Orientação de estudos", status: "confirmado" },
        ],
      },
      {
        id: "a4",
        nome: "Diego",
        sobrenome: "Fontes",
        email: "diego.fontes@aluno.senac.br",
        anoEscolar: "1º ano",
        faixaEtaria: "15 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "mal" },
        historico: [
          { id: "c12", data: "20/08/2026", humor: "mal", nota: "Tô me sentindo de fora nos trabalhos em grupo." },
          { id: "c13", data: "19/08/2026", humor: "neutro", nota: "" },
          { id: "c14", data: "18/08/2026", humor: "mal", nota: "" },
        ],
        agendamentos: [],
      },
    ],
  },
  {
    id: "t2",
    nome: "2º Ano B",
    turno: "Tarde",
    curso: "Ensino Médio",
    alunos: [
      {
        id: "a5",
        nome: "Eduarda",
        sobrenome: "Lima",
        email: "eduarda.lima@aluno.senac.br",
        anoEscolar: "2º ano",
        faixaEtaria: "16 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "muito_bem" },
        historico: [
          { id: "c15", data: "20/08/2026", humor: "muito_bem", nota: "Consegui apresentar o trabalho sem travar." },
          { id: "c16", data: "19/08/2026", humor: "bem", nota: "" },
          { id: "c17", data: "18/08/2026", humor: "bem", nota: "" },
        ],
        agendamentos: [],
      },
      {
        id: "a6",
        nome: "Felipe",
        sobrenome: "Antunes",
        email: "felipe.antunes@aluno.senac.br",
        anoEscolar: "2º ano",
        faixaEtaria: "17 anos",
        ultimoCheckin: { data: "18/08/2026", humor: "muito_mal" },
        historico: [
          { id: "c18", data: "18/08/2026", humor: "muito_mal", nota: "Não tenho vontade de vir pra aula." },
          { id: "c19", data: "15/08/2026", humor: "mal", nota: "" },
          { id: "c20", data: "14/08/2026", humor: "mal", nota: "" },
          { id: "c21", data: "13/08/2026", humor: "neutro", nota: "" },
        ],
        agendamentos: [
          { id: "g3", data: "22/08/2026", hora: "15:30", motivo: "Conversa de acolhimento", status: "pendente" },
        ],
      },
      {
        id: "a7",
        nome: "Gabriela",
        sobrenome: "Nunes",
        email: "gabriela.nunes@aluno.senac.br",
        anoEscolar: "2º ano",
        faixaEtaria: "16 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "neutro" },
        historico: [
          { id: "c22", data: "20/08/2026", humor: "neutro", nota: "" },
          { id: "c23", data: "19/08/2026", humor: "bem", nota: "" },
        ],
        agendamentos: [],
      },
      {
        id: "a8",
        nome: "Henrique",
        sobrenome: "Prado",
        email: "henrique.prado@aluno.senac.br",
        anoEscolar: "2º ano",
        faixaEtaria: "17 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "bem" },
        historico: [
          { id: "c24", data: "20/08/2026", humor: "bem", nota: "" },
          { id: "c25", data: "18/08/2026", humor: "muito_bem", nota: "" },
        ],
        agendamentos: [
          { id: "g4", data: "28/08/2026", hora: "16:10", motivo: "Dúvidas sobre o projeto integrador", status: "confirmado" },
        ],
      },
    ],
  },
  {
    id: "t3",
    nome: "3º Ano A",
    turno: "Manhã",
    curso: "Ensino Médio",
    alunos: [
      {
        id: "a9",
        nome: "Isabela",
        sobrenome: "Rocha",
        email: "isabela.rocha@aluno.senac.br",
        anoEscolar: "3º ano",
        faixaEtaria: "17 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "mal" },
        historico: [
          { id: "c26", data: "20/08/2026", humor: "mal", nota: "Pressão com o vestibular." },
          { id: "c27", data: "19/08/2026", humor: "mal", nota: "" },
          { id: "c28", data: "18/08/2026", humor: "neutro", nota: "" },
        ],
        agendamentos: [
          { id: "g5", data: "26/08/2026", hora: "09:00", motivo: "Orientação vocacional", status: "pendente" },
        ],
      },
      {
        id: "a10",
        nome: "João Pedro",
        sobrenome: "Silveira",
        email: "joao.silveira@aluno.senac.br",
        anoEscolar: "3º ano",
        faixaEtaria: "18 anos",
        ultimoCheckin: { data: "20/08/2026", humor: "bem" },
        historico: [
          { id: "c29", data: "20/08/2026", humor: "bem", nota: "" },
          { id: "c30", data: "19/08/2026", humor: "neutro", nota: "" },
        ],
        agendamentos: [],
      },
      {
        id: "a11",
        nome: "Larissa",
        sobrenome: "Moreira",
        email: "larissa.moreira@aluno.senac.br",
        anoEscolar: "3º ano",
        faixaEtaria: "17 anos",
        ultimoCheckin: { data: "17/08/2026", humor: "neutro" },
        historico: [
          { id: "c31", data: "17/08/2026", humor: "neutro", nota: "" },
          { id: "c32", data: "16/08/2026", humor: "bem", nota: "" },
        ],
        agendamentos: [
          { id: "g6", data: "29/08/2026", hora: "11:00", motivo: "Retorno de acompanhamento", status: "recusado" },
        ],
      },
    ],
  },
];

export const MENSAGENS = [
  {
    id: "m1",
    tipo: "anonima",
    turma: "2º Ano B",
    titulo: "Situação na sala",
    conteudo:
      "Tem um grupo que fica tirando sarro de um colega todo dia na saída. Ninguém fala nada porque tem medo de sobrar pra gente também.",
    data: "20/08/2026",
    hora: "14:12",
    status: "pendente",
  },
  {
    id: "m2",
    tipo: "identificada",
    alunoId: "a1",
    alunoNome: "Ana Beatriz Ramos",
    turma: "1º Ano A",
    titulo: "Preciso conversar",
    conteudo:
      "Não estou conseguindo dormir por causa das provas e acho que isso está atrapalhando tudo. Queria marcar um horário.",
    data: "20/08/2026",
    hora: "09:41",
    status: "pendente",
  },
  {
    id: "m3",
    tipo: "anonima",
    turma: "1º Ano A",
    titulo: "",
    conteudo:
      "Queria saber se tem como conversar com alguém sem que minha família fique sabendo. É sobre coisas de casa.",
    data: "19/08/2026",
    hora: "18:03",
    status: "em_analise",
  },
  {
    id: "m4",
    tipo: "identificada",
    alunoId: "a6",
    alunoNome: "Felipe Antunes",
    turma: "2º Ano B",
    titulo: "Faltas",
    conteudo:
      "Faltei bastante nas últimas semanas e queria explicar o motivo pessoalmente, sem ser na frente da turma.",
    data: "18/08/2026",
    hora: "16:27",
    status: "lida",
  },
  {
    id: "m5",
    tipo: "identificada",
    alunoId: "a9",
    alunoNome: "Isabela Rocha",
    turma: "3º Ano A",
    titulo: "Obrigada",
    conteudo:
      "Só queria agradecer a conversa da semana passada. Ajudou bastante a organizar minha cabeça.",
    data: "17/08/2026",
    hora: "11:15",
    status: "respondida",
  },
  {
    id: "m6",
    tipo: "anonima",
    turma: "3º Ano A",
    titulo: "Sobre o intervalo",
    conteudo:
      "O pátio fica muito cheio e barulhento e isso me deixa muito ansioso. Seria possível ter um espaço mais calmo?",
    data: "16/08/2026",
    hora: "10:52",
    status: "resolvido",
  },
];

export function getTurmaById(id) {
  return TURMAS.find((turma) => turma.id === id) ?? TURMAS[0];
}

export function getAlunoById(id) {
  for (const turma of TURMAS) {
    const aluno = turma.alunos.find((item) => item.id === id);
    if (aluno) return { ...aluno, turma };
  }
  return null;
}

export function alunoPrecisaAtencao(aluno) {
  return HUMORES_DE_ATENCAO.includes(aluno.ultimoCheckin?.humor);
}

export function contarPendentes(turma) {
  const emAtencao = turma.alunos.filter(alunoPrecisaAtencao).length;
  const agendamentosPendentes = turma.alunos.reduce(
    (total, aluno) =>
      total + aluno.agendamentos.filter((item) => item.status === "pendente").length,
    0
  );
  return emAtencao + agendamentosPendentes;
}

export function getAgendamentos() {
  return TURMAS.flatMap((turma) =>
    turma.alunos.flatMap((aluno) =>
      aluno.agendamentos.map((agendamento) => ({
        ...agendamento,
        alunoId: aluno.id,
        alunoNome: `${aluno.nome} ${aluno.sobrenome}`,
        turmaNome: turma.nome,
      }))
    )
  );
}

export function contarMensagensPendentes() {
  return MENSAGENS.filter((item) => item.status === "pendente").length;
}

export function contarAgendamentosPendentes() {
  return getAgendamentos().filter((item) => item.status === "pendente").length;
}

export function contarAlunos() {
  return TURMAS.reduce((total, turma) => total + turma.alunos.length, 0);
}
