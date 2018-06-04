var db = require('./../../config/db_config'); //Importa o banco de dados
var Vue  = require('./../../vue.js'); //Chama a biblioteca do vue.js

let sql = "SELECT o.idOnibus , o.placa, t.qntLugares, t.tipo FROM tbl_onibus as o\
          INNER JOIN tbl_tipoonibus as t ON o.idTipoOnibus = t.idTipoOnibus WHERE o.ativo = 1\
          ORDER BY t.tipo ASC;";
db.query( sql  , function( error , results , fields){

  if( !error ){

       new Vue({
         el : '#dados',
         data :
         {
           frota : []
         },
         mounted : function(){
           this.frota = results;
         },
         methods :
         {
           editar(index){
             //Inicializa a sessão
             sessionStorage.setItem("idOnibus", this.frota[index].idOnibus);
             window.location.href ="./addOnibus.html";
           },
           remover( index ){

             //Verifica se o usuario deseja realmente excluir
             let excluir = confirm("Deseja realmente excluir " + this.frota[index].placa + "?");

             //Somente se clicado em SIM
             if( excluir ){

               //Executa a query
               db.query( "UPDATE tbl_onibus SET ativo = 0 WHERE idOnibus = ? " , this.frota[index].idOnibus , function(){

               });

               //Tira da lista
               this.frota.splice( index , 1 );

             }

           }
         }
       });

  }

});
