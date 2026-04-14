import express from "express";
import cors from "cors";
// import swaggerUi from "swagger-ui-express";
import projectsRoutes from "./routes/projects";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://portfolio-brown-eight-43.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, curl, SSR)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANTE: manejar OPTIONS
// app.options("*", cors());

app.use(express.json());

// Swagger
// const swaggerDocument = require("../swagger-output.json");
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.ts — temporal para diagnóstico
app.use("/", (req, res, next) => {
  console.log('📍 Express recibió URL:', req.url);
  console.log('📍 Express recibió method:', req.method);
  next();
});

app.use("/", projectsRoutes);

export default app;
