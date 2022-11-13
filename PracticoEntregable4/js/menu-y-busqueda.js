document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    function setAnimationNameNone(elemento) {
        elemento.style.animationName = "none";
    }
    
    function mostrarElemento(elemento) {
        elemento.classList.add("visible");
    }
    
    function ocultarElemento(elemento) {
        elemento.classList.remove("visible");
    }
    
    function mostrarItems() {
        let btns = lista_btns_menu.children;
        let tiempo_animacion = 1;
        for (let btn of btns) {
            setAnimationNameNone(btn);
            setAnimationNameNone(btn.firstElementChild);
    
            setTimeout(() => {
                btn.style.animation = `itemCarga ${tiempo_animacion}s ease-out forwards`;
                btn.firstElementChild.style.animation = `itemCarga ${tiempo_animacion}s ease-out forwards`;
                tiempo_animacion += 0.2;
            }, 0);
        }
    }
    
    function ocultarItems() {
        let btns = lista_btns_menu.children;
        for (let btn of btns) {
            setAnimationNameNone(btn);
            setAnimationNameNone(btn.firstElementChild);
    
            setTimeout(() => {
                btn.style.animation = `itemCarga 1s linear forwards reverse`;
                btn.firstElementChild.style.animation = `itemCarga 1s linear forwards reverse`;
            }, 0);
        }
    }
    
    let menu = document.querySelector(".menu");
    let lista_btns_menu = document.querySelector(".lista-btns-menu");
    let menu_perfil = document.querySelector(".menu-perfil");
    
    let menu_hamburguesa_v2 = document.querySelector(".menu-hamburguesa-v2");
    menu_hamburguesa_v2.addEventListener("click", function() {
        menu.classList.toggle("visible");
        menu_hamburguesa_v2.classList.toggle("cruz");
        menu_hamburguesa_v2.style.animationName = "none";
        if (menu_hamburguesa_v2.classList.contains("cruz")) {
            setTimeout(() => {
                menu_hamburguesa_v2.style.animation = "menuHamburguesaTransicion .7s linear 0s 1 normal forwards";
            }, 0);
        } else {
            setTimeout(() => {
                menu_hamburguesa_v2.style.animation = "menuHamburguesaTransicion .7s linear 0s 1 reverse forwards";
            }, 0);
        }
        if (menu.classList.contains("visible")) {
            mostrarItems();
        } else {
            ocultarItems();
        }
        
        for (let span of menu_hamburguesa_v2.children) {
            span.classList.toggle("cruzTransicion");
        }
    });
    
    let perfil_header = document.querySelector(".perfil-header");
    perfil_header.addEventListener("click", function() {
        if (!menu_perfil.classList.contains("visible")) {
            mostrarElemento(menu_perfil);
        } else {
            ocultarElemento(menu_perfil);
        }
    });
    
    let input_busqueda = document.querySelector(".busqueda-input");
    let icono_busqueda = document.querySelector(".icono-busqueda");
    icono_busqueda.addEventListener("click", function() {
        if (!input_busqueda.classList.contains("visible")) {
            mostrarElemento(input_busqueda);
        } else {
            ocultarElemento(input_busqueda);
        }
    });
});