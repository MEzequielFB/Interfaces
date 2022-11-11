class Boton extends Rectangulo {

    constructor(x, y, contexto, width, height, img) {
        super(x, y, contexto, width, height);
        this.img = img;
    }

    draw() {
        this.contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    retornarValor() {

    }

    seClickeo(x, y) {
        if ((x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height)) {
            return true
        }
        return false;
    }
}