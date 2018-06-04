var db = require('./../../config/db_config'); //Importa o banco de dados
var Vue  = require('./../../vue.js'); //Chama a biblioteca do vue.js

let sql = "SELECT idMotorista, concat(nome , \" \" , sobrenome) as nome , CPF , celular FROM tbl_motorista WHERE ativo = 1";
db.query( sql  , function( error , results , fields){

  if( !error ){

       new Vue({
         el : '#dados',
         data :
         {
           motoristas : []
         },
         mounted : function(){
           this.motoristas = results;
         },
         methods :
         {
           editar(index){
             //Inicializa a sessão
             sessionStorage.setItem("idMotorista", this.motoristas[index].idMotorista);
             window.location.href ="./addMotorista.html";
           },
           remover( index ){

             //Verifica se o usuario deseja realmente excluir
             let excluir = confirm("Deseja realmente excluir " + this.motoristas[index].nome + "?");

             //Somente se clicado em SIM
             if( excluir ){

               //Executa a query
               db.query( "UPDATE tbl_motorista SET ativo = 0 WHERE idMotorista = ? " , this.motoristas[index].idMotorista , function(){

               });

               //Tira da lista
               this.motoristas.splice( index , 1 );

             }

           }
         }
       });

  }

});
