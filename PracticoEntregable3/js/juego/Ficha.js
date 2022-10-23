class Ficha {
    
    constructor(img, x, y, fill, radio, contexto) { //Pos x e y. El color y el contexto
        this.img = img;
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.radio = radio;
        this.contexto = contexto;
    }

    //Funcionalidades
    draw() {
        this.contexto.fillStyle = this.fill;
        this.contexto.save();
        this.contexto.beginPath();
        this.contexto.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.contexto.fill();
        this.contexto.strokeStyle = this.fill;
        this.contexto.stroke();
        this.contexto.clip();
        this.contexto.drawImage(this.img, this.x-this.radio, this.y-this.radio, this.radio*2, this.radio*2);
        this.contexto.restore();

        /* this.contexto.fillStyle = this.fill;
        this.contexto.beginPath();
        this.contexto.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.contexto.fill(); */
    }

    estaMouseDentro(x, y) { //Si la distancia entre los dos puntos en menor al radio, esta dentro del circulo
        let _x = this.x - x;
        let _y = this.y - y;
        return Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2)) < this.radio; //Distancia entre dos puntos. El que viene por parametro y el del circulo
    }

    //Getters
    getPos(){
        return {
            x: this.x,
            y: this.y
        }
    }

    getFill() {
        return this.fill;
    }

    getRadio() {
        return this.radio;
    }

    //Setters
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setFill(fill) {
        this.fill = fill;
    }
}