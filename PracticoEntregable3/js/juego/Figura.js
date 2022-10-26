class Figura {

    constructor(x, y, fill, contexto) { 
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.contexto = contexto;
    }

    //funciones
    draw(){
        this.contexto.fillStyle = this.fill;
    }

    //getters & setters

    getPos(){
        return {
            x: this.getX(),
            y: this.getY()
        }
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getFill(){
        return this.fill;
    }

    getContexto(){
        return this.contexto;
    }

    setFill(fill){
        this.fill = fill;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    setPos(x, y){
        this.setX(x);
        this.setY(y);
    }
}