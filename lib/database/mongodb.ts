import { MongoClient } from "mongodb"; 
import User from '@/lib/database/models/user.model'

export function connectToCluster() {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.MONGODB_URL!);
        // console.log('Connecting to MongoDB Atlas cluster...');
        /* await */ mongoClient.connect();
        // console.log('Successfully connected to MongoDB Atlas!');

        const db = mongoClient.db('test');
        const collection = db.collection('user');

        // return mongoClient;
        return collection
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        throw new Error(`Connection to MongoDB Atlas failed! ${error}`)
    }
}

export const collectionUser = connectToCluster()