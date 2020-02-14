import { Card } from "./card";
import { shuffle } from "./shuffle";
export class Player{
    hand: Card[] = [];
    deck: Card[] = [];
    constructor(){
        this.reset();
    }
    shuffle(): void {
        shuffle(this.deck);
    }
    draw(amount: number = 1): boolean{
        if(this.deck.length >= amount){
            for(let index: number = 0; index < amount; index++){
                this.hand.push(this.deck[this.deck.length - 1]);
                this.deck.pop();
            }
            return true;
        }
        else{
            return false;
        }
    }
    reset(): void{
        this.hand = [];
        this.deck = [];
        this.deck.push(new Card(0, "zero", 0));
        this.deck.push(new Card(1, "one", 1));
        this.deck.push(new Card(2, "two", 2));
        this.deck.push(new Card(3, "three", 3));
        this.deck.push(new Card(4, "four", 4));
    }
    print(): void{
        console.log("HAND");
        for(let index: number = 0; index < this.hand.length; index++){
            console.log(this.hand[index]);
        }
        console.log("DECK");
        for(let index: number = 0; index < this.deck.length; index++){
            console.log(this.deck[index]);
        }
    }
};