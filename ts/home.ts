import { Player } from "./player";
import { Card} from "./card";
import { Field } from "./field";

let field1: Field = new Field(1);
let field2: Field = new Field(2);
let currentPlayer: Player | null;
let nextPlayer: Player | null;
let playerHeader = document.getElementById("player");

let resetButton = document.getElementById("reset");
let playButton = document.getElementById("play");
let gameDiv = document.getElementById("game");

let handUl = document.getElementById("hand");
let deckUl = document.getElementById("deck");
let playzoneUl = document.getElementById("playzone");
let discardpileUl = document.getElementById("discardpile");

let otherPlayerHeader = document.getElementById("otherPlayer");
let otherPlayzoneUl = document.getElementById("otherPlayzone");
let otherDiscardpileUl = document.getElementById("otherDiscardpile");

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
    if(playButton !== null) playButton.innerText = "Start";
    if(gameDiv !== null) gameDiv.hidden = true;
    emptyLists();
}
// Start a new game
reset();

///////////
// Lists //
///////////
function updateUnorderedList(unorderedList: HTMLElement | null, array: Card[]): void{
    if(unorderedList !== null){
        while(unorderedList.firstChild){
            unorderedList.removeChild(unorderedList.firstChild);
        }
        for(let index: number = 0; index < array.length; index++){
            let img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = `../img/c_${array[index].id}.jpg`;
            let li = document.createElement('li');
            li.appendChild(img);
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
function updateOtherLists(otherPlayer: Player): void {
    updateUnorderedList(otherPlayzoneUl, otherPlayer.playzone);
    updateUnorderedList(otherDiscardpileUl, otherPlayer.discardpile);
}
function updateLists(player: Player): void{
    updateHand(player);
    updateDeck(player);
    updateUnorderedList(playzoneUl, player.playzone);
    updateUnorderedList(discardpileUl, player.discardpile);
}
function emptyLists(): void{
    emptyUnorderedList(handUl);
    emptyUnorderedList(deckUl);
    emptyUnorderedList(playzoneUl);
    emptyUnorderedList(discardpileUl);
    emptyUnorderedList(otherPlayzoneUl);
    emptyUnorderedList(otherDiscardpileUl);
    field1.emptyField();
    field2.emptyField();
}
////////////////////////
// Play functionality //
////////////////////////
function playCard(player: Player, index: number): void{
    player.play(index);
    updateLists(player);
    field1.updateField();
    field2.updateField();
}

function draw(player: Player, amount: number = 1): void{
    if(player.draw(amount)){
        updateLists(player);
    }
}
function endTurn(){
    if(gameDiv !== null) gameDiv.hidden = true;
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
    }
}

function updatePoints(){
    //Check values and drop
    /*let player1Value = field1.player.playzone[field1.player.playzone.length - 1].value;
    let player2Value = field2.player.playzone[field2.player.playzone.length - 1].value;
    if(player1Value > player2Value){
        field1.player.points += 1;
    }
    else if(player2Value > player1Value){
        field2.player.points += 1;
    }
    field1.updateField();
    field2.updateField();*/
}
function switchPlayer(){
    currentPlayer = nextPlayer;
    nextPlayer = null;
    if(currentPlayer !== null) draw(currentPlayer, 3);
    if(playerHeader !== null && currentPlayer !== null){
        playerHeader.innerHTML = `Player ${currentPlayer.id}`;
        updateLists(currentPlayer);
    }
    if(currentPlayer !== null){
        let otherPlayer: Player | null = null;
        if(currentPlayer.id === 1){
            otherPlayer = field2.player;
        }
        else{
            otherPlayer = field1.player;
        }
        if(otherPlayerHeader !== null && otherPlayer !== null){
            otherPlayerHeader.innerHTML = `Player ${otherPlayer?.id}`;
            updateOtherLists(otherPlayer);
        }
    }
    if(gameDiv !== null) gameDiv.hidden = false;
    if(playButton !== null) playButton.innerText = "End Turn";
}
function  startPlayer() {
    currentPlayer = field1.player;
    nextPlayer = null;
    if(playerHeader !== null && currentPlayer !== null){
        playerHeader.innerHTML = `Player ${currentPlayer.id}`;
        updateLists(currentPlayer);
    }
    if(gameDiv !== null) gameDiv.hidden = false;
    if(playButton !== null) playButton.innerText = "End Turn";
}
/////////////
// Buttons //
/////////////
if(resetButton !== null){
    resetButton.onclick = function () {
        reset();
    }
}
if(playButton !== null){
    playButton.onclick = function(){
        if(playButton !== null){
            switch(playButton.innerText){
                case "Start":
                    startPlayer();
                    break;
                case "Player 1":
                case "Player 2":
                    switchPlayer();
                    break;
                case "End Turn":
                    endTurn();
                    break;
            }
        }
    }
}
