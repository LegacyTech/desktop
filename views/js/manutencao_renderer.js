var db = require('./../../config/db_config'); //Importa o banco de dados
var Vue  = require('./../../vue.js'); //Chama a biblioteca do vue.js

let sql = "SELECT \
            	tipo.tipo , o.placa , DATE_FORMAT(f.abertura , '%d/%m/%Y') as abertura\
            FROM\
            	tbl_fichamanutencao as f\
            INNER JOIN\
            	tbl_onibus AS o\
            ON\
            	o.idOnibus = f.idOnibus\
            INNER JOIN\
            	tbl_tipoonibus as tipo\
            ON\
            	o.idTipoOnibus = tipo.idTipoOnibus\
            WHERE\
            	f.finalizado = 0\
            ORDER BY f.abertura ASC";
db.query( sql  , function( error , results , fields){

  if( !error ){

       new Vue({
         el : '#dados',
         data :
         {
           fichas : []
         },
         mounted : function(){
           this.fichas = results;
         },
         methods :
         {
         }
       });

  }

});
