"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./card");
var randomInt_1 = require("./randomInt");
console.log("Typescript werkt");
var card = new card_1.Card(0, "Zero", 0);
console.log(card);
console.log(randomInt_1.randomInt(0, 2));
