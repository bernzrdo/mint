import { INTERRUPTION_LEVEL, Search, SOUNDS } from './util';
import db from './db';
import { ObjectId } from 'bson';
import { syncWorkers } from '../worker';

const collection = db.collection<Search>('searches');

const HOUR = 60;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 31 * DAY;
const YEAR = 365 * DAY;
const DECADE = 10 * YEAR;
const CENTURY = 10 * DECADE;
const MILLENNIUM = 10 * CENTURY;

function frequency(interval: number){

    const millennia = Math.floor(interval / MILLENNIUM);
    interval %= MILLENNIUM;

    const centuries = Math.floor(interval / CENTURY);
    interval %= CENTURY;

    const decades = Math.floor(interval / DECADE);
    interval %= DECADE;

    const years = Math.floor(interval / YEAR);
    interval %= YEAR;

    const months = Math.floor(interval / MONTH);
    interval %= MONTH;

    const weeks = Math.floor(interval / WEEK);
    interval %= WEEK;

    const days = Math.floor(interval / DAY);
    interval %= DAY;

    const hours = Math.floor(interval / HOUR);
    interval %= HOUR;

    const minutes = interval;

    let parts: string[] = [];

    function addPart(amount: number, singular: string, plural: string){
        if(amount == 0) return;
        if(amount > 1) return parts.push(`${amount} ${plural}`);
        parts.push(parts.length == 0 ? singular : `1 ${singular}`);
    }

    addPart(millennia, 'milénio', 'milénios');
    addPart(centuries,  'século',  'séculos');
    addPart(  decades,  'decada',  'decadas');
    addPart(    years,     'ano',     'anos');
    addPart(   months,     'mês',    'meses');
    addPart(    weeks,  'semana',  'semanas');
    addPart(     days,     'dia',     'dias');
    addPart(    hours,    'hora',    'horas');
    addPart(  minutes,  'minuto',  'minutos');

    if(parts.length == 1) return `a cada ${parts[0]}`;

    const last = parts.pop()
    return `a cada ${parts.join(', ')} e ${last}`;

}

export const searches = {

    async lastToken(){
        const [search] = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        return search?.token;
    },

    async create(search: Search){
        await collection.insertOne(search);
        await syncWorkers();
    },

    async list(){
        const searches = await collection.find().toArray();
        return searches.map(s=>({
            id: s._id.toHexString(),
            query: s.query,
            interval: frequency(s.interval),
            sound: SOUNDS[s.sound],
            interruptionLevel: INTERRUPTION_LEVEL[s.interruptionLevel]
        }))
    },

    async get(id: string){
        const search = await collection.findOne({ _id: new ObjectId(id) });
        if(!search) return;
        return {
            query: search.query,
            interval: search.interval,
            token: search.token,
            sound: search.sound,
            interruptionLevel: search.interruptionLevel
        }
    },

    async edit(id: string, search: Search){
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: search });
        await syncWorkers();
    },

    async delete(id: string){
        await collection.deleteOne({ _id: new ObjectId(id) });
        await syncWorkers();
    },

    async fullList(){
        return await collection.find().toArray();
    }

}
