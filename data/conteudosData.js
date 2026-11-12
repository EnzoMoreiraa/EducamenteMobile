// Conteúdos educativos de Autocuidado (RF05).
//
// Os quatro textos abaixo são derivados do TCC_Base_Teorica.md — psicoeducação
// em Terapia Cognitivo-Comportamental adaptada ao contexto escolar. Futuramente
// virão da entidade Conteudos_Educativos do back-end; a forma dos objetos aqui
// já espelha as colunas da tabela (titulo, tipo, descricao).
//
// `cover` é a capa real exportada do Figma (assets/homePageAssets) — os cards
// usam a imagem, não fundo colorido gerado em código.
export const CONTEUDOS = [
  {
    id: "1",
    title: "O Poder do Autogerenciamento Emocional",
    tag: "Psicoeducação",
    readingTime: "3 min de leitura",
    icon: "heart",
    cover: require("../assets/homePageAssets/autocuidadoCover.png"),
    summary: "Reconhecer o que você sente é o primeiro passo para escolher o que fazer com isso.",
    body:
      "Em meio às demandas diárias, pressões acadêmicas e desafios pessoais, aprender a lidar com as próprias emoções torna-se uma habilidade essencial — especialmente na adolescência. Autogerenciamento emocional não significa ignorar sentimentos difíceis, mas reconhecê-los, compreendê-los e responder a eles de forma equilibrada.\n\n" +
      "A Terapia Cognitivo-Comportamental parte de três ideias simples. A primeira: boa parte do sofrimento psicológico nasce de formas distorcidas de pensar. A segunda: também nasce de padrões de comportamento aprendidos — e o que foi aprendido pode ser reaprendido. A terceira, que é a mais importante: qualquer pessoa pode desenvolver formas mais eficazes de lidar com o que sente.\n\n" +
      "Jonathan Haidt descreve a relação entre razão e emoção como um cavaleiro montado em um elefante. O elefante é a emoção: forte, rápido, difícil de conter na força. O cavaleiro é a razão. Ele não vence o elefante no puxão, mas pode conduzi-lo se aprender a falar a língua dele. Nomear o que você sente é exatamente isso — é o cavaleiro pegando as rédeas.\n\n" +
      "É por isso que o check-in diário do EducaMente é curto. Ele não pede que você resolva nada. Pede só que você olhe e dê nome. Repetido ao longo de semanas, esse gesto pequeno constrói consciência emocional — e consciência é o que torna a escolha possível.",
  },
  {
    id: "2",
    title: "Identificando Pensamentos Automáticos",
    tag: "Modelo cognitivo",
    readingTime: "4 min de leitura",
    icon: "smile",
    cover: require("../assets/homePageAssets/autocuidadoCover.png"),
    summary: "Nem tudo o que a sua cabeça diz sobre você é verdade. Dá para checar.",
    body:
      "Pensamentos automáticos são aquele fluxo veloz de frases que aparece na sua cabeça sem ser convidado. Eles são involuntários, passam quase despercebidos e, em momentos de sofrimento, costumam ser negativos. O modelo cognitivo mostra que não é a situação em si que gera a emoção: é a interpretação que fazemos dela.\n\n" +
      "Algumas distorções aparecem muito no ambiente escolar:\n\n" +
      "Catastrofização — \"Tirei uma nota ruim, vou reprovar o ano inteiro.\"\n" +
      "Leitura mental — \"Tenho certeza que todo mundo achou minha apresentação horrível.\"\n" +
      "Personalização — \"Meu professor estava de mau humor por minha causa.\"\n" +
      "Tudo-ou-nada — \"Ou sou o melhor da turma ou sou um fracasso.\"\n" +
      "Desconto do positivo — \"Fui bem na prova, mas foi sorte.\"\n" +
      "Generalização — \"Sempre que tento algo, dá errado.\"\n\n" +
      "O exercício é simples e cabe em três perguntas. Qual foi exatamente o pensamento? Que evidência eu tenho de que ele é verdade — e que evidência tenho de que não é? Se um amigo me contasse isso sobre ele mesmo, o que eu responderia?\n\n" +
      "Repare que o objetivo não é trocar um pensamento negativo por um positivo forçado. É trocá-lo por um mais realista. \"Fui mal nessa prova\" é realista. \"Sou um fracasso\" não é — é uma distorção que se disfarça de conclusão.\n\n" +
      "Uma das Três Grandes Inverdades descritas por Lukianoff e Haidt é justamente \"sempre confie nos seus sentimentos\". Sentimentos são informação valiosa, mas não são prova. Eles pedem para ser avaliados, não apenas obedecidos.",
  },
  {
    id: "3",
    title: "Enfrentando em vez de Evitar",
    tag: "Exposição gradual",
    readingTime: "3 min de leitura",
    icon: "alert",
    cover: require("../assets/homePageAssets/autocuidadoCover.png"),
    summary: "Fugir alivia por minutos e ensina o medo a ficar. Encarar aos poucos faz o contrário.",
    body:
      "Quando alguma coisa nos assusta — falar em público, puxar assunto com a turma nova, procurar um professor —, a saída mais rápida é desviar. E funciona: o alívio vem na hora. O problema é o que esse alívio ensina. Cada fuga confirma para o cérebro que aquilo era mesmo perigoso, e o medo volta um pouco maior na próxima vez.\n\n" +
      "A TCC trabalha com exposição gradual: aproximar-se do que assusta em passos pequenos e toleráveis, ficando tempo suficiente para perceber que a ansiedade sobe, atinge um pico e desce sozinha. Não é coragem bruta; é dose.\n\n" +
      "Se falar na frente da turma é o medo, a escada pode começar por escrever o que você diria, depois ler em voz alta sozinho, depois para uma pessoa de confiança, depois responder uma pergunta curta em aula. Cada degrau é fácil o bastante para ser dado e difícil o bastante para ensinar algo.\n\n" +
      "Richard McNally, de Harvard, faz uma observação que vale guardar: evitar gatilhos é um sintoma, não um tratamento. Proteger jovens de todo desconforto — a cultura que Lukianoff e Haidt chamam de safetyism — produz o efeito contrário do pretendido, deixando-os menos preparados, não mais seguros.\n\n" +
      "Vale a distinção: enfrentar aos poucos é diferente de se expor a situações de violência ou abuso. Nesses casos, o caminho não é aguentar — é pedir ajuda, e os canais de mensagem do app existem para isso.",
  },
  {
    id: "4",
    title: "Ativação Comportamental: agir para sentir melhor",
    tag: "Ação concreta",
    readingTime: "3 min de leitura",
    icon: "check",
    cover: require("../assets/homePageAssets/autocuidadoCover.png"),
    summary: "A vontade costuma vir depois do movimento, não antes dele.",
    body:
      "Quando o humor cai, a vida encolhe. A pessoa para de sair, larga o que gostava de fazer, cumpre só o mínimo. E aí o que restou do dia não oferece mais nada de bom — o que derruba o humor um pouco mais. É um ciclo que se alimenta sozinho.\n\n" +
      "Ativação comportamental é a técnica que quebra esse ciclo, e ela inverte uma expectativa comum. Em vez de esperar a vontade chegar para então agir, você age primeiro — em doses pequenas — e deixa a vontade vir atrás. Na maior parte das vezes, ela vem.\n\n" +
      "Escolha, para os próximos dias, duas atividades: uma que dê sensação de prazer (ouvir um álbum inteiro, jogar bola, cozinhar algo) e uma que dê sensação de realização (organizar a mesa, adiantar vinte minutos de estudo, responder aquela mensagem parada). Marque dia e hora. Faça mesmo sem vontade — a vontade não é pré-requisito. Depois registre no check-in como estava seu humor antes e como ficou depois.\n\n" +
      "Esse registro é a parte que as pessoas costumam pular, e é justamente a que ensina. Ao ver seu próprio padrão repetido ao longo de uma semana, você para de acreditar na regra geral (\"nada me anima\") e passa a confiar no que os seus dados mostram.\n\n" +
      "Comece pequeno de propósito. Vinte minutos que acontecem valem mais do que um plano de duas horas que nunca sai do papel — e cada vez que você cumpre o combinado consigo mesmo, a confiança na sua própria capacidade cresce um pouco.",
  },
];

export function getConteudoById(id) {
  return CONTEUDOS.find((item) => item.id === id) ?? CONTEUDOS[0];
}
