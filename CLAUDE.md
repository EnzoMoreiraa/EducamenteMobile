# EducaMente

App mobile (React Native + Expo SDK 58) de apoio à saúde mental de estudantes,
com back-end em Node.js + MySQL.

---

## Como rodar o projeto em uma máquina nova

### 1. Instalar os programas

| Programa | Versão | Observação |
|---|---|---|
| **Git** | qualquer recente | para clonar o repositório |
| **Node.js** | **22 LTS** (22.13 ou mais nova) ou 24 | o Expo SDK 58 não roda em Node 20 ou anterior |
| **MySQL Server** | 8.x | anote a senha do usuário `root` definida na instalação |
| **MySQL Workbench** | opcional | facilita rodar o `schema.sql` |
| **Expo Go** (no celular) | versão da loja, **SDK 58** | Android: Play Store · iPhone: App Store |

Para conferir: `node -v` e `git --version`.

### 2. Clonar o repositório

```bash
git clone https://github.com/EnzoMoreiraa/EducamenteMobile.git
cd EducamenteMobile
```

### 3. Instalar as dependências

São **duas** instalações: uma na raiz (app) e outra em `backend/` (API).

```bash
npm ci --legacy-peer-deps
cd backend
npm ci
cd ..
```

> Use `npm ci` (e não `npm install`): ele instala exatamente as versões do
> `package-lock.json`.

### 4. Criar o banco de dados

1. Com o MySQL rodando, execute o arquivo `database/schema.sql`
   (no Workbench: *File → Open SQL Script* → raio ⚡ para executar;
   ou no terminal: `mysql -u root -p < database/schema.sql`).
2. Ele cria o banco `sistema_atendimento` com todas as tabelas.

> ⚠️ O `schema.sql` começa com `DROP DATABASE IF EXISTS` — rodar de novo **apaga
> todos os dados** do banco.

### 5. Configurar a conexão com o banco

Abra `backend/dbconfig.js` e confira usuário e senha do MySQL:

```js
host: 'localhost',
user: 'root',
password: 'root',          // ← troque pela senha do root desta máquina
database: 'sistema_atendimento'
```

### 6. Criar os usuários de teste

```bash
cd backend
node seed.js
```

Pode rodar quantas vezes quiser (não duplica). Cria:

| Perfil | E-mail | Senha |
|---|---|---|
| Aluno | `aluno@educamente.com` | `aluno123` |
| Pedagogo | `pedagogo@educamente.com` | `pedagogo123` |

### 7. Subir o back-end (terminal 1)

```bash
cd backend
node server.js
```

Deve aparecer `Servidor rodando na porta 3000` e
`Conexão bem-sucedida ao banco de dados.` Deixe esse terminal aberto.

### 8. Subir o app (terminal 2, na raiz)

```bash
npx expo start -c
```

- **Celular:** abra o Expo Go e escaneie o QR code (Android pelo próprio Expo Go,
  iPhone pela câmera). Celular e computador **na mesma rede Wi-Fi**.
- **Navegador:** aperte `w` no terminal ou acesse `http://localhost:8081`.

No terminal do Expo aparece `[EducaMente] API_URL = http://<ip>:3000`. Esse é o
endereço que o app usa para falar com o back-end.

### Problemas comuns

| Sintoma | Causa / solução |
|---|---|
| "Project is incompatible with this version of Expo Go" | O Expo Go do celular não é SDK 58. Atualize o Expo Go pela loja |
| "Erro de conexão com o servidor" no login | Back-end parado, ou o celular não alcança o PC: confira a linha `API_URL` (não pode ser `localhost` no celular) e o firewall |
| Celular não abre nem o QR / fica carregando | No Windows, a Wi-Fi costuma estar como rede **Pública**: libere o `node.exe` no firewall para redes públicas (portas 8081 e 3000) |
| `Erro ao conectar ao banco de dados` | MySQL parado ou senha errada em `backend/dbconfig.js` |
| `Cannot find module ...` ou arquivos sumindo | Antivírus apagando arquivos: adicione a pasta do projeto às exclusões e rode `npm ci` de novo (raiz e `backend/`) |
| Erro estranho depois de instalar pacote | Reinicie com `npx expo start -c` (limpa o cache do Metro) |
| Porta 8081 em uso | Feche outros terminais com Expo rodando |

Para apontar o app para um servidor específico, preencha `IP_MANUAL` em
`services/api.js`.

---

## Convenções do código

- **Uma tela por arquivo** em `screens/`; componentes reutilizáveis em `components/`.
- **Cores, espaçamentos, toque e sombras** sempre de `styles/theme.js`
  (`COLORS`, `SPACING`, `SIZES`, `TOUCH`, `SHADOW`) — nada de valores soltos.
- **Ícones** só do `components/IconSet.js` (SVG). Nada de PNG para ícone nem emoji.
- **Áreas tocáveis** usam `components/PressableScale.js`, com alvo mínimo `TOUCH.min` (44pt).
- **Toda tela** fica dentro de `SafeAreaView` (`react-native-safe-area-context`).
- **Rotas** estão em `navigation/AppNavigator.js`; navegar com `navigation.navigate("Nome")`.
- **Sem comentários** no código.
- **Nunca** criar `package.json`, `.git` ou `node_modules` em subpastas além de `backend/`.
- **Commits** são feitos só pelo dono do repositório — não commitar; lembrar de commitar.
