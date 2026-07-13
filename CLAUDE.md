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
│   ├── meter-icon.png     ← ilustração do medidor de humor (HomeScreen)
│   ├── profile-icon.png
│   ├── neutral-icon.png
│   ├── anonimous-icon.png ← ícone do canal anônimo (tela ainda não implementada)
│   ├── identifed-icon.png ← ícone do canal identificado (tela ainda não implementada)
│   ├── gmail-logo.png
│   ├── apple-logo.png
│   └── microsoft-logo.png
├── screens/               ← uma tela por arquivo
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── AutocuidadoScreen.js
│   ├── CheckinDiarioScreen.js
│   ├── CalendarPageScreen.js
│   └── SchedulePageScreen.js
├── components/            ← componentes reutilizáveis
│   ├── Headers.js         ← AuthHeader (login/register) + ScreenHeader (telas internas)
│   └── BottomTabBar.js    ← barra de navegação inferior (Calendar, Chat, Home, Autocuidado, Profile)
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
| `textBrown`     | `#5C4632` | Texto de conteúdo (Autocuidado, Check-in)    |
| `textGray`      | `#7A7A7A` | Texto secundário, placeholders               |
| `moodNeutral`   | `#F2B33D` | Humor neutro (medidor)                       |
| `moodSad`       | `#D9772E` | Humor triste (medidor)                       |
| `moodHappy`     | `#7FAF5B` | Humor feliz (medidor)                        |
| `moodVeryBad`   | `#8B6BBF` | Humor muito ruim (extremo do medidor)        |

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
  ├── bottom bar: Chat        → Chat (placeholder vazio — tela não prototipada ainda)
  ├── bottom bar: Home        → Home
  ├── bottom bar: ♡           → Autocuidado
  └── bottom bar: Profile     → Profile (placeholder vazio — tela não prototipada ainda)

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

---

## 7. Telas Pendentes (protótipo ainda não recebido)

### ⏳ ChatScreen
- Canal de comunicação direto aluno → coordenação (RF06)
- Asset `identifed-icon.png` já disponível em `assets/`
- Rota criada como placeholder no AppNavigator

### ⏳ CanalAnonimoScreen
- Canal anônimo de apoio e denúncia (RF07)
- Asset `anonimous-icon.png` já disponível em `assets/`
- Não tem rota criada ainda (espera protótipo)

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
| RF06 | Canal de comunicação seguro aluno → coordenação             | ⏳ Protótipo pendente |
| RF07 | Canal anônimo de apoio e denúncia                           | ⏳ Protótipo pendente |
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
- [ ] Chat (canal identificado) — aguarda protótipo Figma
- [ ] Canal anônimo — aguarda protótipo Figma
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
