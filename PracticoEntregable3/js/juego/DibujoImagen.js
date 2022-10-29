class DibujoImagen {
    
    //img, x, y, fill, radio, contexto
    constructor(img, x, y, width, height, contexto) { //Pos x e y. El color y el contexto
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.contexto = contexto;
        this.fichaContenida = null;
    }

    //Funcionalidades
    draw() {
        this.contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //getters & setters
    getPos(){
        return {
            x: this.x,
            y: this.y
        }
    }

    getFichaContenida() {
        return this.fichaContenida;
    }

    setFichaContenida(fichaContenida) {
        this.fichaContenida = fichaContenida;
    }
}