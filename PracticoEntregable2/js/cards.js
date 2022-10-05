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