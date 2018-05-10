const mysql = require('mysql');//importando o modulo mysql

//variavel de conexao
var connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'bcd127',
  database: 'db_viacao_asteroide'
  
});

//Realiza a conexao e verifica se foi logado
connection.connect( function( err ){

  //Se !err foi logado com sucesso
    if( !err ){

      console.log("Conexão efetuada com sucesso");

    }else{

      console.log("Erro na conexão");
      console.log(err);

    }

});

module.exports = connection ; // Exporta a conexao
