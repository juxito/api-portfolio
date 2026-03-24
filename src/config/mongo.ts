import { log } from "console";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI no está definida");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};
global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  console.log("Connecting to MongoDB...");

  // ✅ Reutiliza conexión existente y sana
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // ✅ Si la promise anterior falló, resetea para reintentar
  if (cached.promise && mongoose.connection.readyState === 0) {
    cached.promise = null;
    cached.conn = null;
  }

  if (!cached.promise) {
    console.log("🔄 Iniciando mongoose.connect()...");
    console.log("🔗 URI definida:", !!MONGO_URI);
    console.log("🔗 URI preview:", MONGO_URI?.substring(0, 30) + "..."); // solo primeros 30 chars

    cached.promise = mongoose
      .connect(MONGO_URI as string, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        maxPoolSize: 1,
        minPoolSize: 0,
      })
      .then((conn) => {
        console.log("✅ mongoose.connect() resolvió OK");
        return conn;
      })
      .catch((err) => {
        console.error("❌ mongoose.connect() rechazó:", err.message);
        console.error("❌ Error code:", err.code);
        console.error("❌ Error name:", err.name);
        cached.promise = null;
        cached.conn = null;
        throw err;
      });
  }

  console.log("⏳ Esperando await cached.promise...");
  cached.conn = await cached.promise;
  console.log("✅ Conexión establecida");

  return cached.conn;
}
