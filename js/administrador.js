import Pelicula from "./classPelicula.js";
import { resumenValidacion } from "./helpers.js";

//variables globales
let formularioPelicula = document.getElementById('form-pelicula');
let modalPelicula = new bootstrap.Modal(document.getElementById("modalPelicula"));
const btnCrearPelicula = document.getElementById('btnCrearPelicula');
const cartelera = document.getElementById('cartelera');
const generos = ['Acción', 'Animación', 'Aventura', 'Comedia', 'Documental', 'Drama', 'Familiar',
'Fantasía', 'Historia', 'Horror', 'Misterio', 'Música', 'Romance', 'Ciencia ficción', 'Terror',
'Suspenso', 'Bélico', 'Western'];
const paises = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
let altaPelicula = true;

//manejadores de eventos
formularioPelicula.addEventListener('submit', prepararFormularioPeliculas);
btnCrearPelicula.addEventListener('click', mostrarModalPelicula);

let codigo =document.getElementById('inputCodigo'),
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

//si tengo peliculas almacenadas en el array las transformo en tipo Pelicula
if(listaPeliculas.length > 0){
    listaPeliculas = listaPeliculas.map((pelicula) => new Pelicula(pelicula.codigo, pelicula.titulo, pelicula.descripcion, pelicula.imagen, pelicula.genero, pelicula.anio, pelicula.duracion, pelicula.pais, pelicula.reparto));
}

cargaInicial();

//funciones
function prepararFormularioPeliculas(e){
    e.preventDefault();
    altaPelicula? crearPelicula() : editarPelicula();
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
        //dibujar fila en la tabla
        crearFila(peliculaNueva, listaPeliculas.length);
        //mostrar mensaje intuitivo
        Swal.fire(
            '¡Película creada!',
            `Se creó ${peliculaNueva.titulo}`,
            'success'
        )
        //limpiar los campos del formulario
        limpiarFormulario();
    }
}

function mostrarModalPelicula(){
    limpiarFormulario();
    altaPelicula = true;
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
    cargarSelects(genero, generos);
    cargarSelects(pais, paises);
    if(listaPeliculas.length > 0){
        listaPeliculas.map((pelicula, posicion) => crearFila(pelicula, posicion + 1));
    }
}

function cargarSelects(select, array){
    array.forEach(element => {
        let opc = document.createElement('option');
        opc.value = element;
        opc.innerHTML = element;
        select.appendChild(opc)
    });
}

function crearFila(pelicula, fila){
    let tablaPelicula = document.getElementById('tablaPelicula');
    tablaPelicula.innerHTML += `
    <tr>
        <th scope="row">${fila}</th>
        <td>
        <span class="text-truncate d-inline-block" style="max-width:200px;">
            ${pelicula.titulo}
        </span>
        </td>
        <td>
            <span class="text-truncate d-inline-block" style="max-width:200px;">
                ${pelicula.descripcion}
            </span>
        </td>
        <td>
            <span class="text-truncate d-inline-block" style="max-width:200px;">
                ${pelicula.imagen}
            </span>
        </td>
        <td>${pelicula.genero}</td>
        <td class="d-flex">
            <button class="btn m-1 btn-warning" onClick="prepararPelicula('${pelicula.codigo}')"><i class="bi bi-pencil-square"></i></button>
            <button class="btn m-1 btn-danger" onClick="borrarPelicula('${pelicula.codigo}')"><i class="bi bi-x-square"></i></button>
        </td>
    </tr>
    `
}

function crearCard(pelicula){
    cartelera.innerHTML += `
    <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
        <div class="card h-100">
            <img src=" ${pelicula.imagen}" class="card-img-top w-100" alt="poster de ${pelicula.titulo}">
            <div class="card-body">
                <h5 class="card-title d-inline-block">${pelicula.titulo}</h5>
                <p class="card-text text-truncate">
                    ${pelicula.descripcion}
                </p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary"><a href="pages/detalle.html" class="link-light text-decoration-none">Ver Detalle</a></button>
            </div>
        </div>
    </div>`
}

window.leerPelicula = (codigo) =>{
    let posicionPelicula = listaPeliculas.findIndex((pelicula) => pelicula.codigo === codigo);
    return listaPeliculas[posicionPelicula];
}

window.prepararPelicula = (codigoPelicula) =>{
    //obtener los datos de la pelicula
    const peliculaBuscada = listaPeliculas.find((pelicula) => pelicula.codigo === codigoPelicula)
    //mostrar la ventana
    codigo.value = peliculaBuscada.codigo;
    titulo.value = peliculaBuscada.titulo;
    descripcion.value = peliculaBuscada.descripcion;
    imagen.value = peliculaBuscada.imagen;
    genero.value = peliculaBuscada.genero;
    anio.value = peliculaBuscada.anio;
    duracion.value = peliculaBuscada.duracion;
    pais.value = peliculaBuscada.pais;
    reparto.value = peliculaBuscada.reparto;
    modalPelicula.show();
    altaPelicula = false;
}

function editarPelicula(){
    let posicionPelicula = listaPeliculas.findIndex((pelicula) => pelicula.codigo === codigo.value);
    let peliculaEditada = listaPeliculas[posicionPelicula];
    listaPeliculas[posicionPelicula].titulo = titulo.value;
    listaPeliculas[posicionPelicula].descripcion = descripcion.value;
    listaPeliculas[posicionPelicula].imagen = imagen.value;
    listaPeliculas[posicionPelicula].genero = genero.value;
    listaPeliculas[posicionPelicula].anio = anio.value;
    listaPeliculas[posicionPelicula].duracion = duracion.value;
    listaPeliculas[posicionPelicula].pais = pais.value;
    listaPeliculas[posicionPelicula].reparto = reparto.value;

    guardarEnLocalStorage();

    let tablaPelicula = document.getElementById('tablaPelicula');
    let fila = tablaPelicula.children[posicionPelicula];
    fila.children[1].children[0].innerHTML = titulo.value;
    fila.children[2].children[0].innerHTML = descripcion.value;
    fila.children[3].children[0].innerHTML = imagen.value;
    fila.children[4].innerHTML = genero.value;

    Swal.fire(
        'Modificado existosamente!',
        `${peliculaEditada.titulo} ha sido modificada`,
        'success'
    )

    limpiarFormulario();
}

window.borrarPelicula = (codigo) => {
    Swal.fire({
        title: '¿Está seguro de borrar la película?',
        text: "No puedes deshacer este cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#adb5bd',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //1 - buscar del array a donde esta el elemento que tiene este codigo
            let posicionPelicula = listaPeliculas.findIndex((pelicula) => pelicula.codigo === codigo);
            let peliculaBorrada = listaPeliculas[posicionPelicula];
            //2 - borrar la pelicula del array (splice)
            listaPeliculas.splice(posicionPelicula, 1);
            //3 - actualizar el localstorage
            guardarEnLocalStorage();
            //4- borrar la fila de la tabla
            let tablaPelicula = document.getElementById('tablaPelicula');
            tablaPelicula.removeChild(tablaPelicula.children[posicionPelicula]);
            //5 - mostrar un cartel al usuario
            Swal.fire(
                'Borrado existosamente!',
                `${peliculaBorrada.titulo} ha sido borrada`,
                'success'
            )
        }
    })
}
