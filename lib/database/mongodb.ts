import { Document, MongoClient } from "mongodb"; 

export function connectToCluster/* <Type extends Document> */(collectionName: string) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.MONGODB_URL!);
        // console.log('Connecting to MongoDB Atlas cluster...');
        /* await */ mongoClient.connect();
        // console.log('Successfully connected to MongoDB Atlas!');

        const db = mongoClient.db('test');
        const collection = db.collection/* <Type> */(collectionName);

        // return mongoClient;
        return collection
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        throw new Error(`Connection to MongoDB Atlas failed! ${error}`)
    }
}

export const collectionUser = connectToCluster/* <IUser> */('user')
export const collectionImage = connectToCluster/* <IImage> */('image')