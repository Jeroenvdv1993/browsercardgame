import { Player } from "./player";

let player: Player = new Player();
let resetButton = document.getElementById("reset");
let drawButton = document.getElementById("draw");
let handUl = document.getElementById("hand");
let deckUl = document.getElementById("deck");

function draw(amount: number = 1): void{
    if(player.draw(amount)){
        updateHand();
        updateDeck();
    }
    else if(handUl !== null){
        let li = document.createElement('li');
        li.setAttribute("class", "text-danger");
        li.innerHTML = "Couldn't draw enough cards from deck.";
        handUl.appendChild(li);
    }
}

function updateHand(){
    if(handUl !== null){
        while(handUl.firstChild){
            handUl.removeChild(handUl.firstChild);
        }
        for(let index: number = 0; index < player.hand.length; index++){
            let li = document.createElement('li');
            li.innerHTML = player.hand[index].name;
            handUl.appendChild(li);
        }
    }
}
function updateDeck(){
    if(deckUl !== null){
        while(deckUl.firstChild){
            deckUl.removeChild(deckUl.firstChild);
        }
        for(let index: number = 0; index < player.deck.length; index++){
            let li = document.createElement('li');
            li.innerHTML = player.deck[index].name;
            deckUl.appendChild(li);
        }
    }

}

if(resetButton !== null){
    resetButton.onclick = function () {
        player.reset();
        player.shuffle();
        draw(3);
    }
}
if(drawButton !== null){
    drawButton.onclick = function () {
        draw();
    }
}
