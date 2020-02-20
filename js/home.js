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
var player1 = new player_1.Player(1);
var player2 = new player_1.Player(2);
var currentPlayer;
var nextPlayer;
var playerHeader = document.getElementById("player");
var resetButton = document.getElementById("reset");
var drawButton = document.getElementById("draw");
var playButton = document.getElementById("play");
var handUl = document.getElementById("hand");
var deckUl = document.getElementById("deck");
var playzone1Ul = document.getElementById("playzone1");
var playzone2Ul = document.getElementById("playzone2");
reset();
function draw(player, amount) {
    if (amount === void 0) { amount = 1; }
    if (player.draw(amount)) {
        updateLists(player);
    }
    else if (handUl !== null) {
        var li = document.createElement('li');
        li.setAttribute("class", "text-danger");
        li.innerHTML = "Couldn't draw enough cards from deck.";
        handUl.appendChild(li);
    }
}
function emptyUnorderedList(unorderedList) {
    if (unorderedList !== null) {
        while (unorderedList.firstChild) {
            unorderedList.removeChild(unorderedList.firstChild);
        }
    }
}
function updateHand(player) {
    if (handUl !== null) {
        while (handUl.firstChild) {
            handUl.removeChild(handUl.firstChild);
        }
        var _loop_1 = function (index) {
            var li = document.createElement('li');
            li.innerHTML = player.hand[index].name;
            li.addEventListener('click', function () {
                playCard(player, player.hand[index].id);
            });
            handUl.appendChild(li);
        };
        for (var index = 0; index < player.hand.length; index++) {
            _loop_1(index);
        }
    }
}
function playCard(player, id) {
    player.play(id);
    updateLists(player);
}
function updateDeck(player) {
    if (deckUl !== null) {
        updateUnorderedList(deckUl, player.deck);
    }
}
function updatePlayzone() {
    if (playzone1Ul !== null) {
        updateUnorderedList(playzone1Ul, player1.playzone);
    }
    if (playzone2Ul !== null) {
        updateUnorderedList(playzone2Ul, player2.playzone);
    }
}
function updateUnorderedList(unorderedList, array) {
    if (unorderedList !== null) {
        while (unorderedList.firstChild) {
            unorderedList.removeChild(unorderedList.firstChild);
        }
        for (var index = 0; index < array.length; index++) {
            var li = document.createElement('li');
            li.innerHTML = array[index].name;
            unorderedList.appendChild(li);
        }
    }
}
function updateLists(player) {
    updateHand(player);
    updateDeck(player);
    updatePlayzone();
}
function emptyLists() {
    emptyUnorderedList(handUl);
    emptyUnorderedList(deckUl);
    emptyUnorderedList(playzone1Ul);
    emptyUnorderedList(playzone2Ul);
}
function reset() {
    player1.reset();
    player1.shuffle();
    draw(player1, 3);
    player2.reset();
    player2.shuffle();
    draw(player2, 3);
    currentPlayer = null;
    nextPlayer = null;
    if (playerHeader !== null) {
        playerHeader.innerHTML = "";
    }
    emptyLists();
}
if (resetButton !== null) {
    resetButton.onclick = function () {
        reset();
    };
}
if (drawButton !== null) {
    drawButton.onclick = function () {
        if (currentPlayer !== null)
            draw(currentPlayer);
    };
}
if (playButton !== null) {
    playButton.onclick = function () {
        if (playButton !== null) {
            if (playButton.innerText === "Player 1" || playButton.innerText === "Player 2") {
                currentPlayer = nextPlayer;
                nextPlayer = null;
                playButton.innerText = "Switch";
            }
            else {
                if (currentPlayer === player1) {
                    currentPlayer = null;
                    nextPlayer = player2;
                    playButton.innerText = "Player 2";
                }
                else {
                    currentPlayer = null;
                    nextPlayer = player1;
                    playButton.innerText = "Player 1";
                }
            }
        }
        if (playerHeader !== null && currentPlayer !== null) {
            playerHeader.innerHTML = "Player " + currentPlayer.id;
            updateHand(currentPlayer);
            updateDeck(currentPlayer);
            updatePlayzone();
        }
        else if (playerHeader !== null) {
            playerHeader.innerHTML = "";
            emptyLists();
        }
    };
}

},{"./player":3}],3:[function(require,module,exports){
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
        this.hand = [];
        this.deck = [];
        this.playzone = [];
        this.discardpile = [];
        this.deck.push(new card_1.Card(0, "zero", 0));
        this.deck.push(new card_1.Card(1, "one", 1));
        this.deck.push(new card_1.Card(2, "two", 2));
        this.deck.push(new card_1.Card(3, "three", 3));
        this.deck.push(new card_1.Card(4, "four", 4));
    };
    Player.prototype.print = function () {
        console.log("HAND");
        for (var index = 0; index < this.hand.length; index++) {
            console.log(this.hand[index]);
        }
        console.log("DECK");
        for (var index = 0; index < this.deck.length; index++) {
            console.log(this.deck[index]);
        }
    };
    Player.prototype.play = function (id) {
        var card = this.findIdInArray(this.hand, id);
        if (card !== null) {
            this.removeCard(this.hand, card);
            this.playzone.push(card);
        }
    };
    Player.prototype.removeCard = function (array, card) {
        var index = array.indexOf(card, 0);
        if (index > -1) {
            array.splice(index, 1);
        }
    };
    Player.prototype.findIdInArray = function (array, id) {
        for (var index = 0; index < array.length; index++) {
            if (array[index].id === id)
                return array[index];
        }
        return null;
    };
    return Player;
}());
exports.Player = Player;
;

},{"./card":1,"./shuffle":4}],4:[function(require,module,exports){
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

},{}]},{},[2]);
