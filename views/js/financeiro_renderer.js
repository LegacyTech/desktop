var db = require('./../../config/db_config'); //Importa o banco de dados
var Vue  = require('./../../vue.js'); //Chama a biblioteca do vue.js

var mes = sessionStorage.getItem('filtroMes');
let select = document.getElementById('select_mes');
var opts = select.options;
for (var opt, j = 0; opt = opts[j]; j++) {
  if (opt.value == mes) {
    select.selectedIndex = j;
    break;
  }
}

var inst_vue;


document.querySelector('#select_mes').addEventListener( 'change' , function(e){
  let select = document.getElementById('select_mes');
  var mes = select.options[select.selectedIndex].value;
  sessionStorage.setItem('filtroMes' , mes);
  window.location.href ="./financeiro.html";
});

popularLista( mes );

function popularLista( mes ){

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
              	v.finalizada = 1 AND MONTH(v.dtPartida) = ? AND YEAR(v.dtPartida) = YEAR(CURDATE())\
              GROUP BY \
              	v.idViagem\
              ORDER BY\
              	v.dtPartida \
              DESC";

  db.query( sql , [mes], function( error , results , fields){
    if( !error ){

         inst_vue = new Vue({
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

}




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
                  	v.finalizada = 1 AND MONTH(v.dtPartida) = ? AND\
                    YEAR(v.dtPartida) = YEAR(CURDATE())\
                  GROUP BY \
                  	v.idViagem\
                ) as receitas;";

db.query( select_total , [mes] , function(error , result , field) {
    if( !error ){
      let total = result[0].total;
      if(  total == null ){
        total = " Sem resultados neste mês";
      }else{
        total = "Receitas neste mês : <span style='color:#009900;'>R$" + total +"</span>";
      }
      document.getElementById('lucro').innerHTML = total;
    }
});
