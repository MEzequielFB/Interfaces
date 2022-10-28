document.addEventListener("DOMContentLoaded", function(){{
    "use strict";

    let canvas = document.querySelector(".canvas");
    let contexto = canvas.getContext("2d");

    const CANT_FICHAS = 3;

    let fichas = [];
    let ultimaFiguraClickeada = null;
    let estaMouseDown = false;

    let porcionTableroImg = document.querySelector(".porcion-tablero");
    let personajeHumanoImg = document.querySelector(".pj-humano");
    let personajeMoguriImg = document.querySelector(".pj-moguri");

    let jugador1 = new Jugador("nico");
    let jugador2 = new Jugador("eze");

    let tablero = new Tablero(canvas.width / 3.4, 230, "#FF23FF", contexto, 6, 7, porcionTableroImg, 75, 75);

    let juego = new Juego(jugador1, jugador2, tablero);

    

    function iniciarJuego() {
        juego.jugar();
        for (let i = 0; i < CANT_FICHAS; i++) {
            addFicha(fichas, personajeHumanoImg);
        }
        dibujarFichas();
    }
    iniciarJuego();

    function dibujarFichas() { //Borra todo y vuelve a dibujar todo
        clearCanvas();
        tablero.draw();
        for (let ficha of fichas) {
            ficha.draw();
        }
    }

    function clearCanvas() {
        /* contexto.fillStyle = "#000000";
        contexto.fillRect(0, 0, canvas.width, canvas.height); */
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    }

    function addFicha(arreglo, imagen) {
        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);
        /* let color = "#FFFFFF"; */
        let color = "#a35825";

        let ficha = new Ficha(imagen, posX, posY, color, 30, contexto);
        /* let ficha = new DibujoImagen(porcionTableroImg, posX, posY, 40, 40, contexto); */
        arreglo.push(ficha);
    }

    /* function addFichasJugador(jugador, imagen_ficha, cantidad_fichas) {

        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);
        let color = "#a35825";

        let ficha = new Ficha(imagen_ficha, posX, posY, color, 35, contexto);

        for (let i = 0; i < cantidad_fichas; i++) {
            jugador.addFicha(ficha);
        }
    } */

    function mouseDown(e) {
        estaMouseDown = true;

        let figuraClickeada = buscarFiguraClickeada(e.layerX, e.layerY); //layerx y layery son posiciones dentro del canvas
        if (figuraClickeada != null) {
            ultimaFiguraClickeada = figuraClickeada;
        }
        dibujarFichas();
    }

    function buscarFiguraClickeada(x, y) { //Recorre las figuras y verifica en cada una si la posicion esta dentro de ella
        for (let ficha of fichas) {
            if (ficha.estaMouseDentro(x, y)) {
                return ficha; //Devuelve la figura si esta dentro
            }
        }
        return null;
    }

    function mouseMove(e) { //Si el mouse esta clickeado y hay una figura clickeada se setea la pos de la figura y se vuelve a dibujar todo
        if (estaMouseDown && ultimaFiguraClickeada != null) {
            ultimaFiguraClickeada.setPos(e.layerX, e.layerY);
            dibujarFichas();
        }
    }

    function mouseUp() { //Setea que el mouse deje de estar clickeado y a la ultima figura clickeada como null
        estaMouseDown = false;
        ultimaFiguraClickeada = null;
    }

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
}});