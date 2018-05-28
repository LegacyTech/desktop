var db = require('./../../config/db_config');

ready( function(){

  document.querySelector('#btn_ok').addEventListener('click' , function(e){

    e.preventDefault();

    let numFab = document.getElementById('txt_numFab').value;
    let placa = document.getElementById('txt_placa').value;
    placa = placa.toUpperCase( placa );
    let descricao = document.getElementById('txt_desc').value;

    let select = document.getElementById('slt_tipo');
    let tipoOnibus = select.options[select.selectedIndex].value;

    if( numFab != "" && placa != "" && descricao != "" ){

      let json =
      {
        'placa' : placa,
        'idTipoOnibus' : tipoOnibus,
        'descricao' : descricao,
        'numFabricacao' : numFab,
        'ativo' : 1
      }

      let sql = "INSERT INTO tbl_onibus SET ?";

      db.query( sql , json , function( error , result , field ){

        if( !error ){
          window.location.href = "./onibus.html"; //Faz o redirecionamento
        }else{
          alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
        }

      });

    }else{
      alert("Você deixou dados em branco !");
    }

  });

});
