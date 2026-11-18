# EducaMente

App mobile de apoio à saúde mental de estudantes do Ensino Médio
(React Native + Expo SDK 58), com back-end em Node.js + MySQL.

**Repositório:** https://github.com/EnzoMoreiraa/EducamenteMobile

---

## Como rodar o projeto

### 1. Instalar os programas

| Programa | Versão | Observação |
|---|---|---|
| **Node.js** | **22 LTS** (22.13 ou mais nova) ou 24 | o Expo SDK 58 não roda em Node 20 ou anterior |
| **MySQL Server** | 8.x | anote a senha do usuário `root` definida na instalação |
| **MySQL Workbench** | opcional | facilita rodar o `schema.sql` |
| **Git** | opcional | só para clonar do GitHub |
| **Expo Go** (no celular) | versão da loja, **SDK 58** | Android: Play Store · iPhone: App Store |

Para conferir: `node -v`.

### 2. Obter o projeto

**Pelo ZIP:** extraia o arquivo e abra um terminal dentro da pasta extraída
(a que contém `package.json` e `App.js`).

**Pelo GitHub:**

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

Com o MySQL rodando, execute o arquivo `database/schema.sql`:

- **Workbench:** *File → Open SQL Script* → selecione o arquivo → raio ⚡ para executar
- **Terminal:** `mysql -u root -p < database/schema.sql`

Ele cria o banco `sistema_atendimento` com todas as tabelas.

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
cd ..
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

### 8. Subir o app (terminal 2, na raiz do projeto)

```bash
npx expo start -c
```

- **Celular:** abra o Expo Go e escaneie o QR code (Android pelo próprio Expo Go,
  iPhone pela câmera). Celular e computador precisam estar **na mesma rede Wi-Fi**.
- **Navegador:** aperte `w` no terminal ou acesse `http://localhost:8081`.

No terminal do Expo aparece `[EducaMente] API_URL = http://<ip>:3000`: é o
endereço que o app usa para falar com o back-end.

---

## Problemas comuns

| Sintoma | Causa / solução |
|---|---|
| "Project is incompatible with this version of Expo Go" | O Expo Go do celular não é SDK 58. Atualize o Expo Go pela loja |
| "Erro de conexão com o servidor" no login | Back-end parado, ou o celular não alcança o PC: confira a linha `API_URL` (não pode ser `localhost` no celular) e o firewall |
| Celular não abre o app / fica carregando | No Windows, a Wi-Fi costuma estar como rede **Pública**: libere o `node.exe` no firewall para redes públicas (portas 8081 e 3000) |
| `Erro ao conectar ao banco de dados` | MySQL parado ou senha errada em `backend/dbconfig.js` |
| `database exists` ao rodar o `schema.sql` | O banco já foi criado antes; não é preciso rodar de novo |
| `Cannot find module ...` | Dependências incompletas (às vezes por antivírus): rode `npm ci` de novo na raiz e em `backend/` |
| Erro estranho depois de instalar pacote | Reinicie com `npx expo start -c` (limpa o cache do Metro) |
| Porta 8081 em uso | Feche outros terminais com Expo rodando |

Para apontar o app para um servidor específico, preencha `IP_MANUAL` em
`services/api.js`.
