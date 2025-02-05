import db from './db';
import { LogType } from './util';

interface Log {
    source: string;
    message: string;
    type: LogType;
    date: Date;
}

const collection = db.collection<Log>('logs');

export const logs = {

    async log(source: string, message: string, type: LogType = LogType.info){
        await collection.insertOne({ source, message, type, date: new Date() });
    },
    
    async list(page: number){
        if(isNaN(page) || page < 1) return { success: false, error: 'Invalid page number' }

        const limit = 50;
        const index = (page - 1) * limit;
        
        const total = await collection.countDocuments();
        const ended = index + limit > total;

        const logs = await collection.find()
            .sort('date', -1)
            .limit(limit)
            .skip(index)
            .toArray();
        
        return {
            success: true,
            items: logs.map(l=>({
                source: l.source,
                message: l.message,
                type: l.type,
                date: l.date
            })),
            ended
        }
    }
    
}