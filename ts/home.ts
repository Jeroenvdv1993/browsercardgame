import{ Card} from "./card";
import { shuffle} from "./shuffle";
console.log("Typescript werkt");
let card: Card = new Card(0, "Zero", 0);
console.log(card);
let cards: Card[] = [
    new Card(0, "zero", 0),
    new Card(1, "one", 1),
    new Card(2, "two", 2),
    new Card(3, "three", 3),
    new Card(4, "four", 4),
]
console.log(cards);
shuffle(cards);
console.log(cards);
