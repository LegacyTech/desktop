var id = sessionStorage.getItem('idFichaManutencao');
var db = require('./../../config/db_config'); //Importa o banco de dados

let sql = "SELECT o.placa , DATE_FORMAT(f.abertura , '%d/%m/%Y' ) as abertura, f.item\
          FROM tbl_fichamanutencao AS f\
          INNER JOIN tbl_onibus as o ON f.idOnibus = o.idOnibus WHERE f.idFichaManutencao = ?";

db.query( sql , [id] , function( error , result , field){
  if(!error){
    document.getElementById('onibus').innerHTML = result[0].placa;
    document.getElementById('abertura').innerHTML = result[0].abertura;
    document.getElementById('item').innerHTML = result[0].item;
  }
});

//Adiciona usuarios no banco de dados
document.querySelector('#btn_ok').addEventListener( 'click' , function(e){

  let valor = document.getElementById('txt_valor').value;
  let obs = document.getElementById('txt_obs').value;
  let km = document.getElementById('txt_km').value;

  if( valor != "" && km != "" ){

    db.query("UPDATE tbl_fichamanutencao SET valorGasto = ? , observacao = ?, fechamento = NOW() , finalizado = 1 WHERE idFichaManutencao = ?" ,
  [valor , obs, id] , function( error , resut , field){
    if( !error){
      window.location.href ="./manutencao.html";
    }
  });

  }else{
      alert("O valor e a quilometragem não podem estar em branco !");
  }

});
