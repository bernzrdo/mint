import db from './db';

interface Item {
    id: number;
}

const collection = db.collection<Item>('items');

export const items = {

    async checked(id: number){
        return await collection.countDocuments({ id }) > 0;
    },

    async add(id: number | number[]){
        
        if(typeof id === 'number') id = [id];

        for(const item of id){
            if(await this.checked(item)) continue;
            await collection.insertOne({ id: item });
        }
        
    }

}