class Rectangulo extends Figura {

    constructor(x, y, fill, contexto, width, height) {
        super(x, y, fill, contexto);
        this.width = width;
        this.height = height;
    }

    draw() {
        const contexto = this.getContexto();
        contexto.strokeStyle = "#FFFFFF";
        contexto.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        contexto.stroke();
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}