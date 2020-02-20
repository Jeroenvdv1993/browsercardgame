import { Card } from "./card";
import { shuffle } from "./shuffle";
export class Player{
    id: number;
    hand: Card[] = [];
    deck: Card[] = [];
    playzone: Card[] = [];
    discardpile: Card[] = [];
    constructor(id: number){
        this.id = id;
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
        this.playzone = [];
        this.discardpile = [];
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
    play(id: number): void{
        let card = this.findIdInArray(this.hand, id);
        if(card !== null){
            this.removeCard(this.hand, card);
            this.playzone.push(card);
        }
    }
    removeCard(array: Card[], card: Card){
        const index = array.indexOf(card, 0);
        if( index > -1){
            array.splice(index, 1);
        }
    }
    findIdInArray(array: Card[], id: number): Card | null{
        for(let index: number = 0; index < array.length; index++){
            if(array[index].id === id) return array[index];
        }
        return null;
    }
};