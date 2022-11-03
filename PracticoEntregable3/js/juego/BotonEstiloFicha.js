class BotonEstiloFicha extends Boton {

    constructor(x, y, contexto, width, height, img, color, jugador) {
        super(x, y, contexto, width, height);
        this.img = img;
        this.color = color;
        this.jugador = jugador;
    }

    retornarValor() {
        return {
            img: this.img,
            color: this.color
        };
    }

    getJugador() {
        return this.jugador;
    }
}