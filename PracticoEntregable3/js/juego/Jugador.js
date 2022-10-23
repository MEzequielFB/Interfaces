class Jugador {

    constructor(nombre) {
        this.nombre = nombre;
        this.fichas = [];
    }

    //Funcionalidades
    addFicha(ficha) { //Agrega fichas al empezar el juego. Un for en el juego que delegue esta funcion
        this.fichas.push(ficha);
    }

    jugarFicha() { //En la clase juego se delega este metodo al jugador del turno actual si juega la ficha en el tablero
        if (this.getCantidadFichas > 0) {
            return this.fichas.pop();
        }
        return null;
    }

    //Getters
    getNombre() {
        return this.nombre;
    }

    getCantidadFichas() {
        return this.fichas.length;
    }
}