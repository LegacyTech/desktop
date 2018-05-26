var db = require('./../../config/db_config');

ready( function(){

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

    db.query("INSERT INTO tbl_motorista SET ?" , json , function( error , results , fields){
      if( !error ){
        window.location.href = "./motorista.html"; //Faz o redirecionamento
      }else{
        alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
      }
    });

  });

});
