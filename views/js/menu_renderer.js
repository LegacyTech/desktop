ready( function(){

  var nivel = sessionStorage.getItem('nivel');

  document.querySelector('#btn_deslogar').addEventListener('click', function(e){

    e.preventDefault();//Não deixa a tela piscar

    let sair = confirm("Deseja realmente deslogar?");

    if( sair ){
      //Limpa a sessão
      sessionStorage.clear();
      window.location.href = "./../index.html"; //Faz o redirecionamento
    }

  });

  //Verifica nivel do usuario para manutencao
  document.querySelector('#btn_manutencao').addEventListener('click' , function(e){
    e.preventDefault();

    if( nivel == 1 || nivel == 0 ){
      window.location.href = "./manutencao.html";
    }else{
      alert("Você não possui permissão para acessar essa função!");
    }

  });

  //Verifica nivel do usuario para rh
  document.querySelector('#btn_rh').addEventListener('click' , function(e){
    e.preventDefault();

    if( nivel == 2 || nivel == 0 ){
      window.location.href = "./recursosHumanos.html";
    }else{
      alert("Você não possui permissão para acessar essa função");
    }

  });

  //Verifica nivel do usuario para manutencao
  document.querySelector('#btn_financeiro').addEventListener('click' , function(e){
    e.preventDefault();

    if( nivel == 3 || nivel == 0 ){
      window.location.href = "./financeiro.html";
    }else{
      alert("Você não possui permissão para acessar essa função");
    }

  });

});
