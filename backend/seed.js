// Cria (ou atualiza) um usuário de cada tipo pra testar o login sem precisar
// cadastrar na mão: um aluno e um pedagogo.
//
// Uso: cd backend && node seed.js
//
// É idempotente — rodar de novo só atualiza a senha e os dados dos dois.

const bcrypt = require('bcrypt');
const conexao = require('./dbconfig');

const USUARIOS = [
    {
        nome: 'Enzo',
        sobrenome: 'Moreira',
        email: 'aluno@educamente.com',
        senha: 'aluno123',
        tipo_usuario: 'aluno',
        ano_escolar: '3º ano',
        faixa_etaria: '17 anos',
    },
    {
        nome: 'Rafaella',
        sobrenome: 'Egues',
        email: 'pedagogo@educamente.com',
        senha: 'pedagogo123',
        tipo_usuario: 'pedagogo',
        tipo_pedagogo: 'Coordenação pedagógica',
    },
];

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        conexao.query(sql, params, (erro, resultado) => {
            if (erro) reject(erro);
            else resolve(resultado);
        });
    });
}

async function semear(usuario) {
    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

    const existentes = await query('SELECT id_usuario FROM Usuario WHERE email = ?', [
        usuario.email,
    ]);

    let idUsuario;

    if (existentes.length > 0) {
        idUsuario = existentes[0].id_usuario;
        await query(
            'UPDATE Usuario SET nome = ?, sobrenome = ?, senha = ?, tipo_usuario = ? WHERE id_usuario = ?',
            [usuario.nome, usuario.sobrenome, senhaCriptografada, usuario.tipo_usuario, idUsuario]
        );
    } else {
        const resultado = await query(
            'INSERT INTO Usuario (nome, sobrenome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?, ?)',
            [
                usuario.nome,
                usuario.sobrenome,
                usuario.email,
                senhaCriptografada,
                usuario.tipo_usuario,
            ]
        );
        idUsuario = resultado.insertId;
    }

    if (usuario.tipo_usuario === 'aluno') {
        const aluno = await query('SELECT id_aluno FROM Alunos WHERE id_usuario = ?', [idUsuario]);
        if (aluno.length > 0) {
            await query('UPDATE Alunos SET ano_escolar = ?, faixa_etaria = ? WHERE id_usuario = ?', [
                usuario.ano_escolar,
                usuario.faixa_etaria,
                idUsuario,
            ]);
        } else {
            await query(
                'INSERT INTO Alunos (id_usuario, ano_escolar, faixa_etaria) VALUES (?, ?, ?)',
                [idUsuario, usuario.ano_escolar, usuario.faixa_etaria]
            );
        }
    } else {
        const pedagogo = await query('SELECT id_pedagogo FROM Pedagogo WHERE id_usuario = ?', [
            idUsuario,
        ]);
        if (pedagogo.length > 0) {
            await query('UPDATE Pedagogo SET tipo_pedagogo = ? WHERE id_usuario = ?', [
                usuario.tipo_pedagogo,
                idUsuario,
            ]);
        } else {
            await query('INSERT INTO Pedagogo (id_usuario, tipo_pedagogo) VALUES (?, ?)', [
                idUsuario,
                usuario.tipo_pedagogo,
            ]);
        }
    }

    console.log(
        `${usuario.tipo_usuario.padEnd(8)} id=${idUsuario}  ${usuario.email}  senha: ${usuario.senha}`
    );
}

(async () => {
    try {
        for (const usuario of USUARIOS) {
            await semear(usuario);
        }
        console.log('\nUsuários de teste prontos.');
    } catch (erro) {
        console.error('Erro ao semear usuários:', erro.message);
        process.exitCode = 1;
    } finally {
        conexao.end();
    }
})();
