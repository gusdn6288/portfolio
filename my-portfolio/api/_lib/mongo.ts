import { MongoClient, Db } from "mongodb";

declare global {
  // Vercel 함수 콜드/웜 사이 재사용
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri) throw new Error("Missing MONGODB_URI");
if (!dbName) throw new Error("Missing MONGODB_DB");

export async function getDb(): Promise<Db> {
  if (!global.__mongoClient) {
    global.__mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    await global.__mongoClient.connect();
  }
  return global.__mongoClient.db(dbName);
}
