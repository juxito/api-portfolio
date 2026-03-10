/*
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 4000;
// const MONGO_URI = 'mongodb://localhost:27017/portfolio';
const MONGO_URI = 'mongodb://ac-0xhuss3-shard-00-01.sx3ti0i.mongodb.net:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));
*/

import dotenv from 'dotenv';

// Cargar variables de entorno desde .env lo más temprano posible
dotenv.config();

import { connectDB } from './config/mongo';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    // Import app dynamically so we can catch errors during module initialization
    const { default: app } = await import("./app");
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor local en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    return {
      codeResponse: 500,
      codeMessage: "Error al iniciar el servidor",
      // error: error instanceof Error ? error.message : String(error),
    }
  }
}

bootstrap();
