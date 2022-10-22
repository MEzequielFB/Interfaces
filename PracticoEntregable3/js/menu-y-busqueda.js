function mostrarElemento(elemento) {
    elemento.classList.add("visible");
}

function ocultarElemento(elemento) {
    elemento.classList.remove("visible");
}

let menu = document.querySelector(".menu");
let menu_perfil = document.querySelector(".menu-perfil");

let icono_menu_hamburguesa = document.querySelector(".icono-menu-hamburguesa");
icono_menu_hamburguesa.addEventListener("click", function() {
    mostrarElemento(menu);
});
let cruz_btn = document.querySelector(".cruz-menu");
cruz_btn.addEventListener("click", function() {
    ocultarElemento(menu);
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