// Textos do Termo de Uso e da Política de Privacidade exibidos no cadastro.
//
// O EducaMente trata dados pessoais sensíveis (saúde mental) de adolescentes,
// em sua maioria menores de 18 anos. Por isso os textos abaixo seguem a LGPD
// (Lei 13.709/2018, em especial os arts. 11 e 14), o ECA e o dever de sigilo
// da equipe pedagógica — incluindo os limites desse sigilo em situações de
// risco à vida.
//
// Estes textos são a versão de trabalho do Projeto Integrador e devem ser
// revisados pela coordenação do Senac São Leopoldo antes de uma publicação real.

export const TERMOS_DE_USO = {
  title: "Termo de Uso",
  updatedAt: "Última atualização: agosto de 2026",
  sections: [
    {
      heading: "1. O que é o EducaMente",
      body:
        "O EducaMente é um aplicativo de apoio socioemocional criado para estudantes do Ensino Médio do Senac São Leopoldo. Ele oferece check-in emocional diário, conteúdos de autocuidado, agendamento de conversas com a equipe pedagógica e canais de mensagem (identificado e anônimo).",
    },
    {
      heading: "2. O que o EducaMente NÃO é",
      body:
        "O aplicativo não é um serviço de atendimento de emergência, não realiza diagnóstico e não substitui acompanhamento psicológico, psiquiátrico ou médico. Em situação de risco imediato à vida, procure o CVV pelo telefone 188, o SAMU pelo 192 ou o serviço de saúde mais próximo.",
    },
    {
      heading: "3. Quem pode usar",
      body:
        "O uso é destinado a estudantes matriculados e à equipe pedagógica da instituição. Para estudantes menores de 18 anos, o cadastro depende de autorização de pelo menos um dos pais ou do responsável legal, conforme o art. 14 da LGPD. Cada pessoa deve usar uma conta própria e manter a senha em sigilo.",
    },
    {
      heading: "4. Uso responsável dos canais de mensagem",
      body:
        "Os canais identificado e anônimo existem para pedir ajuda, relatar situações que afetam o bem-estar e comunicar violações à convivência escolar, como bullying e discriminação. É proibido usá-los para ofensas, ameaças, conteúdo discriminatório ou acusações que a pessoa sabe serem falsas. O anonimato protege quem pede ajuda — não protege quem usa o canal para causar dano.",
    },
    {
      heading: "5. Limites do sigilo",
      body:
        "As mensagens e os registros de check-in são tratados com sigilo pela equipe pedagógica. Esse sigilo será rompido, e a rede de proteção acionada, quando houver indício de risco à vida, de violência contra criança ou adolescente ou de outra situação em que a lei obrigue a comunicação ao Conselho Tutelar ou às autoridades competentes.",
    },
    {
      heading: "6. Conteúdos de autocuidado",
      body:
        "Os conteúdos são materiais de psicoeducação baseados em Terapia Cognitivo-Comportamental. Têm caráter informativo e de incentivo à ação, e não constituem prescrição ou tratamento individualizado.",
    },
    {
      heading: "7. Sua conta",
      body:
        "Você pode corrigir seus dados e excluir sua conta a qualquer momento pela tela de Perfil. A exclusão remove seus dados pessoais e o histórico vinculado a você, e não pode ser desfeita.",
    },
    {
      heading: "8. Mudanças neste termo",
      body:
        "Quando houver alteração relevante, o novo texto será exibido no aplicativo e um novo aceite será solicitado antes de você continuar usando o EducaMente.",
    },
  ],
};

export const POLITICA_DE_PRIVACIDADE = {
  title: "Política de Privacidade",
  updatedAt: "Última atualização: agosto de 2026",
  sections: [
    {
      heading: "1. Quem trata seus dados",
      body:
        "O tratamento é feito pela instituição de ensino, por meio da equipe pedagógica responsável pelo EducaMente. Dúvidas e pedidos sobre seus dados podem ser encaminhados à coordenação da escola.",
    },
    {
      heading: "2. Dados que coletamos",
      body:
        "Dados de cadastro (nome, sobrenome, e-mail, senha, tipo de usuário e, no caso de estudantes, ano escolar e faixa etária); registros de check-in emocional (humor selecionado, data e texto livre opcional); agendamentos de conversa; e o conteúdo das mensagens enviadas pelos canais de comunicação.",
    },
    {
      heading: "3. Dados sensíveis e base legal",
      body:
        "Os registros de humor e o conteúdo das mensagens são dados pessoais sensíveis referentes à saúde, protegidos pelo art. 11 da LGPD. Eles são tratados para a tutela da saúde e a proteção do bem-estar do estudante, com consentimento específico e destacado e, no caso de menores de 18 anos, com autorização do responsável legal, sempre no melhor interesse do adolescente (art. 14 da LGPD).",
    },
    {
      heading: "4. Para que usamos",
      body:
        "Para permitir seu autoacompanhamento emocional ao longo do tempo, para que a equipe pedagógica possa oferecer acolhimento e encaminhar apoio quando necessário, e para organizar os agendamentos. Seus dados não são usados para publicidade, não são vendidos e não alimentam qualquer forma de pontuação ou ranqueamento de alunos.",
    },
    {
      heading: "5. Quem tem acesso",
      body:
        "Apenas a equipe pedagógica autorizada da instituição. Professores de disciplina, colegas e famílias não têm acesso ao conteúdo dos seus check-ins ou mensagens, salvo quando a comunicação ao responsável ou à rede de proteção for necessária diante de risco, conforme o Termo de Uso.",
    },
    {
      heading: "6. Canal anônimo",
      body:
        "Mensagens enviadas pelo canal anônimo são gravadas sem vínculo com sua conta: a equipe pedagógica vê o conteúdo, mas não vê quem enviou. Como esse vínculo não existe no banco de dados, uma mensagem anônima não pode ser recuperada nem apagada individualmente depois de enviada. Se quiser receber uma resposta, use o canal identificado.",
    },
    {
      heading: "7. Segurança",
      body:
        "As senhas são armazenadas com hash criptográfico e nunca ficam legíveis, nem para a equipe pedagógica. O acesso ao banco de dados é restrito e o tráfego entre o aplicativo e o servidor é protegido.",
    },
    {
      heading: "8. Por quanto tempo guardamos",
      body:
        "Os dados são mantidos enquanto você for estudante ou membro da equipe da instituição. Encerrado o vínculo, ou a pedido, os dados pessoais são excluídos ou anonimizados.",
    },
    {
      heading: "9. Seus direitos",
      body:
        "Você pode, a qualquer momento, confirmar a existência de tratamento, acessar e corrigir seus dados, pedir a exclusão da conta e revogar o consentimento. Parte disso está disponível diretamente na tela de Perfil; o restante pode ser solicitado à coordenação. Revogar o consentimento encerra o uso do aplicativo, mas não afeta o atendimento presencial oferecido pela escola.",
    },
  ],
};

export const LEGAL_DOCS = {
  termos: TERMOS_DE_USO,
  privacidade: POLITICA_DE_PRIVACIDADE,
};
