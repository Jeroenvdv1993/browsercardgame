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
var field1 = new field_1.Field(1);
var field2 = new field_1.Field(2);
var currentPlayer;
var nextPlayer;
var playerHeader = document.getElementById("player");
var resetButton = document.getElementById("reset");
var playButton = document.getElementById("play");
var gameDiv = document.getElementById("game");
var handUl = document.getElementById("hand");
var deckUl = document.getElementById("deck");
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
function updateHand(player) {
    if (handUl !== null) {
        while (handUl.firstChild) {
            handUl.removeChild(handUl.firstChild);
        }
        var _loop_1 = function (index) {
            var img = document.createElement('img');
            img.classList.add("img-fluid");
            img.src = "../img/c_" + player.hand[index].id + ".jpg";
            var li = document.createElement('li');
            li.appendChild(img);
            li.addEventListener('click', function () {
                playCard(player, index);
            });
            handUl.appendChild(li);
        };
        for (var index = 0; index < player.hand.length; index++) {
            _loop_1(index);
        }
    }
}
function updateDeck(player) {
    if (deckUl !== null) {
        deckUl.innerText = "" + player.deck.length;
    }
}
function emptyUnorderedList(unorderedList) {
    if (unorderedList !== null) {
        while (unorderedList.firstChild) {
            unorderedList.removeChild(unorderedList.firstChild);
        }
    }
}
function updateLists(player) {
    updateHand(player);
    updateDeck(player);
}
function emptyLists() {
    emptyUnorderedList(handUl);
    emptyUnorderedList(deckUl);
    field1.emptyField();
    field2.emptyField();
}
////////////////////////
// Play functionality //
////////////////////////
function playCard(player, index) {
    player.play(index);
    updateLists(player);
    field1.updateField();
    field2.updateField();
}
function draw(player, amount) {
    if (amount === void 0) { amount = 1; }
    if (player.draw(amount)) {
        updateLists(player);
    }
}
function switchPlayer() {
    if (playButton !== null) {
        if (currentPlayer === field1.player) {
            nextPlayer = field2.player;
            playButton.innerText = "Player 2";
        }
        else {
            if (currentPlayer === field2.player)
                updatePoints();
            nextPlayer = field1.player;
            playButton.innerText = "Player 1";
        }
        currentPlayer = null;
    }
}
function updatePoints() {
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
            if (playButton.innerText === "Start") {
                currentPlayer = field1.player;
                nextPlayer = null;
                if (playerHeader !== null && currentPlayer !== null) {
                    playerHeader.innerHTML = "Player " + currentPlayer.id;
                    updateLists(currentPlayer);
                }
                if (gameDiv !== null)
                    gameDiv.hidden = false;
                playButton.innerText = "End Turn";
            }
            else if (playButton.innerText === "Player 1" || playButton.innerText === "Player 2") {
                currentPlayer = nextPlayer;
                if (currentPlayer !== null)
                    draw(currentPlayer);
                nextPlayer = null;
                if (playerHeader !== null && currentPlayer !== null) {
                    playerHeader.innerHTML = "Player " + currentPlayer.id;
                    updateLists(currentPlayer);
                }
                if (gameDiv !== null)
                    gameDiv.hidden = false;
                playButton.innerText = "End Turn";
            }
            else if (playButton.innerText === "End Turn") {
                if (gameDiv !== null)
                    gameDiv.hidden = true;
                switchPlayer();
            }
        }
    };
}

},{"./field":2}],4:[function(require,module,exports){
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
