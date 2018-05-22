var db = require('./../../config/db_config');

ready( function(){

  //Adiciona usuarios no banco de dados
  document.querySelector('#btn_ok').addEventListener( 'click' , function(e){

    let nome = document.querySelector('#txt_nome').value;
    let sobrenome = document.querySelector('#txt_sobrenome').value;
    let cpf = document.querySelector('#txt_cpf').value ;
    let email = document.querySelector('#txt_email').value ;
    let senha = document.querySelector('#txt_senha').value;

    let select = document.getElementById('slt_setor');
    let nivel = select.options[select.selectedIndex].value;

    if( nome != "" && sobrenome != "" && cpf != "" && email != "" && senha != "" ){

      let json =
      {
        'nome' : nome,
        'sobrenome' : sobrenome,
        'cpf' : cpf,
        'email' : email,
        'senha' : senha,
        'nivel' : nivel,
        'ativo' : 1
      };

      db.query( "INSERT INTO tbl_usuariodesktop SET ? " , json , function( error , result , fields ){

        if( !error ){
          window.location.href = "./usuario.html"; //Faz o redirecionamento
        }else{
          alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
        }

      });

    }else{

      alert( "Você deixou dados em branco ! " );

    }




  });
});
