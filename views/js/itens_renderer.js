var db = require('./../../config/db_config'); //Importa o banco de dados
var Vue  = require('./../../vue.js'); //Chama a biblioteca do vue.js

let sql = "SELECT * FROM tbl_item WHERE ativo = 1";
db.query( sql  , function( error , results , fields){

  if( !error ){

       new Vue({
         el : '#dados',
         data :
         {
           itens : []
         },
         mounted : function(){
           this.itens = results;
         },
         methods :
         {
           remover( index ){

             //Verifica se o usuario deseja realmente excluir
             let excluir = confirm("Deseja realmente excluir " + this.itens[index].item + "?");

             //Somente se clicado em SIM
             if( excluir ){

               //Executa a query
               db.query( "UPDATE tbl_item SET ativo = 0 WHERE idItem = ? " , this.itens[index].idItem , function(){

               });

               //Tira da lista
               this.itens.splice( index , 1 );

             }

           }
         }
       });

  }

});
