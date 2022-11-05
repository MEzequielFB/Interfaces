document.addEventListener("DOMContentLoaded", function(){{
    "use strict";

    let canvas = document.querySelector(".canvas");
    let contexto = canvas.getContext("2d");

    let cant_filas = 6;
    let cant_columnas = 7;
    const CANT_FICHAS = cant_filas * cant_columnas;

    let fichas = [];
    let ultimaFiguraClickeada = null;
    let estaMouseDown = false;
    let tiempoTerminado = false;

    //Imagenes
    let porcionTableroImg = document.querySelector(".porcion-tablero");
    let personajeHumanoImg = document.querySelector(".pj-humano");
    let personajeMoguriImg = document.querySelector(".pj-moguri");
    let personajeBangaaImg = document.querySelector(".pj-bangaa");
    let personajeJuezImg = document.querySelector(".pj-juez1");
    let personajeJuez2Img = document.querySelector(".pj-juez2");
    let personajeJuez3Img = document.querySelector(".pj-juez3");
    let numero3 = document.querySelector(".numero-3");
    let numero4 = document.querySelector(".numero-4");
    let numero5 = document.querySelector(".numero-5");
    let resetImg = document.querySelector(".btn-reset-img");

    //Intancias
    let jugador1 = new Jugador("Nico", canvas.width * 0.03, canvas.width * 0.28, canvas.height * 0.25, canvas.height * 0.7);
    let jugador2 = new Jugador("Eze", canvas.width * 0.68, canvas.width * 0.26, canvas.height * 0.25, canvas.height * 0.7);
    let fichaJugador1 = {
        color: "#741536",
        img: personajeMoguriImg
    };
    let fichaJugador2 = {
        color: "#002463",
        img: personajeJuezImg
    };

    let tablero = new Tablero(canvas.width / 3.4, 50, contexto, cant_filas, cant_columnas, porcionTableroImg, 75, 75);

    let juego = new Juego(jugador1, jugador2, tablero);

    //Botones
    let botones = [];

    let btnModo1 = new BotonModo(canvas.width * 0.11, canvas.height * 0.958, contexto, 25, 25, numero3, 5, 6);
    let btnModo2 = new BotonModo(canvas.width * 0.13, canvas.height * 0.958, contexto, 25, 25, numero4, 6, 7);
    let btnModo3 = new BotonModo(canvas.width * 0.15, canvas.height * 0.958, contexto, 25, 25, numero5, 7, 8);

    let btnRestart = new BotonRestart(canvas.width * 0.47, canvas.height * 0.01, contexto, 35, 35, resetImg);
    
    let btnEstiloFicha1 = new BotonEstiloFicha(canvas.width * 0.06, canvas.height * 0.1, contexto, 50, 50, personajeMoguriImg, "#741536", jugador1);
    let btnEstiloFicha2 = new BotonEstiloFicha(canvas.width * 0.1, canvas.height * 0.1, contexto, 50, 50, personajeHumanoImg, "#a7521a", jugador1);
    let btnEstiloFicha3 = new BotonEstiloFicha(canvas.width * 0.14, canvas.height * 0.1, contexto, 50, 50, personajeBangaaImg, "#c0b848", jugador1);

    let btnEstiloFicha4 = new BotonEstiloFicha(canvas.width * 0.8, canvas.height * 0.1, contexto, 50, 50, personajeJuezImg, "#002463", jugador2);
    let btnEstiloFicha5 = new BotonEstiloFicha(canvas.width * 0.84, canvas.height * 0.1, contexto, 50, 50, personajeJuez2Img, "#368372", jugador2);
    let btnEstiloFicha6 = new BotonEstiloFicha(canvas.width * 0.88, canvas.height * 0.1, contexto, 50, 50, personajeJuez3Img, "#4c2eb6", jugador2);
    
    botones.push(btnModo1);
    botones.push(btnModo2);
    botones.push(btnModo3);
    botones.push(btnRestart);
    botones.push(btnEstiloFicha1);
    botones.push(btnEstiloFicha2);
    botones.push(btnEstiloFicha3);
    botones.push(btnEstiloFicha4);
    botones.push(btnEstiloFicha5);
    botones.push(btnEstiloFicha6);

    //Timer
    const segundos_iniciales = 0;
    const minutos_iniciales = 1;
    let segundos = segundos_iniciales;
    let minutos = minutos_iniciales;
    let intervaloTimer = setInterval(timer, 1000);

    function timer() { //Disminuye los segundos. Si segundos llega a -1 se disminuyen los minutos. Si ambos tienen como valor 0, se termina el juego y el setInterval se detiene. Al final de la funcion se dibuja todo el juego
        segundos--;
        if (segundos == -1 && minutos > 0) {
            segundos = 59;
            minutos--;
        } else if (segundos == 0 && minutos == 0) {
            tiempoTerminado = true;
            juego.setJuegoTerminado(true);
            clearCanvas();
            juego.dibujarJuego();
            dibujarTextos();
            console.log("tiempo fuera");
            clearInterval(intervaloTimer);
        }
        dibujarJuego();
    }

    function resetTimer() { //Setea los segundos y minutos iniciales, detiene el setInterval actual si es que está activo y reanuda uno nuevo
        segundos = segundos_iniciales;
        minutos = minutos_iniciales;
        clearInterval(intervaloTimer);
        intervaloTimer = setInterval(timer, 1000);
    }

    /* let btnTimer = document.querySelector(".btn-timer");
    let timer = {
            "indiceActual" : 0,
            "timerId" : null,
            "timers" : [{
                "displayBoton" : "No timer",
                "valor" : null
            },
            {
                "displayBoton" : "15 segs",
                "valor" : 15000
            },
            {
                "displayBoton" : "30 segs",
                "valor" : 30000
            },
            {
                "displayBoton" : "1 min",
                "valor" : 60000
            },
            {
                "displayBoton" : "5 min",
                "valor" : 300000
            }
        ]
    }; */


    /* function setTimer() { //Inicia el timer. Cada vez que se apreta el timer se resetear el tiempo y empieza a contar de nuevo (si es que no está en el indice 0 -> sin timer). Al terminar el tiempo se setea como true el tiempoTerminado, se setea al juego como terminado y se vuelve a dibujar todo (menos las fichas porque el juego está terminado)
        if(timer.indiceActual == timer.timers.length-1){
            timer.indiceActual = 0;
        }else{
            timer.indiceActual++;
        }
        clearTimeout(timer.timerId);
        if(!(timer.timers[timer.indiceActual].valor == null)){
            timer.timerId = setTimeout(() => {
                tiempoTerminado = true;
                juego.setJuegoTerminado(true);
                clearCanvas();
                juego.dibujarJuego();
                dibujarTextos();
                console.log("tiempo fuera");
            },timer.timers[timer.indiceActual].valor);
        }
        btnTimer.innerHTML = timer.timers[timer.indiceActual].displayBoton;
    }

    function resetTimer(){ //Resetea el timer
        tiempoTerminado = false;
        clearTimeout(timer.timerId);
        timer.indiceActual = 0;
        timer.timerId = null;
        btnTimer.innerHTML = timer.timers[timer.indiceActual].displayBoton;
    } */

    /* btnTimer.addEventListener("click", setTimer); */

    function resetJuego() { //Vacía el arreglo de fichas, setea variables al valor por default, crea otros objetos y las variables ya existentes apuntan a estos. Finalmente inicia el juego con los nuevos objetos
        fichas = [];
        ultimaFiguraClickeada = null;
        estaMouseDown = false;
        tiempoTerminado = false;

        jugador1 = new Jugador(jugador1.getNombre(), jugador1.getPosFichasInicialX(), jugador1.getPosFichasFinalX(), jugador1.getPosFichasInicialY(), jugador1.getPosFichasFinalY());
        jugador2 = new Jugador(jugador2.getNombre(), jugador2.getPosFichasInicialX(), jugador2.getPosFichasFinalX(), jugador2.getPosFichasInicialY(), jugador2.getPosFichasFinalY());

        tablero = new Tablero(tablero.getX(), tablero.getY(), contexto, cant_filas, cant_columnas, tablero.getImgPorcionTablero(), tablero.getWidth(), tablero.getHeight());

        console.log(`${tablero.getX()}, ${tablero.getY()}, ${contexto}, ${tablero.getFilas()}, ${tablero.getColumnas()}, ${tablero.getImgPorcionTablero()}, ${tablero.getWidth()}, ${tablero.getHeight()}`);

        juego = new Juego(jugador1, jugador2, tablero);

        resetTimer();
        clearCanvas();
        iniciarJuego();
    }

    function iniciarJuego() { //Agrega fichas a un arreglo, se agregan botones al juego, se llama al metodo jugar del objeto juego, dibuja el juego y resetea el timer
        for (let i = 0; i < CANT_FICHAS; i++) {
            if (i < CANT_FICHAS / 2) {
                addFicha(fichas, fichaJugador1);
            } else {
                addFicha(fichas, fichaJugador2);
            }
        }
        for (let boton of botones) {
            juego.addBoton(boton);
        }
        juego.jugar(fichas);
        dibujarTextos();
        resetTimer();
    }
    iniciarJuego();

    function dibujarJuego() { //Borra todo y vuelve a dibujar todo
        clearCanvas();
        juego.dibujarJuego();
        dibujarTextos();
    }

    function dibujarTextos() { //Dibuja los textos del juego
        contexto.font = "30px Lato";
        contexto.fillStyle = "white";
        dibujarNombreJugador(juego.getJugador1(), canvas.width * 0.1, canvas.height * 0.05);
        dibujarNombreJugador(juego.getJugador2(), canvas.width * 0.85, canvas.height * 0.05);

        if (juego.getJuegoTerminado() && !tiempoTerminado) { //Si el juego terminó y no se acabó el tiempo muestra el nombre del ganador y detiene el timer
            contexto.fillText("Ganó " + juego.getJugadorActual().getNombre() + "!", canvas.width * 0.41, canvas.height * 0.13);
            clearInterval(intervaloTimer);
        } else if (tiempoTerminado) { //Si no se cumplió la condición anterior y el juego está terminado indica que se terminó el tiempo
            contexto.fillText("Se terminó el tiempo!", canvas.width * 0.4, canvas.height * 0.13);
        } else { //De lo contrario se dibuja el timer
            dibujarTimer();
        }

        contexto.font = "22.6px Lato";
        contexto.fillText("Modos de juego:", canvas.width * 0.01, canvas.height * 0.98);
    }

    function dibujarNombreJugador(jugador, posX, posY) { //Dibuja los nombres de los jugadores. El color celeste en el nombre de un jugador indica que es su turno. Al final se define blanco de nuevo para que el color no influya en otros textos
        contexto.font = "30px Lato";
        if (juego.getJugadorActual() == jugador) {
            contexto.fillStyle = "#1fc8e6";
            contexto.fillText(jugador.getNombre(), posX, posY);
        } else {
            contexto.fillStyle = "white";
            contexto.fillText(jugador.getNombre(), posX, posY);
        }
        contexto.fillStyle = "white";
    }

    function dibujarTimer() { //Dibuja el timer
        contexto.fillText(minutos + ":" + segundos, canvas.width * 0.53, canvas.height * 0.04);
    }


    function clearCanvas() { //Limpia el canvas
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    }

    function addFicha(arreglo, fichaJugador) { //Agrega una ficha al arreglo de fichas
        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);

        let ficha = new Ficha(posX, posY, fichaJugador.color, contexto, fichaJugador.img, 30);
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

    function buscarFiguraClickeada(x, y) { //Recorre las fichas empezando desde las ultimas y verifica en cada una si la posicion esta dentro de ella
        for (let i = fichas.length-1; i >= 0; i--) {
            if (fichas[i].estaMouseDentro(x, y)) {
                return fichas[i]; //Devuelve la figura si esta dentro
            }
        }
        return null;
    }

    function mouseMove(e) { //Si el mouse esta clickeado y hay una ficha clickeada y la ficha clickeada es seleccionable y se setea la pos de la figura y se vuelve a dibujar todo
        if (estaMouseDown && ultimaFiguraClickeada != null && ultimaFiguraClickeada.esSeleccionable()) {
            ultimaFiguraClickeada.setPos(e.layerX, e.layerY); //layer es la posicion dentro del canvas
            dibujarJuego();
        }
    }

    function mouseUp() { //Setea que el mouse deje de estar clickeado y a la ultima ficha clickeada se la setea como null. Si la ultima ficha clickeada no es null al dejar de apretar el click se verifica que se haya soltado en la zona del tablero. Una vez verificado y hechas las acciones para agregar las fichas al tablero se vuelve a dibujar todo
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

    function click(e) { //Se ejecuta al hacer click. Si se clickea un boton se cambia la cantidad de filas y columnas del tablero. Si la cantidad de filas y columnas es null solo se resetea el juego. Si el valor de filas es null pero el valor no, se cambia el estilo de las fichas de un jugador

        let btnClickeado = botonClickeado(e.layerX, e.layerY);
        if (btnClickeado != null) {
            const valor = btnClickeado.retornarValor();
            if (valor != null && valor.filas != null) {
                cant_filas = valor.filas;
                cant_columnas = valor.columnas;
            } else if (valor != null) {
                if (btnClickeado.getJugador().getNombre() == jugador1.getNombre()) {
                    fichaJugador1 = {
                        img: valor.img,
                        color: valor.color
                    };
                } else {
                    fichaJugador2 = {
                        img: valor.img,
                        color: valor.color
                    };
                }
            }
            resetJuego();
        }
    }

    function botonClickeado(x, y) { //Busca si se clickeo un boton

        let botonClickeado = null;
        for (let btn of botones) {
            if (btn.seClickeo(x, y)) {
                botonClickeado = btn;
            }
        }
        return botonClickeado;
    }

    canvas.addEventListener("click", click);
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);

    canvas.addEventListener("keypress", function(e){ //Al apretar la 'z' teniendo el juego focuseado se resetea el juego
        console.log(e);
        if (e.key == "z") {
            resetJuego();
        }
    });
    /* document.querySelector(".btn-reset").addEventListener("click", resetJuego); */
}});