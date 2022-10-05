function mostrarMenu() {
    document.querySelector("nav").classList.add("visible");
}

let menu_hamburguesa = document.querySelector(".menu-hamburguesa");
menu_hamburguesa.addEventListener("click", mostrarMenu);