import { Schema, model } from "mongoose";

export interface IProject {
  title: string;
  description: string;
  category: string;
  technologies: {};
  image: string;
  link?: string; // Opcional
  removable: boolean;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: [true, "El título es obligatorio"] },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  category: { type: String, required: [true, "La categoria es obligatoria"] },
  technologies: {
    type: [String],
    required: [true, "Las tecnologías son obligatorias"],
  },
  image: { type: String, required: [true, "La imagen es obligatorio"] },
  link: String,
  removable: { type: Boolean, default: false },
});

export const Project = model<IProject>("projects", ProjectSchema);
