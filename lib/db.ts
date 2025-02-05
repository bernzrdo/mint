import { MongoClient } from 'mongodb';
import 'dotenv/config';

export default new MongoClient(process.env.DB_URL!).db('mint');