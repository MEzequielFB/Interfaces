class BotonModo extends Rectangulo {
    
    constructor(x, y, contexto, width, height, img, cantFilas, cantColumnas) {
        super(x, y, contexto, width, height);
        this.img = img;
        this.cantFilas = cantFilas;
        this.cantColumnas = cantColumnas;
    }

    draw() {
        this.contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    seClickeo(x, y) {
        if ((x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height)) {
            return true
        }
        return false;
    }

    getFilasColumnas() {
        return {
            filas: this.cantFilas,
            columnas: this.cantColumnas
        };
    }
}