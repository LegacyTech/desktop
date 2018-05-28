var db = require('./../../config/db_config');

ready( function(){

  document.querySelector('#btn_ok').addEventListener('click' , function(e){

    e.preventDefault();

    let item = document.getElementById('txt_item').value;
    let descricao = document.getElementById('txt_desc').value;
    let intervalo = document.getElementById('txt_intervalo').value;

    if( item != "" && descricao != "" && intervalo != "" ){

      let json =
      {
        'item' : item,
        'descricao' : descricao,
        'intervalo' : intervalo,
        'ativo' : 1
      }

      let sql = "INSERT INTO tbl_item SET ?";

      db.query( sql , json , function( error , result , field ){

        if( !error ){
          window.location.href = "./itens.html"; //Faz o redirecionamento
        }else{
          alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
        }

      });

    }else{
      alert("Você deixou dados em branco !");
    }

  });

});
