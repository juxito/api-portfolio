import { Project } from './../src/models/Project';
import app from "../src/app";
import { connectDB } from "../src/config/mongo";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("---- ENTRO A INDEX ----");

  // 🧪 TEST 1: ¿Vercel responde sin DB?
  if (req.url === "/api/ping") {
    return res.json({ ok: true, ts: Date.now() });
  }

  // 🧪 TEST 2: ¿DB conecta y query resuelve?
  if (req.url === "/api/dbtest") {
    await connectDB();
    const count = await Project.countDocuments(); // más ligero que find()
    return res.json({ ok: true, count });
  }

  try {
    await connectDB();
    console.log("✅ DB conectada, delegando a Express...");

    // ✅ Reemplaza serverless(app)(req, res) por esto
    await new Promise<void>((resolve, reject) => {
      console.log("PROMIMSE app");

      app(req as any, res as any, (err?: any) => {
        if (err) reject(err);
        else resolve();
      });
    });
  } catch (error: any) {
    console.error("❌ Handler error:", error.message);
    if (!res.headersSent) {
      res.status(503).json({ error: error.message });
    }
  }
}
