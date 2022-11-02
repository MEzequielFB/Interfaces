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
    /* let fondoJuegoImg = document.querySelector(".fondo-juego"); */

    let jugador1 = new Jugador("nico", canvas.width * 0.1, canvas.height * 0.7);
    let jugador2 = new Jugador("eze", canvas.width * 0.9, canvas.height * 0.7);

    let tablero = new Tablero(canvas.width / 3.4, 100, "#FF23FF", contexto, CANT_FILAS, CANT_COLUMNAS, porcionTableroImg, 75, 75);

    let juego = new Juego(jugador1, jugador2, tablero);

    let btnTimer = document.querySelector(".btn-timer");

    // let timer = {
    //         "indiceActual" : 0,
    //         "timerId" : null,
    //         "timers" : [{
    //             "displayBoton" : "No timer",
    //             "valor" : null
    //         },
    //         {
    //             "displayBoton" : "15 segs",
    //             "valor" : 15000
    //         },
    //         {
    //             "displayBoton" : "30 segs",
    //             "valor" : 30000
    //         },
    //         {
    //             "displayBoton" : "1 min",
    //             "valor" : 60000
    //         },
    //         {
    //             "displayBoton" : "5 min",
    //             "valor" : 300000
    //         }
    //     ]
    // };


    // function setTimer() {
    //     if(timer.indiceActual == timer.timers.length-1){
    //         timer.indiceActual = 0;
    //     }else{
    //         timer.indiceActual++;
    //     }
    //     if(timer.timers[timer.indiceActual].valor == null){
    //         clearTimeout(timer.timerId);
    //         console.log("timer cancelado");
    //     }else{
    //         clearTimeout(timer.timerId);
    //         timer.timerId = setTimeout(() => {
    //             console.log("juego terminado");
    //         },timer.timers[timer.indiceActual].valor);
    //     }
    //     btnTimer.innerHTML = timer.timers[timer.indiceActual].displayBoton;
    // }

    function setTimer(){
        juego.setTimer();
    }

    btnTimer.addEventListener("click", setTimer);

    function resetJuego() { //Vacía el arreglo de fichas, crea otros objetos y las variables ya existentes apuntan a estos. Finalmente inicia el juego con los nuevos objetos
        fichas = [];
        ultimaFiguraClickeada = null;
        estaMouseDown = false;

        jugador1 = new Jugador("nico", canvas.width * 0.1, canvas.height * 0.7);
        jugador2 = new Jugador("eze", canvas.width * 0.9, canvas.height * 0.7);

        tablero = new Tablero(canvas.width / 3.4, 100, "#FF23FF", contexto, CANT_FILAS, CANT_COLUMNAS, porcionTableroImg, 75, 75);

        juego = new Juego(jugador1, jugador2, tablero);
        clearCanvas();
        iniciarJuego();
        juego.resetearTimer();
    }

    function iniciarJuego() { //Agrega fichas a un arreglo, se llama al metodo jugar del objeto juego y dibuja el juego
        for (let i = 0; i < CANT_FICHAS; i++) {
            if (i < CANT_FICHAS / 2) {
                addFicha(fichas, personajeMoguriImg, "#273570");
            } else {
                addFicha(fichas, personajeHumanoImg, "#993c3c");
            }
        }
        juego.jugar(fichas);
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

    function mouseMove(e) { //Si el mouse esta clickeado y hay una figura clickeada y la figura clickeada es seleccionable se setea la pos de la figura y se vuelve a dibujar todo
        if (estaMouseDown && ultimaFiguraClickeada != null && ultimaFiguraClickeada.esSeleccionable()) {
            ultimaFiguraClickeada.setPos(e.layerX, e.layerY); //layer es la posicion dentro del canvas
            dibujarJuego();
        }
    }

    function mouseUp() { //Setea que el mouse deje de estar clickeado y a la ultima figura clickeada se la setea como null. Si la ultima figura clickeada no es null al dejar de apretar el click se verifica que se haya soltado en la zona del tablero. Una vez verificado y hechas las acciones para agregar las fichas al tablero se vuelve a dibujar todo
        estaMouseDown = false;
        if (ultimaFiguraClickeada != null) {
            const columnaZona = juego.getColumnaZonaFichaSoltada(ultimaFiguraClickeada);
            if (columnaZona != -1) {
                juego.addFicha(ultimaFiguraClickeada, columnaZona);
            }
        }
        ultimaFiguraClickeada = null;
        dibujarJuego();
    }

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
    /* canvas.addEventListener("keydown", function(e){
        console.log(e);
        if (e.key == "z") {
            resetJuego();
        }
    }); */
    document.addEventListener("keydown", function(e){
        console.log(e);
        if (e.key == "z") {
            resetJuego();
        }
    });
    document.querySelector(".btn-reset").addEventListener("click", resetJuego);
}});