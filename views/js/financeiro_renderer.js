var db = require('./../../config/db_config'); //Importa o banco de dados
var Vue  = require('./../../vue.js'); //Chama a biblioteca do vue.js

let sql = "SELECT \
            	v.idViagem ,\
            	partida.nomePonto as saida,\
            	chegada.nomePonto as destino,\
            	count( p.idPassagem ) as compradas , \
            	count( p.idPassagem ) * v.valor as receita,\
            	DATE_FORMAT(v.dtPartida , '%d/%m/%Y') as data\
            FROM\
            	tbl_viagem as v\
            INNER JOIN\
            	tbl_passagem as p\
            ON\
            	p.idViagem = v.idViagem\
            INNER JOIN\
            	tbl_partida as partida\
            ON\
            	partida.idPontoPartida = v.idPontoPartida\
            INNER JOIN\
            	tbl_chegada as chegada\
            ON\
            	chegada.idPontoChegada = v.idPontoChegada\
            WHERE	\
            	v.finalizada = 1 AND MONTH(v.dtPartida) = MONTH(CURDATE()) AND YEAR(v.dtPartida) = YEAR(CURDATE())\
            GROUP BY \
            	v.idViagem\
            ORDER BY\
            	v.dtPartida \
            DESC";

db.query( sql  , function( error , results , fields){

  if( !error ){

       new Vue({
         el : '#dados',
         data :
         {
           viagens : []
         },
         mounted : function(){
           this.viagens = results;
         },
         methods :
         {
         }
       });

  }

});



let select_total = "SELECT sum(receita) as total\
                FROM(\
                  SELECT \
                  	count( p.idPassagem ) * v.valor as receita\
                  FROM\
                  	tbl_viagem as v\
                  INNER JOIN\
                  	tbl_passagem as p\
                  ON\
                  	p.idViagem = v.idViagem\
                  WHERE	\
                  	v.finalizada = 1 AND MONTH(v.dtPartida) = MONTH(CURDATE()) AND\
                    YEAR(v.dtPartida) = YEAR(CURDATE())\
                  GROUP BY \
                  	v.idViagem\
                ) as receitas;";

db.query( select_total , function(error , result , field) {
    if( !error ){
      document.getElementById('lucro').innerHTML = "Receitas neste mês : R$" + result[0].total;
    }
});
