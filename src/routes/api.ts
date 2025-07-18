import { Router } from 'express';
// import { Profile } from '../models/Profile';
// import { Skill } from '../models/Skill';
import { Project } from '../models/Project';
// import { Experience } from '../models/Experience';

const router = Router();

// Projects
router.get('/projects', async (_, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// // Profile
// router.get('/profile', async (_, res) => {
//   const profile = await Profile.findOne();
//   res.json(profile);
// });

// // Skills
// router.get('/skills', async (_, res) => {
//   const skills = await Skill.find();
//   res.json(skills);
// });


// // Experience
// router.get('/experience', async (_, res) => {
//   const experience = await Experience.find();
//   res.json(experience);
// });

export default router;
