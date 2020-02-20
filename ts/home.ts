import { Player } from "./player";
import { Card} from "./card";
import { Field } from "./field";

let field1: Field = new Field(1);
let field2: Field = new Field(2);
let currentPlayer: Player | null;
let nextPlayer: Player | null;
let playerHeader = document.getElementById("player");
let gameDiv = document.getElementById("game");

let resetButton = document.getElementById("reset");
let drawButton = document.getElementById("draw");
let playButton = document.getElementById("play");

let handUl = document.getElementById("hand");
let deckUl = document.getElementById("deck");

///////////
// Reset //
///////////
function reset(): void{
    field1.reset();
    draw(field1.player, 3);

    field2.reset();
    draw(field2.player, 3);

    currentPlayer = null;
    nextPlayer = null;
    if(playerHeader !== null) playerHeader.innerHTML = "";
    if(playButton !== null){
        playButton.innerText = "Start";
        playButton.hidden = false;
    }
    if(gameDiv !== null) gameDiv.hidden = true;
    emptyLists();
}
// Start a new game
reset();

///////////
// Lists //
///////////
function updateHand(player: Player){
    if(handUl !== null){
        while(handUl.firstChild){
            handUl.removeChild(handUl.firstChild);
        }
        for(let index: number = 0; index < player.hand.length; index++){
            let img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = `../img/c_${player.hand[index].id}.jpg`;
            let li = document.createElement('li');
            li.appendChild(img);
            li.addEventListener('click', function(){
                playCard(player, index);
            });
            handUl.appendChild(li);
        }
    }
}
function updateDeck(player: Player){
    if(deckUl !== null){
        deckUl.innerText = `${player.deck.length}`;
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
}
function emptyLists(): void{
    emptyUnorderedList(handUl);
    emptyUnorderedList(deckUl);
    field1.emptyField();
    field2.emptyField();
}
////////////////////////
// Play functionality //
////////////////////////
function playCard(player: Player, id: number): void{
    player.play(id);
    draw(player);
    switchPlayer();
}

function draw(player: Player, amount: number = 1): void{
    if(player.draw(amount)){
        updateLists(player);
    }
}
function switchPlayer(){
    if(playButton !== null){
        if(currentPlayer === field1.player){
            nextPlayer = field2.player;
            playButton.innerText = "Player 2";
        }
        else{
            if(currentPlayer === field2.player) updatePoints();
            nextPlayer = field1.player;
            playButton.innerText = "Player 1";
        }
        currentPlayer = null;
        if(gameDiv !== null) gameDiv.hidden = true;
        playButton.hidden = false;
    }
}

function updatePoints(){
    //Check values and drop
    let player1Value = field1.player.playzone[field1.player.playzone.length - 1].value;
    let player2Value = field2.player.playzone[field2.player.playzone.length - 1].value;
    if(player1Value > player2Value){
        field1.player.points += 1;
    }
    else if(player2Value > player1Value){
        field2.player.points += 1;
    }
    field1.updateField();
    field2.updateField();
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
            if(playButton.innerText === "Start"){
                currentPlayer = field1.player;
                nextPlayer = null;
                if(gameDiv !== null) gameDiv.hidden = false;
                if(playerHeader !== null && currentPlayer !== null){
                    playerHeader.innerHTML = `Player ${currentPlayer.id}`;
                    updateLists(currentPlayer);
                }
                playButton.hidden = true;
            }
            else if(playButton.innerText === "Player 1" || playButton.innerText === "Player 2"){
                currentPlayer = nextPlayer;
                nextPlayer = null;
                if(gameDiv !== null) gameDiv.hidden = false;
                if(playerHeader !== null && currentPlayer !== null){
                    playerHeader.innerHTML = `Player ${currentPlayer.id}`;
                    updateLists(currentPlayer);
                }
                playButton.hidden = true;
            }
        }
    }
}
