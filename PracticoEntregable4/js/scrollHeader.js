document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    const header = document.querySelector(".header-nav");
    const headerInput = document.querySelector(".busqueda-input");
    const menu = document.querySelector(".menu");
    const menuPerfil = document.querySelector(".menu-perfil");
    document.addEventListener("scroll", function() { //Se ejecuta cada vez que se scrollea en el documento

        let posicionScroll = window.scrollY; //Devuelve la cantidad de pixeles que scrolleo el usuario (arriba del todo es 0)
        const limiteScroll = 200;

        const animacion1 = "1s linear 0s 1 normal forwards running cambioPosicion";
        const animacion2 = "1s linear 0s 1 reverse forwards running cambioPosicion";

        if (posicionScroll > limiteScroll) { //Si la posicion actual del usuario es mayor al limite...
            header.classList.add("estiloScroll"); //Se le agrega una clase al header
            if (headerInput.style.animation != animacion1) { //Si la animacion es distinta a la animacion1 se le setea la animacion1

                headerInput.style.animationName = "none"; //Se setea un nombre cualquiera a la animacion para que surta efecto la animacion
                menu.style.animationName = "none";
                menuPerfil.style.animationName = "none";
                setTimeout(() => { //El seteo de la animacion se hace dentro de un setTimeout para que lo haga al final del script y surta efecto la animacion
                    headerInput.style.animation = animacion1;
                    menu.style.animation = animacion1;
                    menuPerfil.style.animation = animacion1;
                }, 0);
            }
        } else { //Su la posicion del scroll es menor al limite...
            header.classList.remove("estiloScroll"); //Se le saca la clase al header
            if (headerInput.style.animation != animacion2) { //Si la animacion es distinta a la animacion 2 se le setea la animacion2
                
                headerInput.style.animationName = "none";
                menu.style.animationName = "none";
                menuPerfil.style.animationName = "none";
                setTimeout(() => {
                    headerInput.style.animation = animacion2;
                menu.style.animation = animacion2;
                menuPerfil.style.animation = animacion2;
                }, 0);
            }
        }
    });
});