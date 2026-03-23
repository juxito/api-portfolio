import { Router } from "express";
import { Project } from "../models/Project";

const router = Router();

router.get("/projects", async (_, res) => {

  const projects = await Project.find();
  console.log('****projects ***');
  // console.log('****projects: ', projects);
  
  res.json(projects);
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
