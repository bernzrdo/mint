import { change } from '../../lib/util';

const $main: HTMLElement = document.querySelector('main')!;
const $content: HTMLDivElement = $main.querySelector('.content')!;
const $loading: HTMLDivElement = $content.querySelector('.loading')!;
const $error: HTMLDivElement = $content.querySelector('.error')!;

type ListResult = {
    success: false;
    error: string;
} | {
    success: true;
    items: any[];
    ended: boolean;
}

export class Infinite {

    #path: string;
    #addItem: (item: any)=>void;
    #page = 0;
    #isBusy = false;
    #ended = false;

    constructor(path: string, addItem: (item: any)=>void){
        this.#path = path;
        this.#addItem = addItem;
        this.#detectEnd();
        $main.addEventListener('scroll', ()=>this.#detectEnd());
    }

    async #load(){
        if(this.#ended || this.#isBusy) return;
        this.#isBusy = true;
    
        change($error, $loading);
        
        try{
    
            const req = await fetch(`${this.#path}?page=${this.#page + 1}`)
            const res: ListResult = await req.json();
            if(!res.success) throw new Error(res.error);
            this.#page++;
    
            for(const item of res.items) this.#addItem(item);
    
            if(res.ended){
                change($loading, []);
                this.#ended = true;
            }else{
                this.#isBusy = false;
                this.#detectEnd();
            }
    
        }catch(e){
            change($loading, $error);
            console.log(e);
        }
        
        this.#isBusy = false;
    
    }

    #detectEnd(){
        if(
            !this.#ended && !this.#isBusy &&
            $loading.getBoundingClientRect().y - 250 < innerHeight
        ) this.#load();
    }

}
