document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    const posicion_scroll_historia = 2165;
    const posicion_scroll_historia_limite = 4099;

    const posicion_scroll_caractersticas = 5976.0;
    const posicion_scroll_caracteristicas_limite = posicion_scroll_caractersticas + 800.0;

    function onScroll() {
        let posicion_scroll = parseFloat(window.scrollY); //Posicion del scroll de la pantalla
        console.log(posicion_scroll);

        //ICONO MOUSE
        if (valor_opacity > 0) {
            valor_opacity -= 0.01;
        } else if (posicion_scroll < 200) {
            valor_opacity = 0.7;
        } else {
            valor_opacity = 0;
        }
        icono_mouse.style.opacity = valor_opacity;
    
        //IMAGENES SUPERPUESTAS:
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

        //HISTORIA Si se está entre dos posiciones del scroll...
        if (posicion_scroll >= posicion_scroll_historia && posicion_scroll <= posicion_scroll_historia_limite) {
            //Se incrementa el atributo top de las columnas (imagenes y parrafos)
            historia_columna1.style.top = valor_top_columnas + (posicion_scroll - posicion_scroll_historia)+"px";
            historia_columna2.style.top = valor_top_columnas + (posicion_scroll - posicion_scroll_historia)+"px";

            //Si la posicion scroll es mayor o igual a una posicion dada de la seccion historia se quita y agrega la clase visible a los respectivos elementos
            if (posicion_scroll >= posicion_scroll_historia) {
                historia_columna1.firstElementChild.classList.add("visible");
                historia_columna1.firstElementChild.nextElementSibling.classList.remove("visible");

                historia_columna2.firstElementChild.classList.add("visible");
                historia_columna2.firstElementChild.nextElementSibling.classList.remove("visible");
            }
            if (posicion_scroll >= 2976) {
                historia_columna1.firstElementChild.classList.remove("visible");
                historia_columna1.lastElementChild.classList.remove("visible");
                historia_columna1.firstElementChild.nextElementSibling.classList.add("visible");

                historia_columna2.firstElementChild.classList.remove("visible");
                historia_columna2.lastElementChild.classList.remove("visible");
                historia_columna2.firstElementChild.nextElementSibling.classList.add("visible");
            }
            if (posicion_scroll >= 3578) {
                historia_columna1.firstElementChild.nextElementSibling.classList.remove("visible");
                historia_columna1.lastElementChild.classList.add("visible");

                historia_columna2.firstElementChild.nextElementSibling.classList.remove("visible");
                historia_columna2.lastElementChild.classList.add("visible");
            }
        }

        //CARACTERISTICAS:
        if (posicion_scroll >= posicion_scroll_caractersticas && posicion_scroll <= posicion_scroll_caracteristicas_limite) { //Si la posicion del scroll está entre dos valores...
            //Se cambia el marginTop de la seccion 'caracteristicas'
            let resultado_resta = posicion_scroll - posicion_scroll_caractersticas;
            /* caracteristicas.style.marginTop = resultado_resta+"px"; */
            
            //Se cambia la opacidad del titulo
            h1_caracteristicas.style.opacity = resultado_resta / 1000;

            //Se cambia el valor del translateX de cada card de la seccion
            for (let card_izquierda of cards_izquierda) {
                card_izquierda.style.transform = `translateX(${-100 + (resultado_resta / ((posicion_scroll_caracteristicas_limite - posicion_scroll_caractersticas) / 100))}vh)`;
            }
            for (let card_derecha of cards_derecha) {
                card_derecha.style.transform = `translateX(${100 - (resultado_resta / ((posicion_scroll_caracteristicas_limite - posicion_scroll_caractersticas) / 100))}vh)`;
            }
            card_arriba.style.transform = `translateY(${-100 + (resultado_resta / ((posicion_scroll_caracteristicas_limite - posicion_scroll_caractersticas) / 100))}vh)`;
            card_abajo.style.transform = `translateY(${100 - (resultado_resta / ((posicion_scroll_caracteristicas_limite - posicion_scroll_caractersticas) / 100))}vh)`;

        } else if (posicion_scroll < posicion_scroll_caractersticas) { //Si la posicion del scroll es menor a la posicion scroll de la seccion, se setea a 0 su margin top
            /* caracteristicas.style.marginTop = 0+"px"; */
            h1_caracteristicas.style.opacity = 0; //Se setea en 0 la opacidad del titulo

        } else if (posicion_scroll > posicion_scroll_caracteristicas_limite) { //Si la posicion del scrol es mayor al limite de la seccion, el translate de las cards se setea a 0
            h1_caracteristicas.style.opacity = 1; //Se setea en uno la opacidad del titulo
            for (let card_izquierda of cards_izquierda) {
                card_izquierda.style.transform = `translateX(${0}vh)`;
            }
            for (let card_derecha of cards_derecha) {
                card_derecha.style.transform = `translateX(${0}vh)`;
            }
            card_arriba.style.transform = `translateY(${0}vh)`;
            card_abajo.style.transform = `translateY(${0}vh)`;
        }
    }

    const icono_mouse = document.querySelector(".mouse");
    let valor_opacity = getComputedStyle(icono_mouse).opacity;

    const historia = document.querySelector(".container-historia");
    const historia_columna1 = historia.firstElementChild;
    const historia_columna2 = historia.lastElementChild;
    const valor_top_columnas = parseInt(getComputedStyle(historia_columna1).top);
    const historia_imagenes = historia_columna1.children;
    const historia_parrafos = historia_columna2.children;

    const personajes = document.querySelector(".personajes"); //Seccion personajes

    const caracteristicas = document.querySelector(".caracteristicas"); //Seccion caracteristicas
    const h1_caracteristicas = caracteristicas.firstElementChild;
    const cards_izquierda = document.querySelectorAll(".card-izquierda");
    const cards_derecha = document.querySelectorAll(".card-derecha");
    const card_arriba = document.querySelector(".card-arriba");
    const card_abajo = document.querySelector(".card-abajo");

    const titulo_juego = document.querySelector(".titulo-juego");
    const personaje1 = document.querySelector(".personaje1");
    const personaje2 = document.querySelector(".personaje2");
    const seccion_imagenes_superpuestas = document.querySelector(".imagenes-superpuestas");

    const observer = new IntersectionObserver(elementos => { //Si los elementos observados están en pantalla se les agrega una clase, de lo contrario se le saca
        for (let elemento of elementos) {
            if (elemento.isIntersecting) {
                elemento.target.classList.add("visible");
            } else {
                elemento.target.classList.remove("visible");
            }
        }
    });

    const observables = document.querySelectorAll(".observable")
    for (let observable of observables) {
        observer.observe(observable); //El observer observa los elementos con la clase 'observable'
    }

    document.addEventListener("scroll", onScroll); //Cada vez que se scrollea se llama a onScroll
});