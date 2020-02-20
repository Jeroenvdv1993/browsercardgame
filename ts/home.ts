import { Player } from "./player";
import { Card} from "./card";

let player1: Player = new Player(1);
let player2: Player = new Player(2);
let currentPlayer: Player | null;
let nextPlayer: Player | null;
let playerHeader = document.getElementById("player");
let gameDiv = document.getElementById("game");

let resetButton = document.getElementById("reset");
let drawButton = document.getElementById("draw");
let playButton = document.getElementById("play");

let handUl = document.getElementById("hand");
let deckUl = document.getElementById("deck");
let playzone1Ul = document.getElementById("playzone1");
let playzone2Ul = document.getElementById("playzone2");

let points1Span = document.getElementById("points1");
let points2Span = document.getElementById("points2");

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
    if(playerHeader !== null) playerHeader.innerHTML = "";
    if(playButton !== null){
        playButton.innerText = "Start";
        playButton.hidden = false;
    }
    if(gameDiv !== null) gameDiv.hidden = true;
    if(points1Span !== null) points1Span.innerText = `${player1.points}`;
    if(points2Span !== null) points2Span.innerText = `${player2.points}`;
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
        if(currentPlayer === player1){
            nextPlayer = player2;
            playButton.innerText = "Player 2";
        }
        else{
            nextPlayer = player1;
            playButton.innerText = "Player 1";
        }
        currentPlayer = null;
        if(gameDiv !== null) gameDiv.hidden = true;
        playButton.hidden = false;
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
            if(playButton.innerText === "Start"){
                currentPlayer = player1;
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
