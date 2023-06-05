const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('css'));
app.use(express.static('js'));

// Rotas
    // Rota principal
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + "/html/index.html"));
    });

    // Rota para a página que mostra todas as tabelas presentes na página
    app.get('/allTables', (req, res) => {
        res.sendFile(path.join(__dirname + "/html/allTables.html"));
    });

    // CRUD -> R
    app.get('/perfil', (req, res) => {
        db.all("SELECT * FROM tbl_perfil", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD (R) -> Feito com sucesso!",
                "dados": rows
            });
        });
    });

    // CRUD -> C
    app.post('/perfil', (req, res) => {
        const { NOME, IDADE, CARGO, ENDERECO, TELEFONE, EMAIL, DESCRICAO } = req.body;
    
        db.run(`INSERT INTO tbl_perfil (NOME, IDADE, CARGO, ENDERECO, TELEFONE, EMAIL, DESCRICAO) VALUES (?, ?, ?, ?, ?, ?, ?)`, [NOME, IDADE, CARGO, ENDERECO, TELEFONE, EMAIL, DESCRICAO], function(err) {
        });
        res.redirect('/');
    });

    // CRUD -> U
    app.get('/editPerfil', (req, res) => {
        res.sendFile(path.join(__dirname + "/html/editPerfil.html"));
    });

    app.get('/editPerfil/updateValues', (req, res) => {
        const ID = req.query.ID;
        const NOME = req.query.NOME;
        const IDADE = req.query.IDADE;
        const CARGO = req.query.CARGO;
        const ENDERECO = req.query.ENDERECO;
        const TELEFONE = req.query.TELEFONE;
        const EMAIL = req.query.EMAIL;
        const DESCRICAO = req.query.DESCRICAO;

        db.run('UPDATE tbl_perfil SET NOME = ?, IDADE = ?, CARGO = ?, ENDERECO = ?, TELEFONE = ?, EMAIL = ?, DESCRICAO = ? WHERE ID = ?', [
            NOME,
            IDADE,
            CARGO,
            ENDERECO,
            TELEFONE,
            EMAIL,
            DESCRICAO,
            ID
        ]);

        res.redirect('/');
    });

    // CRUD -> D
    app.delete('/perfil/:id', (req, res) => {
        const id = req.params.id;
      
        db.run(`DELETE FROM tbl_perfil WHERE id = ?`, [id], function(err) {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao excluir perfil.');
          }
          console.log(`Perfil com id ${id} excluído com sucesso.`);
          return res.status(204).send();
        });
    });
//

// SELECTS das outras tabelas
    // Tabela formação
    app.get('/formacao', (req, res) => {
        db.all("SELECT * FROM tbl_formacao", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD (R) -> Feito com sucesso!",
                "dados": rows
            });
        });
    });

    // Tabela personalidade
    app.get('/personalidade', (req, res) => {
        db.all("SELECT * FROM tbl_personalidade", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD (R) -> Feito com sucesso!",
                "dados": rows
            });
        });
    });

    // Tabela habilidade
    app.get('/habilidades', (req, res) => {
        db.all("SELECT * FROM tbl_habilidades", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD (R) -> Feito com sucesso!",
                "dados": rows
            });
        });
    });

    // Tabela experiência
    app.get('/experiencia', (req, res) => {
        db.all("SELECT * FROM tbl_experiencia", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD (R) -> Feito com sucesso!",
                "dados": rows
            });
        });
    });

    // Tabela realizações
    app.get('/realizacoes', (req, res) => {
        db.all("SELECT * FROM tbl_realizacoes", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD (R) -> Feito com sucesso!",
                "dados": rows
            });
        });
    });

//

// Escutando servidor
app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});
