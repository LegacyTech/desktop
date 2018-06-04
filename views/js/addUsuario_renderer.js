var db = require('./../../config/db_config');
var md5 = require('md5');

ready( function(){

  var idUsuario = sessionStorage.getItem("idUsuario");

  if( idUsuario != 0 ){

    document.querySelector('#btn_ok').value = "Salvar";
    db.query("SELECT * FROM tbl_usuariodesktop WHERE idUsuario = ?" , [idUsuario], function(error , result, field){
      if( !error ){
        let user = result[0];
        document.querySelector('#txt_nome').value = user.nome;
        document.querySelector('#txt_sobrenome').value = user.sobrenome;
        document.querySelector('#txt_cpf').value = user.cpf;
        document.querySelector('#txt_email').value = user.email;
        document.querySelector('#label_senha').innerHTML = 'Nova Senha:';

        let select = document.getElementById('slt_setor');
        let tipo = user.nivel;
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

      senha = md5(senha);
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

      if( idUsuario != 0 ){
        updateUsuario( json , idUsuario );
      }else{
        addUsuario( json );
      }

    }else{

      if( teste == true )
        alert( "Você deixou dados em branco ! " );
      else
        alert( "CPF Inválido! " );
    }

  });
});

function addUsuario( json ){
  db.query( "INSERT INTO tbl_usuariodesktop SET ? " , json , function( error , result , fields ){

    if( !error ){
      window.location.href = "./usuario.html"; //Faz o redirecionamento
    }else{
      alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
    }

  });
}

function updateUsuario( json , idUsuario ){
  db.query( "UPDATE tbl_usuariodesktop SET ? WHERE idUsuario = ?" , [json , idUsuario] , function( error , result , fields ){

    if( !error ){
      window.location.href = "./usuario.html"; //Faz o redirecionamento
    }else{
      alert( "Erro ao inserir no banco de dados ! Contate o administrador. " );
    }

  });
}
