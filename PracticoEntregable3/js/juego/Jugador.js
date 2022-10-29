class Jugador {

    constructor(nombre, posFichasInicialX, posFichasInicialY) {
        this.nombre = nombre;
        this.posFichasInicialX = posFichasInicialX;
        this.posFichasInicialY = posFichasInicialY;
        this.fichas = [];
    }

    //Funcionalidades
    dibujarFichas() { //Las fichas del jugador se dibujan
        for (let ficha of this.fichas) {
            ficha.draw();
        }
    }

    dibujarFichasInicial() { //Dibuja las fichas dentro de una zona con posiciones aleatorias
        let posX = this.getPosFichasInicialX();
        let posY = this.getPosFichasInicialY();
        let probabilidad = Math.random();

        for (let ficha of this.fichas) {
            ficha.setPos(posX, posY);
            ficha.draw();

            if (probabilidad > 0.5) {
                posX = posX + Math.round(Math.random() * 30);
                posY = posY + Math.round(Math.random() * 30);
            } else {
                posX = posX - Math.round(Math.random() * 30);
                posY = posY - Math.round(Math.random() * 30);
            }
            probabilidad = Math.random();
        }
    }

    removeFicha(ficha) { //Setea el arreglo se fichas por uno nuevo en el cual se filtra la ficha pasada por parametro
        const arrayFiltrado = this.fichas.filter(fichaArray => fichaArray != ficha); //Se agregan al nuevo array las fichas que sean distintas a la ficha pasada por parametro
        this.setFichas(arrayFiltrado);
    }

    addFicha(ficha) { //Agrega fichas al empezar el juego. Un for en el juego que delegue esta funcion
        this.fichas.push(ficha);
    }

    jugarFicha() { //En la clase juego se delega este metodo al jugador del turno actual si juega la ficha en el tablero
        if (this.getCantidadFichas > 0) {
            return this.fichas.pop();
        }
        return null;
    }

    //getters & setters
    getNombre() {
        return this.nombre;
    }

    getPosFichasInicialX() {
        return this.posFichasInicialX;
    }

    getPosFichasInicialY() {
        return this.posFichasInicialY;
    }

    getCantidadFichas() {
        return this.fichas.length;
    }

    setFichas(fichas) {
        this.fichas = fichas;
    }
}