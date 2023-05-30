const express = require('express');

const db = require('./db.js');


const app = express();


const bodyParser = require('body-parser');

const path = require('path');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('css'));

// Rotas
    // Rota principal
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + "/html/index.html"));
    });


    app.get('/allTables', (req, res) => {
        res.sendFile(path.join(__dirname + "/html/allTables.html"));
    });

    // CRUD r
    app.get('/perfil', (req, res) => {
        db.all("SELECT * FROM tbl_perfil", (err, rows) => {
            if(err){
                res.status(400).json({"erro":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD R  sucesso!",
                "dados": rows
            });
        });
    });

    // CRUD c
    app.post('/perfil', (req, res) => {
        const { NOME, IDADE, CARGO, ENDERECO, TELEFONE, EMAIL, DESCRICAO } = req.body;
    
        db.run(`INSERT INTO tbl_perfil (NOME, IDADE, CARGO, ENDERECO, TELEFONE, EMAIL, DESCRICAO) VALUES (?, ?, ?, ?, ?, ?, ?)`, [NOME, IDADE, CARGO, ENDERECO, TELEFONE, EMAIL, DESCRICAO], function(err) {
        });
        res.redirect('/');
    });

    // CRUD u
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

    // CRUD d
    app.delete('/perfil/:id', (req, res) => {
        const id = req.params.id;
      
        db.run(`DELETE FROM tbl_perfil WHERE id = ?`, [id], function(err) {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Erro.');
          }
          console.log(`Perfil com id ${id} excluído.`);
          return res.status(204).send();
        });
    });
//

// SELECT
    //formacao
    app.get('/formacao', (req, res) => {
        db.all("SELECT * FROM tbl_formacao", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD R -> sucesso!",
                "dados": rows
            });
        });
    });

    // personalidade
    app.get('/personalidade', (req, res) => {
        db.all("SELECT * FROM tbl_personalidade", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD R!",
                "dados": rows
            });
        });
    });

    // habilidade
    app.get('/habilidades', (req, res) => {
        db.all("SELECT * FROM tbl_habilidades", (err, rows) => {
            if(err){
                res.status(400).json({"erro":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD R sucesso!",
                "dados": rows
            });
        });
    });

    //  experiência
    app.get('/experiencia', (req, res) => {
        db.all("SELECT * FROM tbl_experiencia", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD R sucesso!",
                "dados": rows
            });
        });
    });

    // realizações
    app.get('/realizacoes', (req, res) => {
        db.all("SELECT * FROM tbl_realizacoes", (err, rows) => {
            if(err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "mensagem":"CRUD R sucesso!",
                "dados": rows
            });
        });
    });

//

//server
app.listen(8081, function(){
    console.log("Servidor: http://localhost:8081");
});
