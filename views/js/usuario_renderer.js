var db = require('./../../config/db_config');
var Vue  = require('./../../vue.js');



db.query("SELECT * FROM tbl_usuariodesktop" , function( error , results , fields ){
  if(!error){
    new Vue ({
      el : '#dados',
      data :
      {
        usuarios : []
      },
      mounted : function(){
        this.usuarios = results;
      }
    });
  }
});
