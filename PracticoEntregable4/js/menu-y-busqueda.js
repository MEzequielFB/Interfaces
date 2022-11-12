function mostrarElemento(elemento) {
    elemento.classList.add("visible");
}

function ocultarElemento(elemento) {
    elemento.classList.remove("visible");
}

function setAnimationNameNone(elemento) {
    elemento.style.animationName = "none";
}

let menu = document.querySelector(".menu");
let lista_btns_menu = document.querySelector(".lista-btns-menu");
let menu_perfil = document.querySelector(".menu-perfil");

let icono_menu_hamburguesa = document.querySelector(".icono-menu-hamburguesa");
icono_menu_hamburguesa.addEventListener("click", function() {
    mostrarElemento(menu);
    let btns = lista_btns_menu.children;
    let tiempo_animacion = 1;
    for (let btn of btns) {
        /* btn.style.animationName = "none";
        btn.firstElementChild.style.animationName = "none"; */
        setAnimationNameNone(btn);
        setAnimationNameNone(btn.firstElementChild);

        setTimeout(() => {
            btn.style.animation = `itemCarga ${tiempo_animacion}s ease-out forwards`;
            btn.firstElementChild.style.animation = `itemCarga ${tiempo_animacion}s ease-out forwards`;
            tiempo_animacion += 0.3;
        }, 0);
    }
});
let cruz_btn = document.querySelector(".cruz-menu");
cruz_btn.addEventListener("click", function() {
    ocultarElemento(menu);
    let btns = lista_btns_menu.children;
    for (let btn of btns) {
        setAnimationNameNone(btn);
        setAnimationNameNone(btn.firstElementChild);
        
        setTimeout(() => {
            btn.style.animation = `itemCarga 1s linear forwards reverse`;
            btn.firstElementChild.style.animation = `itemCarga 1s linear forwards reverse`;
        }, 0);
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