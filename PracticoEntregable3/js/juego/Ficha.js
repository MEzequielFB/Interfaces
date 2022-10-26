class Ficha extends Figura{
    
    constructor(img, x, y, fill, radio, contexto) { //Pos x e y. El color y el contexto
        super(x, y, fill, contexto);
        this.img = img;
        this.radio = radio;
    }

    //Funcionalidades
    draw() {
        super.draw();
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
        let _x = this.getX() - x;
        let _y = this.getY() - y;
        return Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2)) < this.radio; //Distancia entre dos puntos. El que viene por parametro y el del circulo
    }

    //Getters
    getRadio() {
        return this.radio;
    }

    getImg(){
        return this.img;
    }

    //Setters
    setImg(img){
        this.img = img;
    }

    setRadio(radio){
        this.radio = radio;
    }
}