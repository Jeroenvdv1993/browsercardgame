import { Player } from "./player";
import { Card } from "./card";

export class Field{
    ////////////
    // Values //
    ////////////
    player: Player;
    playzone: HTMLElement | null;
    discardpile: HTMLElement | null;
    points: HTMLElement | null;
    /////////////////
    // Constructor //
    /////////////////
    constructor(id: number){
        this.player = new Player(id);
        this.playzone = document.getElementById(`playzone${id}`);
        this.discardpile = document.getElementById(`discardpile${id}`);
        this.points = document.getElementById(`points${id}`);
    };

    ///////////
    // Reset //
    ///////////
    reset(): void{
        this.player.reset();
        this.player.shuffle();
        this.updateField();
    }
    ////////////
    // Update //
    ////////////
    updateField(): void{
        this.updateUnorderedList(this.playzone, this.player.playzone);
        this.updateUnorderedList(this.discardpile, this.player.discardpile);
        if(this.points !== null) this.points.innerText = `${this.player.points}`;
    }
    updateUnorderedList(unorderedList: HTMLElement | null, array: Card[]): void{
        if(unorderedList !== null){
            while(unorderedList.firstChild){
                unorderedList.removeChild(unorderedList.firstChild);
            }
            for(let index: number = 0; index < array.length; index++){
                let img = document.createElement('img');
                img.classList.add("img-fluid");
                img.src = `../img/c_${array[index].id}.jpg`;
                let li = document.createElement('li');
                li.appendChild(img);
                unorderedList.appendChild(li);
            }
        }
    }
    ///////////
    // Empty //
    ///////////
    emptyField(): void{
        this.emptyUnorderedList(this.playzone);
        this.emptyUnorderedList(this.discardpile);
    }
    emptyUnorderedList(unorderedList: HTMLElement | null): void{
        if(unorderedList !== null){
            while(unorderedList.firstChild){
                unorderedList.removeChild(unorderedList.firstChild);
            }
        }
    }
}