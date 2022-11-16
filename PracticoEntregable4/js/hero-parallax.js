document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    function onScroll() {
        let posicion_scroll = window.scrollY; //Posicion del scroll de la pantalla
        console.log(posicion_scroll);
    
        //Cambia el valor de 'top' y 'blur' del titulo
        titulo_juego.style.top = posicion_scroll + "px";
        titulo_juego.style.filter = `blur(${posicion_scroll * 0.02}px)`;

        //Cambia el valor de 'bottom' y 'left' de la imagen
        personaje1.style.bottom = - (posicion_scroll * 0.4) + "px";
        personaje1.style.left = - (posicion_scroll * 0.2) + "px";

        //Cambia el valor de 'bottom' y 'right' de la imagen
        personaje2.style.bottom = - (posicion_scroll * 0.4) + "px";
        personaje2.style.right = - (posicion_scroll * 0.2) + "px";

        //Cambia el valor del 'background position' de la imagen de la seccion
        seccion_imagenes_superpuestas.style.backgroundPositionX = -(posicion_scroll * 0.3) + "px";
    }

    const titulo_juego = document.querySelector(".titulo-juego");
    const personaje1 = document.querySelector(".personaje1");
    const personaje2 = document.querySelector(".personaje2");
    const seccion_imagenes_superpuestas = document.querySelector(".imagenes-superpuestas");

    document.addEventListener("scroll", onScroll); //Cada vez que se scrollea se llama a onScroll
});