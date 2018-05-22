var db = require('./../../config/db_config');
var Vue  = require('./../../vue.js');

db.query("SELECT u.* ,  n.nome as nomeNivel FROM tbl_usuariodesktop as u INNER JOIN tbl_niveldesktop as n ON u.nivel = n.idNivel" , function( error , results , fields ){
  if(!error){
    
    new Vue ({
      el : '#dados',
      data :
      {
        usuarios : [],
        showModal : false
      },
      mounted : function(){
        this.usuarios = results;
      },
      methods : {

        abrir( usuario ){
          window.location.href = "./addUsuario.html?id=" + usuario.idUsuario;
        },
        remover( index ){

          //Verifica se o usuario deseja realmente excluir
          let excluir = confirm("Deseja realmente excluir " + this.usuarios[index].nome + "?");

          //Somente se clicado em SIM
          if( excluir ){

            let sql = "DELETE FROM tbl_usuariodesktop WHERE idUsuario = ? ";

            //Executa a query
            db.query( sql , this.usuarios[index].idUsuario , function(){});

            //Tira da lista
            this.usuarios.splice( index , 1 );

          }
        }

      }
    });
  }
});
