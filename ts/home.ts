import { Player } from "./player";
import { Card} from "./card";
import { Field } from "./field";
import { SelectedCard } from "./selectedCard";

let field1: Field = new Field(1);
let field2: Field = new Field(2);
let currentPlayer: Player | null;
let nextPlayer: Player | null;

let resetButton = document.getElementById("reset");
let playButton = document.getElementById("play");
let gameDiv = document.getElementById("game");

let playerHeader = document.getElementById("player");
let handUl = document.getElementById("hand");
let deckSpan = document.getElementById("deck");
let playzoneUl = document.getElementById("playzone");
let discardpileSpan = document.getElementById("discardpile");

let otherPlayerHeader = document.getElementById("otherPlayer");
let otherHandUl = document.getElementById("otherHand");
let otherDeckSpan = document.getElementById("otherDeck");
let otherPlayzoneUl = document.getElementById("otherPlayzone");
let otherDiscardpileSpan = document.getElementById("otherDiscardpile");

let selectedCard: SelectedCard = new SelectedCard();

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
            /*li.addEventListener('click', function(){
                playCard(player, index);
            });*/
            handUl.appendChild(li);
        }
    }
}
function updateOtherHand(otherPlayer: Player){
    if(otherHandUl !== null){
        while(otherHandUl.firstChild){
            otherHandUl.removeChild(otherHandUl.firstChild);
        }
        for(let index: number = 0; index < otherPlayer.hand.length; index++){
            let img = document.createElement("img");
            img.classList.add("img-fluid");
            img.src = "../img/cb_0.jpg";
            let li = document.createElement('li');
            li.appendChild(img);
            otherHandUl.appendChild(li);
        }
    }
}
function updateDeck(player: Player){
    if(deckSpan !== null){
        deckSpan.innerText = `${player.deck.length}`;
    }
}
function updateOtherDeck(otherPlayer: Player){
    if(otherDeckSpan !== null){
        otherDeckSpan.innerText = `${otherPlayer.deck.length}`;
    }
}
function updateDiscardpile(player: Player){
    if(discardpileSpan !== null){
        discardpileSpan.innerText = `${player.discardpile.length}`;
    }
}
function updateOtherDiscardpile(otherPlayer: Player){
    if(otherDiscardpileSpan !== null){
        otherDiscardpileSpan.innerText = `${otherPlayer.discardpile.length}`;
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
    updateOtherHand(otherPlayer);
    updateOtherDeck(otherPlayer);
    updateUnorderedList(otherPlayzoneUl, otherPlayer.playzone);
    updateOtherDiscardpile(otherPlayer);
}
function updateLists(player: Player): void{
    updateHand(player);
    updateDeck(player);
    updateUnorderedList(playzoneUl, player.playzone);
    updateDiscardpile(player);
}
function emptyLists(): void{
    emptyUnorderedList(handUl);
    emptyUnorderedList(playzoneUl);
    emptyUnorderedList(otherHandUl);
    emptyUnorderedList(otherPlayzoneUl);
    field1.emptyField();
    field2.emptyField();
}
////////////////////////
// Play functionality //
////////////////////////
function playCard(player: Player, index: number): void{
    player.play(index);
    updateLists(player);
    //field1.updateField();
    //field2.updateField();
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
            nextPlayer = field1.player;
            playButton.innerText = "Player 1";
        }
        currentPlayer = null;
    }
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
    if(currentPlayer !== null){
        if(playerHeader !== null) playerHeader.innerHTML = `Player ${currentPlayer.id}`;
        updateLists(currentPlayer);
        let otherPlayer = field2.player;
        if(otherPlayerHeader !== null) otherPlayerHeader.innerHTML = `Player ${otherPlayer.id}`;
        updateOtherLists(otherPlayer);
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
//////////////////
// Mouse Action //
//////////////////
document.onmousedown = click;
function click(event: any){
    if(event.button == 0){
        let target: any = event.target;
        let nodeName: string | null = target.nodeName;
        if(nodeName !== null){
            switch(nodeName){
                case "IMG":
                    selectCard(target);
                    break;
                case "UL":
                    moveCardToZone(target);
                    break;
                default:
                    deselectCard();
                    break;
            }
        }
    }
}

function moveCardToZone(ulNode: any){
    if(ulNode  === playzoneUl){
        if(currentPlayer !== null && selectedCard.ulIndex !== null){
            playCard(currentPlayer, selectedCard.ulIndex);
            selectedCard.empty();
        }
    }
}
function selectCard(imgNode: any){
    let origSrc: string = imgNode.src;
    let dashPos: number = origSrc.lastIndexOf("/");
    if(dashPos >=0 && dashPos < origSrc.length){
        let path: string = origSrc.substr(0, dashPos + 1);
        let filename: string = origSrc.substr(dashPos + 1);
        if(filename.slice(0,2) == "c_"){
            // Deselect old card
            if(selectedCard.image !== null){
                switchImageSelection(selectedCard.image);
            }
            // Select new card
            switchImageSelection(imgNode);
            selectedCard.image = imgNode;
            selectedCard.ulID = getSelectedUlID();
            selectedCard.ulIndex = getSelectedHandIndex();

        }
    }
}
function deselectCard(){
    if(selectedCard.image !== null){
        switchImageSelection(selectedCard.image);
        selectedCard.empty();
    }
}

function switchImageSelection(imgNode: any){
    let origSrc: string = imgNode.src;
    let dashPos: number = origSrc.lastIndexOf("/");
    if(dashPos >= 0 && dashPos < origSrc.length){
        let path: string = origSrc.substr(0, dashPos + 1);
        let filename: string = origSrc.substr(dashPos + 1);
        if(filename.slice(0,3) == "cs_"){
            filename = filename.slice(0,1) + filename.substr(2);
        }
        else if(filename.slice(0,2) == "c_"){
            filename = filename.slice(0,1) + 's' + filename.substr(1);
        }
        imgNode.src = path + filename;
    }
}

function getSelectedUlID(): string |null{
    let ul = selectedCard.image.parentNode.parentNode;
    if(ul !== null){
        if(ul.nodeName == "UL") return ul.id;
    }
    return null;
}
function getSelectedHandIndex(): number | null{
    if(selectedCard.ulID === "hand"){
        let ulItems = selectedCard.image.parentNode.parentNode.getElementsByTagName("li");
        for(let index: number = 0; index < ulItems.length; index++){
            if(ulItems[index].getElementsByTagName("img")[0] === selectedCard.image){
                return index;
            }
        }
    }
    return null;
}
