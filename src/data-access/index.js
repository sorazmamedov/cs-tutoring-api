import makeDatabase from "./db";
import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
const client = new MongoClient(url, {
  useNewUrlParser: true,
});

export async function makeDb() {
  await client.connect();
  return client.db();
}

const db = makeDatabase({ makeDb });
export default db;
