class DibujoImagen {
    
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
        /* this.contexto.save();
        this.contexto.beginPath();
        this.contexto.arc(this.x, this.y, 40, 0, Math.PI * 2);
        this.contexto.strokeStyle = '#2465D3'
        this.contexto.stroke();
        this.contexto.clip(); */
        this.contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
        /* this.contexto.restore(); */
    }

    estaMouseDentro(x, y) {
        return !(x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.height);
    }

    //Getters
    getPos(){
        return {
            x: this.x,
            y: this.y
        }
    }

    //Setters
    setPos(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
}