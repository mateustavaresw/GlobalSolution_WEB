//função de trocar tema
function trocarTema() {
    document.body.className = tema;
    localStorage.setItem('tema', tema);
}
//carrega o tema salvo no localStorage
let tema = localStorage.getItem('tema');
if (temaSalvo) {
    document.body.className = temaSalvo;
}
//slideshow
let slideAtual = 0;
let slides = document.querySelectorAll('.slide');
let pontos = document.querySelectorAll('.ponto');
let intervaloSlide;

function mostrarSlide(n) {
    //remove ativo de todos
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('ativo');
        pontos[i].classList.remove('ativo');
    }
    slideAtual = n;
    if (slideAtual >= slides.length) slideAtual = 0;
    if (slideAtual < 0) slideAtual = slides.length - 1;

    slides[slideAtual].classList.add('ativo');
    pontos[slideAtual].classList.add('ativo');
}
function mudarSlide(direcao) {
    mostrarSlide(slideAtual + direcao);
    reiniciarIntervalo();
}
function irParaSlide(n) {
    mostrarSlide(n);
    reiniciarIntervalo();
}
function reiniciarIntervalo() {
    clearInterval(intervaloSlide);
    intervaloSlide = setInterval(() => {
        mostrarSlide(slideAtual + 1);
    }, 4000);
}

//começa o slideshow automaticamente
intervaloSlide = setInterval(function() {
    mostrarSlide(slideAtual + 1);
}, 4000);