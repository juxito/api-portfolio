import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import { connectDB } from '../src/config/mongo';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    await connectDB();
    return app(req as any, res as any);
  } catch (error) {
    console.error('DB connection error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
}
