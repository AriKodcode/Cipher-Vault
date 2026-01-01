import { MongoClient } from 'mongodb';

let db;

async function connectToMongoDB(uri, dbName) {
  if (db) {
    return db;
  }
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log('MongoDB connected', db.databaseName);
  return db;
}
export default connectToMongoDB;
