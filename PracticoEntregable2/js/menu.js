function mostrarMenu(menu) {
    menu.classList.add("visible");
}

function ocultarMenu(menu) {
    menu.classList.remove("visible");
}

let menu = document.querySelector(".menu");
let menu_perfil = document.querySelector(".menu-perfil");

let icono_menu_hamburguesa = document.querySelector(".icono-menu-hamburguesa");
icono_menu_hamburguesa.addEventListener("click", function() {
    mostrarMenu(menu);
});
let cruz_btn = document.querySelector(".cruz-menu");
cruz_btn.addEventListener("click", function() {
    ocultarMenu(menu);
});

let perfil_header = document.querySelector(".perfil-header");
perfil_header.addEventListener("click", function() {
    if (!menu_perfil.classList.contains("visible")) {
        mostrarMenu(menu_perfil);
    } else {
        ocultarMenu(menu_perfil);
    }
});