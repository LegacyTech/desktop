function mask(e, id, mask){
  var tecla=(window.event)?event.keyCode:e.which;
  if((tecla>47 && tecla<58)){
      mascara(id, mask);
      return true;
  }
  else{
      if (tecla==8 || tecla==0){
          mascara(id, mask);
          return true;
      }
      else  return false;
  }
}

function maskText(e, id, mask){
  var tecla=(window.event)?event.keyCode:e.which;
  if((tecla!=8 && tecla!=0 && tecla != 45)){
      mascara(id, mask);
      return true;
  }
  else{
      if (tecla==8 || tecla==0){
          mascara(id, mask);
          return true;
      }
      else  return false;
  }
}

function mascara(id, mask){
    var i = id.value.length;
    var carac = mask.substring(i, i+1);
    var prox_char = mask.substring(i+1, i+2);
    if(i == 0 && carac != '#'){
        insereCaracter(id, carac);
        if(prox_char != '#')insereCaracter(id, prox_char);
    }
    else if(carac != '#'){
        insereCaracter(id, carac);
        if(prox_char != '#')insereCaracter(id, prox_char);
    }
    function insereCaracter(id, char){
        id.value += char;
    }
}

function ValidarCPF(Objcpf){
        var cpf = Objcpf.value;
        exp = /\.|\-/g
        cpf = cpf.toString().replace( exp, "" );
        var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
        var soma1=0, soma2=0;
        var vlr =11;

        for(i=0;i<9;i++){
                soma1+=eval(cpf.charAt(i)*(vlr-1));
                soma2+=eval(cpf.charAt(i)*vlr);
                vlr--;
        }
        soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
        soma2=(((soma2+(2*soma1))*10)%11);

        var digitoGerado=(soma1*10)+soma2;
        if(digitoGerado!=digitoDigitado)
                alert('CPF Invalido!');
}

function ValidarCPF2(cpf){
        exp = /\.|\-/g
        cpf = cpf.toString().replace( exp, "" );
        var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
        var soma1=0, soma2=0;
        var vlr =11;

        for(i=0;i<9;i++){
                soma1+=eval(cpf.charAt(i)*(vlr-1));
                soma2+=eval(cpf.charAt(i)*vlr);
                vlr--;
        }
        soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
        soma2=(((soma2+(2*soma1))*10)%11);

        var digitoGerado=(soma1*10)+soma2;
        if(digitoGerado!=digitoDigitado)
                return false;
        else
          return true;
}



// Função equivalente a $(document).ready(function)
function ready(fn){
  if( document.readyState != 'loading' ){

    fn();

  }else{

    document.addEventListener('DOMContentLoaded' , fn);

  }

}
