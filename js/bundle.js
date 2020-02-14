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
var card_1 = require("./card");
console.log("Typescript werkt");
var card = new card_1.Card(0, "Zero", 0);
console.log(card);
var cards = [
    new card_1.Card(0, "zero", 0),
    new card_1.Card(1, "one", 1),
    new card_1.Card(2, "two", 2),
    new card_1.Card(3, "three", 3),
    new card_1.Card(4, "four", 4),
];
console.log(cards);
//shuffle(cards);
console.log(cards);

},{"./card":1}]},{},[2]);
