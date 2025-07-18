const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Portfolio',
    description: 'Documentación de la API Portfolio',
  },
  host: 'localhost:4000',
  basePath: '/',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts']; // Apunta a tu archivo principal de rutas

swaggerAutogen(outputFile, endpointsFiles, doc);