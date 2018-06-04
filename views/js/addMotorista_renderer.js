var db = require('./../../config/db_config');

ready( function(){

  var idMotorista = sessionStorage.getItem("idMotorista");

  if( idMotorista != 0 ){

    document.querySelector('#btn_ok').value = "Salvar";

    db.query("SELECT m.* , DATE_FORMAT(dtNasc , '%Y-%m-%d') as dt FROM tbl_motorista as m WHERE idMotorista = ?" , [idMotorista], function( error , result, fields){
      if( !error ){
        var mot = result[0];
        document.querySelector('#txt_nome').value = mot.nome;
        document.querySelector('#txt_sobrenome').value = mot.sobreNome;
        document.querySelector('#txt_cpf').value = mot.CPF;
        document.querySelector('#txt_rg').value = mot.RG;
        document.querySelector('#txt_cnh').value = mot.CNH ;
        document.querySelector('#txt_dtNasc').value = mot.dt ;
        document.querySelector('#txt_telefone').value = mot.telefone ;
        document.querySelector('#txt_celular').value = mot.celular ;
        document.querySelector('#txt_email').value = mot.email ;
      }
    });
  }

  document.querySelector('#btn_ok').addEventListener('click' , function(e){

    e.preventDefault();
    let nome = document.querySelector('#txt_nome').value;
    let sobrenome = document.querySelector('#txt_sobrenome').value;
    let cpf = document.querySelector('#txt_cpf').value ;
    let rg = document.querySelector('#txt_rg').value ;
    let cnh = document.querySelector('#txt_cnh').value ;
    let dtNasc = document.querySelector('#txt_dtNasc').value ;
    let telefone = document.querySelector('#txt_telefone').value ;
    let celular = document.querySelector('#txt_celular').value ;
    let email = document.querySelector('#txt_email').value ;

    let json =
    {
      "nome" : nome ,
      "sobrenome" : sobrenome,
      "CPF" : cpf,
      "RG" : rg,
      "CNH" : cnh,
      "dtNasc" : dtNasc,
      "telefone" : telefone,
      "celular" : celular,
      "email" : email,
      "idEnd" : 1,
      "ativo" : 1
    }

    if( idMotorista != 0 ){
      updateMotorista( json , idMotorista );
    }else{
      addMotorista( json );
    }


  });

});

function addMotorista( json ){
  db.query("INSERT INTO tbl_motorista SET ?" , json , function( error , results , fields){
    if( !error ){
      window.location.href = "./motorista.html"; //Faz o redirecionamento
    }else{
      alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
    }
  });
}

function updateMotorista( json , idMotorista ){
  db.query("UPDATE tbl_motorista SET ? WHERE idMotorista = ?" , [json , idMotorista] , function( error , results , fields){
    if( !error ){
      window.location.href = "./motorista.html"; //Faz o redirecionamento
    }else{
      alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
    }
  });
}
