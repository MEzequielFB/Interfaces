document.addEventListener("DOMContentLoaded", function(){{
    "use strict";

    let canvas = document.querySelector(".canvas");
    let contexto = canvas.getContext("2d");

    const CANT_FILAS = 6;
    const CANT_COLUMNAS = 7;
    const CANT_FICHAS = CANT_FILAS * CANT_COLUMNAS;

    let fichas = [];
    let ultimaFiguraClickeada = null;
    let estaMouseDown = false;

    let porcionTableroImg = document.querySelector(".porcion-tablero");
    let personajeHumanoImg = document.querySelector(".pj-humano");
    let personajeMoguriImg = document.querySelector(".pj-moguri");

    let jugador1 = new Jugador("nico");
    let jugador2 = new Jugador("eze");

    let tablero = new Tablero(canvas.width / 3.4, 230, "#FF23FF", contexto, CANT_FILAS, CANT_COLUMNAS, porcionTableroImg, 75, 75);

    let juego = new Juego(jugador1, jugador2, tablero);

    

    function iniciarJuego() { //Agrega fichas a un arreglo, se llama al metodo jugar del objeto juego y dibuja el juego
        for (let i = 0; i < CANT_FICHAS; i++) {
            if (i <= CANT_FICHAS / 2) {
                addFicha(fichas, personajeMoguriImg, "#273570");
            } else {
                addFicha(fichas, personajeHumanoImg, "#993c3c");
            }
        }
        /* juego.darFichas(fichas); */
        juego.jugar(fichas);
        dibujarJuego();
    }
    iniciarJuego();

    function dibujarJuego() { //Borra todo y vuelve a dibujar todo
        clearCanvas();
        juego.dibujarJuego();
    }

    function clearCanvas() { //Limpia el canvas
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    }

    function addFicha(arreglo, imagen, color) { //Agrega una ficha al arreglo de fichas
        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);

        let ficha = new Ficha(imagen, posX, posY, color, 30, contexto);
        arreglo.push(ficha);
    }

    function mouseDown(e) { //Verifica que se clickeo una ficha y se vuelve a dibujar el juego
        estaMouseDown = true;

        let figuraClickeada = buscarFiguraClickeada(e.layerX, e.layerY); //layerx y layery son posiciones dentro del canvas
        if (figuraClickeada != null) {
            ultimaFiguraClickeada = figuraClickeada;
        }
        dibujarJuego();
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
            dibujarJuego();
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