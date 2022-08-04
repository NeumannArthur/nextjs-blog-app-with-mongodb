import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    const opts = {
        userNewUrlParser: true,
        useUnifiedTopology: true,
    };

    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

// async function getPosts(req,res){
//     try {
//       let { db } = await connectToDatabase();
      
//       let posts = await db
//         .collection('posts')
//         .find({})
//         .sort({ published: -1 })
//         .toArray();
  
//       return res.json({
//         message: JSON.parse(JSON.stringify(posts)),
//         success:true,
//       });
//     } catch(error) {
//       return res.json({
//         message: new Error(error).message,
//         succes: false,
//       });
//     }
// }