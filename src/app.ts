import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
// import yaml from 'js-yaml';
import projectsRoutes from "./routes/projects";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto por la URL de tu frontend
    credentials: true,
  })
);
app.use(express.json());

// Swagger UI con swagger-output.json
const swaggerDocument = require("../swagger-output.json");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", projectsRoutes);

export default app;
