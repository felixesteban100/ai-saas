import { MongoClient } from "mongodb"; 

export function connectToCluster() {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.MONGODB_URI!);
        // console.log('Connecting to MongoDB Atlas cluster...');
        /* await */ mongoClient.connect();
        // console.log('Successfully connected to MongoDB Atlas!');

        const db = mongoClient.db('test');
        const collection = db.collection<CreateUserParams>('user');

        // return mongoClient;
        return collection
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        throw new Error(`Connection to MongoDB Atlas failed! ${error}`)
    }
}

export const collectionUser = connectToCluster()