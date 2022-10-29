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
    draw() { //Se dibuja. Si la ficha contenida no es null tambien se dibuja la ficha
        this.contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.fichaContenida != null) {
            this.fichaContenida.setPos(this.x + (this.width / 2), this.y + (this.height / 2));
            this.fichaContenida.draw();
        }
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

    setFichaContenida(fichaContenida) { //Setea la ficha contenida. La ficha contenida no es seleccionable
        this.fichaContenida = fichaContenida;
        this.fichaContenida.setSeleccionable(false);
    }
}