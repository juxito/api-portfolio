console.log('---- ENTRO A INDEX ----');

import serverless from "serverless-http";
import app from "../src/app";
import { connectDB } from "../src/config/mongo";

let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

export default async function handler(req: any, res: any) {
  await ensureDB();
  return serverless(app)(req, res);
}