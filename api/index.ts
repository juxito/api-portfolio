import { Project } from './../src/models/Project';
import app from "../src/app";
import { connectDB } from "../src/config/mongo";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("---- ENTRO A INDEX ----");
  console.log("📍 req.url original:", req.url);

  if (req.url === "/api/ping") {
    return res.json({ ok: true, ts: Date.now() });
  }

  if (req.url === "/api/dbtest") {
    await connectDB();
    const count = await Project.countDocuments();
    return res.json({ ok: true, count });
  }

  try {
    await connectDB();
    console.log("✅ DB conectada, delegando a Express...");

    // ✅ Quita el prefijo /api para que Express encuentre la ruta
    if (req.url?.startsWith("/api")) {
      req.url = req.url.replace("/api", "") || "/";
    }
    console.log("📍 req.url normalizada:", req.url);

    await new Promise<void>((resolve, reject) => {
      console.log("PROMISE app");
      app(req as any, res as any, (err?: any) => {
        if (err) {
          console.error("❌ Express error:", err.message);
          reject(err);
        } else {
          console.log("✅ Express manejó la solicitud correctamente");
          resolve();
        }
      });
    });

  } catch (error: any) {
    console.error("❌ Handler error:", error.message);
    if (!res.headersSent) {
      res.status(503).json({ error: error.message });
    }
  }
}