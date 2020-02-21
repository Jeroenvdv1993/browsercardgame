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
var Field = /** @class */ (function () {
    /////////////////
    // Constructor //
    /////////////////
    function Field(playerHeader, handUL, deckSpan, playzoneUL, energyzoneUL, discardpileSpan, handLengthSpan, playLengthSpan, energyLengthSpan) {
        this.playerHeader = document.getElementById(playerHeader);
        this.handUL = document.getElementById(handUL);
        this.deckSpan = document.getElementById(deckSpan);
        this.playzoneUL = document.getElementById(playzoneUL);
        this.energyzoneUL = document.getElementById(energyzoneUL);
        this.discardpileSpan = document.getElementById(discardpileSpan);
        this.handLengthSpan = document.getElementById(handLengthSpan);
        this.playLengthSpan = document.getElementById(playLengthSpan);
        this.energyLengthSpan = document.getElementById(energyLengthSpan);
    }
    ;
    Field.prototype.setPlayerHeader = function (innerText) {
        if (this.playerHeader !== null) {
            this.playerHeader.innerText = innerText;
        }
    };
    Field.prototype.setDeckSpan = function (innerText) {
        if (this.deckSpan !== null) {
            this.deckSpan.innerText = innerText;
        }
    };
    Field.prototype.setDiscardpileSpan = function (innerText) {
        if (this.discardpileSpan !== null) {
            this.discardpileSpan.innerText = innerText;
        }
    };
    Field.prototype.setHandLengthSpan = function (innerText) {
        if (this.handLengthSpan !== null) {
            this.handLengthSpan.innerText = innerText;
        }
    };
    Field.prototype.setPlayLengthSpan = function (innerText) {
        if (this.playLengthSpan !== null) {
            this.playLengthSpan.innerText = innerText;
        }
    };
    Field.prototype.setEnergyLengthSpan = function (innerText) {
        if (this.energyLengthSpan !== null) {
            this.energyLengthSpan.innerText = innerText;
        }
    };
    Field.prototype.clearHandUL = function () {
        this.clearUL(this.handUL);
    };
    Field.prototype.clearPlayzoneUL = function () {
        this.clearUL(this.playzoneUL);
    };
    Field.prototype.clearEnergyzoneUL = function () {
        this.clearUL(this.energyzoneUL);
    };
    Field.prototype.clearUL = function (UL) {
        if (UL !== null) {
            while (UL.firstChild) {
                UL.removeChild(UL.firstChild);
            }
        }
    };
    return Field;
}());
exports.Field = Field;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var field_1 = require("./field");
var player1 = new player_1.Player(1);
var player2 = new player_1.Player(2);
var currentPlayer;
var nextPlayer;
var resetButton = document.getElementById("reset");
var playButton = document.getElementById("play");
var gameDiv = document.getElementById("game");
var playerField = new field_1.Field("player", "hand", "deck", "playzone", "energyzone", "discardpile", "handLength", "playLength", "energyLength");
var otherPlayerField = new field_1.Field("otherPlayer", "otherHand", "otherDeck", "otherPlayzone", "otherEnergyzone", "otherDiscardpile", "otherHandLength", "otherPlayLength", "otherEnergyLength");
var selectedUL = null;
var selectedImg = null;
var selectedIndex = null;
///////////
// Reset //
///////////
function reset() {
    player1.reset();
    player1.shuffle();
    draw(player1, 3);
    player2.reset();
    player2.shuffle();
    draw(player2, 3);
    currentPlayer = null;
    nextPlayer = null;
    playerField.setPlayerHeader("");
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
function updateUnorderedList(UL, array) {
    if (UL !== null) {
        while (UL.firstChild) {
            UL.removeChild(UL.firstChild);
        }
        for (var index = 0; index < array.length; index++) {
            var img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = "../img/c_" + array[index].id + ".jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            UL.appendChild(li);
        }
        UL.onclick = function () {
            moveCard(array);
        };
    }
}
function updateOtherUnorderedList(UL, array) {
    if (UL !== null) {
        while (UL.firstChild) {
            UL.removeChild(UL.firstChild);
        }
        for (var index = 0; index < array.length; index++) {
            var img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = "../img/c_" + array[index].id + ".jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            UL.appendChild(li);
        }
    }
}
function updateHand(player) {
    if (playerField.handUL !== null) {
        playerField.clearHandUL();
        var _loop_1 = function (index) {
            var img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = "../img/c_" + player.hand[index].id + ".jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            li.onclick = function () {
                selectCard(playerField.handUL, index);
            };
            playerField.handUL.appendChild(li);
        };
        for (var index = 0; index < player.hand.length; index++) {
            _loop_1(index);
        }
    }
}
function updateOtherHand(otherPlayer) {
    if (otherPlayerField.handUL !== null) {
        otherPlayerField.clearHandUL();
        for (var index = 0; index < otherPlayer.hand.length; index++) {
            var img = document.createElement("img");
            img.classList.add("img-fluid");
            img.src = "../img/cb_0.jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            otherPlayerField.handUL.appendChild(li);
        }
    }
}
function updateOtherLists(otherPlayer) {
    updateOtherHand(otherPlayer);
    otherPlayerField.setDeckSpan("" + otherPlayer.deck.length);
    updateOtherUnorderedList(otherPlayerField.playzoneUL, otherPlayer.playzone);
    updateOtherUnorderedList(otherPlayerField.energyzoneUL, otherPlayer.energyzone);
    otherPlayerField.setDiscardpileSpan("" + otherPlayer.discardpile.length);
    otherPlayerField.setHandLengthSpan("" + otherPlayer.hand.length);
    otherPlayerField.setPlayLengthSpan("" + otherPlayer.playzone.length);
    otherPlayerField.setEnergyLengthSpan("" + otherPlayer.energyzone.length);
}
function updateLists(player) {
    updateHand(player);
    playerField.setDeckSpan("" + player.deck.length);
    updateUnorderedList(playerField.playzoneUL, player.playzone);
    updateUnorderedList(playerField.energyzoneUL, player.energyzone);
    playerField.setDiscardpileSpan("" + player.discardpile.length);
    playerField.setHandLengthSpan("" + player.hand.length);
    playerField.setPlayLengthSpan("" + player.playzone.length);
    playerField.setEnergyLengthSpan("" + player.energyzone.length);
}
function emptyLists() {
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
function playCard(player, index) {
    player.play(index);
    updateLists(player);
}
function energyCard(player, index) {
    player.energy(index);
    updateLists(player);
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
        if (currentPlayer === player1) {
            nextPlayer = player2;
            playButton.innerText = "Player 2";
        }
        else {
            nextPlayer = player1;
            playButton.innerText = "Player 1";
        }
        currentPlayer = null;
    }
}
function switchPlayer() {
    currentPlayer = nextPlayer;
    nextPlayer = null;
    if (currentPlayer !== null) {
        draw(currentPlayer, 3);
        playerField.setPlayerHeader("Player " + currentPlayer.id);
        updateLists(currentPlayer);
    }
    if (currentPlayer !== null) {
        var otherPlayer = null;
        if (currentPlayer.id === 1) {
            otherPlayer = player2;
        }
        else {
            otherPlayer = player1;
        }
        if (otherPlayer !== null) {
            otherPlayerField.setPlayerHeader("Player " + otherPlayer.id);
            updateOtherLists(otherPlayer);
        }
    }
    if (gameDiv !== null)
        gameDiv.hidden = false;
    if (playButton !== null)
        playButton.innerText = "End Turn";
}
function startPlayer() {
    currentPlayer = player1;
    nextPlayer = null;
    if (currentPlayer !== null) {
        playerField.setPlayerHeader("Player " + currentPlayer.id);
        updateLists(currentPlayer);
        var otherPlayer = player2;
        otherPlayerField.setPlayerHeader("Player " + otherPlayer.id);
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
function selectCard(ul, index) {
    if (ul !== null) {
        var li = ul.getElementsByTagName("li")[index];
        if (li !== null) {
            var img = li.getElementsByTagName("img")[0];
            if (img !== null) {
                if (selectedImg !== null) {
                    switchImageSelection(selectedImg);
                }
                switchImageSelection(img);
                selectedUL = ul;
                selectedImg = img;
                selectedIndex = index;
            }
        }
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
function moveCard(array) {
    if (selectedUL !== null && selectedImg !== null && selectedIndex !== null) {
        if (currentPlayer !== null) {
            currentPlayer.moveCard(currentPlayer.hand, selectedIndex, array);
            updateLists(currentPlayer);
        }
        selectedUL = null;
        selectedImg = null;
        selectedIndex = null;
    }
}

},{"./field":2,"./player":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./card");
var shuffle_1 = require("./shuffle");
var Player = /** @class */ (function () {
    function Player(id) {
        this.hand = [];
        this.deck = [];
        this.playzone = [];
        this.energyzone = [];
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
        this.energyzone = [];
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
    Player.prototype.energy = function (index) {
        this.moveCard(this.hand, index, this.energyzone);
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

},{"./card":1,"./shuffle":5}],5:[function(require,module,exports){
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
