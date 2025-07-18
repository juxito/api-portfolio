import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 4000;
const MONGO_URI = 'mongodb+srv://juxmtz:ReVUGU2zfHFoLrED@cluster0.sx3ti0i.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));
