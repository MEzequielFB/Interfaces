class Tablero extends Rectangulo {

    constructor(x, y, contexto, filas, columnas, imgPorcionTablero, imgWidth, imgHeight) {
        /* super(x, y, fill, contexto); */
        super(x, y, contexto, imgWidth, imgHeight);
        this.filas = filas + 1; //La fila extra (+1) es la fila de las zonas para dejar caer las fichas
        this.columnas = columnas;
        /* this.fichasParaGanar = Math.round(((this.filas - 1) * this.columnas) / 12); */
        this.setFichasParaGanar();
        this.imgPorcionTablero = imgPorcionTablero;
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
                this.fichasColocadas[fila][columna] = ficha; //agrega la ficha a la matriz de fichas colocadas
                return {
                    "fila" : fila,
                    "columna" : columna
                }; //Retorna un objeto si se agrego la ficha en una porcion del tablero
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
            posY = posY + this.getHeight();
            posX = this.getX();
            for (let columna = 0; columna < this.getColumnas(); columna++) {
                posX = posX + this.getWidth();
                if (fila != 0) { //Si no es la primera fila se instancian las porciones del tablero normalmente
                    this.porcionesTablero[fila][columna] = new PorcionTablero(this.imgPorcionTablero, posX, posY, this.getWidth(), this.getHeight(), this.contexto);
                } else { // Si es la primera fila se dibujan las zonas para soltar las fichas. Se achica la zona dibujada en base a un porcentaje del atributo del ancho de la imagen. La pos x se mueve en base al ancho disminuido divido 2 (para que quede parejo);
                    this.porcionesTablero[fila][columna] = new Rectangulo(posX + ((this.getWidth() * 0.08) / 2), posY, this.getContexto(), this.getWidth() - (this.getWidth() * 0.08), this.getHeight());
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

    comprobarSiGano(fila,columna, modoDeJuego){
        /*comprobar si la ultima ficha colocada hizo que el jugador ganara
        hay que comprobar en diagonal, horizontal, y en vertical*/
        if (this.comprobarSiGanoHorizontal(fila, columna, this.fichasParaGanar) || this.comprobarSiGanoVertical(fila, columna, this.fichasParaGanar) || this.comprobarSiGanoDiagonalIzquierda(fila, columna, this.fichasParaGanar) || this.comprobarSiGanoDiagonalDerecha(fila, columna, this.fichasParaGanar)) {
            return true;
        }else{
            return false;
        }
    }

    comprobarSiGanoVertical(fila, columna, modoDeJuego){
        /**
         * ficha inicial: es la ficha que vamos a comparar con los demas espacios adyacentes
         * ficha actual: es el espacio que sera comparado con la ficha inicial, la ficha actual cambia con cada iteracion del for
         */
        let fichaInicial = this.fichasColocadas[fila][columna];
        let fichaActual = null;
        for(let i = 0; i <= this.fichasParaGanar-1; i++){
            if(fila + i < this.getFilas()){//este if es para no pasarnos de los limites del tablero
                fichaActual = this.fichasColocadas[fila+i][columna];//asignamos un espacio a ficha actual
            }
            if(!fichaInicial.sonIguales(fichaActual)){//si ficha actual y ficha inicial son diferente, se corta la iteracion con false
                return false;
            }
            fichaActual = null;
        }
        return true;//si la iteracion nunca se corto, entonces hubo 4 fichas iguales seguidas (o la cantidad que sea modoDeJuego)
    }

    comprobarSiGanoHorizontal(fila, columna, modoDeJuego){
        let fichaInicial = this.fichasColocadas[fila][columna];
        let fichaActual = null;

        /**
         * este while es para comenzar desde la primer ficha que sea igual a la ficha inicial,
         * para poder comenzar a iterar desde donde comienza el patron de fichas iguales.
         */
        while(columna-1 >= 0 && fichaInicial.sonIguales(this.fichasColocadas[fila][columna-1])){
            fichaInicial = this.fichasColocadas[fila][columna-1];
            columna--;
        }

        for(let i = 0; i <= this.fichasParaGanar-1;i++){
            if(columna+i <this.getColumnas()){
                fichaActual = this.fichasColocadas[fila][columna+i];
            }
            if(!fichaInicial.sonIguales(fichaActual)){
                return false;
            }
            fichaActual = null;
        }
        return true;
    }

    comprobarSiGanoDiagonalIzquierda(fila, columna, modoDeJuego){
        let fichaInicial =this.fichasColocadas[fila][columna];
        let fichaActual = null;
        while (fila-1 >= 0 && columna-1 >= 0 && fichaInicial.sonIguales(this.fichasColocadas[fila-1][columna-1])) {
            fichaInicial = this.fichasColocadas[fila-1][columna-1];
            fila--;
            columna--;
        }
        for (let i = 0; i <= this.fichasParaGanar-1; i++) {
            if(fila+i < this.getFilas() && columna+i < this.getColumnas()){
                fichaActual = this.fichasColocadas[fila+i][columna+i];
            }
            if(!fichaInicial.sonIguales(fichaActual)){
                return false;
            }
            fichaActual = null;
        }
        return true;
    }

    comprobarSiGanoDiagonalDerecha(fila ,columna, modoDeJuego){
        let fichaInicial =this.fichasColocadas[fila][columna];
        let fichaActual = null;
        while (fila-1 >= 0 && columna+1 < this.getColumnas() && fichaInicial.sonIguales(this.fichasColocadas[fila-1][columna+1])) {
            fichaInicial = this.fichasColocadas[fila-1][columna+1];
            fila--;
            columna++;
        }
        for (let i = 0; i <= this.fichasParaGanar-1; i++) {
            if(fila+i < this.getFilas() && columna-i >= 0){
                fichaActual = this.fichasColocadas[fila+i][columna-i];
            }
            if(!fichaInicial.sonIguales(fichaActual)){
                return false;
            }
            fichaActual = null;
        }
        return true;
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

    getFichasParaGanar() {
        return this.fichasParaGanar;
    }

    getImgPorcionTablero() {
        return this.imgPorcionTablero;
    }

    getWidthTotal(){
        return this.getColumnas()*this.getImgWidth();
    }
    getHeightTotal(){
        return this.getFilas()*this.getImgHeight();
    }

    setColumnas(columnas){
        this.columnas = columnas;
        this.setFichasParaGanar();
    }

    setFilas(filas){
        this.filas = filas;
        this.setFichasParaGanar();
    }

    setFichasParaGanar() {
        this.fichasParaGanar = Math.round(((this.filas - 1) * this.columnas) / 12);
    }
}