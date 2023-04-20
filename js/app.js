let btnThemeLight = document.getElementById('btnThemeLight')
let btnThemeDark = document.getElementById('btnThemeDark')

btnThemeLight.addEventListener('click', ()=> cambiarTema('light'));
btnThemeDark.addEventListener('click', ()=> cambiarTema('dark'));

function cambiarTema(color){
    document.querySelector('html').setAttribute('data-bs-theme', color);
    console.log(color)
}