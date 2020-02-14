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
