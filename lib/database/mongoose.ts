import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export async function connectToDatabase(){
    if(!cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('Missing MONGODB_URL')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'ai-saas',
        bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn;
} 