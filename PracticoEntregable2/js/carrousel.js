let botonesSig = document.querySelectorAll('.btnCarrouselSig');
let botonesAtras= document.querySelectorAll('.btnCarrouselAtras');
const numeroDePaginas = 3;// numero de paginas por carrousel, si el numero de paginas cambia en el dom, debemos cambiarlo manualmente aca

for(let i=0;i<botonesSig.length;i++){
    botonesSig[i].addEventListener("click", function(){
        let ultimaClase = botonesSig[i].classList[botonesSig[i].classList.length-1];
        if(ultimaClase != "btnApagado"){
            let li = botonesSig[i].previousElementSibling.children;
            let liClaseAcual = li[0].classList[0];
            let paginaActual = parseInt(liClaseAcual.charAt(liClaseAcual.length-1))+1;

            for(j=0;j<li.length;j++){
                li[j].classList.remove(liClaseAcual);
                li[j].classList.add("pagina"+paginaActual);
            }

            if(paginaActual == numeroDePaginas){
                botonesSig[i].classList.add("btnApagado");
            }
            if(paginaActual != 1){
                botonesSig[i].previousElementSibling.previousElementSibling.classList.remove("btnApagado");
            }
        }
    });
}

for(let i=0;i<botonesAtras.length;i++){
    botonesAtras[i].addEventListener("click", function(){
        let ultimaClase = botonesAtras[i].classList[botonesAtras[i].classList.length-1];
        if(ultimaClase != "btnApagado"){
            let li = botonesAtras[i].nextElementSibling.children;
            let liClaseAcual = li[0].classList[0];
            let paginaActual = parseInt(liClaseAcual.charAt(liClaseAcual.length-1))-1;

            for(j=0;j<li.length;j++){
                li[j].classList.remove(liClaseAcual);
                li[j].classList.add("pagina"+paginaActual);
            }  

            if(paginaActual == 1){
                botonesAtras[i].classList.add("btnApagado");
            }
            if(paginaActual != numeroDePaginas){
                botonesAtras[i].nextElementSibling.nextElementSibling.classList.remove("btnApagado");
            }
        }
    });
}