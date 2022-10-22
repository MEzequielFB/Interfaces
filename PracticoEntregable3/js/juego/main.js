document.addEventListener("DOMContentLoaded", function(){{
    "use strict";

    let canvas = document.querySelector(".canvas");
    let contexto = canvas.getContext("2d");

    const CANT_FIGURAS = 15;

    let figuras = [];
    let ultimaFiguraClickeada = null;
    let estaMouseDown = false;


    function addFigura() {
        addFicha();
        dibujarFiguras();
    }

    function dibujarFiguras() { //Borra todo y vuelve a dibujar todo
        clearCanvas();
        for (let figura of figuras) {
            figura.draw();
        }
    }

    function clearCanvas() {
        /* contexto.fillStyle = "#000000";
        contexto.fillRect(0, 0, canvas.width, canvas.height); */
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    }

    function addRectangulo() {
        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);
        let color = "#FFFFFF";

        let rectangulo = new Rectangulo(posX, posY, color, contexto, 40, 40);
        figuras.push(rectangulo);
    }

    function addFicha() {
        let posX = Math.round(Math.random() * canvas.width);
        let posY = Math.round(Math.random() * canvas.height);
        let color = "#FFFFFF";

        let ficha = new Ficha(posX, posY, color, 20, contexto);
        figuras.push(ficha);
    }

    function mouseDown(e) {
        estaMouseDown = true;

        let figuraClickeada = buscarFiguraClickeada(e.layerX, e.layerY); //layerx y layery son posiciones dentro del canvas
        if (figuraClickeada != null) {
            ultimaFiguraClickeada = figuraClickeada;
        }
        dibujarFiguras();
    }

    function buscarFiguraClickeada(x, y) { //Recorre las figuras y verifica en cada una si la posicion esta dentro de ella
        for (let figura of figuras) {
            if (figura.estaMouseDentro(x, y)) {
                return figura; //Devuelve la figura si esta dentro
            }
        }
        return null;
    }

    function mouseMove(e) { //Si el mouse esta clickeado y hay una figura clickeada se setea la pos de la figura y se vuelve a dibujar todo
        if (estaMouseDown && ultimaFiguraClickeada != null) {
            ultimaFiguraClickeada.setPos(e.layerX, e.layerY);
            dibujarFiguras();
        }
    }

    function mouseUp() { //Setea que el mouse deje de estar clickeado y a la ultima figura clickeada como null
        estaMouseDown = false;
        ultimaFiguraClickeada = null;
    }

    for (let i = 0; i < CANT_FIGURAS; i++) {
        addFigura();
    }

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
}});