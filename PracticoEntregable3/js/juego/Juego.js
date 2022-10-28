class Juego {

    constructor(jugador1, jugador2, tablero) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.jugadorActual = jugador1;
        this.tablero = tablero;
    }

    //Funcionalidades
    jugar() {
        //dibujar tablero y fichas
        this.tablero.draw();
    }

    darFichas() {
        
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