let secoesCards = document.querySelectorAll(".cards");
let board = document.querySelector("#board");

let numeroDeImagens = 10;
let arrayNumeros = criarArrayNumerica(1, numeroDeImagens);

let dadosJogo = {
    cartasViradas : [],
}

setarImagensNasDivs();

secoesCards.forEach(card => {
    card.addEventListener(`click`, acaoDoJogo);
});

function acaoDoJogo(){
    let imagemDaDiv = this.children[0];
        imagemDaDiv.className = "exibir";

        if (verificarJogo()){
            if (verificarMesmasImagens()){
                secoesCards.forEach(card => {
                    dadosJogo.cartasViradas.forEach(cardVirada => {
                        if (card.children[0] == cardVirada){
                            card.children[0].className = "";
                            card.removeEventListener(`click`, acaoDoJogo);
                        }
                    });
                    
                });
            }else {
                // console.log("diferentes");
                if (dadosJogo.cartasViradas.length > 2){
                    dadosJogo.cartasViradas.forEach(card => {
                        card.className = "esconder";
                    });
                }
            }
        }
    }

function verificarJogo(){
    let qtasViradas = 0;
    dadosJogo.cartasViradas = [];
    secoesCards.forEach(card => {
        if (card.children[0].className == "exibir"){
            qtasViradas++;
            dadosJogo.cartasViradas.push(card.children[0]);
        }
    });

    return qtasViradas >= 2;
}

function verificarMesmasImagens(){
    return dadosJogo.cartasViradas[0].src == dadosJogo.cartasViradas[1].src;
}

function setarImagensNasDivs(){
    secoesCards.forEach(card => {
        let img = criarElemento("img", sortearImagem(), "", card);
        img.classList.add("esconder");
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