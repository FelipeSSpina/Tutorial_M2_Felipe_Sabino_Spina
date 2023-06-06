const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/db_curriculo.db';
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("./frontend"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Redirecionando para arquivos html
app.get('/currículo', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/index.html'));
})


// Retorna todos registros (é o R do CRUD - Read)
app.get('/listaPessoas', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM TblPessoas ORDER BY idPessoas';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/inserePessoas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO TblPessoas (NomePessoas, Cargo, Endereco, Telefone, Email, Descricao) VALUES ('" + req.body.nome + "', '" + req.body.cargo + "', '" + req.body.endereco +  "', '" + req.body.telefone + "', '" + req.body.email + "', '" + req.body.descricao + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaPessoas', (req, res) => {
	res.statusCode = 200;
	console.log(req.query);
	console.log(req.params);
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM TblPessoas WHERE idPessoas="+ req.query.id;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaPessoas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE TblPessoas SET NomePessoas='" + req.body.nome + "', Cargo='" + req.body.cargo + "', Endereco='" + req.body.endereco +  "', Telefone='" + req.body.telefone + "', Email='" + req.body.email + "', Descricao='" + req.body.descricao + "'WHERE idPessoas='" + req.body.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removePessoas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM TblPessoas WHERE idPessoas='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

// Select the formation of a person
app.get('/formacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	sql = "SELECT * FROM TblFormacao WHERE idPessoas='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
		db.close(); // Fecha o banco
	});
	
});

// Select the experience of a person
app.get('/experiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	sql = "SELECT * FROM TblExperiencia WHERE idPessoas='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
		db.close(); // Fecha o banco
	});
	
});

// Select the skills of a person
app.get('/habilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	sql = "SELECT * FROM TblHabilidades WHERE idPessoas='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
		db.close(); // Fecha o banco
	});
	
});

// Select the personality of a person
app.get('/personalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	sql = "SELECT * FROM TblPersonalidade WHERE idPessoas='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
		db.close(); // Fecha o banco
	});
	
});

// Select the realizations of a person
app.get('/realizacoes', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	sql = "SELECT * FROM TblRealizacoes WHERE idPessoas='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
		db.close(); // Fecha o banco
	});
	
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});