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
    cached.promise = mongoose
      .connect(MONGO_URI as string, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000, // ✅ Falla en 10s si Atlas no responde
        connectTimeoutMS: 10000, // ✅ Timeout al establecer socket
        socketTimeoutMS: 30000, // ✅ Timeout por operación
        maxPoolSize: 1, // ✅ Serverless solo necesita 1 conexión
        minPoolSize: 0,
      })
      .catch((err) => {
        // ✅ Limpia el cache si falla — permite reintentar en la próxima llamada
        cached.promise = null;
        cached.conn = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
