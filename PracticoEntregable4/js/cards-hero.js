let contenedorCards = document.querySelector(".contenedorCards");
for (let li of contenedorCards.children) {
    li.addEventListener("click", function() {

        if (!li.firstElementChild.classList.contains("visible")) {
            li.firstElementChild.classList.add("visible");
            li.firstElementChild.nextElementSibling.classList.add("no-visible");
        } else {
            li.firstElementChild.classList.remove("visible");
            li.firstElementChild.nextElementSibling.classList.remove("no-visible");
        }
    });
}