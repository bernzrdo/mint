import db from './db';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

interface Session {
    deviceId: string;
    name: string;
    addedAt: Date;
    lastAccess?: Date;
}

const collection = db.collection<Session>('sessions');

moment.locale('pt');

export const sessions = {

    async middleware(req: Request, res: Response, next: NextFunction){
    
        let deviceId: string = req.cookies.id;
        
        // create device id
        if(!deviceId){
    
            deviceId = crypto.randomUUID();
            res.cookie('id', deviceId);
            
            res.status(403);
            res.render('locked', { deviceId });
            return;
        }
    
        const session = await collection.findOne({ deviceId });
    
        // check if device is allowed
        if(!session){
            res.status(403);
            res.render('locked', { deviceId });
            return;
        }

        // update last access
        collection.updateOne({ deviceId }, { $set: { lastAccess: new Date() } })
    
        next();
    },

    async create(deviceId: string, name: string){
        await collection.insertOne({
            deviceId, name,
            addedAt: new Date()
        });
    },

    async list(){
        const sessions = await collection.find().toArray();
        return sessions.map(s=>({
            name: s.name,
            deviceId: s.deviceId,
            added: moment(s.addedAt.getTime()).fromNow(),
            lastAccess: s.lastAccess ? moment(s.lastAccess.getTime()).fromNow() : null
        }))
    },

    async changeName(deviceId: string, name: string){
        await collection.updateOne({ deviceId }, { $set: { name } });
    },

    async revoke(deviceId: string){
        await collection.deleteOne({ deviceId });
    }

}