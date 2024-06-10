// import { MongoClient } from "mongodb";

// const uri = process.env.mongodb_url

// if(!process.env.mongodb_url){
//     throw new Error('Mongo URI not found')
// }

// const client = new MongoClient(uri);
// const databaseConnect = client.connect()
//     .then(() => console.log('Database is connected'))
//     .catch((er) => console.log(er))

// export async function connectToDatabase(){
//     const client = await databaseConnect;
//     const db = client.db();
//     return {client,db};
// }

// import { MongoClient } from "mongodb";

// const uri = process.env.mongodb_url;

// if (!uri) {
//     throw new Error('Mongo URI not found');
// }

// let client;
// let databaseConnect;

// async function initializeDatabase() {
//     if (!databaseConnect) {
//         client = new MongoClient(uri);
//         try {
//             await client.connect();
//             console.log('Database is connected');
//             databaseConnect = client;
//         } catch (error) {
//             console.error('Database connection failed:', error);
//             throw new Error('Failed to connect to the database');
//         }
//     }
//     return databaseConnect;
// }

// export async function connectToDatabase() {
//     if (!databaseConnect) {
//         await initializeDatabase();
//     }
//     const db = client.db();
//     return { client, db };
// }

import mongoose from "mongoose";

const mongo_url = process.env.mongodb_url;
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_url,{
            dbName:'takewhatyouwant',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000,  // Adjust as needed
            socketTimeoutMS: 45000, 
        })
        console.log('Connected to db');
    } catch (error) {
        console.log(error);
    }
    return true;
}

export default connectToDatabase;