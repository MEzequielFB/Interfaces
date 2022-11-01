class Juego {

    constructor(jugador1, jugador2, tablero) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.jugadorActual = jugador1;
        this.tablero = tablero;
        this.modoDeJuego = 4; //es un numero, determina si el juego es 3 en linea, 3 en linea, 5 en linea etc, por defecto es 4
        this.juegoTerminado = false;
    }

    //Funcionalidades
    addFicha(ficha, columna) { //Si se agrego la ficha a la porcion del tablero se elimina la ficha del jugador actual, se comprueba si ganó y se cambia el jugador actual 
        let posUltimaficha = this.tablero.addFicha(ficha, columna);// posUltimaFicha puede recibir un json o un false, el json actua como un "true" en el if
        if (posUltimaficha) {
            this.jugadorActual.removeFicha(ficha);
            this.setJugadorActual();
            if(this.tablero.comprobarSiGano(posUltimaficha.fila, posUltimaficha.columna, this.modoDeJuego)){
                this.setJuegoTerminado(true);
                console.log(`ganó ${this.jugadorActual.getNombre()}`);
            }
        }
    }

    getColumnaZonaFichaSoltada(fichaSoltada) { //Obtiene el indice de la columna en donde se dejo caer la ficha, si no se dejo caer en una zona devuelve -1
        return this.tablero.getColumnaZonaFichaSoltada(fichaSoltada);
    }

    jugar(fichas) { //Se le dan las fichas a los jugadores y se dibuja el juego. Tambien se setean seleccionables las fichas del jugador actual (jugador1 de forma predeterminada)
        this.darFichas(fichas);
        this.tablero.inicializarTablero();
        this.dibujarJuegoInicial();
        this.setFichasSeleccionablesJugador(this.jugadorActual, true);
    }

    dibujarJuego() { // Dibuja el tablero y las fichas de los jugadores
        this.tablero.draw();
        if(!this.getJuegoTerminado()){
            this.jugador1.dibujarFichas();
            this.jugador2.dibujarFichas();
        }
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
                fichas[i].setJugadorDuenio(this.jugador1);
            } else {
                this.jugador2.addFicha(fichas[i]);
                fichas[i].setJugadorDuenio(this.jugador2);
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

    getJugadorActual() {
        return this.jugadorActual;
    }

    getTablero() {
        return this.tablero;
    }

    getJuegoTerminado(){
        return this.juegoTerminado;
    }

    setFichasSeleccionablesJugador(jugador, seleccionable) { //Setea el atributo 'seleccionable' de las fichas de un jugador
        jugador.setFichasSeleccionables(seleccionable);
    }

    setJugadorActual() { //Cambia al jugador actual y cambia el valor 'seleccionable' de las fichas de ambos jugadores
        this.setFichasSeleccionablesJugador(this.jugadorActual, false);
        if (this.jugadorActual == this.jugador1) {
            this.jugadorActual = this.jugador2;
        } else {
            this.jugadorActual = this.jugador1;
        }
        this.setFichasSeleccionablesJugador(this.jugadorActual, true);
    }

    setJuegoTerminado(juegoTerminado){
        this.juegoTerminado = juegoTerminado;
    }
}