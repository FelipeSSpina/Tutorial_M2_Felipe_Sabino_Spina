const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {

    console.log('Conexão estabelecida.')
    db.run(`CREATE TABLE IF NOT EXISTS tbl_perfil (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            NOME text, 
            IDADE integer, 
            CARGO text,
            ENDERECO text,
            TELEFONE integer,
            EMAIL text,
            DESCRICAO text)`,
      (err) => {
        if (err) {
          console.log('Errorr', err.message);
        } else {
          console.log('Success');
        }
    });



    db.run(`CREATE TABLE IF NOT EXISTS tbl_formacao (
            ID_CURSO INTEGER PRIMARY KEY AUTOINCREMENT,
            NOME_CURSO text, 
            DATA_INICIO integer, 
            DATA_FINAL text,
            INSTITUICAO text,
            DIPLOMA integer,
            ID_PERFIL integer,
            FOREIGN KEY ( ID_PERFIL ) REFERENCES tbl_perfil( ID ))`,
      (err) => {
        if (err) {
          console.log('Errorr', err.message);
        } else {
          console.log('Success');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS tbl_personalidade (
            ID_PERSONALIDADE INTEGER PRIMARY KEY AUTOINCREMENT,
            CRIATIVO integer, 
            DINAMICO integer, 
            LOGICO integer,
            ORGANIZADO integer,
            PROATIVO integer,
            ID_PERFIL integer,
            FOREIGN KEY ( ID_PERFIL ) REFERENCES tbl_perfil( ID ))`,
      (err) => {
        if (err) {
          console.log('Errorr', err.message);
        } else {
          console.log('Success');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS tbl_habilidades (
            ID_HABILIDADE INTEGER PRIMARY KEY AUTOINCREMENT,
            ILLUSTRATOR integer, 
            PHOTOSHOP integer, 
            COREL_DRAW integer,
            DREAMWEAVER integer,
            HTML5CSS3 integer,
            ID_PERFIL integer,
            FOREIGN KEY ( ID_PERFIL ) REFERENCES tbl_perfil( ID ))`,
      (err) => {
        if (err) {
          console.log('Errorr', err.message);
        } else {
          console.log('Success');
        }
    });


    db.run(`CREATE TABLE IF NOT EXISTS tbl_experiencia (
            ID_EMPRESA INTEGER PRIMARY KEY AUTOINCREMENT,
            NOME_EMPRESA integer, 
            DATA_INICIO integer, 
            DATA_FINAL integer,
            CARGO integer,
            ATRIBUICOES integer,
            RESULTADOS integer,
            PREFERENCIAS integer,
            ID_PERFIL integer,
            FOREIGN KEY ( ID_PERFIL ) REFERENCES tbl_perfil( ID ))`,
      (err) => {
        if (err) {
          console.log('Errorr', err.message);
        } else {
          console.log('Success');
        }
    });



    db.run(`CREATE TABLE IF NOT EXISTS tbl_realizacoes (
            ID_REALIZACAO INTEGER PRIMARY KEY AUTOINCREMENT,
            DATA_REALIZACOES integer, 
            NOME_REALIZACOES integer, 
            DESCRICAO integer,
            ID_PERFIL integer,
            FOREIGN KEY ( ID_PERFIL ) REFERENCES tbl_perfil( ID ))`,
      (err) => {
        if (err) {
          console.log('Errorr', err.message);
        } else {
          console.log('Success.');
        }
    });
  };
});

module.exports = db;