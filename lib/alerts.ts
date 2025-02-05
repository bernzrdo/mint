import { INTERRUPTION_LEVEL, InterruptionLevel, Sound, wait } from './util';
import db from './db';
import moment from 'moment';
import 'dotenv/config';

export interface AlertAction {
    text: string;
    url: string;
}

interface AlertOptions {
    token: string;
    title: string;
    text: string;
    sound?: Sound;
    interruptionLevel?: InterruptionLevel;
    actions?: AlertAction[],
    source: string;
}

interface Alert {
    title: string;
    text: string;
    interruptionLevel?: InterruptionLevel;
    sentAt: Date;
    source: string;
    error?: string;
}

const collection = db.collection<Alert>('alerts');

const encoder = new TextEncoder();

export const alerts = {

    textLimit: 750,

    async send(options: AlertOptions){

        let sound: 0 | 1 | Sound = options.sound ?? 'default';
        if(sound == 'default') sound = 1;
        if(sound == 'none') sound = 0;

        let error = '';
        
        try{

            let actions = options.actions ?? [];
            if(actions.length > 4) actions.length = 4;
            if(actions.length < 4) actions.push({ text: 'Definições', url: process.env.URL! });

            const data = {
                title: options.title,
                text: options.text,
                sound,
                'interruption-level': options.interruptionLevel ?? 'active',
                actions: actions.map(a=>`${a.text}|${a.url}`)
            }
            
            const req = await fetch(`${process.env.NODE_URL}/v1/sender/${options.token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: encoder.encode(JSON.stringify(data))
            });
            
            const res = await req.json();
            if(res.msg) error = res.msg;

        }catch(e: any){
            error = e.toString();
            console.error(e);
        }

        const data: Alert = {
            title: options.title,
            text: options.text,
            interruptionLevel: options.interruptionLevel,
            sentAt: new Date(),
            source: options.source
        }
        if(error) data.error = error;

        await collection.insertOne(data);
        // for(let i=0; i < 600; i++){
        //     const sentAt = new Date(Math.floor(Math.random() * Date.now()));
        //     console.log(sentAt);
        //     await collection.insertOne({ ...data, sentAt });
        // }

        return data;
    },

    async list(page: number){
        if(isNaN(page) || page < 1) return { success: false, error: 'Invalid page number' }

        const limit = 10;
        const index = (page - 1) * limit;
        
        const total = await collection.countDocuments();
        const ended = index + limit > total;

        const alerts = await collection.find()
            .sort('sentAt', -1)
            .limit(limit)
            .skip(index)
            .toArray();
        
        return {
            success: true,
            items: alerts.map(a=>({
                id: a._id.toHexString(),
                title: a.title,
                text: a.text,
                source: a.source,
                interruptionLevel: INTERRUPTION_LEVEL[a.interruptionLevel ?? 'active'],
                sentAt: moment(a.sentAt.getTime()).fromNow(),
                hasError: a.error != null,
            })),
            ended
        }
    }

}