let contenedoresCards = document.querySelectorAll(".contenedorCards");
for (let i = 0; i < contenedoresCards.length; i++) {
    for (let j = 0; j < contenedoresCards[i].children.length; j++) {
        contenedoresCards[i].children[j].addEventListener("mouseover", function(){
            contenedoresCards[i].children[j].lastElementChild.classList.add("visible");
        });
        contenedoresCards[i].children[j].addEventListener("mouseout", function(){
            contenedoresCards[i].children[j].lastElementChild.classList.remove("visible");
        });
    }
}

let cardsMasJugados = document.querySelectorAll(".cards-mas-jugados");
for (let i = 0; i < cardsMasJugados.length; i++) {
    for (let j = 0; j < cardsMasJugados[i].children.length; j++) {
        cardsMasJugados[i].children[j].addEventListener("mouseover", function(){
            cardsMasJugados[i].children[j].lastElementChild.classList.add("visible");
        });
        cardsMasJugados[i].children[j].addEventListener("mouseout", function(){
            cardsMasJugados[i].children[j].lastElementChild.classList.remove("visible");
        });
    }
}