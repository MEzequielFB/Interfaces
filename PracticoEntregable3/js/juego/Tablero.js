class Tablero extends Figura {

    constructor(x, y, fill, contexto, filas, columnas, imgPorcionTablero, imgWidth, imgHeight) {
        super(x, y, fill, contexto);
        this.filas = filas + 1; //La fila extra (+1) es la fila de las zonas para dejar caer las fichas
        this.columnas = columnas;
        this.imgPorcionTablero = imgPorcionTablero;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.fichasColocadas = [];
        this.porcionesTablero = [];
        this.vaciarTablero();
    }

    //funciones
    /* seAgregaFicha(ficha){ ESTE METODO SE LO DELEGA AL RECTANGULO EN GETCOLUMNAZONAFICHASOLTADA
        if(ficha != null){
            if((ficha.getX() > this.getX()) && (ficha.getX() <= this.getX() + this.getWidth()) &&
            (ficha.getY() <= this.getY()+this.getHeight()) && (ficha.getY() > this.getY() - this.getHeight())){
                return true;
            }else{
                return false;
            }
        }
        return false;
    } */

    addFicha(ficha, columna) { //Se agrega la ficha en una fila de la columna que se pasa por parametro si hay espacio disponible. Itera de abajo hacia arriba
        for (let fila = this.getFilas()-1; fila > 0; fila--) {
            let porcionTableroActual = this.porcionesTablero[fila][columna];
            if (porcionTableroActual.getFichaContenida() == null) {
                porcionTableroActual.setFichaContenida(ficha);
                return true; //Retorna true si se agrego la ficha en una porcion del tablero
            }
        }
        return false; //Retorna false si no se agrego la ficha en una porcion del tablero
    }

    getColumnaZonaFichaSoltada(fichaSoltada) { //Si se solto una ficha en una zona se devuelve la columna perteneciente a la zona
        for (let columna = 0; columna < this.getColumnas(); columna++) {
            if (this.porcionesTablero[0][columna].seSoltoFichaEnZona(fichaSoltada)) {
                return columna /* this.porcionesTablero[0][i] */;
            }
        }
        return -1;
    }

    draw(){
        //dibujar el tablero, tamaño filas x columnas, dibujado segun las fichas colocadas
        //NOTA: Dibuja tablero con imagen. En la matriz porcionesTablero. Cada porcion del tablero tiene una ficha colocada o no
        for (let fila = 0; fila < this.getFilas(); fila++){
            /* for(let j = 0; j < this.getColumnas(); j++){
                posX = posX + this.getImgWidth();
                this.porcionesTablero[i][j] = new DibujoImagen(this.imgPorcionTablero, posX, posY, this.imgWidth, this.imgHeight, this.contexto);
                this.porcionesTablero[i][j].draw();
            } */
            for (let columna = 0; columna < this.getColumnas(); columna++) {
                this.porcionesTablero[fila][columna].draw();
            } 
        }
    }

    inicializarTablero() { //Instancia las clases necesarias en las posiciones de la matriz -> porcionesTablero
        let posX = this.getX();
        let posY = this.getY();
        for (let fila = 0; fila < this.getFilas(); fila++){
            this.porcionesTablero[fila] = [];
            posY = posY + this.getImgHeight();
            posX = this.getX();
            for (let columna = 0; columna < this.getColumnas(); columna++) {
                posX = posX + this.getImgWidth();
                if (fila != 0) { //Si no es la primera fila se instancian las porciones del tablero normalmente
                    this.porcionesTablero[fila][columna] = new DibujoImagen(this.imgPorcionTablero, posX, posY, this.imgWidth, this.imgHeight, this.contexto);
                } else { // Si es la primera fila se dibujan las zonas para soltar las fichas. Se achica la zona dibujada en base a un porcentaje del atributo del ancho de la imagen. La pos x se mueve en base al ancho disminuido divido 2 (para que quede parejo);
                    this.porcionesTablero[fila][columna] = new Rectangulo(posX + ((this.imgWidth * 0.08) / 2), posY, this.getFill(), this.getContexto(), this.imgWidth - (this.imgWidth * 0.08), this.imgHeight);
                }
            } 
        }
    }

    /*vaciarTablero() debe ser llamado por la clase Juego cuando se resetea el tamblero
    y por el constructor de esta misma clase al ser instanciada*/

    vaciarTablero(){
        for (let fila = 0; fila < this.getFilas(); fila++){
            this.fichasColocadas[fila] = [];
            for (let columna = 0; columna < this.getColumnas(); columna++) {
                this.fichasColocadas[fila][columna] = null;
            } 
        }
    }

    setFicha(ficha,columna){
        /*comprobar si la ficha puede ser colocada en la columna, de ser asi, colocarla lo mas "abajo" posible
        caso contrario retornar null, false o 0*/
    }

    comprobarSiGano(ficha){
        /*comprobar si la ultima ficha colocada hizo que el jugador ganara
        hay que comprobar en diagonal, horizontal, y en vertical*/
    }

    determinarColumna(ficha){
        for (let i = 1; i < this.getColumnas()+1; i++) {
            if (ficha.getX() < (this.getImgWidth() * i) + this.getX()) {
                return i-1;
            }
        }
        return -100;
    }

    //getters & setters 
    getColumnas(){
        return this.columnas;
    }

    getFilas(){
        return this.filas;
    }

    getImgPorcionTablero() {
        return this.imgPorcionTablero;
    }

    getImgWidth() {
        return this.imgWidth;
    }

    getImgHeight() {
        return this.imgHeight;
    }

    getWidth(){
        return this.getColumnas()*this.getImgWidth();
    }
    getHeight(){
        return this.getFilas()*this.getImgHeight();
    }

    setColumnas(columnas){
        this.columnas = columnas;
    }

    setFilas(filas){
        this.filas = filas;
    }

    /* var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10, 150, 180); */
}