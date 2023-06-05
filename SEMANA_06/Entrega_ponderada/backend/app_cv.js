const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/db_meu_curriculo.db';
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
app.use(express.static("./frontend"));
app.use(express.json());

app.get('/currículo', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/index.html'));
})


// Read
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

// Create
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

// Update
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

// Update
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

// Delete
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