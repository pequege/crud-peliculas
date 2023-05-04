//leer de localStorage o usar valor por defecto
let userTheme = JSON.parse(localStorage.getItem('theme')) || 'light';


let btnTheme = document.getElementById('btnTheme');
let btnThemeLight = document.getElementById('btnThemeLight');
let btnThemeDark = document.getElementById('btnThemeDark');

cambiarTema(userTheme);

btnThemeLight.addEventListener('click', ()=> cambiarTema('light'));
btnThemeDark.addEventListener('click', ()=> cambiarTema('dark'));

function cambiarTema(color){
    color === 'dark' ? btnTheme.className = 'bi bi-moon-stars-fill' : btnTheme.className = 'bi bi-brightness-high-fill';
    document.querySelector('html').setAttribute('data-bs-theme', color);
    localStorage.setItem('theme', JSON.stringify(color));
    console.log(color);
}