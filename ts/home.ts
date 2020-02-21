import { Player } from "./player";
import { Card} from "./card";
import { Field } from "./field";
import { SelectedCard } from "./selectedCard";

let player1: Player = new Player(1);
let player2: Player = new Player(2);
let currentPlayer: Player | null;
let nextPlayer: Player | null;

let resetButton = document.getElementById("reset");
let playButton = document.getElementById("play");
let gameDiv = document.getElementById("game");

let playerField: Field = new Field(
    "player",
    "hand",
    "deck",
    "playzone",
    "energyzone",
    "discardpile"
);

let otherPlayerField: Field = new Field(
    "otherPlayer",
    "otherHand",
    "otherDeck",
    "otherPlayzone",
    "otherEnergyzone",
    "otherDiscardpile"
);

let selectedCard: SelectedCard = new SelectedCard();

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
    playerField.setPlayerHeader("");
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
    if(playerField.handUL !== null){
        playerField.clearHandUL();
        for(let index: number = 0; index < player.hand.length; index++){
            let img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = `../img/c_${player.hand[index].id}.jpg`;
            let li = document.createElement('li');
            li.appendChild(img);
            playerField.handUL.appendChild(li);
        }
    }
}
function updateOtherHand(otherPlayer: Player){
    if(otherPlayerField.handUL !== null){
        otherPlayerField.clearHandUL();
        for(let index: number = 0; index < otherPlayer.hand.length; index++){
            let img = document.createElement("img");
            img.classList.add("img-fluid");
            img.src = "../img/cb_0.jpg";
            let li = document.createElement('li');
            li.appendChild(img);
            otherPlayerField.handUL.appendChild(li);
        }
    }
}

function updateOtherLists(otherPlayer: Player): void {
    updateOtherHand(otherPlayer);
    otherPlayerField.setDeckSpan(`${otherPlayer.deck.length}`);
    updateUnorderedList(otherPlayerField.playzoneUL, otherPlayer.playzone);
    updateUnorderedList(otherPlayerField.energyzoneUL, otherPlayer.energyzone);
    otherPlayerField.setDiscardpileSpan(`${otherPlayer.discardpile.length}`)
}
function updateLists(player: Player): void{
    updateHand(player);
    playerField.setDeckSpan(`${player.deck.length}`);
    updateUnorderedList(playerField.playzoneUL, player.playzone);
    updateUnorderedList(playerField.energyzoneUL, player.energyzone);
    playerField.setDiscardpileSpan(`${player.discardpile.length}`);
}
function emptyLists(): void{
    playerField.clearHandUL();
    playerField.clearPlayzoneUL();
    playerField.clearEnergyzoneUL();
    otherPlayerField.clearHandUL();
    otherPlayerField.clearPlayzoneUL();
    otherPlayerField.clearEnergyzoneUL();
}
////////////////////////
// Play functionality //
////////////////////////
function playCard(player: Player, index: number): void{
    player.play(index);
    updateLists(player);
}

function energyCard(player: Player, index: number): void{
    player.energy(index);
    updateLists(player);
}
function draw(player: Player, amount: number = 1): void{
    if(player.draw(amount)){
        updateLists(player);
    }
}
function endTurn(){
    if(gameDiv !== null) gameDiv.hidden = true;
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
    }
}

function switchPlayer(){
    currentPlayer = nextPlayer;
    nextPlayer = null;
    if(currentPlayer !== null){
        draw(currentPlayer, 3);
        playerField.setPlayerHeader(`Player ${currentPlayer.id}`);
        updateLists(currentPlayer);
    }
    if(currentPlayer !== null){
        let otherPlayer: Player | null = null;
        if(currentPlayer.id === 1){
            otherPlayer = player2;
        }
        else{
            otherPlayer = player1;
        }
        if(otherPlayer !== null){
            otherPlayerField.setPlayerHeader(`Player ${otherPlayer.id}`);
            updateOtherLists(otherPlayer);
        }
    }
    if(gameDiv !== null) gameDiv.hidden = false;
    if(playButton !== null) playButton.innerText = "End Turn";
}
function  startPlayer() {
    currentPlayer = player1;
    nextPlayer = null;
    if(currentPlayer !== null){
        playerField.setPlayerHeader(`Player ${currentPlayer.id}`);
        updateLists(currentPlayer);
        let otherPlayer = player2;
        otherPlayerField.setPlayerHeader(`Player ${otherPlayer.id}`);
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
    if(ulNode  === playerField.playzoneUL){
        if(currentPlayer !== null && selectedCard.ulIndex !== null){
            playCard(currentPlayer, selectedCard.ulIndex);
            selectedCard.empty();
        }
    }
    else if(ulNode === playerField.energyzoneUL){
        if(currentPlayer !== null && selectedCard.ulIndex !== null){
            energyCard(currentPlayer, selectedCard.ulIndex);
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
