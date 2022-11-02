document.addEventListener("DOMContentLoaded", function(){
    "use strict";
    
    let previa_juego = document.querySelector(".juego");

    let btn_jugar = document.querySelector(".btn-jugar");
    btn_jugar.addEventListener("click", function(){
        previa_juego.classList.add("menos-index");
    });
});