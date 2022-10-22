document.addEventListener("click", function(){
    "use strict";

    let canvas = document.querySelector(".canvas");
    let previa_juego = document.querySelector(".juego");

    let btn_jugar = document.querySelector(".btn-jugar");
    btn_jugar.addEventListener("click", function(){
        previa_juego.classList.add("menos-index");
    });
});