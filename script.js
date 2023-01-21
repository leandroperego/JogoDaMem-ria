let backs = document.querySelectorAll(".back");
let board = document.querySelector("#board");

let numeroDeImagens = 10;
let arrayNumeros;
let dadosJogo = {};
dadosJogo.jaViradas = [];
dadosJogo.cartasViradas = [];
let verificarFim = null;

novoJogo();

document.querySelector("#btnNovoJogo").addEventListener(`click`, novoJogo);
//-------------------------------------------------------------

function novoJogo(){
    virarTodasAsCartas();
    arrayNumeros = criarArrayNumerica(1, numeroDeImagens);
    zerarTodosInterval();
    dadosJogo = {
        cartasViradas : [],
        bloquearCliques: false,
        jaViradas: [],
        intervalTempoRodando : null,
        tempoDeJogo: {minutos, segundos},
    }

    iniciarTempo();
    setTimeout(setarImagensNasDivs,500);

    backs.forEach(back => {
        back.parentElement.addEventListener(`click`, acaoDoJogo);
    });

    verificarFim = setInterval(() => {
        if(verificarJogoAcabou()){
            clearInterval(verificarFim);
            alert(`Parabéns! Você levou ${dadosJogo.tempoDeJogo.minutos} minutos e ${dadosJogo.tempoDeJogo.segundos} segundos. Será que você consegue um tempo menor? Clique em novo jogo e boa sorte`);
            pararTempo();
        }
    }, 500);
}

function acaoDoJogo(){
    
    if (!dadosJogo.bloquearCliques){
        this.style.transform = "rotateY(180deg)";
        this.children[1].classList.add("virada");
    
            if (verificarJogo()){
                if (verificarMesmasImagens()){
                    backs.forEach(back => {
                        dadosJogo.cartasViradas.forEach(cardVirada => {
                            if (back == cardVirada){
                                back.classList.remove("virada");
                                back.parentElement.removeEventListener(`click`, acaoDoJogo);
                                dadosJogo.jaViradas.push(cardVirada.parentElement);
                            }

                            setTimeout(()=>{
                                cardVirada.classList.add("opacity");
                                cardVirada.parentElement.children[0].classList.add("opacity");
                            }, 800);
                        });
                        
                    });

                }else {
                    dadosJogo.bloquearCliques = true;
                    let intervalo = setInterval(function(){
                        dadosJogo.cartasViradas.forEach(card => {
                            card.parentElement.style.transform = "rotateY(0)";
                            card.classList.remove("virada");
                            clearInterval(intervalo);
                            dadosJogo.bloquearCliques = false;
                        });
                    }, 1000);
    
                }
            }
    }
    }

function verificarJogo(){
    let qtasViradas = 0;
    dadosJogo.cartasViradas = [];
    backs.forEach(back => {
        if (back.classList.contains("virada")){
            qtasViradas++;
            dadosJogo.cartasViradas.push(back);
        }
    });
    return qtasViradas == 2;
}

function verificarMesmasImagens(){
    return dadosJogo.cartasViradas[0].style.backgroundImage == dadosJogo.cartasViradas[1].style.backgroundImage;
}

function setarImagensNasDivs(){
    backs.forEach(div => {
        div.style.backgroundImage = `url(${sortearImagem()})`;
    })
}

function criarElemento(tag, src, alt, parentInsert){
    let elemento = document.createElement(tag);
    elemento.src = src;
    elemento.alt = alt;
    parentInsert.appendChild(elemento);

    return elemento;
}

function sortearImagem(){
    let imagemSrc;

    let indiceSorteado = arrayNumeros.splice(sortear(arrayNumeros.length),1);
    imagemSrc = `imagens/${indiceSorteado}.png`;

    return imagemSrc;
}

//-------------------------------------------

function verificarJogoAcabou(){
    return dadosJogo.jaViradas.length == 20;
}

function criarArrayNumerica(inicio, fim){
    let array = [];
    while(array.length < 20){
        for (var i = inicio; i <= fim; i++){
            array.push(i);
        }
    }

    return array;
}

function sortear(limite){
    return Math.floor(Math.random() * limite);
}

function iniciarTempo(){
    zerarTempo();
    let spanMinutos = document.querySelector("#minutos");
    let spanSegundos = document.querySelector("#segundos");

    dadosJogo.intervalTempoRodando = setInterval(function(){
        let segundos = +spanSegundos.textContent;
        let minutos = +spanMinutos.textContent;
        
        segundos++;
        if (segundos < 10){
            spanSegundos.textContent = `0${segundos}`;
        }else{
            spanSegundos.textContent = segundos;
        }

        if(segundos == 60){
            spanSegundos.textContent = "00";
            minutos++;

            if (minutos < 10){
                spanMinutos.textContent = `0${minutos}`;
            }else{
                spanMinutos.textContent = minutos;
            }
        }
        dadosJogo.tempoDeJogo.minutos = minutos;
        dadosJogo.tempoDeJogo.segundos = segundos;
    },1000);
}

function zerarTempo(){
    document.querySelector("#minutos").textContent = "00";
    document.querySelector("#segundos").textContent = "00";

}

function pararTempo(){
    clearInterval(dadosJogo.intervalTempoRodando);
    return dadosJogo.tempoDeJogo;
}

function zerarTodosInterval(){
    if (dadosJogo.intervalTempoRodando != null) clearInterval(dadosJogo.intervalTempoRodando);

    if (verificarFim != null) clearInterval(verificarFim);
}

function virarTodasAsCartas(){

    if(dadosJogo.cartasViradas.length != 0){
        dadosJogo.cartasViradas.forEach(card => {
            card.parentElement.style.transform = "rotateY(0)";
        });
    }

    if (dadosJogo.jaViradas.length != 0){
        dadosJogo.jaViradas.forEach(card => {
            card.classList.add("notransition");
            // card.style.transform = "rotateY(0)";
            // card.style.transition = "transform 0s";
            card.className = "cards";
            card.children[0].className = "front";
            card.children[1].className = "back";
        });
    }
}
