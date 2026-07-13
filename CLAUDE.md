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
│   ├── back-icon.png
│   ├── calendar-icon.png
│   ├── chat-icon.png
│   ├── check-icon.png
│   ├── home-icon.png
│   ├── profile-icon.png
│   ├── neutral-icon.png
│   ├── anonimous-icon.png ← ícone do canal anônimo — ainda não usado no código (ChatScreen usa placeholder.png)
│   ├── identifed-icon.png ← ícone do canal identificado — ainda não usado no código (ChatScreen usa placeholder.png)
│   ├── gmail-logo.png
│   ├── apple-logo.png
│   ├── microsoft-logo.png
│   └── images/
│       └── placeholder.png ← placeholder neutro para imagens ainda não exportadas do Figma
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
│   └── IdentificadaScreen.js ← canal identificado (RF06)
├── components/            ← componentes reutilizáveis
│   ├── Headers.js         ← AuthHeader (login/register) + ScreenHeader (telas internas)
│   ├── BottomTabBar.js    ← barra flutuante de navegação inferior (Calendar, Chat, Home, Autocuidado, Profile)
│   └── MessageComposer.js ← formulário de mensagem compartilhado por Anonimo/Identificada
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
- Ícones reais ("secret 1" / "private 1") ainda não exportados do Figma —
  usando `assets/images/placeholder.png` (comentado no código)

### ✅ AnonimoScreen / IdentificadaScreen
- Formulário compartilhado via `components/MessageComposer.js` (RF06/RF07)
- Campo Título (opcional), toolbar de formatação mockada (glifos de texto,
  sem lib de rich-text real), textarea "Conte o que precisar", botão "Entrar"
- Diferem apenas em título do header e texto do aviso de rodapé

---

## 7. Telas Pendentes (protótipo ainda não recebido)

### ⏳ ProfileScreen
- Perfil do usuário (aluno ou educador)
- Rota criada como placeholder no AppNavigator

### ⏳ HistoricoCheckinScreen
- Histórico visual com gráficos de humor (RF04)
- Não tem rota criada ainda

### ⏳ NotificacoesScreen
- Notificações e lembretes (RF09)
- Não tem rota criada ainda

---

## 8. Requisitos Funcionais (do artigo)

| ID   | Descrição                                                   | Status         |
|------|-------------------------------------------------------------|----------------|
| RF01 | Cadastro de usuário (nome, e-mail, ano escolar, faixa etária) | ✅ Front pronto |
| RF02 | Login e autenticação por e-mail/senha com perfis distintos  | ✅ Front pronto (back pendente) |
| RF03 | Check-in emocional diário (escala de sentimentos)           | ✅ Front pronto |
| RF04 | Histórico e monitoramento emocional (gráficos)              | ⏳ Não iniciado |
| RF05 | Conteúdos educativos (textos, dicas)                        | ✅ Front pronto (dados mockados) |
| RF06 | Canal de comunicação seguro aluno → coordenação             | ✅ Front pronto (dados mockados) |
| RF07 | Canal anônimo de apoio e denúncia                           | ✅ Front pronto (dados mockados) |
| RF08 | Agendamento de atendimentos com coordenação/orientadores    | ✅ Front pronto (dados mockados) |
| RF09 | Notificações e lembretes automáticos                        | ⏳ Não iniciado |

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
- [ ] Perfil do usuário — aguarda protótipo Figma
- [ ] Histórico de check-ins com gráficos
- [ ] Notificações

### Fase 2 — Back-end (Node.js + MySQL)
- [ ] Configuração do servidor Node.js
- [ ] Modelagem e criação do banco MySQL (baseado no Diagrama ER)
- [ ] Sistema de autenticação (login/cadastro com JWT ou sessão)
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
`components/MessageComposer.js`. Ícones ilustrados ("secret 1" / "private 1")
ainda não exportados do Figma — usando `assets/images/placeholder.png`
(comentado no código, apontando qual asset real deve entrar ali).

Todas as telas com frame no Figma até agora estão implementadas. Restam
apenas telas sem frame ainda (Perfil, Histórico de Check-ins, Notificações).

## 2. Arquivos-chave desta última leva (Sessão 3)

| Arquivo | Tipo | Descrição |
|---|---|---|
| `screens/ChatScreen.js` | Criado | Hub com os dois cards de entrada do canal de mensagem |
| `screens/AnonimoScreen.js` | Criado | Configura o `MessageComposer` para o canal anônimo (RF07) |
| `screens/IdentificadaScreen.js` | Criado | Configura o `MessageComposer` para o canal identificado (RF06) |
| `components/MessageComposer.js` | Criado | Formulário compartilhado (título, toolbar mockada, textarea, botão) |
| `navigation/AppNavigator.js` | Modificado | Rotas `Chat`/`Anonimo`/`Identificada` substituindo o placeholder de Chat |

## 3. Verificação

`npx expo start --web` + navegação real via Playwright (headless Chromium)
confirmaram que todas as telas novas/refinadas renderizam sem erros de
console, cobrindo Home, Check-in, Autocuidado, Chat, Anônimo, Identificada
e Calendário (para garantir que o `ScreenHeader`/`BottomTabBar`
compartilhados não quebraram telas existentes).
