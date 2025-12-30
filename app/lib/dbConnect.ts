import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

let db: Db;

export async function connectDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
}
