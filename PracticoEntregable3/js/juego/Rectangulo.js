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

    seSoltoFichaEnZona(fichaSoltada) { //Si la ficha se solto dentro de la zona devuelve true, sino false
        if ((fichaSoltada.getX() >= this.getX()/*  - (this.getWidth() / 2) */ && fichaSoltada.getX() <= this.getX() + this.getWidth()) && (fichaSoltada.getY() >= this.getY() && fichaSoltada.getY() <= this.getY() + this.getHeight())) {
            return true;
        }
        return false;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}