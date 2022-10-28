class Juego {

    constructor(jugador1, jugador2, tablero) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.jugadorActual = jugador1;
        this.tablero = tablero;
    }

    //Funcionalidades
    jugar(fichas) { //Se le dan las fichas a los jugadores y se dibuja el juego
        this.darFichas(fichas);
        this.dibujarJuegoInicial();
    }

    dibujarJuego() {
        this.tablero.draw();
        this.jugador1.dibujarFichas();
        this.jugador2.dibujarFichas();
    }

    dibujarJuegoInicial() {
        this.tablero.draw();
        this.jugador1.dibujarFichasInicial();
        this.jugador2.dibujarFichasInicial();
    }

    darFichas(fichas) {
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