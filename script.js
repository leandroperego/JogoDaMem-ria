let backs = document.querySelectorAll(".back");
let board = document.querySelector("#board");

let numeroDeImagens = 10;
let arrayNumeros = criarArrayNumerica(1, numeroDeImagens);

let dadosJogo = {
    cartasViradas : [],
    bloquearCliques: false,
}

iniciarTempo();
setarImagensNasDivs();

backs.forEach(back => {
        back.parentElement.addEventListener(`click`, acaoDoJogo);
});


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
                            }
                            setTimeout(()=>{
                                cardVirada.classList.add("opacity");
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
    console.log(qtasViradas)
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
    let spanMinutos = document.querySelector("#minutos");
    let spanSegundos = document.querySelector("#segundos");

    setInterval(function(){
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
    },1000);
}