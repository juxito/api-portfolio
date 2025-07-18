import { Schema, model } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  technologies: {};
  image_url?: string; // Opcional
  link?: string;      // Opcional
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: [true, 'El título es obligatorio'] },
  description: { type: String, required: [true, 'La descripción es obligatoria'] },
  technologies: { type: [String], required: [true, 'Las tecnologías son obligatorias'] },
  image_url: String,
  link: String
});

export const Project = model<IProject>('projects', ProjectSchema);
