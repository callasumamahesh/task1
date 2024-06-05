import { MongoClient } from "mongodb";

const uri = process.env.mongodb_url

if(!process.env.mongodb_url){
    throw new Error('Mongo URI not found')
}

const client = new MongoClient(uri);
const databaseConnect = client.connect()
.then(() => console.log('Database is Connected'))
.catch((err) => console.log(err))

export default databaseConnect;