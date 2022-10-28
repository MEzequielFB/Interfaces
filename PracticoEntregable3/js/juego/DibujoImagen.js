class DibujoImagen {
    
    //img, x, y, fill, radio, contexto
    constructor(img, x, y, width, height, contexto) { //Pos x e y. El color y el contexto
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.contexto = contexto;
    }

    //Funcionalidades
    draw() {
        this.contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //Getters
    getPos(){
        return {
            x: this.x,
            y: this.y
        }
    }
}