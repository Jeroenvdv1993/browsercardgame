(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
    return Card;
}());
exports.Card = Card;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var Field = /** @class */ (function () {
    /////////////////
    // Constructor //
    /////////////////
    function Field(id) {
        this.player = new player_1.Player(id);
        this.playzone = document.getElementById("playzone" + id);
        this.discardpile = document.getElementById("discardpile" + id);
        this.points = document.getElementById("points" + id);
    }
    ;
    ///////////
    // Reset //
    ///////////
    Field.prototype.reset = function () {
        this.player.reset();
        this.player.shuffle();
        this.updateField();
    };
    ////////////
    // Update //
    ////////////
    Field.prototype.updateField = function () {
        this.updateUnorderedList(this.playzone, this.player.playzone);
        this.updateUnorderedList(this.discardpile, this.player.discardpile);
        if (this.points !== null)
            this.points.innerText = "" + this.player.points;
    };
    Field.prototype.updateUnorderedList = function (unorderedList, array) {
        if (unorderedList !== null) {
            while (unorderedList.firstChild) {
                unorderedList.removeChild(unorderedList.firstChild);
            }
            for (var index = 0; index < array.length; index++) {
                var img = document.createElement('img');
                img.classList.add("img-fluid");
                img.src = "../img/c_" + array[index].id + ".jpg";
                var li = document.createElement('li');
                li.appendChild(img);
                unorderedList.appendChild(li);
            }
        }
    };
    ///////////
    // Empty //
    ///////////
    Field.prototype.emptyField = function () {
        this.emptyUnorderedList(this.playzone);
        this.emptyUnorderedList(this.discardpile);
    };
    Field.prototype.emptyUnorderedList = function (unorderedList) {
        if (unorderedList !== null) {
            while (unorderedList.firstChild) {
                unorderedList.removeChild(unorderedList.firstChild);
            }
        }
    };
    return Field;
}());
exports.Field = Field;

},{"./player":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = require("./field");
var selectedCard_1 = require("./selectedCard");
var field1 = new field_1.Field(1);
var field2 = new field_1.Field(2);
var currentPlayer;
var nextPlayer;
var resetButton = document.getElementById("reset");
var playButton = document.getElementById("play");
var gameDiv = document.getElementById("game");
var playerHeader = document.getElementById("player");
var handUl = document.getElementById("hand");
var deckSpan = document.getElementById("deck");
var playzoneUl = document.getElementById("playzone");
var discardpileSpan = document.getElementById("discardpile");
var otherPlayerHeader = document.getElementById("otherPlayer");
var otherHandUl = document.getElementById("otherHand");
var otherDeckSpan = document.getElementById("otherDeck");
var otherPlayzoneUl = document.getElementById("otherPlayzone");
var otherDiscardpileSpan = document.getElementById("otherDiscardpile");
var selectedCard = new selectedCard_1.SelectedCard();
///////////
// Reset //
///////////
function reset() {
    field1.reset();
    draw(field1.player, 3);
    field2.reset();
    draw(field2.player, 3);
    currentPlayer = null;
    nextPlayer = null;
    if (playerHeader !== null)
        playerHeader.innerHTML = "";
    if (playButton !== null)
        playButton.innerText = "Start";
    if (gameDiv !== null)
        gameDiv.hidden = true;
    emptyLists();
}
// Start a new game
reset();
///////////
// Lists //
///////////
function updateUnorderedList(unorderedList, array) {
    if (unorderedList !== null) {
        while (unorderedList.firstChild) {
            unorderedList.removeChild(unorderedList.firstChild);
        }
        for (var index = 0; index < array.length; index++) {
            var img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = "../img/c_" + array[index].id + ".jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            unorderedList.appendChild(li);
        }
    }
}
function updateHand(player) {
    if (handUl !== null) {
        while (handUl.firstChild) {
            handUl.removeChild(handUl.firstChild);
        }
        for (var index = 0; index < player.hand.length; index++) {
            var img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = "../img/c_" + player.hand[index].id + ".jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            /*li.addEventListener('click', function(){
                playCard(player, index);
            });*/
            handUl.appendChild(li);
        }
    }
}
function updateOtherHand(otherPlayer) {
    if (otherHandUl !== null) {
        while (otherHandUl.firstChild) {
            otherHandUl.removeChild(otherHandUl.firstChild);
        }
        for (var index = 0; index < otherPlayer.hand.length; index++) {
            var img = document.createElement("img");
            img.classList.add("img-fluid");
            img.src = "../img/cb_0.jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            otherHandUl.appendChild(li);
        }
    }
}
function updateDeck(player) {
    if (deckSpan !== null) {
        deckSpan.innerText = "" + player.deck.length;
    }
}
function updateOtherDeck(otherPlayer) {
    if (otherDeckSpan !== null) {
        otherDeckSpan.innerText = "" + otherPlayer.deck.length;
    }
}
function updateDiscardpile(player) {
    if (discardpileSpan !== null) {
        discardpileSpan.innerText = "" + player.discardpile.length;
    }
}
function updateOtherDiscardpile(otherPlayer) {
    if (otherDiscardpileSpan !== null) {
        otherDiscardpileSpan.innerText = "" + otherPlayer.discardpile.length;
    }
}
function emptyUnorderedList(unorderedList) {
    if (unorderedList !== null) {
        while (unorderedList.firstChild) {
            unorderedList.removeChild(unorderedList.firstChild);
        }
    }
}
function updateOtherLists(otherPlayer) {
    updateOtherHand(otherPlayer);
    updateOtherDeck(otherPlayer);
    updateUnorderedList(otherPlayzoneUl, otherPlayer.playzone);
    updateOtherDiscardpile(otherPlayer);
}
function updateLists(player) {
    updateHand(player);
    updateDeck(player);
    updateUnorderedList(playzoneUl, player.playzone);
    updateDiscardpile(player);
}
function emptyLists() {
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
function playCard(player, index) {
    player.play(index);
    updateLists(player);
    //field1.updateField();
    //field2.updateField();
}
function draw(player, amount) {
    if (amount === void 0) { amount = 1; }
    if (player.draw(amount)) {
        updateLists(player);
    }
}
function endTurn() {
    if (gameDiv !== null)
        gameDiv.hidden = true;
    if (playButton !== null) {
        if (currentPlayer === field1.player) {
            nextPlayer = field2.player;
            playButton.innerText = "Player 2";
        }
        else {
            nextPlayer = field1.player;
            playButton.innerText = "Player 1";
        }
        currentPlayer = null;
    }
}
function switchPlayer() {
    var _a;
    currentPlayer = nextPlayer;
    nextPlayer = null;
    if (currentPlayer !== null)
        draw(currentPlayer, 3);
    if (playerHeader !== null && currentPlayer !== null) {
        playerHeader.innerHTML = "Player " + currentPlayer.id;
        updateLists(currentPlayer);
    }
    if (currentPlayer !== null) {
        var otherPlayer = null;
        if (currentPlayer.id === 1) {
            otherPlayer = field2.player;
        }
        else {
            otherPlayer = field1.player;
        }
        if (otherPlayerHeader !== null && otherPlayer !== null) {
            otherPlayerHeader.innerHTML = "Player " + ((_a = otherPlayer) === null || _a === void 0 ? void 0 : _a.id);
            updateOtherLists(otherPlayer);
        }
    }
    if (gameDiv !== null)
        gameDiv.hidden = false;
    if (playButton !== null)
        playButton.innerText = "End Turn";
}
function startPlayer() {
    currentPlayer = field1.player;
    nextPlayer = null;
    if (currentPlayer !== null) {
        if (playerHeader !== null)
            playerHeader.innerHTML = "Player " + currentPlayer.id;
        updateLists(currentPlayer);
        var otherPlayer = field2.player;
        if (otherPlayerHeader !== null)
            otherPlayerHeader.innerHTML = "Player " + otherPlayer.id;
        updateOtherLists(otherPlayer);
    }
    if (gameDiv !== null)
        gameDiv.hidden = false;
    if (playButton !== null)
        playButton.innerText = "End Turn";
}
/////////////
// Buttons //
/////////////
if (resetButton !== null) {
    resetButton.onclick = function () {
        reset();
    };
}
if (playButton !== null) {
    playButton.onclick = function () {
        if (playButton !== null) {
            switch (playButton.innerText) {
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
    };
}
//////////////////
// Mouse Action //
//////////////////
document.onmousedown = click;
function click(event) {
    if (event.button == 0) {
        var target = event.target;
        var nodeName = target.nodeName;
        if (nodeName !== null) {
            switch (nodeName) {
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
function moveCardToZone(ulNode) {
    if (ulNode === playzoneUl) {
        if (currentPlayer !== null && selectedCard.ulIndex !== null) {
            playCard(currentPlayer, selectedCard.ulIndex);
            selectedCard.empty();
        }
    }
}
function selectCard(imgNode) {
    var origSrc = imgNode.src;
    var dashPos = origSrc.lastIndexOf("/");
    if (dashPos >= 0 && dashPos < origSrc.length) {
        var path = origSrc.substr(0, dashPos + 1);
        var filename = origSrc.substr(dashPos + 1);
        if (filename.slice(0, 2) == "c_") {
            // Deselect old card
            if (selectedCard.image !== null) {
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
function deselectCard() {
    if (selectedCard.image !== null) {
        switchImageSelection(selectedCard.image);
        selectedCard.empty();
    }
}
function switchImageSelection(imgNode) {
    var origSrc = imgNode.src;
    var dashPos = origSrc.lastIndexOf("/");
    if (dashPos >= 0 && dashPos < origSrc.length) {
        var path = origSrc.substr(0, dashPos + 1);
        var filename = origSrc.substr(dashPos + 1);
        if (filename.slice(0, 3) == "cs_") {
            filename = filename.slice(0, 1) + filename.substr(2);
        }
        else if (filename.slice(0, 2) == "c_") {
            filename = filename.slice(0, 1) + 's' + filename.substr(1);
        }
        imgNode.src = path + filename;
    }
}
function getSelectedUlID() {
    var ul = selectedCard.image.parentNode.parentNode;
    if (ul !== null) {
        if (ul.nodeName == "UL")
            return ul.id;
    }
    return null;
}
function getSelectedHandIndex() {
    if (selectedCard.ulID === "hand") {
        var ulItems = selectedCard.image.parentNode.parentNode.getElementsByTagName("li");
        for (var index = 0; index < ulItems.length; index++) {
            if (ulItems[index].getElementsByTagName("img")[0] === selectedCard.image) {
                return index;
            }
        }
    }
    return null;
}

},{"./field":2,"./selectedCard":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./card");
var shuffle_1 = require("./shuffle");
var Player = /** @class */ (function () {
    function Player(id) {
        this.hand = [];
        this.deck = [];
        this.playzone = [];
        this.discardpile = [];
        this.points = 0;
        this.id = id;
        this.reset();
    }
    Player.prototype.shuffle = function () {
        shuffle_1.shuffle(this.deck);
    };
    Player.prototype.draw = function (amount) {
        if (amount === void 0) { amount = 1; }
        if (this.deck.length >= amount) {
            for (var index = 0; index < amount; index++) {
                this.hand.push(this.deck[this.deck.length - 1]);
                this.deck.pop();
            }
            return true;
        }
        else {
            return false;
        }
    };
    Player.prototype.reset = function () {
        this.points = 0;
        this.hand = [];
        this.deck = [];
        this.playzone = [];
        this.discardpile = [];
        this.deck.push(new card_1.Card(0, "zero", 0));
        this.deck.push(new card_1.Card(0, "zero", 0));
        this.deck.push(new card_1.Card(0, "zero", 0));
        this.deck.push(new card_1.Card(0, "zero", 0));
        this.deck.push(new card_1.Card(0, "zero", 0));
        this.deck.push(new card_1.Card(1, "one", 1));
        this.deck.push(new card_1.Card(1, "one", 1));
        this.deck.push(new card_1.Card(1, "one", 1));
        this.deck.push(new card_1.Card(1, "one", 1));
        this.deck.push(new card_1.Card(1, "one", 1));
        this.deck.push(new card_1.Card(2, "two", 2));
        this.deck.push(new card_1.Card(2, "two", 2));
        this.deck.push(new card_1.Card(2, "two", 2));
        this.deck.push(new card_1.Card(2, "two", 2));
        this.deck.push(new card_1.Card(2, "two", 2));
        this.deck.push(new card_1.Card(3, "three", 3));
        this.deck.push(new card_1.Card(3, "three", 3));
        this.deck.push(new card_1.Card(3, "three", 3));
        this.deck.push(new card_1.Card(3, "three", 3));
        this.deck.push(new card_1.Card(3, "three", 3));
        this.deck.push(new card_1.Card(4, "four", 4));
        this.deck.push(new card_1.Card(4, "four", 4));
        this.deck.push(new card_1.Card(4, "four", 4));
        this.deck.push(new card_1.Card(4, "four", 4));
        this.deck.push(new card_1.Card(4, "four", 4));
    };
    Player.prototype.play = function (index) {
        this.moveCard(this.hand, index, this.playzone);
    };
    Player.prototype.discard = function (index) {
        this.moveCard(this.playzone, index, this.discardpile);
    };
    Player.prototype.moveCard = function (fromArray, fromIndex, toArray) {
        var card = fromArray[fromIndex];
        if (card !== null) {
            this.removeCard(fromArray, card);
            toArray.push(card);
        }
    };
    Player.prototype.removeCard = function (array, card) {
        var index = array.indexOf(card, 0);
        if (index > -1) {
            array.splice(index, 1);
        }
    };
    return Player;
}());
exports.Player = Player;
;

},{"./card":1,"./shuffle":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectedCard = /** @class */ (function () {
    function SelectedCard() {
        this.image = null;
        this.ulID = null;
        this.ulIndex = null;
    }
    SelectedCard.prototype.empty = function () {
        this.image = null;
        this.ulID = null;
        this.ulIndex = null;
    };
    return SelectedCard;
}());
exports.SelectedCard = SelectedCard;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(cards) {
    var currentIndex = cards.length;
    var temporaryValue;
    var randomIndex;
    // As long as there are more elements to shuffle
    while (0 !== currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // Swap it with the current element
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}
exports.shuffle = shuffle;

},{}]},{},[3]);
