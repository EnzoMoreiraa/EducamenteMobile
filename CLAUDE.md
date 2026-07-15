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
  "@react-navigation/native-stack": "^7.17.6"
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
│   ├── ProfileScreen.js   ← hub de perfil (resumo do usuário + menu)
│   ├── EditProfileScreen.js  ← editar dados + excluir conta (abre ConfirmModal)
│   ├── CheckinHistoryScreen.js ← histórico de respostas do check-in (RF04, mockado)
│   └── NotificationsScreen.js ← preferências de notificação (RF09, mockado)
├── components/            ← componentes reutilizáveis
│   ├── Headers.js         ← AuthHeader (login/register) + ScreenHeader (telas internas)
│   ├── BottomTabBar.js    ← barra flutuante de navegação inferior (Calendar, Chat, Home, Autocuidado, Profile)
│   ├── MessageComposer.js ← formulário de mensagem compartilhado por Anonimo/Identificada
│   └── ConfirmModal.js    ← modal de confirmação genérico (usado hoje para excluir conta)
├── navigation/
│   └── AppNavigator.js    ← stack central de navegação
└── styles/
    └── theme.js           ← paleta de cores, tamanhos, sombras (fonte única de estilos globais)
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

---

## 5. Fluxo de Navegação (Stack)

```
Splash
  ├── "Sou aluno"     → Login (role: "aluno")
  └── "Sou Educador"  → Login (role: "educador")

Login ↔ Register (troca via tab selector, replace no stack)
  └── Acessar / Criar Conta → Home

Home (bottom bar presente em todas as telas internas)
  ├── card Check-in           → CheckinDiario
  ├── card Autocuidado        → Autocuidado
  ├── bottom bar: Calendar    → CalendarPage
  ├── bottom bar: Chat        → Chat (hub "Envie uma mensagem")
  ├── bottom bar: Home        → Home
  ├── bottom bar: ♡           → Autocuidado
  └── bottom bar: Profile     → Profile (placeholder vazio — tela não prototipada ainda)

Chat (hub)
  ├── card "Mensagem Anônima"      → Anonimo (RF07)
  └── card "Mensagem Identificada" → Identificada (RF06)

CalendarPage
  └── botão "+"               → SchedulePage (modal, slide_from_bottom)
```

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

### ✅ ProfileScreen
- Hub de perfil: card-resumo (avatar, nome, e-mail, badge de papel) + menu
  ("Editar perfil", "Histórico de Check-in", "Notificações") + "Sair da conta"
- Sem frame no Figma ainda — segue a estética "shadow box" (cards brancos
  com sombra sobre o fundo bege) já usada no resto do app
- Front-end apenas; dados mockados até o CRUD de usuários chegar do back-end

### ✅ EditProfileScreen
- Formulário (Nome, Sobrenome, E-mail) + botão "Salvar alterações" (mockado)
- Cartão de perigo "Excluir conta" → abre `components/ConfirmModal.js`
  (variante destrutiva) antes de confirmar a exclusão

### ✅ CheckinHistoryScreen
- Lista de check-ins passados (data + humor), dados mockados (RF04)
- Futuramente virá da entidade `Checkin_Emocional`; hoje é só a escala de
  humor, depois vira um questionário completo

### ✅ NotificationsScreen
- Lista de preferências com `Switch` (lembrete de check-in, mensagens,
  agendamentos, novos conteúdos), estado local mockado (RF09)

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
- [ ] Configuração do servidor Node.js
- [ ] Modelagem e criação do banco MySQL (baseado no Diagrama ER)
- [ ] Sistema de autenticação (login/cadastro com JWT ou sessão)
- [ ] CRUD de usuários (Alunos/Pedagogo) — alimenta ProfileScreen/EditProfileScreen
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
- **Cores e tamanhos** sempre importados de `styles/theme.js` — nunca hardcoded nos arquivos de tela
- **Assets** sempre em `assets/` com `require("../assets/nome-do-arquivo.ext")`
- **Navegação** via `navigation.navigate("NomeDaTela")` — os nomes das rotas estão definidos em `navigation/AppNavigator.js`
- **Dados mockados** são temporários — comentados com `// futuramente virá do back-end`
- **Placeholders** de telas não implementadas retornam `null` para não quebrar a navegação

---

## 13. Observações Importantes para o Claude Code

1. **Antes de editar qualquer arquivo**, confirmar que está na raiz do repositório
   (`EducamenteMobile/`) onde está o `.git`, o `package.json` e o `App.js`.

2. **Para testar mudanças**, usar `npx expo start -c` (o `-c` limpa o cache do Metro).

3. **Não criar** `package.json`, `.git` ou `node_modules` dentro de subpastas —
   o erro histórico deste projeto foi ter dois projetos Expo aninhados.

4. **Ícone do app** (`assets/icon.png`) foi gerado a partir de um frame do GIF da logo
   com fundo verde `#007D6E`. É uma versão provisória — substituir por versão
   oficial do Figma quando disponível.

5. **O ícone de "Autocuidado" na BottomTabBar** usa um glifo `♡` temporário —
   não veio um asset PNG específico para ele no zip de assets. Substituir
   assim que disponível.

6. **react-native-svg** é necessário para o `CheckinDiarioScreen` (arco do medidor).
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
