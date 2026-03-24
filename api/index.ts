// api/index.ts
import app from "../src/app";
import { connectDB } from "../src/config/mongo";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('---- ENTRO A INDEX ----');
  
  try {
    console.log('TRY HANDLER');
    await connectDB();
    console.log('✅ DB conectada, delegando a Express...');

    // ✅ Elimina serverless-http — usa Express directamente
    await new Promise<void>((resolve, reject) => {
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