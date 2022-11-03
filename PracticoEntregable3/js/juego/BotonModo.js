class BotonModo extends Boton {
    
    constructor(x, y, contexto, width, height, img, cantFilas, cantColumnas) {
        super(x, y, contexto, width, height, img);
        this.cantFilas = cantFilas;
        this.cantColumnas = cantColumnas;
    }

    retornarValor() {
        return {
            filas: this.cantFilas,
            columnas: this.cantColumnas
        };
    }
}