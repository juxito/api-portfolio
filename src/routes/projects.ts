import { Router } from "express";
import { Project } from "../models/Project";

const router = Router();

router.get("/projects", async (_, res) => {
  console.log('🔄 GET /projects iniciado');

  try {
    console.log('🔄 Ejecutando Project.find()...');
    const projects = await Project.find().lean(); // ✅ .lean() más rápido
    console.log('✅ Project.find() completó, total:', projects.length);
    
    res.json(projects);
    console.log('✅ res.json() enviado');
  } catch (error: any) {
    console.error('❌ Error en GET /projects:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Obtener un proyecto por ID
router.get("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

router.post("/projects", async (req, res) => {
  // #swagger.tags = ['Projects']

  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res.status(200).json({
        codeResponse: 400,
        codeMessage: "Algo ha ido mal!",
        errors: messages,
      });
    }
    res.status(500).json({ message: "Error al crear el proyecto" });
  }
});

// Actualizar un proyecto por ID
router.put("/projects/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

// Eliminar un proyecto por ID
router.delete("/projects/:id", async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
});

// --- Aquí puedes agregar CRUD para otros modelos siguiendo el mismo patrón ---

export default router;
