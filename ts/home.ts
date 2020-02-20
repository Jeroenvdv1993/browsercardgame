import { Player } from "./player";
import { Card} from "./card";

let player1: Player = new Player(1);
let player2: Player = new Player(2);
let currentPlayer: Player | null;
let nextPlayer: Player | null;
let playerHeader = document.getElementById("player");

let resetButton = document.getElementById("reset");
let drawButton = document.getElementById("draw");
let playButton = document.getElementById("play");

let handUl = document.getElementById("hand");
let deckUl = document.getElementById("deck");
let playzone1Ul = document.getElementById("playzone1");
let playzone2Ul = document.getElementById("playzone2");

///////////
// Reset //
///////////
function reset(): void{
    player1.reset();
    player1.shuffle();
    draw(player1, 3);

    player2.reset();
    player2.shuffle();
    draw(player2, 3);
    currentPlayer = null;
    nextPlayer = null;
    if(playerHeader !== null){
        playerHeader.innerHTML = "";
    }
    emptyLists();
}
// Start a new game
reset();

///////////
// Lists //
///////////
function updateUnorderedList(unorderedList: HTMLElement, array: Card[]){
    if(unorderedList !== null){
        while(unorderedList.firstChild){
            unorderedList.removeChild(unorderedList.firstChild);
        }
        for(let index: number = 0; index < array.length; index++){
            let li = document.createElement('li');
            li.innerHTML = array[index].name;
            unorderedList.appendChild(li);
        }
    }
}
function updateHand(player: Player){
    if(handUl !== null){
        while(handUl.firstChild){
            handUl.removeChild(handUl.firstChild);
        }
        for(let index: number = 0; index < player.hand.length; index++){
            let li = document.createElement('li');
            li.innerHTML = player.hand[index].name;
            li.addEventListener('click', function(){
                playCard(player, player.hand[index].id);
            });
            handUl.appendChild(li);
        }
    }
}
function updateDeck(player: Player){
    if(deckUl !== null){
        updateUnorderedList(deckUl, player.deck);
    }
}

function updatePlayzone(){
    if(playzone1Ul !== null){
        updateUnorderedList(playzone1Ul, player1.playzone);
    }
    if(playzone2Ul !== null){
        updateUnorderedList(playzone2Ul, player2.playzone);
    }
}
function emptyUnorderedList(unorderedList: HTMLElement | null){
    if(unorderedList !== null){
        while(unorderedList.firstChild){
            unorderedList.removeChild(unorderedList.firstChild);
        }
    }
}
function updateLists(player: Player): void{
    updateHand(player);
    updateDeck(player);
    updatePlayzone();
}
function emptyLists(): void{
    emptyUnorderedList(handUl);
    emptyUnorderedList(deckUl);
    emptyUnorderedList(playzone1Ul);
    emptyUnorderedList(playzone2Ul);
}
////////////////////////
// Play functionality //
////////////////////////
function playCard(player: Player, id: number): void{
    player.play(id);
    updateLists(player);
}

function draw(player: Player, amount: number = 1): void{
    if(player.draw(amount)){
        updateLists(player);
    }
    else if(handUl !== null){
        let li = document.createElement('li');
        li.setAttribute("class", "text-danger");
        li.innerHTML = "Couldn't draw enough cards from deck.";
        handUl.appendChild(li);
    }
}
/////////////
// Buttons //
/////////////
if(resetButton !== null){
    resetButton.onclick = function () {
        reset();
    }
}
if(drawButton !== null){
    drawButton.onclick = function () {
        if(currentPlayer !== null) draw(currentPlayer);
    }
}
if(playButton !== null){
    playButton.onclick = function(){
        if(playButton !== null){
            if(playButton.innerText === "Player 1" || playButton.innerText === "Player 2"){
                currentPlayer = nextPlayer;
                nextPlayer = null;
                playButton.innerText = "Switch";
            }
            else{
                if(currentPlayer === player1){
                    currentPlayer = null;
                    nextPlayer = player2;
                    playButton.innerText = "Player 2";
                }
                else{
                    currentPlayer = null;
                    nextPlayer = player1;
                    playButton.innerText = "Player 1";
                }
            }
        }
        if(playerHeader !== null && currentPlayer !== null){
            playerHeader.innerHTML = `Player ${currentPlayer.id}`;
            updateLists(currentPlayer);
        }
        else if(playerHeader !== null){
            playerHeader.innerHTML = "";
            emptyLists();
        }
    }
}
