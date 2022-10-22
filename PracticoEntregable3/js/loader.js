function mostrarSitio() {
    clearInterval(intervalo);
    loader_progress.classList.remove("visible");
}

function incrementarContador() {
    if (contador < 100) {
        contador++;
        porcentaje.innerHTML = contador;
    }
}

setTimeout(mostrarSitio, 3200);
let intervalo = setInterval(incrementarContador, 29);

let loader_progress = document.querySelector(".loader-barra");

let contador = 0;
let porcentaje = document.querySelector(".porcentaje-progreso");
porcentaje.innerHTML = contador;