import { WithId } from 'mongodb';
import { LogType, Search, time } from './lib/util';
import { searches } from './lib/searches';
import { items } from './lib/items';
import { logs } from './lib/logs';
import { AlertAction, alerts } from './lib/alerts';

const GRAY = '\x1b[30m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

let token = '';

type Response = {
    code: 0, // success
    items: Item[],
    dominant_brand: Brand,
    search_tracking_params: {
        search_correlation_id: string,
        search_session_id: string,
        global_search_session_id: string
    },
    pagination: {
        current_page: number,
        total_pages: number,
        total_entries: number,
        per_page: number,
        time: number
    }
} | {
    code: 100,
    message: string,
    message_code: 'invalid_authentication_token',
}

interface Item {
    id: number,
    title: string,
    price: Price,
    is_visible: boolean,
    discount: unknown,
    brand_title: string,
    path: string,
    user: User,
    conversion: unknown,
    url: string,
    promoted: boolean,
    photo: Photo,
    favourite_count: number,
    is_favourite: boolean,
    badge: unknown,
    service_fee: Price,
    total_item_price: Price,
    view_count: number,
    size_title: '',
    content_source: 'search',
    status: string,
    icon_badges: unknown[],
    item_box: {
        first_line: string,
        second_line: string,
        accessibility_label: string
    },
    search_tracking_params: {
        score: number,
        matched_queries: unknown
    },
}

interface Price {
    amount: string,
    currency_code: 'EUR'
}

interface User {
    id: number,
    login: string,
    profile_url: string,
    photo: unknown,
    business: boolean
}

interface Photo {
    id: number,
    image_no: number,
    width: number,
    height: number,
    dominant_color: string,
    dominant_color_opaque: string,
    url: string,
    is_main: boolean,
    thumbnails: Thumbnail[],
    high_resolution: {
        id: string,
        timestamp: number,
        orientation: number
    },
    is_suspicious: boolean,
    full_size_url: string,
    is_hidden: boolean,
    extra: unknown
}

interface Thumbnail {
    type: string,
    url: string,
    width: number,
    height: number,
    original_size: unknown
}

interface Brand {
    id: number,
    title: string,
    slug: string,
    favourite_count: number,
    pretty_favourite_count: string,
    item_count: number,
    pretty_item_count: string,
    is_visible_in_listings: boolean,
    requires_authenticity_check: boolean,
    is_luxury: boolean,
    is_hvf: boolean,
    path: string,
    url: string,
    is_favourite: boolean
}

const workers: Worker[] = [];

export async function syncWorkers(){

    const searchesList = await searches.fullList();

    // delete old workers
    for(const worker of workers){
    
        // check if worker should still run
        if(searchesList.find(s=>s._id.equals(worker.search._id))) continue;

        // destroy worker
        worker.destroy();

    }

    for(const search of searchesList){
        
        const worker = workers.find(w=>w.search._id.equals(search._id));

        if(worker){
            // update current workers
            worker.search = search;
        }else{
            // add new workers
            workers.push(new Worker(search));
        }

    }

}

const queue: Worker[] = [];
let busy = false;

async function updateQueue(){
    if(busy || queue.length == 0) return;

    const worker = queue.shift()!;
    if(worker.destroyed){
        updateQueue();
        return;
    }
    
    busy = true
    await worker.run();
    busy = false;

    updateQueue();

}

async function getToken(){

    const req = await fetch('https://www.vinted.pt');

    const cookie = req.headers.getSetCookie().find(c=>c.startsWith('access_token_web='));
    if(!cookie) throw new Error('Failed to find the token!');

    token = cookie.split('=')[1].split(';')[0];

}

class Worker {

    #id: string;
    #destroyed = false;
    #search: WithId<Search>;
    #attempt = 0;
    #interval: NodeJS.Timeout;
    #nextTime!: Date;

    constructor(search: WithId<Search>){

        this.#id = crypto.randomUUID();
        this.#search = search;
        this.#addToQueue();
        this.#updateNextTime();
        this.#interval = setInterval(()=>this.#sync(), 1e3);

        this.#log('Ready!');
    }

    get id(){ return this.#id }

    get destroyed(){ return this.#destroyed }

    #check(){
        if(this.destroyed) throw new Error('This worker has been destroyed!');
    }

    get search(){ return this.#search }
    set search(s){
        this.#search = s;
        this.#log('Updated!');
    }

    #updateNextTime(){
        this.#check();
        this.#nextTime = new Date();
        this.#nextTime.setMinutes(this.#nextTime.getMinutes() + this.search.interval, 0, 0);
    }

    #sync(){
        this.#check();
        // every second

        const now = new Date();
        if(
            this.#nextTime.getFullYear() != now.getFullYear() ||
            this.#nextTime.getMonth()    != now.getMonth()    ||
            this.#nextTime.getDate()     != now.getDate()     ||
            this.#nextTime.getHours()    != now.getHours()    ||
            this.#nextTime.getMinutes()  != now.getMinutes()
        ) return;

        this.#updateNextTime();
            
        this.#log('It\'s time! Adding to queue...');
        this.#addToQueue();

    }

    #addToQueue(){
        queue.push(this);
        updateQueue();
    }

    async run(resetAttempt = true){
        this.#check();
        if(resetAttempt) this.#attempt = 0;
        try{
            await this.#fetch();
        }catch(e: any){
            this.#log(e.message, LogType.error);
            if(this.#attempt < 3) this.run(false);
            else{
                this.#send({
                    title: '⚠️ Oh não!',
                    text: 'Ocorreu um erro ao tentar encontrar novos itens. Por favor, notifica a nossa equipa para investigar o problema. Pedimos desculpa pelo incomodo.',
                    actions: [{
                        text: 'Notificar equipa',
                        url: 'https://wa.me/\u0033\u0035\u0031\u0039\u0031\u0038\u0031\u0039\u0033\u0037\u0034\u0031?text=aconteceu um erro com o projeto mint. vai lá ver pff'
                    }]
                });
            }
        }
    }

    async #fetch(){
        this.#check();
        this.#attempt++;

        this.#log(this.#attempt < 2
            ? 'Running...'
            : `Attempt #${this.#attempt}. Trying again...`
        );

        if(!token){
            this.#log('No token found! Getting token...');
            await getToken();
        }

        this.#log('Fetching new items...');
        const url = 'https://www.vinted.pt/api/v2/catalog/items?' + new URLSearchParams({
            per_page: '20',
            search_text: this.search.query.toLowerCase(),
            order: 'newest_first'
        }).toString();
        const req = await fetch(url, { headers: {
            Cookie: 'access_token_web=' + token
        }});
        const res: Response = await req.json();

        if(res.code == 0){
            
            const newItems: Item[] = [];

            for(const item of res.items){
                if(await items.checked(item.id)) continue;
                newItems.push(item);
            }

            if(newItems.length == 0){
                this.#log('No new items found.');
                return;
            }

            let text = newItems.map(i=>`• ${i.title} (${i.total_item_price.amount}€)`);

            if(text.join('\n').length > alerts.textLimit){

                text = text.slice(0, -1);
                text.push('E mais outro item...');

                let deleteCount = 1;
                while(text.join('\n').length > alerts.textLimit){
                    text = text.slice(0, -2);
                    deleteCount++;
                    text.push(`E mais ${deleteCount} itens...`);
                }

            }

            const success = this.#send({
                title: newItems.length == 1
                ? `🛍️ ${this.search.query}: Novo item!`
                : `🛍️ ${this.search.query}: ${newItems.length} novos itens!`,
                text: text.join('\n'),
                actions: [ newItems.length == 1
                    ? { text: 'Ver item', url: newItems[0].url }
                    : {
                        text: 'Abrir pesquisa',
                        url: 'https://www.vinted.pt/catalog?' + new URLSearchParams({
                            search_text: this.search.query.toLowerCase(),
                            order: 'newest_first'
                        }).toString()
                    }
                ]
            });
            if(!success) return;

            this.#log('Saving notified items...');
            items.add(newItems.map(i=>i.id));

            return;
        }

        if(res.code == 100){

            if(res.message_code == 'invalid_authentication_token'){
                this.#log('Invalid token! Getting a new one...', LogType.warn);
                await getToken();
                this.#fetch();
                return;
            }

            console.log(res);
            throw new Error(`Code: 100. Expected message: "invalid_authentication_token". Message: "${res.message_code}"\n\nURL: ${url}\nToken: ${token}\nResponse: ${res}`);
            
        }

        console.log(res);
        throw new Error(`Unexpected code ${(res as any).code}!\n\nURL: ${url}\nToken: ${token}\nResponse: ${JSON.stringify(res, null, 2)}`);

    }

    async #send({ title, text, actions }: {
        title: string;
        text: string;
        actions: AlertAction[]
    }){
        this.#check();

        this.#log('Sending alert...');
        const { error } = await alerts.send({
            token: this.search.token,
            title, text,
            sound: this.search.sound,
            interruptionLevel: this.search.interruptionLevel,
            actions,
            source: this.search.query
        });

        if(error){
            this.#log(`Failed to send alert: ${error}`, LogType.error);
            return false;
        }

        return true;
    }

    #log(message: string, type: LogType = LogType.info){
        this.#check();
        
        let color = GRAY;
        if(type == LogType.warn) color = YELLOW;
        if(type == LogType.error) color = RED;

        console.log(color + '[' + time() + '] ' + this.search.query + ': ' + RESET + message);
        logs.log(this.search.query, message, type);
    }

    destroy(){
        this.#check();
        this.#log('Goodbye!');

        this.#destroyed = true;

        clearInterval(this.#interval);

        const i = workers.findIndex(w=>w.id == this.#id)
        if(i == -1) return;

        workers.splice(i, 1);

    }

}