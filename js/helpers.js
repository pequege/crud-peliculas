const fechaActual = new Date(),
anioActual = fechaActual.getFullYear(),
regexImagenURL = /(https?:\/\/.*\.(?:png|jpg))/i,
regexActores = /^([\w\s-]+,)*[\w\s-]+$/;
const generos = ['Acción', 'Animación', 'Aventura', 'Comedia', 'Documental', 'Drama', 'Familiar',
'Fantasía', 'Historia', 'Horror', 'Misterio', 'Música', 'Romance', 'Ciencia ficción', 'Terror',
'Suspenso', 'Bélico', 'Western'];

function validarCantidadCaracteres(texto, min, max){
    if(texto.length >= min && texto.length <= max){
        return true;
    }else{
        return false;
    }
}

function validadDuracion(duracion){
    return parseInt(duracion) >= 60 && parseInt(duracion) <= 240;
}

function validadAnio(anio){
    return parseInt(anio) >= 1990 && parseInt(anio) <= (anioActual + 1);
}

function validarUrlImagenes(imagen){
    return regexImagenURL.test(imagen);
}

function validarActores(reparto){
    return regexActores.test(reparto);
}

function validarGenero(genero){
    return (genero.length > 0 && generos.includes(genero));
}

export function resumenValidacion(titulo, descripcion, imagen, genero, duracion, anio, pais,reparto){
    let resumen = '';
    if(!validarCantidadCaracteres(titulo, 2, 100)){
        resumen += 'El <strong>título</strong> debe contener entre 2 y 100 caracteres.<br>';
    };
    if(!validarCantidadCaracteres(descripcion, 10, 200)){
        resumen += 'La <strong>descripción</strong> debe contener entre 10 y 100 caracteres.<br>';
    }
    if(!validarCantidadCaracteres(imagen, 10, 100)){
        resumen += 'La <strong>URL de imagen</strong> debe contener entre 10 y 100 caracteres.<br>';
    }
    if(!validadDuracion(duracion)){
        resumen += 'La <strong>duración</strong> debe ser entre 60 y 240 minutos.<br>';
    }
    if(!validadAnio(anio)){
        resumen += `El <strong>año</strong> debe estar entre 1990 y ${anioActual + 1}.<br>`;
    }
    if(!validarCantidadCaracteres(pais, 4, 60)){
        resumen += 'El <strong>título</strong> debe contener entre 4 y 60 caracteres.<br>';
    };
    if(!validarUrlImagenes(imagen)){
        resumen += 'El formato de la URL de la imagen no es admitido.<br>'
    }
    if(!validarActores(reparto)){
        resumen += 'El formato del reparto no es admitido.<br>'
    }
    if(!validarGenero(genero)){
        resumen += 'Seleccione un género'
    }
    return resumen;
}