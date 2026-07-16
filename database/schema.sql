-- Active: 1751945461934@@127.0.0.1@3306
DROP DATABASE IF EXISTS sistema_atendimento;
CREATE DATABASE sistema_atendimento;
USE sistema_atendimento;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('aluno', 'pedagogo') NOT NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- tabela 1 | rf01
CREATE TABLE Pedagogo (
    id_pedagogo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    tipo_pedagogo VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

-- tabela 2 | rf01
CREATE TABLE Alunos (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    ano_escolar VARCHAR(50),
    faixa_etaria VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

-- tabela 3 | rf08
CREATE TABLE Agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_pedagogo INT NOT NULL,
    data_horario DATETIME NOT NULL,
    motivo VARCHAR(255),
    FOREIGN KEY (id_aluno) REFERENCES Alunos(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_pedagogo) REFERENCES Pedagogo(id_pedagogo) ON DELETE CASCADE
);

-- tabela 4 | rf08
CREATE TABLE Status_Atendimento (
    id_atendimento INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL,
    id_pedagogo INT NOT NULL,
    resumo TEXT,
    data_realizacao DATETIME,
    status ENUM('pendente', 'confirmado', 'recusado') DEFAULT 'pendente',
    FOREIGN KEY (id_agendamento) REFERENCES Agendamento(id_agendamento) ON DELETE CASCADE,
    FOREIGN KEY (id_pedagogo) REFERENCES Pedagogo(id_pedagogo) ON DELETE CASCADE
);

-- tabela 5 | rf03
CREATE TABLE Checkin_Emocional (
    id_checkin INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    data_checkin DATETIME NOT NULL,
    humor_selecionado VARCHAR(100),
    texto_livre_opcional TEXT,
    FOREIGN KEY (id_aluno) REFERENCES Alunos(id_aluno) ON DELETE CASCADE
);

-- tabela 6 | rf05
CREATE TABLE Conteudos_Educativos (
    id_conteudo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tipo VARCHAR(50),
    descricao TEXT
);

-- tabela 7 | rf06
CREATE TABLE Mensagem_Identificada (
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_pedagogo INT,
    titulo VARCHAR(150),
    conteudo TEXT NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'lida', 'respondida') DEFAULT 'pendente',
    resposta TEXT,
    data_resposta DATETIME,
    FOREIGN KEY (id_aluno) REFERENCES Alunos(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_pedagogo) REFERENCES Pedagogo(id_pedagogo) ON DELETE SET NULL
);

-- tabela 8 | rf07
CREATE TABLE Mensagem_Anonima (
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    token_anonimo CHAR(36) NOT NULL UNIQUE,
    id_pedagogo INT,
    titulo VARCHAR(150),
    conteudo TEXT NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'em_analise', 'resolvido') DEFAULT 'pendente',
    FOREIGN KEY (id_pedagogo) REFERENCES Pedagogo(id_pedagogo) ON DELETE SET NULL
);

-- tabela 9 | rf09
CREATE TABLE Preferencia_Notificacao (
    id_preferencia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    lembrete_checkin BOOLEAN NOT NULL DEFAULT TRUE,
    mensagens BOOLEAN NOT NULL DEFAULT TRUE,
    agendamentos BOOLEAN NOT NULL DEFAULT TRUE,
    novos_conteudos BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);
