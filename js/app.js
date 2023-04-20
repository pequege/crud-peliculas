//leer de localStorage o usar valor por defecto
let userTheme = JSON.parse(localStorage.getItem('theme')) || 'light';

cambiarTema(userTheme);

let btnThemeLight = document.getElementById('btnThemeLight')
let btnThemeDark = document.getElementById('btnThemeDark')

btnThemeLight.addEventListener('click', ()=> cambiarTema('light'));
btnThemeDark.addEventListener('click', ()=> cambiarTema('dark'));

function cambiarTema(color){
    document.querySelector('html').setAttribute('data-bs-theme', color);
    localStorage.setItem('theme', JSON.stringify(color));
    console.log(color)
}