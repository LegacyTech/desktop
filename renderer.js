// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const db = require('./config/db_config.js');

ready( function(){

  //Botão de login
  document.querySelector('#btn_login').addEventListener('click', function(e){

    e.preventDefault();//Não deixa a tela piscar

    //Captura as inputs
    let cpf = document.querySelector('#txt_login').value;
    let senha = document.querySelector('#txt_password').value;

    autentica(cpf , senha); //Chama função de autenticação

  });

});

//Função que autentica usuarios
function autentica( cpf , senha ){

  let sql = "SELECT * FROM tbl_usuariodesktop WHERE cpf = ? AND senha = MD5(?) AND ativo = 1 " ;

  //Realiza o select
  db.query( sql , [cpf,senha] , function(error , result , fields){

    //Se entrar aqui, logou
    if( !error && result.length > 0 ){

      //Inicializa a sessão
      sessionStorage.setItem("idUsuario", result[0].idUsuario);
      sessionStorage.setItem("nivel" , result[0].nivel);
      sessionStorage.setItem('filtroMes' , 1);

      window.location.href = "./views/menu.html"; //Faz o redirecionamento

    }else{

      alert("CPF ou Senha Incorretos !");

    }

  });

}
