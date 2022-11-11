class Figura {

    constructor(x, y, contexto) { 
        this.x = x;
        this.y = y;
        this.contexto = contexto;
    }

    //funciones
    draw(){
        
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

    getContexto(){
        return this.contexto;
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