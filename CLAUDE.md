# EducaMente — Guia de Contexto para Claude Code

> Este arquivo serve como fonte de verdade para o Claude Code entender o projeto
> completo: o que já foi feito, o que está em andamento e o que ainda precisa ser feito.
> Atualizar sempre que houver mudanças significativas de arquitetura ou escopo.

---

## 1. O Projeto

**EducaMente** é uma aplicação mobile voltada à promoção da saúde mental de estudantes
do Ensino Médio do Senac São Leopoldo (RS). É um Projeto Integrador desenvolvido por
Éllen dos Santos Vieira, Enzo Moreira da Silveira, Rafaella Egues e Carlos Tadeu.

Alinha-se ao **ODS 3 (Saúde e Bem-Estar)** e propõe uma plataforma digital integrada
ao ambiente escolar, com foco em acolhimento socioemocional, autogerenciamento e
comunicação segura entre alunos e equipe pedagógica.

**Repositório:** https://github.com/EnzoMoreiraa/EducamenteMobile

---

## 2. Stack Tecnológica

### Front-end (atual — em desenvolvimento)
- **React Native** com **Expo SDK 54** (`expo: ~54.0.34`)
- **Expo Go** para visualização durante o desenvolvimento
- Navegação: `@react-navigation/native` + `@react-navigation/native-stack`
- SVG: `react-native-svg` (usado no medidor de humor do Check-in)
- Prototipação: **Figma** (protótipo completo já existente)
- Editor: **Visual Studio Code**

### Back-end (planejado — ainda não iniciado)
- Linguagem: **JavaScript (Node.js)**
- Banco de dados: **MySQL** (modelagem via MySQL Workbench)
- Sistema de login planejado como primeira entrega do back-end

### Dependências instaladas (package.json)
```json
{
  "expo": "~54.0.34",
  "expo-status-bar": "~3.0.9",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "react-native": "0.81.5",
  "react-native-safe-area-context": "~5.6.0",
  "react-native-screens": "~4.16.0",
  "react-native-svg": "15.12.1",
  "react-native-web": "^0.21.0",
  "@react-navigation/native": "^7.3.4",
  "@react-navigation/native-stack": "^7.17.6",
  "@react-native-community/datetimepicker": "8.4.4"
}
```

---

## 3. Estrutura de Pastas (atual, após reorganização)

```
EducamenteMobile/          ← raiz do repositório (.git aqui)
├── App.js                 ← ponto de entrada, importa AppNavigator
├── index.js               ← entry point do Expo
├── app.json               ← configuração do Expo
├── package.json
├── node_modules/
├── assets/                ← todos os assets de imagem/ícone
│   ├── educamente-logo.gif
│   ├── icon.png           ← ícone do app (gerado de frame do gif, fundo verde #007D6E)
│   ├── back-icon.png      ← usado no AuthHeader (Login/Register)
│   ├── backButton.png     ← usado no ScreenHeader (Autocuidado, Check-in, Calendar, Chat, Anonimo, Identificada)
│   ├── calendar-icon.png
│   ├── chat-icon.png
│   ├── check-icon.png
│   ├── home-icon.png
│   ├── profile-icon.png
│   ├── gmail-logo.png
│   ├── apple-logo.png
│   ├── microsoft-logo.png
│   ├── homePageAssets/    ← assets da HomeScreen
│   │   ├── checkinIcon.png      ← mini-arco de humor no card de Check-in
│   │   └── autocuidadoCover.png ← capa dos cards do carrossel de Autocuidado
│   ├── checkinAssets/     ← assets da CheckinDiarioScreen (ainda não integrados ao código)
│   │   ├── meter-icon.png       ← arco de humor completo (alta fidelidade)
│   │   └── neutral-icon.png     ← rosto do estado "neutro"
│   ├── chatAssets/        ← pasta reservada para assets de Anonimo/Identificada (vazia por ora)
│   └── images/
│       ├── placeholder.png    ← placeholder neutro para imagens ainda não exportadas do Figma
│       ├── anonimous-icon.png ← ícone "Mensagem Anônima" no hub ChatScreen
│       ├── identifed-icon.png ← ícone "Mensagem Identificada" no hub ChatScreen
│       └── textEdit/          ← ícones da toolbar de formatação do MessageComposer
│           ├── pencilEdit.png, caps.png, markText.png, bold.png, italic.png,
│           │   underline.png, strikethrough.png, addLink.png, addImage.png,
│           │   listNum.png, listPoint.png, textLeft.png, textCenter.png, textRight.png
├── screens/               ← uma tela por arquivo
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── AutocuidadoScreen.js
│   ├── CheckinDiarioScreen.js
│   ├── CalendarPageScreen.js
│   ├── SchedulePageScreen.js
│   ├── ChatScreen.js      ← hub "Envie uma mensagem" (RF06/RF07)
│   ├── AnonimoScreen.js   ← canal anônimo (RF07)
│   ├── IdentificadaScreen.js ← canal identificado (RF06)
│   ├── ProfileScreen.js   ← perfil com edição inline (visualizar ⇄ editar) + excluir conta
│   ├── CheckinHistoryScreen.js ← histórico de respostas do check-in (RF04, mockado)
│   ├── NotificationsScreen.js ← preferências de notificação (RF09, mockado)
│   │
│   │   ── portal pedagógico (tipo_usuario = "pedagogo") ──
│   ├── HomeEducadorScreen.js       ← dashboard com grid 2x2 + contadores
│   ├── TurmasListScreen.js         ← turmas com selo de pendências
│   ├── TurmaDetalheScreen.js       ← alunos da turma + último check-in
│   ├── AlunoDetalheScreen.js       ← ficha: perfil, histórico, agendamentos
│   ├── AgendamentosEducadorScreen.js ← fila com Confirmar/Recusar (RF08)
│   └── MensagensEducadorScreen.js  ← caixa de entrada (RF06/RF07)
├── components/            ← componentes reutilizáveis
│   ├── IconSet.js         ← TODOS os ícones do app em SVG próprio (react-native-svg)
│   ├── Headers.js         ← AuthHeader (login/register) + ScreenHeader (com slot `right`)
│   ├── BottomTabBar.js    ← barra do aluno (Agenda, Mensagens, Início, Autocuidado, Perfil)
│   ├── BottomTabBarEducador.js ← barra do educador (Início, Turmas, Agenda, Mensagens)
│   ├── FloatingHomeButton.js ← atalho para a Home que sobe ao tocar a faixa inferior
│   ├── PressableScale.js  ← área tocável padrão (activeOpacity + scale 0.97)
│   ├── AnimatedInput.js   ← campo com contorno animado (cinza→verde→vermelho) + olho de senha
│   ├── AuthTabSelector.js ← seletor "Entrar / Cadastrar-se" com pílula deslizante
│   ├── TermsModal.js      ← Termo de Uso / Política de Privacidade + "Li e aceito"
│   ├── Toast.js           ← snackbar verde reutilizável (2s)
│   ├── BackgroundPattern.js ← padrão SVG sutil — hoje só no Login/Cadastro
│   ├── MessageComposer.js ← formulário de mensagem (título, texto, enviar) de Anonimo/Identificada
│   └── ConfirmModal.js    ← modal de confirmação genérico (usado para excluir conta)
├── data/                  ← dados fixos enquanto não há API
│   ├── conteudosData.js   ← 4 conteúdos de Autocuidado derivados do TCC_Base_Teorica.md
│   ├── turmasData.js      ← turmas, alunos, check-ins, agendamentos e mensagens do portal
│   └── legalTexts.js      ← textos do Termo de Uso e da Política de Privacidade
├── utils/
│   ├── validators.js      ← regex de e-mail, campo vazio e `rotaInicialPorTipo`
│   └── datas.js           ← MESES, formatação pt-BR de data e parse de dd/mm/aaaa
├── services/
│   ├── api.js             ← API_URL (host derivado do bundler do Expo)
│   └── session.js         ← usuário logado em memória
├── navigation/
│   └── AppNavigator.js    ← stack central de navegação (aluno + portal pedagógico)
├── styles/
│   └── theme.js           ← paleta, espaçamentos, alvos de toque e sombras
├── backend/
│   ├── server.js          ← API Express (usuários, login, CRUD)
│   ├── dbconfig.js        ← conexão MySQL
│   └── seed.js            ← cria/atualiza um usuário de cada tipo pra teste
└── database/
    └── schema.sql         ← DDL do banco (sistema_atendimento)
```

---

## 4. Paleta de Cores (theme.js)

| Token           | Hex       | Uso                                          |
|-----------------|-----------|----------------------------------------------|
| `primary`       | `#007D6E` | Verde institucional — headers, botões, splash |
| `accent`        | `#D4A82F` | Amarelo/dourado — slogan, botões da splash    |
| `background`    | `#F4F1ED` | Fundo geral das telas internas               |
| `cardBackground`| `#FFFFFF` | Fundo de cards                               |
| `textDark`      | `#1F2A28` | Texto principal                              |
| `textBrown`     | `#4F3422` | Mindful Brown — texto de conteúdo (Autocuidado, Check-in) |
| `textGray`      | `#736B66` | Optimistic Gray/60 — texto secundário, placeholders |
| `moodNeutral`   | `#FFCE5C` | Zen Yellow/40 — humor neutro (medidor)       |
| `moodSad`       | `#ED7E1C` | Empathy Orange/40 — humor triste (medidor)   |
| `moodHappy`     | `#9BB168` | Serenity Green/50 — humor feliz (medidor)    |
| `moodVeryBad`   | `#A694F5` | Gentle Purple/40 — humor muito ruim (extremo do medidor) |
| `primarySoft`   | `rgba(0,125,110,0.10)` | Fundo de realce verde (cards, selos, ícones) |
| `primaryTab`    | `rgba(0,125,110,0.12)` | Círculo do item ativo da BottomTabBar |
| `anonimo`       | `#8B6BBF` | Roxo do canal anônimo (ícone Mask, autor "Aluno Anônimo") |
| `anonimoSoft`   | `rgba(139,107,191,0.10)` | Fundo do card "Anônima" |
| `danger`        | `#C0392B` | Erros de validação, excluir conta, badges de pendência |
| `success`       | `#2E7D32` | Status confirmado/respondido |
| `warning`       | `#B26A00` | Status pendente / aguardando resposta |

Além das cores, o `theme.js` exporta:

- **`SPACING`** — escala de espaçamento (`xxs` 4 … `huge` 40). Usar sempre estas
  constantes em vez de números soltos.
- **`TOUCH`** — `min: 44` (alvo mínimo de toque), `scaleOnPress: 0.97` e
  `activeOpacity: 0.85`, aplicados pelo `PressableScale`.
- **`SHADOW`** e **`SHADOW_FLOATING`** — sombra padrão dos cards e sombra mais
  marcada (com `elevation`) da barra inferior e do botão flutuante de Home.

---

## 5. Fluxo de Navegação (Stack)

```
Splash
  ├── "Sou aluno"     → Login (role: "aluno")
  └── "Sou Educador"  → Login (role: "educador")

Login ↔ Register (troca via tab selector, replace no stack)
  └── login/cadastro OK → rotaInicialPorTipo(tipo_usuario)
        ├── "aluno"    → Home
        └── "pedagogo" → HomeEducador

── App do aluno ──────────────────────────────────────────────
Home (bottom bar presente em todas as telas internas)
  ├── card Check-in           → CheckinDiario
  ├── carrossel Autocuidado   → Autocuidado (recebe conteudoId)
  ├── bottom bar: Agenda      → CalendarPage
  ├── bottom bar: Mensagens   → Chat (hub "Envie uma mensagem")
  ├── bottom bar: Início      → Home
  ├── bottom bar: Autocuidado → Autocuidado
  └── bottom bar: Perfil      → Profile

Chat (hub)
  ├── card "Anônima"      → Anonimo (RF07)
  └── card "Identificada" → Identificada (RF06)

CalendarPage
  └── FAB "+"                 → SchedulePage (modal, slide_from_bottom)

Profile (edição inline — não navega para outra tela pra editar)
  ├── "Histórico de Check-in" → CheckinHistory
  └── "Notificações"          → Notifications

── Portal pedagógico ─────────────────────────────────────────
HomeEducador (grid 2x2 + bottom bar do educador)
  ├── Turmas        → TurmasList → TurmaDetalhe → AlunoDetalhe
  ├── Agendamentos  → AgendamentosEducador (Confirmar / Recusar)
  ├── Mensagens     → MensagensEducador
  └── Configurações → Profile (compartilhado com o aluno)
```

Todas as telas depois da Home (nos dois perfis) têm o `FloatingHomeButton`:
tocar a faixa inferior faz subir uma pílula "Home", que desce sozinha em 3s.

`Profile` é a única tela usada pelos dois perfis — ela escolhe entre
`BottomTabBar` e `BottomTabBarEducador` pelo `tipo_usuario` da sessão.

---

## 6. Telas Implementadas

### ✅ SplashScreen
- Fundo verde `#007D6E`, logo animada (GIF), slogan em amarelo/branco
- Botões "Sou aluno" e "Sou Educador" (pill, cor accent)
- Passa `role` como parâmetro de rota para Login

### ✅ LoginScreen
- Header verde com curva inferior, título + subtítulo brancos
- Tab selector "Entrar / Cadastrar-se" (pill, fundo cinza claro)
- Inputs: E-mail e Senha
- Checkbox "Manter conectado" + link "Esqueceu sua senha?"
- Botão "Entrar" (verde, pill)
- Divisor "Ou continue com" + botões sociais (Google, Apple, Microsoft)

### ✅ RegisterScreen
- Mesma estrutura de header que Login
- Campos: Nome + Sobrenome (linha dupla), E-mail, Senha, Confirmar senha
- Checkbox de aceite de Termos de Uso e Política de Privacidade
- Botão "Entrar" (mesmo label do Figma)

### ✅ HomeScreen
- Avatar circular com inicial do nome (canto superior direito)
- Saudação com nome do usuário em amarelo (`accent`)
- Seção "Check-in": card com ilustração do medidor + texto
- Seção "Autocuidado": scroll horizontal de cards de conteúdo
- Bottom tab bar

### ✅ AutocuidadoScreen
- ScreenHeader verde com seta circular de voltar
- Texto corrido de conteúdo educativo (futuramente virá do back-end)
- Fundo `#F4F1ED`, texto `textBrown`

### ✅ CheckinDiarioScreen
- Pergunta "Como você descreveria seu humor hoje?"
- Label descritivo do humor selecionado ("Me sinto neutro", etc.)
- Face circular colorida (cor varia com o humor)
- Medidor de arco (semicírculo SVG com 5 segmentos coloridos, tocáveis)
- Indicador (ponto) se move conforme segmento selecionado
- Botão "Confirmar" ao final

### ✅ CalendarPageScreen
- ScreenHeader com "Agendar conversa"
- Card de calendário mensal com navegação de meses
- Dias com indicadores de agendamentos (bolinhas coloridas)
- Lista de agendamentos abaixo do calendário (título, horário, subtítulo)
- FAB "+" no centro inferior → abre SchedulePage

### ✅ SchedulePageScreen (modal)
- Modal com slide_from_bottom
- Campos: Título, Professor (opcional), Assunto (opcional, textarea), Data (com ícone)
- Toggle "Lembre-me"
- Botão "Agendar"

### ✅ ChatScreen
- Hub "Envie uma mensagem": dois cards (Mensagem Anônima / Mensagem Identificada)
- Ícones reais: `assets/images/anonimous-icon.png` / `identifed-icon.png`

### ✅ AnonimoScreen / IdentificadaScreen
- Formulário compartilhado via `components/MessageComposer.js` (RF06/RF07)
- Campo Título (opcional), toolbar de formatação com ícones reais
  (`assets/images/textEdit/`), textarea "Conte o que precisar", botão "Entrar"
- Diferem apenas em título do header e texto do aviso de rodapé

### ✅ ProfileScreen (edição inline)
- Card-resumo (avatar, nome, e-mail, badge de papel) + campos em modo
  **visualização** por padrão
- Botão "Editar" no canto superior direito do `ScreenHeader` alterna para o
  modo de edição com animação `Animated.timing` de opacity + translateY
- "Salvar" chama `PUT /usuarios/:id`, atualiza a sessão, mostra o `Toast`
  verde e volta para a visualização **sem navegar para outra tela**
- No modo de edição aparece também o cartão "Excluir conta" → `ConfirmModal`
  (variante destrutiva, exige a senha)
- Menu: "Histórico de Check-in" e "Notificações" + "Sair da conta"

> A antiga `EditProfileScreen` foi removida: a edição virou inline aqui.

### ✅ CheckinHistoryScreen
- Lista de check-ins passados (data + humor), dados mockados (RF04)
- Futuramente virá da entidade `Checkin_Emocional`; hoje é só a escala de
  humor, depois vira um questionário completo

### ✅ NotificationsScreen
- Lista de preferências com `Switch` (lembrete de check-in, mensagens,
  agendamentos, novos conteúdos), estado local mockado (RF09)

### ✅ Portal pedagógico (HomeEducador e telas seguintes)
- `HomeEducadorScreen`: header verde com saudação e dois contadores
  (agendamentos aguardando / mensagens não lidas) + grid 2x2
  (Turmas, Agendamentos, Mensagens, Configurações) com selos de pendência
- `TurmasListScreen`: turmas com selo vermelho somando alunos em humor de
  atenção e agendamentos pendentes
- `TurmaDetalheScreen`: alunos da turma com o último check-in (cor + data);
  quem está em humor de atenção ganha avatar vermelho e ícone de alerta
- `AlunoDetalheScreen`: ficha com identificação, histórico de check-ins
  (com as anotações em texto livre) e agendamentos com status
- `AgendamentosEducadorScreen`: fila separada em "aguardando resposta" e
  "já respondidos", com botões Confirmar/Recusar e `Toast` de retorno
- `MensagensEducadorScreen`: filtros (Todas/Anônimas/Identificadas); as
  anônimas aparecem como **"Aluno Anônimo"** com o ícone Mask e um aviso de
  que não dá pra identificar nem responder diretamente

Os dados vêm de `data/turmasData.js` (fixos, sem API ainda). A estética é a
mesma do app do aluno: mesma paleta, mesmos cards brancos com sombra, mesma
barra inferior — só muda o conjunto de abas.

---

## 7. Telas Pendentes (protótipo ainda não recebido)

Nenhuma tela core pendente no momento — restam apenas refinamentos futuros
(gráficos no histórico de check-in, notificações push reais, integração
com back-end).

---

## 8. Requisitos Funcionais (do artigo)

| ID   | Descrição                                                   | Status         |
|------|-------------------------------------------------------------|----------------|
| RF01 | Cadastro de usuário (nome, e-mail, ano escolar, faixa etária) | ✅ Front pronto |
| RF02 | Login e autenticação por e-mail/senha com perfis distintos  | ✅ Front pronto (back pendente) |
| RF03 | Check-in emocional diário (escala de sentimentos)           | ✅ Front pronto |
| RF04 | Histórico e monitoramento emocional (gráficos)              | ✅ Front pronto (lista mockada, sem gráficos ainda) |
| RF05 | Conteúdos educativos (textos, dicas)                        | ✅ Front pronto (dados mockados) |
| RF06 | Canal de comunicação seguro aluno → coordenação             | ✅ Front pronto (dados mockados) |
| RF07 | Canal anônimo de apoio e denúncia                           | ✅ Front pronto (dados mockados) |
| RF08 | Agendamento de atendimentos com coordenação/orientadores    | ✅ Front pronto (dados mockados) |
| RF09 | Notificações e lembretes automáticos                        | ✅ Front pronto (preferências mockadas, sem push real) |

---

## 9. Requisitos Não Funcionais

| ID    | Descrição                                                        |
|-------|------------------------------------------------------------------|
| RNF01 | Alta disponibilidade — check-ins sem interrupção                 |
| RNF02 | Interface responsiva, simples, em poucos toques                  |
| RNF03 | Performance otimizada — funciona em conexões lentas              |
| RNF04 | Criptografia e anonimato total nos canais de comunicação (RF06/RF07) |
| RNF05 | Escalável — suporta múltiplos acessos simultâneos                |

---

## 10. Modelo de Dados (Diagrama ER — para o back-end)

### Entidades e atributos

**Pedagogo**
- `id_pedagogo` (PK)
- `nome`, `email`, `senha`, `tipo_pedagogo`

**Alunos**
- `id_aluno` (PK)
- `nome`, `email`, `senha`, `tipo_aluno`

**Checkin_Emocional**
- `id_checkin` (PK)
- `id_aluno` (FK → Alunos)
- `data_checkin`, `humor_selecionado`, `texto_livre_opcional`

**Agendamento**
- `id_agendamento` (PK)
- `id_aluno` (FK → Alunos)
- `id_pedagogo` (FK → Pedagogo)
- `data_horario`, `motivo`

**Status_Atendimento**
- `id_atendimento` (PK)
- `id_agendamento` (FK → Agendamento)
- `id_pedagogo` (FK → Pedagogo)
- `resumo`, `data_realizacao`
- `status`: `pendente` | `confirmado` | `recusado`

**Conteudos_educativos**
- `id_conteudo` (PK)
- `titulo`, `tipo`, `descricao`

---

## 11. Plano de Desenvolvimento

### Fase 1 — Front-end (em andamento)
- [x] Telas de autenticação (Splash, Login, Register)
- [x] Home, Autocuidado, Check-in Diário
- [x] Calendário de agendamentos + modal de agendamento
- [x] Navegação Stack completa
- [x] Componentes reutilizáveis (Headers, BottomTabBar)
- [x] Tema global (theme.js)
- [x] Chat (hub "Envie uma mensagem") + canal anônimo + canal identificado
- [x] Perfil (hub, editar perfil + excluir conta, histórico de check-in, notificações)
- [ ] Gráficos no histórico de check-in (hoje é só uma lista)

### Fase 2 — Back-end (Node.js + MySQL)
- [x] Configuração do servidor Node.js
- [x] Modelagem e criação do banco MySQL (baseado no Diagrama ER)
- [x] Sistema de autenticação (login/cadastro com senha em bcrypt)
- [x] CRUD de usuários (Alunos/Pedagogo) — alimenta a ProfileScreen
- [ ] API de check-ins (POST para registrar, GET para histórico)
- [ ] API de agendamentos (CRUD)
- [ ] API de conteúdos educativos (GET listagem)
- [ ] Canal de comunicação seguro (mensagens aluno → pedagogo)
- [ ] Canal anônimo (mensagens sem identificação)
- [ ] Notificações push (expo-notifications)

### Fase 3 — Integração e Testes
- [ ] Conectar front-end ao back-end (substituir dados mockados por chamadas à API)
- [ ] Testes de usabilidade com grupo de alunos e equipe pedagógica
- [ ] Ajustes de layout, performance e acessibilidade
- [ ] Validação com o Senac São Leopoldo

---

## 12. Convenções do Projeto

- **Um arquivo por tela**, sempre dentro de `screens/`
- **Componentes reutilizáveis** sempre em `components/`
- **Cores, espaçamentos e alvos de toque** sempre importados de
  `styles/theme.js` (`COLORS`, `SPACING`, `TOUCH`, `SHADOW`) — nunca números
  soltos nos arquivos de tela
- **Ícones** sempre do `components/IconSet.js` (SVG próprio). Não usar PNG
  para ícone novo, nem emoji/glifo de texto
- **Áreas tocáveis** usam `components/PressableScale.js` em vez de
  `TouchableOpacity` cru, e respeitam `TOUCH.min` (44pt)
- **Toda tela** é embrulhada em `SafeAreaView` de `react-native-safe-area-context`
  (o `SafeAreaProvider` está no `App.js`)
- **Assets** sempre em `assets/` com `require("../assets/nome-do-arquivo.ext")`
- **Navegação** via `navigation.navigate("NomeDaTela")` — os nomes das rotas estão definidos em `navigation/AppNavigator.js`
- **Dados mockados** são temporários — comentados com `// futuramente virá do back-end`
- **Placeholders** de telas não implementadas retornam `null` para não quebrar a navegação

---

## 13. Observações Importantes para o Claude Code

0. **Como rodar o projeto** (três passos, nesta ordem):
   1. MySQL ativo, com o banco criado a partir de `database/schema.sql`
   2. `cd backend && node server.js` (porta 3000)
   3. `npx expo start` na raiz

   **Usuários de teste** (criados por `cd backend && node seed.js`, que é
   idempotente):

   | Perfil   | E-mail                     | Senha         | Cai em        |
   |----------|----------------------------|---------------|---------------|
   | Aluno    | `aluno@educamente.com`     | `aluno123`    | HomeScreen    |
   | Pedagogo | `pedagogo@educamente.com`  | `pedagogo123` | HomeEducador  |

1. **Antes de editar qualquer arquivo**, confirmar que está na raiz do repositório
   (`EducamenteMobile/`) onde está o `.git`, o `package.json` e o `App.js`.

2. **Para testar mudanças**, usar `npx expo start -c` (o `-c` limpa o cache do Metro).

3. **Não criar** `package.json`, `.git` ou `node_modules` dentro de subpastas —
   o erro histórico deste projeto foi ter dois projetos Expo aninhados.

4. **Ícone do app** (`assets/icon.png`) foi gerado a partir de um frame do GIF da logo
   com fundo verde `#007D6E`. É uma versão provisória — substituir por versão
   oficial do Figma quando disponível.

5. **Ícones**: todos vêm de `components/IconSet.js`, desenhados em SVG no grid
   24x24 com traço 1.8. Cada um aceita `size`, `color` e `filled` (a silhueta
   ganha um preenchimento suave da própria cor — é o que marca a aba ativa).
   O glifo `♡` da BottomTabBar foi substituído pelo `HeartIcon`.

6. **`services/api.js`** deduz o host do back-end a partir da URL do bundler do
   Expo, então não precisa mais corrigir o IP a cada troca de rede. Para
   apontar para outro servidor, preencher a constante `IP_MANUAL`.

7. **react-native-svg** é necessário para o `IconSet`, para os gradientes do
   carrossel da Home e para o `CheckinDiarioScreen` (arco do medidor).
   Se der erro de "Unable to resolve react-native-svg", rodar:
   `npx expo install react-native-svg -- --legacy-peer-deps`

# EducaMente — Status Atualizado (sessões de refinamento via Figma)

> Gerado após análise do arquivo Figma oficial do projeto
> (`Educamente - Mobile`, node-id 70-361) e implementação/refinamento de
> todas as telas com frame pronto no Figma.

---

## 1. O que foi feito

**Sessão 1** — refinamento de fidelidade das 3 primeiras telas com base no Figma:
`Splashscreen` (70:372), `RegisterScreen` (140:522), `LoginScreen` (140:462).
Ajustes de tipografia, distribuição vertical da Splash e tamanho/raio do
botão de voltar (`AuthHeader`). Criado `assets/images/placeholder.png`
(PNG 1x1px cinza-claro) como asset neutro para imagens ainda não exportadas.

**Sessão 2** — refinamento de fidelidade de `HomePage` (150:653),
`Check-in Diário` (150:621) e `Autocuidado` (150:703): paleta de humor e
`textBrown`/`textGray` atualizados para os tokens exatos do Figma, rosto do
Check-in redesenhado em SVG (antes usava emoji), `ScreenHeader` com botão de
voltar maior, `BottomTabBar` convertida para pílula flutuante com estado
ativo em contorno, `HomeScreen` com prévia em mini-arco do humor e carrossel
de Autocuidado com cards "peek".

**Sessão 3** — implementação das 3 telas que ainda não existiam no código:
`Envie uma mensagem` (177:2951, hub `ChatScreen`), `Anônimo` (177:2966,
`AnonimoScreen`, RF07) e `Identificada` (177:3006, `IdentificadaScreen`,
RF06). Os dois formulários de mensagem compartilham
`components/MessageComposer.js`. Nessa sessão os ícones ainda não tinham
sido exportados do Figma, então usavam `assets/images/placeholder.png`.

**Sessão 4** — usuário adicionou assets reais (`assets/backButton.png` e
`assets/textEdit/*`). `ScreenHeader` passou a usar o ícone real de voltar
(antes era um chevron de texto) e `MessageComposer` trocou os glifos de
texto da toolbar pelos ícones reais (negrito, itálico, sublinhado, listas,
alinhamento, anexos).

**Sessão 5** — usuário reorganizou os assets em subpastas
(`homePageAssets/`, `checkinAssets/`, `chatAssets/`, e moveu alguns para
`images/`). `MessageComposer` teve os `require()` corrigidos para o novo
caminho de `textEdit/`. `ChatScreen` passou a usar os ícones reais
`anonimous-icon.png`/`identifed-icon.png` (que já existiam no projeto e
batiam exatamente com os ícones "secret 1"/"private 1" do Figma).
`HomeScreen`: o mini-arco de humor (SVG) foi trocado pelo asset real
`checkinIcon.png`; o carrossel de Autocuidado foi reconstruído como um
carrossel infinito (índice central + vizinhos via módulo, sem lib externa)
usando `autocuidadoCover.png` como capa, com o card central em destaque e
os vizinhos menores/translúcidos. `assets/checkinAssets/` (arco completo +
rosto "neutro") ainda não foi integrado ao `CheckinDiarioScreen` —herdaria
uma decisão de design (manter a seleção de humor interativa via SVG, ou
sobrepor áreas de toque num asset estático) que não foi pedida ainda.

**Sessão 6** — feature de Perfil implementada do zero (sem frame no Figma
ainda), seguindo a estética "shadow box" (cards brancos com sombra sobre o
fundo bege) já usada no resto do app: `ProfileScreen` (hub com resumo do
usuário + menu), `EditProfileScreen` (formulário + exclusão de conta via
`components/ConfirmModal.js`, um modal de confirmação genérico e
reutilizável), `CheckinHistoryScreen` (lista mockada, RF04) e
`NotificationsScreen` (preferências com `Switch`, RF09). É front-end puro,
preparado para receber o CRUD de usuários do back-end depois.

## 2. Arquivos-chave da Sessão 6 (Perfil)

| Arquivo | Tipo | Descrição |
|---|---|---|
| `screens/ProfileScreen.js` | Criado | Hub: card-resumo do usuário + menu (Editar perfil, Histórico, Notificações) + Sair |
| `screens/EditProfileScreen.js` | Criado | Formulário de edição + card de exclusão de conta |
| `screens/CheckinHistoryScreen.js` | Criado | Lista mockada do histórico de check-ins (RF04) |
| `screens/NotificationsScreen.js` | Criado | Lista de preferências com `Switch` (RF09) |
| `components/ConfirmModal.js` | Criado | Modal de confirmação genérico, com variante destrutiva |
| `navigation/AppNavigator.js` | Modificado | Rotas `Profile`/`EditProfile`/`CheckinHistory`/`Notifications` substituindo o placeholder de Profile |

## 3. Verificação

`npx expo start --web` + navegação real via Playwright (headless Chromium)
confirmaram que todas as telas novas/refinadas renderizam sem erros de
console — incluindo o fluxo completo do Perfil (hub → editar → abrir/cancelar
o modal de exclusão → histórico → notificações com toggle funcional) e uma
passada pelas telas existentes (Home, Check-in, Autocuidado, Chat, Anônimo,
Identificada, Calendário) para garantir que os componentes compartilhados
(`ScreenHeader`, `BottomTabBar`) não regrediram nada.

---

# Sessão 7 — Design system em SVG, UX e portal pedagógico

## 1. O que foi feito

**Sistema de ícones próprio.** `components/IconSet.js` reúne todos os ícones do
app desenhados em SVG (grid 24x24, traço 1.8, pontas arredondadas), com as
props `size`, `color` e `filled`. Saíram todos os PNG de ícone e o glifo `♡`.
Além dos pedidos (Home, Calendar, Chat, Heart, Profile, Back, Eye, EyeOff,
Mask, User, Check, Bell, Edit, Save, Turmas, Agenda, Mensagens), entraram os
que as telas precisaram: Plus, ChevronLeft/Right, Close, Logout, Settings,
Clock, Alert, History, Send, Trash, Lock, Search, Book e Smile. O mapa `ICONS`
e o componente `<Icon name="..." />` permitem escolher o ícone por dado.

**Fundação de UX.** `theme.js` ganhou `SPACING`, `TOUCH` (44pt) e
`SHADOW_FLOATING`. Todas as telas passaram a usar `SafeAreaView`
(`SafeAreaProvider` no `App.js`), espaçamentos vindos do tema e alvos de
toque de no mínimo 44x44 — inclusive os ícones pequenos da toolbar do
`MessageComposer`, as setas de mês do calendário e as células de dia.
`components/PressableScale.js` virou a área tocável padrão: `activeOpacity`
mais `scale 0.97` no toque.

**BottomTabBar.** Ícones SVG, rótulo de texto abaixo, fundo circular
`rgba(0,125,110,0.12)` no item ativo, pulso `Animated.spring`
(1.0 → 1.15 → 1.0) ao tocar e sombra/elevation mais marcada.

**Login e Cadastro.** Pílula do seletor "Entrar / Cadastrar-se" desliza com
`Animated.spring` e o formulário entra deslizando (esquerda no Login, direita
no Cadastro). `AnimatedInput` anima o contorno (cinza → verde no foco →
vermelho no erro) e traz o olho de mostrar/ocultar senha. O cadastro valida
nome, sobrenome, e-mail (regex), senha mínima, senhas iguais e aceite dos
termos — cada falha acende o campo e escreve a mensagem embaixo dele; e-mail
duplicado (409) volta no campo de e-mail. `TermsModal` abre o Termo de Uso e
a Política de Privacidade (`data/legalTexts.js`, escritos para dados
sensíveis de menores: LGPD arts. 11 e 14, ECA, limites do sigilo, canal
anônimo) e o botão "Li e aceito" fecha o modal marcando o checkbox.

**Home.** Carrossel virou `FlatList` horizontal com `snapToInterval` e dots de
paginação, com os 4 conteúdos derivados do `TCC_Base_Teorica.md`
(`data/conteudosData.js`), cada card com seu gradiente SVG. A
`AutocuidadoScreen` agora recebe o `conteudoId` pela rota e lê o conteúdo
escolhido, com atalhos para os outros.

**FloatingHomeButton.** Faixa invisível de 28pt no rodapé; ao tocar, a pílula
verde sobe (`translateY 80 → 0`, spring) e desce sozinha depois de 3s.
Presente em todas as telas depois da Home, nos dois perfis. As telas com
botão ancorado no rodapé (Check-in, composer de mensagem) reservam
`TRIGGER_HEIGHT` para a faixa não cobrir o botão.

**Telas de mensagem.** O hub virou dois cards compactos lado a lado — Anônima
(ícone Mask, fundo `rgba(139,107,191,0.10)`) e Identificada (ícone User,
fundo `rgba(0,125,110,0.10)`) — com título, descrição curta e seta, mais um
aviso de que o canal não é serviço de emergência. `BackgroundPattern` põe um
padrão SVG sutil (círculos ou ondas) no topo das telas de fundo sólido.

**Portal pedagógico.** Seis telas novas, `BottomTabBarEducador` e
`data/turmasData.js` (3 turmas, 11 alunos com histórico de check-in e
agendamentos, 6 mensagens). Login e cadastro chamam
`rotaInicialPorTipo(tipo_usuario)` (`utils/validators.js`), que manda
pedagogo para `HomeEducador` e aluno para `Home`.

**Perfil.** Edição inline substituiu a navegação para a `EditProfileScreen`
(removida): campos em visualização por padrão, botão "Editar" no topo,
transição com `Animated.timing` de opacity + translateY, "Salvar" chamando
`PUT /usuarios/:id` e voltando para a visualização com o `Toast` verde
(`components/Toast.js`, reutilizado no Check-in e nos agendamentos do
educador).

## 2. Correções de bugs encontradas no caminho

| Onde | Problema | Correção |
|---|---|---|
| `backend/server.js` | `POST /usuarios` quebrava ao cadastrar aluno: o formulário não manda `ano_escolar`/`faixa_etaria` e o mysql2 recusa parâmetro `undefined` | campos opcionais viram `null` antes da query (idem no `PUT`) |
| `services/api.js` | IP fixo (`192.168.1.169`) já não era o da máquina, então o app no celular não achava o back-end | host deduzido da URL do bundler do Expo, com `IP_MANUAL` como escape |
| `screens/ChatScreen.js` | era destino da aba "Mensagens" mas não desenhava a `BottomTabBar` — quem entrava ficava sem navegação inferior | passou a renderizar a barra com `active="Chat"` |
| `components/PressableScale.js` | o `style` do chamador ia para um elemento interno, então `flex: 1` não chegava no pai e os dois cards do hub de mensagens vazavam da tela (627px num viewport de 375px) | o transform passou a ir junto do `style` no próprio `TouchableOpacity` (a raiz dele já é uma `Animated.View`), mantendo o componente como uma peça só no layout |
| `components/FloatingHomeButton.js` | a faixa de toque de 44pt cobria o botão "Confirmar" do Check-in | faixa reduzida para 28pt e telas com botão no rodapé reservam essa altura |

## 3. Verificação

`npx expo start --web` bundou 573 módulos sem erro. Um roteiro de 42 passos
no Chromium headless (viewport 375x812) passou inteiro: login dos dois
perfis, validações de login e cadastro, olho de senha, carrossel com os 4
cards, as 5 abas da barra, check-in com toast, hub e formulário de mensagem,
perfil salvando inline com toast, logout, portal pedagógico completo
(turmas → turma → aluno, confirmar agendamento, "Aluno Anônimo" nas mensagens
anônimas) e o modal de termos marcando o checkbox. Também foram conferidos:
ausência de corte horizontal em todas as telas a 375pt, o ciclo do
`FloatingHomeButton` (escondido → aparece ao tocar a faixa → some em 3s →
navega para a Home), o FAB do calendário e o botão do check-in.

Do lado do back-end, foram testados por `curl`: login dos dois usuários,
senha errada (401), cadastro sem campos opcionais, e-mail duplicado (409),
`PUT /usuarios/:id` e `DELETE /usuarios/:id`.

Os únicos avisos de console que sobram são do `react-native-web` repassando
props de responder do RN para nós SVG (vêm do `onPress` nos segmentos do arco
de humor) — são anteriores a esta sessão e só aparecem no alvo web.

---

# Sessão 8 — volta à linha de design original do Figma

O princípio desta revisão foi tirar do app tudo que tinha cara de "gerado por
IA" ou de painel técnico e devolver a linguagem do protótipo: formas
arredondadas, conforto visual, imagem real no lugar de fundo colorido
calculado em código. Login e Cadastro ficaram intocados (UX/UI aprovada).

## 1. Favicon da aba do navegador

`app.json` → `web.favicon` passou a apontar para `./assets/icon.png` (antes
apontava para `./assets/favicon.png`, arquivo que não existe na pasta). O
`icon` do app já estava correto. O `expo install` do date picker acrescentou
sozinho o bloco `plugins` — é exigência do módulo nativo, não mudança de
configuração visual.

> Pendência conhecida: `splash.image` e `android.adaptiveIcon.foregroundImage`
> ainda apontam para `splash-icon.png` e `adaptive-icon.png`, que também não
> existem em `assets/`. Não foram alterados porque a revisão pedia só o
> favicon.

## 2. HomeScreen — conteúdos educativos com imagem real

- `data/conteudosData.js`: o campo `gradient` (par de cores) saiu e entrou
  `cover`, com `require("../assets/homePageAssets/autocuidadoCover.png")`.
- O card do carrossel virou card branco com a capa em cima (`Image`,
  `resizeMode="cover"`) e o texto embaixo — tag em verde, título em
  `textBrown`, tempo de leitura em `textGray`. Nada de `Svg`/`LinearGradient`.
- `FlatList` horizontal com `snapToInterval` e dots continua igual em telas
  estreitas. Acima de **600pt** (`useWindowDimensions`), os quatro conteúdos
  passam a uma **grade de 2 colunas** (`flexWrap: "wrap"`, card a 48%) e os
  dots somem — era aí que sobrava espaço em branco.
- Cores, tipografia e estrutura da Home não mudaram.

## 3. Revisão geral de "excesso de IA"

| Onde | O que saiu |
|---|---|
| `SplashScreen`, `HomeEducadorScreen`, `ChatScreen` | `BackgroundPattern` (ondas/círculos em SVG). O componente ficou no projeto, usado só por Login/Cadastro |
| `AutocuidadoScreen` | hero de fundo colorido virou card branco com a capa real; os selos de "Continue lendo" usam `primarySoft` + ícone verde |
| `styles/theme.js` | `SHADOW_FLOATING` caiu de `shadowOpacity` 0.14 / `elevation` 10 para 0.08 / 6 — nenhuma sombra do app passa de 0.08; `warningSoft` de 16% para 12% |
| `BottomTabBar` e `BottomTabBarEducador` | o pulso `Animated.spring` (1.0 → 1.15 → 1.0) a cada toque; ícones de 22 para **24pt**, círculo do item ativo de 38 para 40 |
| `HomeEducadorScreen` | os quatro atalhos tinham cada um sua cor (dourado, roxo, marrom); agora todos usam verde institucional sobre `primarySoft` — quem diferencia é o ícone. Overlays brancos do header de 14%/25% para 12%/20% |

Mantidos de propósito: raios entre 16 e 32 (`radiusMedium` 20, `radiusLarge`
32), `SHADOW` padrão (0.08), paleta original e as animações discretas que são
função e não enfeite (`PressableScale`, `FloatingHomeButton`, `Toast`,
transição do Perfil, animações de Login/Cadastro).

## 4. Tela de mensagens

- `ChatScreen`: saíram o padrão de ondas e o card "Em caso de risco imediato"
  (CVV/SAMU). Ficaram a frase de introdução e os dois cards compactos lado a
  lado — Anônima (`anonimoSoft`, 10%) e Identificada (`primarySoft`, 10%).
- `MessageComposer`: saíram as duas fileiras de ícones de formatação e o botão
  "Categorias". Sobrou o essencial — título opcional (com o lápis do Figma),
  um card branco grande de `radiusLarge` com "Conte o que precisar" e a área
  de texto, o botão Enviar e a legenda do canal.
  Os PNG de `assets/images/textEdit/` continuam no projeto (só `pencilEdit`
  é usado) — se a barra de formatação precisar voltar, os assets estão lá.

## 5. Agendamento com data funcional

- Dependência nova: `@react-native-community/datetimepicker` (8.4.4), via
  `npx expo install`.
- `utils/datas.js` (novo): `MESES`, `DIAS_SEMANA`, `formatarDataLonga`
  ("Qui., 2 de Maio de 2026"), `formatarDataCurta` ("Qui., 2 de Maio") e
  `parseDataBR`. Escrito à mão porque o `Intl` do Hermes não garante pt-BR.
- `SchedulePageScreen`: o campo de data virou um botão que mostra a data
  formatada + `CalendarIcon` e abre o `DateTimePicker` em `mode="date"`
  (modal nativo no Android, spinner com "Pronto" no iOS). No alvo **web**,
  onde o módulo nativo não existe, o campo cai num `TextInput` dd/mm/aaaa
  validado por `parseDataBR`. Entrou também um campo livre de horário.
- "Agendar" só prossegue com data escolhida (erro embaixo, se faltar) e
  navega passando `novoAgendamento` — `{ titulo, professor, assunto, dataISO,
  dia, mes, ano, hora, lembrete }`, o mesmo objeto que vai alimentar o
  `POST /agendamentos` quando o back-end existir.
- `CalendarPageScreen` recebe esse parâmetro, guarda em estado, pula para o
  mês/dia escolhidos e mostra o agendamento na lista com a data formatada.
  O `MONTH_NAMES` local foi substituído pelo `MESES` de `utils/datas.js`.

## 6. Revisão dos ícones SVG

- `CheckIcon` e `PlusIcon` tinham traço 2.2 — baixados para 2.0. Todo o
  `IconSet` agora fica entre 1.5 e 2.0 (padrão 1.8), com
  `strokeLinecap`/`strokeLinejoin` "round" e viewBox 24x24.
- `ProfileIcon`, `TurmasIcon` e `HistoryIcon` aplicavam preenchimento em
  curvas **abertas** — no estado ativo isso desenhava uma "lente" estranha.
  O `body()` saiu desses traços; só silhuetas fechadas recebem fill.
- `SettingsIcon` era três trilhas com três botões preenchidos de branco (o
  branco vazava quando o ícone ficava sobre fundo colorido) — virou um par de
  controles de linha, com a trilha interrompida no lugar do botão.
- `SaveIcon` era um disquete de três peças — simplificado para silhueta com
  canto cortado + etiqueta.
- Bottom bar dos dois perfis: 24pt, centralizados, ativo preenchido em
  `COLORS.primary` e inativo em contorno `COLORS.textGray`.

## 7. Verificação

`npx expo start --web` bundou o projeto inteiro sem erro, e os 41 arquivos de
`screens/`, `components/`, `data/`, `utils/`, `styles/` e `navigation/`
passam no parser do Babel. O `DateTimePicker` nativo só pode ser conferido no
Expo Go (no navegador entra o fallback de texto).

---

# Sessão 8.1 — primeiro teste real no celular (Expo Go)

Rodar o app num aparelho de verdade descobriu três problemas que o alvo web
não mostrava.

## 1. `PORTA is not defined` — o app não subia em lugar nenhum

`services/api.js` montava `API_URL` com uma constante `PORTA` que nunca foi
declarada. Era `ReferenceError` na carga do módulo, ou seja, **tela branca em
qualquer plataforma**. Declarada como `const PORTA = 3000`, a mesma porta do
`backend/server.js`.

## 2. Assets do `app.json` que não existem

```
Unable to resolve asset "./assets/splash-icon.png" from "splash.image"
```

`splash.image` e `android.adaptiveIcon.foregroundImage` apontavam para
`splash-icon.png` e `adaptive-icon.png`, que não estão em `assets/`. No
navegador isso passa batido; no celular é erro. Os dois passaram a apontar
para `./assets/icon.png`. **Quando houver a splash oficial do Figma, é essa
linha que muda.**

## 3. O celular chamava o back-end no endereço errado

Sintoma: "Erro de conexão com o servidor" no login, com o celular na mesma
rede e o back-end no ar.

A descoberta do host usava só `NativeModules.SourceCode.scriptURL`, que vem
vazio no SDK 54 com a nova arquitetura — e o fallback era `localhost`, que no
celular é o próprio aparelho. A ordem agora é:

1. `Constants.expoConfig.hostUri` (`expo-constants`) — endereço pelo qual
   **este aparelho** baixou o app; é o caminho oficial do Expo;
2. `NativeModules.SourceCode.scriptURL` — arquitetura antiga;
3. `10.0.2.2` no Android (emulador) ou `localhost`.

`expo-constants@~18.0.14` entrou como dependência (devia já estar instalado,
é dependência do próprio `expo`, mas não estava). Em `__DEV__` o arquivo
imprime `[EducaMente] API_URL = ...` no terminal do `npx expo start` assim que
o app abre — é por aí que se diagnostica esse tipo de problema sem adivinhar.

> Instalar pacote com o Metro rodando exige `npx expo start -c` depois: o
> resolver dele guarda o mapa de `node_modules` em cache.

## 4. Versão do Expo Go

O projeto é **SDK 54**; o Expo Go das lojas hoje é **SDK 57** e recusa abrir:

```
ERROR  Project is incompatible with this version of Expo Go
```

Para testar sem migrar, instalar o Expo Go de SDK 54 pelo
`https://expo.dev/go?sdkVersion=54&platform=android&device=true` (dá pra ter
as duas versões no mesmo Android). A alternativa de fundo é subir o projeto
para o SDK 57 (`npx expo install expo@^57 --fix`), que mexe na versão do
React Native — trabalho de branch separado, com repasse tela por tela.

## 5. Checklist de teste no celular

1. MySQL ativo e `cd backend && node seed.js` (idempotente, cria os dois
   usuários de teste)
2. `cd backend && node server.js` — porta 3000
3. `npx expo start` na raiz, celular na mesma Wi-Fi, escanear o QR
4. No Windows, a Wi-Fi costuma estar no perfil **Público** — a regra de
   firewall do `node.exe` precisa valer para esse perfil, senão o celular não
   alcança nem o Metro (8081) nem a API (3000)
5. Conferir no terminal a linha `[EducaMente] API_URL = http://<ip>:3000`.
   Se aparecer `localhost` ali, o problema é a descoberta de host, não a rede.
