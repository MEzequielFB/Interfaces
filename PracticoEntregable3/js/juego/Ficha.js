class Ficha extends Figura{
    
    constructor(x, y, fill, contexto, img, radio) { //Pos x e y. El color y el contexto
        super(x, y, contexto);
        this.fill = fill;
        this.img = img;
        this.radio = radio;
        this.seleccionable = false; //Para controlar los turnos y para que no se puedan mover las fichas contenidas en el tablero
    }

    //Funcionalidades
    draw() {
        this.contexto.fillStyle = this.fill;
        this.contexto.save(); //Guarda el estado del contexto
        this.contexto.beginPath(); //Empieza el trazo
        this.contexto.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.contexto.fill();
        this.contexto.strokeStyle = this.fill;
        this.contexto.stroke();
        this.contexto.clip(); //Recorta lo que quede fuera de los limites de la ficha
        this.contexto.drawImage(this.img, this.x-this.radio, this.y-this.radio, this.radio*2, this.radio*2); //Dibuja una imagen en el centro de la ficha
        this.contexto.restore(); //Devuelve el estado y atributos guardados
    }

    estaMouseDentro(x, y) { //Si la distancia entre los dos puntos en menor al radio, esta dentro del circulo
        let _x = this.getX() - x;
        let _y = this.getY() - y;
        return Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2)) < this.radio; //Distancia entre dos puntos. El que viene por parametro y el del circulo
    }

    esSeleccionable() {
        return this.seleccionable;
    }

    sonIguales(objeto){ //dos fichas son iguales, si su imagen es la misma (en este caso)
        if((objeto != null) && (objeto.getImg() == this.getImg())){
            return true;
        }else{
            return false;
        }
    }

    //getters & setters
    getFill() {
        return this.fill;
    }

    getRadio() {
        return this.radio;
    }

    getImg(){
        return this.img;
    }

    setFil(fill) {
        this.fill = fill;
    }

    setImg(img){
        this.img = img;
    }

    setRadio(radio){
        this.radio = radio;
    }

    setSeleccionable(seleccionable) {
        this.seleccionable = seleccionable;
    }
}