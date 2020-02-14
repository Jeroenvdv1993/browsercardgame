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
var player = new player_1.Player();
var resetButton = document.getElementById("reset");
var drawButton = document.getElementById("draw");
var handUl = document.getElementById("hand");
var deckUl = document.getElementById("deck");
function draw(amount) {
    if (amount === void 0) { amount = 1; }
    if (player.draw(amount)) {
        updateHand();
        updateDeck();
    }
    else if (handUl !== null) {
        var li = document.createElement('li');
        li.setAttribute("class", "text-danger");
        li.innerHTML = "Couldn't draw enough cards from deck.";
        handUl.appendChild(li);
    }
}
function updateHand() {
    if (handUl !== null) {
        while (handUl.firstChild) {
            handUl.removeChild(handUl.firstChild);
        }
        for (var index = 0; index < player.hand.length; index++) {
            var li = document.createElement('li');
            li.innerHTML = player.hand[index].name;
            handUl.appendChild(li);
        }
    }
}
function updateDeck() {
    if (deckUl !== null) {
        while (deckUl.firstChild) {
            deckUl.removeChild(deckUl.firstChild);
        }
        for (var index = 0; index < player.deck.length; index++) {
            var li = document.createElement('li');
            li.innerHTML = player.deck[index].name;
            deckUl.appendChild(li);
        }
    }
}
if (resetButton !== null) {
    resetButton.onclick = function () {
        player.reset();
        player.shuffle();
        draw(3);
    };
}
if (drawButton !== null) {
    drawButton.onclick = function () {
        draw();
    };
}

},{"./player":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./card");
var shuffle_1 = require("./shuffle");
var Player = /** @class */ (function () {
    function Player() {
        this.hand = [];
        this.deck = [];
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
