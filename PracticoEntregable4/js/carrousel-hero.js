const btnSig = document.getElementById("btnSigCapturas");
const btnAnterior = document.getElementById("btnAnteriorCapturas");
const MAXPAG = 3;
const li = btnSig.previousElementSibling.children;
let pagina = 1;

btnSig.addEventListener("click", function(){
    if (pagina<=MAXPAG) {
        pagina++;
        for(i=0;i<li.length;i++){
            li[i].style.animation = `adelantarHastaPag${pagina} 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards`;
        }
        if(pagina>MAXPAG){btnSig.classList.add("btnApagado");}
        if(pagina!=1){btnAnterior.classList.remove("btnApagado");}
    }
});
btnAnterior.addEventListener("click", function(){
    if (pagina>1){
        pagina--;
        for(i=0;i<li.length;i++){
            li[i].style.animation = `volverHastaPag${pagina} 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards`;
        }
        if(pagina==1){btnAnterior.classList.add("btnApagado");}
        if(pagina<=MAXPAG){btnSig.classList.remove("btnApagado");}
    }
});