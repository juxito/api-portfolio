console.log('---- ENTRO A INDEX ----');

import serverless from "serverless-http";
import app from "../src/app";
import { connectDB } from "../src/config/mongo";

let isConnected = false;

async function ensureDB() {
  console.log('-------ensureDB');
  
  if (!isConnected) {
    console.log('!!!!!!!ensureDB');
    await connectDB();
    isConnected = true;
  }
}

export default async function handler(req: any, res: any) {
  // ✅ Timeout global de 15s — si MongoDB no responde, falla rápido
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("DB connection timeout")), 15000)
  );

  try {
    console.log("TRY SERVELESS HANDLER");
    await Promise.race([ensureDB(), timeout]);
    return serverless(app)(req, res);
  } catch (error: any) {
    console.error("Handler error:", error.message);
    return res.status(503).json({
      error: "Service unavailable",
      message: error.message,
    });
  }
}