let listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculas")) || [];

listaPeliculas.map((pelicula) => {
    crearColumna(pelicula);
})

function crearColumna(pelicula){
    let grilla = document.getElementById('grilla');
    grilla.innerHTML += `
    <aside class="col-lg-3 col-md-6 col-12 mt-3">
        <div class="card h-100">
            <img src="${pelicula.imagen}" class="card-img-top w-100" alt="poster de ${pelicula.titulo}">
            <div class="card-body">
                <h5 class="card-title d-inline-block">${pelicula.titulo}</h5>
                <p class="card-text text-truncate">
                ${pelicula.descripcion}
                </p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" onclick="navegarPaginaDetalle('${pelicula.codigo}')">
                    Ver Detalle
                </button>
            </div>
        </div>
    </aside>
    `
}

function navegarPaginaDetalle(codigo){
    window.location.href = window.location.origin + '/pages/detalle.html?codigo=' + codigo;
}
