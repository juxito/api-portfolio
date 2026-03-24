import { log } from "console";
import app from "../src/app";
import { connectDB } from "../src/config/mongo";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('---- ENTRO A INDEX ----');

  try {
    await connectDB();
    console.log('✅ DB conectada, delegando a Express...');

    // ✅ Reemplaza serverless(app)(req, res) por esto
    await new Promise<void>((resolve, reject) => {
      console.log('PROMIMSE app');
      
      app(req as any, res as any, (err?: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

  } catch (error: any) {
    console.error('❌ Handler error:', error.message);
    if (!res.headersSent) {
      res.status(503).json({ error: error.message });
    }
  }
}