var db = require('./../../config/db_config');

ready( function(){

  let idOnibus = sessionStorage.getItem('idOnibus');

  //Popula select tipo onibus
  db.query("SELECT * FROM tbl_tipoonibus" , function( error , results , fiedls){
    if( !error ){
        let select = document.getElementById('slt_tipo');
        for( var i = 0 ; i < results.length ; i++ ){
          var option = document.createElement("option");
          option.text = results[i].tipo;
          option.value = results[i].idTipoOnibus;
          select.add( option );
        }
    }
  });

  //Popula se UPDATE
  if( idOnibus != 0 ){

    document.getElementById('btn_ok').value = 'Salvar';
    let sql = "SELECT o.* , t.tipo FROM tbl_onibus as o\
              INNER JOIN tbl_tipoonibus as t\
              ON t.idTipoOnibus = o.idTipoOnibus\
              WHERE idOnibus = ? ";

    db.query( sql , [idOnibus], function( error , result , field){
      if( !error ){
        let onibus = result[0];
        document.getElementById('txt_numFab').value = onibus.numFabricacao;
        document.getElementById('txt_placa').value = onibus.placa;
        document.getElementById('txt_desc').value = onibus.descricao;

        let select = document.getElementById('slt_tipo');
        let tipo = onibus.idTipoOnibus;
        var opts = select.options;
        for (var opt, j = 0; opt = opts[j]; j++) {
          if (opt.value == tipo) {
            select.selectedIndex = j;
            break;
          }
        }
      }
    });

  }

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

      if( idOnibus != 0 ){
        updateOnibus( json , idOnibus );
      }else{
        addOnibus( json );
      }

    }else{
      alert("Você deixou dados em branco !");
    }

  });

});

function addOnibus( json ){

  let sql = "INSERT INTO tbl_onibus SET ?";

  db.query( sql , json , function( error , result , field ){

    if( !error ){
      window.location.href = "./onibus.html"; //Faz o redirecionamento
    }else{
      alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
    }

  });

}

function updateOnibus( json , idOnibus ){

  let sql = "UPDATE tbl_onibus SET ? WHERE idOnibus = ?";

  db.query( sql , [json , idOnibus] , function( error , result , field ){

    if( !error ){
      sessionStorage.setItem('idOnibus' , 0 );
      window.location.href = "./onibus.html"; //Faz o redirecionamento
    }else{
      alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
    }

  });

}
