ready( function(){

  document.querySelector('#btn_deslogar').addEventListener('click', function(e){

    e.preventDefault();//Não deixa a tela piscar

    let sair = confirm("Deseja realmente deslogar?");

    if( sair ){
      //Limpa a sessão
      sessionStorage.clear();
      window.location.href = "./../index.html"; //Faz o redirecionamento
    }

  });

});
