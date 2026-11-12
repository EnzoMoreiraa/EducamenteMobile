const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const conexao = require('./dbconfig');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const {nome, sobrenome, email, senha, tipo_usuario} = req.body;

    // Campos opcionais: o mysql2 recusa parâmetros undefined, então tudo que o
    // formulário ainda não envia precisa virar NULL antes de chegar na query
    const ano_escolar = req.body.ano_escolar ?? null;
    const faixa_etaria = req.body.faixa_etaria ?? null;
    const tipo_pedagogo = req.body.tipo_pedagogo ?? null;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = `INSERT INTO Usuario
    (nome, sobrenome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?, ?)`;

    conexao.query(
        sql,
        [nome, sobrenome, email, senhaCriptografada, tipo_usuario],
        (erro, resultado) => {
            if (erro) {
                if (erro.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        mensagem: 'Já existe uma conta com esse e-mail',
                    });
                }
                console.log(erro)
                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar usuário',
                });
            }

            const id_usuario = resultado.insertId;

            if (tipo_usuario === 'aluno') {
                const sqlAluno = `INSERT INTO Alunos
                (id_usuario, ano_escolar, faixa_etaria) VALUES (?, ?, ?)`;

                conexao.query(sqlAluno, [id_usuario, ano_escolar, faixa_etaria], (erro) => {
                    if (erro) {
                        console.log(erro)
                        return res.status(500).json({
                            mensagem: 'Erro ao cadastrar aluno',
                        });
                    }
                    res.json({
                        mensagem: 'Usuário cadastrado com sucesso',
                        id_usuario,
                    });
                });
            } else {
                const sqlPedagogo = `INSERT INTO Pedagogo
                (id_usuario, tipo_pedagogo) VALUES (?, ?)`;

                conexao.query(sqlPedagogo, [id_usuario, tipo_pedagogo], (erro) => {
                    if (erro) {
                        console.log(erro)
                        return res.status(500).json({
                            mensagem: 'Erro ao cadastrar pedagogo',
                        });
                    }
                    res.json({
                        mensagem: 'Usuário cadastrado com sucesso',
                        id_usuario,
                    });
                });
            }
        }
    )
});


// Lista usuários
app.get('/usuarios', (req, res) => {
    const sql = `SELECT Usuario.id_usuario, Usuario.nome, Usuario.sobrenome, Usuario.email,
    Usuario.tipo_usuario, Usuario.data_cadastro, Alunos.ano_escolar, Alunos.faixa_etaria,
    Pedagogo.tipo_pedagogo
    FROM Usuario
    LEFT JOIN Alunos ON Alunos.id_usuario = Usuario.id_usuario
    LEFT JOIN Pedagogo ON Pedagogo.id_usuario = Usuario.id_usuario`;

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json({
                mensagem: 'Erro ao buscar usuários',
            });
        }
        res.json(resultado);
    })
});

app.get('/usuarios/:id', (req, res) => {
    const {id} = req.params;

    const sql = `SELECT Usuario.id_usuario, Usuario.nome, Usuario.sobrenome, Usuario.email,
    Usuario.tipo_usuario, Usuario.data_cadastro, Alunos.ano_escolar, Alunos.faixa_etaria,
    Pedagogo.tipo_pedagogo
    FROM Usuario
    LEFT JOIN Alunos ON Alunos.id_usuario = Usuario.id_usuario
    LEFT JOIN Pedagogo ON Pedagogo.id_usuario = Usuario.id_usuario
    WHERE Usuario.id_usuario = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json({
                mensagem: 'Erro ao buscar usuário',
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado',
            });
        }

        res.json(resultado[0]);
    })
});


// Atualiza os dados do usuário
app.put('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const {nome, sobrenome, email, ano_escolar, faixa_etaria, tipo_pedagogo} = req.body;

    const sql = `UPDATE Usuario SET nome = ?, sobrenome = ?, email = ? WHERE id_usuario = ?`;

    conexao.query(sql, [nome, sobrenome, email, id], (erro) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json({
                mensagem: 'Erro ao atualizar usuário',
            });
        }

        if (ano_escolar !== undefined || faixa_etaria !== undefined) {
            conexao.query(
                `UPDATE Alunos SET ano_escolar = ?, faixa_etaria = ? WHERE id_usuario = ?`,
                [ano_escolar ?? null, faixa_etaria ?? null, id],
                (erro) => {
                    if (erro) console.log(erro)
                }
            );
        }

        if (tipo_pedagogo !== undefined) {
            conexao.query(
                `UPDATE Pedagogo SET tipo_pedagogo = ? WHERE id_usuario = ?`,
                [tipo_pedagogo, id],
                (erro) => {
                    if (erro) console.log(erro)
                }
            );
        }

        res.json({
            mensagem: 'Usuário atualizado com sucesso',
        });
    });
});


// Exclui a conta (exige a senha correta)
app.delete('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const {senha} = req.body;

    const sql = `SELECT senha FROM Usuario WHERE id_usuario = ?`;

    conexao.query(sql, [id], async (erro, resultado) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json({
                mensagem: 'Erro ao buscar usuário',
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado',
            });
        }

        const senhaCorreta = await bcrypt.compare(senha ?? '', resultado[0].senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: 'Senha incorreta',
            });
        }

        conexao.query(`DELETE FROM Usuario WHERE id_usuario = ?`, [id], (erro) => {
            if (erro) {
                console.log(erro)
                return res.status(500).json({
                    mensagem: 'Erro ao excluir usuário',
                });
            }

            res.json({
                mensagem: 'Conta excluída com sucesso',
            });
        });
    });
});


app.post('/login', (req, res) => {
    const {email, senha} = req.body;

    const sql = `SELECT * FROM Usuario WHERE email = ?`;

    conexao.query(sql, [email], async (erro, resultado) => {
        if (erro) {
            console.log(erro)
            return res.status(500).json({
                mensagem: 'Erro ao buscar usuário',
            });
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha incorretos',
            });
        }

        const usuario = resultado[0];
        const senhaCorreta = await bcrypt.compare(senha ?? '', usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha incorretos',
            });
        }

        delete usuario.senha;
        res.json({
            mensagem: 'Login bem-sucedido',
            usuario,
        });
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
