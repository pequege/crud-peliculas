import Pelicula from "./classPelicula.js";
import { resumenValidacion } from "./helpers.js";

//variables globales
let formularioPelicula = document.getElementById('form-pelicula');
let modalPelicula = new bootstrap.Modal(document.getElementById("modalPelicula"));
const btnCrearPelicula = document.getElementById('btnCrearPelicula');

//manejadores de eventos
formularioPelicula.addEventListener('submit', prepararFormularioPeliculas);
btnCrearPelicula.addEventListener('click', mostrarModalPelicula);

let codigo = document.getElementById('inputCodigo'),
titulo = document.getElementById('inputTitulo'),
descripcion = document.getElementById('textareaDescripcion'),
imagen = document.getElementById('inputImagen'),
genero = document.getElementById('inputGenero'),
anio = document.getElementById('inputAnio'),
duracion = document.getElementById('inputDuracion'),
pais = document.getElementById('inputPais'),
reparto = document.getElementById('inputReparto'),
alert = document.getElementById('alerta');

let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculas')) || [];
if(listaPeliculas.length > 0){
    listaPeliculas = listaPeliculas.map((pelicula) => new Pelicula(1, pelicula.titulo, pelicula.descripcion, pelicula.imagen, pelicula.genero));
}
console.log(listaPeliculas);

cargaInicial();

//funciones
function prepararFormularioPeliculas(e){
    e.preventDefault();
    crearPelicula();
}

function crearPelicula(){
    //validar datos
    const resumen = resumenValidacion(titulo.value, descripcion.value, imagen.value, genero.value, duracion.value, 
        anio.value, pais.value, reparto.value);
    //quitar mensaje de error
    mostrarMensajeError(resumen);
    //si los datos son validos?
    if(resumen.length === 0){
        //crear pelicula
        const peliculaNueva = new Pelicula(
            undefined,
            titulo.value,
            descripcion.value,
            imagen.value,
            genero.value,
            anio.value,
            duracion.value,
            pais.value,
            reparto.value
        );
        //agregar la pelicula en listaPeliculas
        listaPeliculas.push(peliculaNueva);
        //guardar listaPeliculas en localStorage
        guardarEnLocalStorage();
        limpiarFormulario();
    }
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

function guardarEnLocalStorage(){
    localStorage.setItem('listaPeliculas', JSON.stringify(listaPeliculas));
}

function limpiarFormulario(){
    formularioPelicula.reset();
}

function cargaInicial(){
    if(listaPeliculas.length > 0){
        listaPeliculas.map((pelicula) => crearFila(pelicula))
    }
}

function crearFila(pelicula){
    let tablaPelicula = document.getElementById('tablaPelicula');
    tablaPelicula.innerHTML += `
    <tr>
        <th scope="row">1</th>
        <td>
            ${pelicula.titulo}
        </td>
        <td>
            <span class="text-truncate d-inline-block" style="max-width:200px;">
                ${pelicula.descripcion}
            </span>
        </td>
        <td>
            <span class="text-truncate d-inline-block" style="max-width:190px;">
                ${pelicula.imagen}
            </span>
        </td>
        <td>${pelicula.genero}</td>
        <td class="d-flex">
            <button class="btn m-1 btn-warning"><i class="bi bi-pencil-square"></i></button>
            <button class="btn m-1 btn-danger"><i class="bi bi-x-square"></i></button>
        </td>
    </tr>
    `
}
