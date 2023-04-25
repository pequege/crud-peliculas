import Pelicula from "./classPelicula.js";
import { resumenValidacion } from "./helpers.js";

//variables globales
let formularioPelicula = document.getElementById('form-pelicula');
let modalPelicula = new bootstrap.Modal(document.getElementById('modalPelicula'));
const btnCrearPelicula = document.getElementById('btnCrearPelicula');

//manejadores de eventos
formularioPelicula.addEventListener('submit', prepararFormularioPeliculas);
btnCrearPelicula.addEventListener('click', mostrarModalPelicula)
let listaPeliculas = [];
let codigo = document.getElementById('inputCodigo'),
titulo = document.getElementById('inputTitulo'),
descripcion = document.getElementById('textareaDescripcion'),
imagen = document.getElementById('inputImagen'),
genero = document.getElementById('inputGenero'),
duracion = document.getElementById('inputDuracion'),
Pais = document.getElementById('inputPais'),
reparto = document.getElementById('inputReparto'),
alert = document.getElementById('alerta');

//funciones
function prepararFormularioPeliculas(e){
    e.preventDefault();
    crearPelicula();
}

function crearPelicula(){
    //validar datos
    const resumen = resumenValidacion(titulo.value);

    //quitar mensaje de error
    mostrarMensajeError(resumen);
    //si los datos son validos?
    if(resumen.length === 0){
        //crear pelicula
        const peliculaEjemplo = new Pelicula(
            "0001",
            "El Padrino",
            "La familia Corleone es una de las más poderosas de Nueva York en los años 40.",
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            "Drama/Crimen",
            1972,
            "2h 55min",
            "Estados Unidos",
            ["Marlon Brando", "Al Pacino", "James Caan"]
        );
    }
    //agregar la pelicula en listaPeliculas

    //guardar listaPeliculas en localStorage
}

function mostrarModalPelicula(){
    modalPelicula.show();
}

function mostrarMensajeError(resumen){
    if(resumen.length > 0){
        alert.className = "alert  alert-danger mt-3";
        alert.innerHTML = resumen;
    }else{
        alert.className = "alert  alert-danger mt-3 d-none";
    }
}
