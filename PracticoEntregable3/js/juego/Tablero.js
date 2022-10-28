class Tablero extends Figura {

    constructor(x, y, fill, contexto, filas, columnas, imgPorcionTablero, imgWidth, imgHeight) {
        super(x, y, fill, contexto);
        this.filas = filas + 1;
        this.columnas = columnas;
        this.imgPorcionTablero = imgPorcionTablero;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.fichasColocadas = [];
        this.porcionesTablero = [];
        this.vaciarTablero();
    }

    //funciones
    seAgregaFicha() { //Verifica si se solto la ficha en la zona de la columna del tablero

    }

    draw(){
        //dibujar el tablero, tamaño filas x columnas, dibujado segun las fichas colocadas
        //NOTA: Dibuja tablero con imagen. En otra matriz -> porcionesTablero. En fichas colocadas se guardan las fichas colocadas y se dibujan con su propio color
        let posX = this.getX();
        let posY = this.getY();
        for (let i = 0; i < this.getFilas(); i++){
            this.porcionesTablero[i] = [];
            posY = posY + this.getImgHeight();
            posX = this.getX();
            for (let j = 0; j < this.getColumnas(); j++) {
                posX = posX + this.getImgWidth();
                if (i != 0) { //Si no es la primera fila se dibujan las porciones del tablero normalmente
                    this.porcionesTablero[i][j] = new DibujoImagen(this.imgPorcionTablero, posX, posY, this.imgWidth, this.imgHeight, this.contexto);
                    this.porcionesTablero[i][j].draw();
                } else { // Si es la primera fila se dibujan las zonas para soltar las fichas. Se achica la zona dibujada en base a un porcentaje del atributo del ancho de la imagen. La pos x se mueve en base al ancho disminuido
                    this.porcionesTablero[i][j] = new Rectangulo(posX + (this.imgWidth * 0.08), posY, this.getFill(), this.getContexto(), this.imgWidth - (this.imgWidth * 0.08), this.imgHeight);
                    this.porcionesTablero[i][j].draw();
                }
            } 
        }
    }

    /*vaciarTablero() debe ser llamado por la clase Juego cuando se resetea el tamblero
    y por el constructor de esta misma clase al ser instanciada*/

    vaciarTablero(){
        for (let i = 0; i < this.getFilas(); i++){
            this.fichasColocadas[i] = [];
            for (let j = 0; j < this.getColumnas(); j++) {
                this.fichasColocadas[i][j] = null;
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