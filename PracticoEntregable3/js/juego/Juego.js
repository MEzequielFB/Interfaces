class Juego {

    constructor(jugador1, jugador2, tablero) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.jugadorActual = jugador1;
        this.tablero = tablero;
    }

    //Funcionalidades
    addFicha(ficha, columna) { //Si se agrego la ficha a la porcion del tablero se elimina la ficha del jugador actual
        if (this.tablero.addFicha(ficha, columna)) {
            this.jugadorActual.removeFicha(ficha);
        }
    }

    getColumnaZonaFichaSoltada(fichaSoltada) {
        return this.tablero.getColumnaZonaFichaSoltada(fichaSoltada);
    }

    jugar(fichas) { //Se le dan las fichas a los jugadores y se dibuja el juego
        this.darFichas(fichas);
        this.dibujarJuegoInicial();
    }

    dibujarJuego() { // Dibuja el tablero y las fichas de los jugadores
        this.tablero.draw();
        this.jugador1.dibujarFichas();
        this.jugador2.dibujarFichas();
    }

    dibujarJuegoInicial() { //Dibuja el tablero y las fichas de los jugadores en una zona determinada
        this.tablero.draw();
        this.jugador1.dibujarFichasInicial();
        this.jugador2.dibujarFichasInicial();
    }

    darFichas(fichas) { //Agrega las fichas pertenecientes a cada jugar en su arreglo
        for (let i = 0; i < fichas.length; i++) {
            if (i <= fichas.length / 2) {
                this.jugador1.addFicha(fichas[i]);
            } else {
                this.jugador2.addFicha(fichas[i]);
            }
        }
    }

    //Getters & setters
    getJugador1() {
        return this.jugador1;
    }

    getJugador2() {
        return this.jugador2;
    }

    getJugadorActual(){
        return this.jugadorActual;
    }

    getTablero() {
        return this.tablero;
    }

    setJugadorActual(jugador){
        this.jugadorActual = jugador;
    }
}