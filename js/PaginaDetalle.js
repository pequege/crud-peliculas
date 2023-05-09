console.log(window.location.search);

const parametroURL = new URLSearchParams(window.location.search);

console.log(parametroURL);
console.log(parametroURL.get('codigo'));


let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculas')) || [];

const peliculaBuscada = listaPeliculas.find((pelicula) => pelicula.codigo === parametroURL.get('codigo'));

    let seccion = document.querySelector('#seccion-detalle');
    seccion.innerHTML = `
    <div class="card mb-3 px-md-0">
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${peliculaBuscada.imagen}" class="img-fluid rounded-start" alt="poster de ${peliculaBuscada.titulo}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${peliculaBuscada.titulo}</h5>
            <p class="card-text pb-0">${peliculaBuscada.descripcion}</p>
            <p class="card-text pb-0">Genero: <span class="badge text-bg-info text-light">${peliculaBuscada.genero}</span></p>
            <p class="card-text pb-0">Año: ${peliculaBuscada.anio}</p>
            <p class="card-text pb-0">Duración: ${peliculaBuscada.duracion} min</p>
            <p class="card-text pb-0">País: ${peliculaBuscada.pais}</p>
            <p class="card-text pb-0">Reparto: ${peliculaBuscada.reparto}</p>
            </div>
        </div>
        </div>
    </div>
    ` 
