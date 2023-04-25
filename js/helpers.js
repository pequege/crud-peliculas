function validarCantidadCaracteres(texto, min, max){
    if(texto.length >= min && texto.length <= max){
        return true;
    }else{
        return false;
    }
}

export function resumenValidacion(titulo){
    let resumen = '';
    if(!validarCantidadCaracteres(titulo, 2, 100)){
        resumen = 'El título debe contener entre 2 y 100 caracteres.'
    };
    return resumen;
}