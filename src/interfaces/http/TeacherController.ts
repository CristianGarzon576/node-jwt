import express from 'express';
import CreateTeacher from '../../application/CreateTeacher';
import MongoTeacherRepository from '../../infrastructure/MongoTeacherRepository';
import { authMiddleware, roleMiddleware } from '../../infrastructure/AuthMiddleware';
import Teacher from '../../domain/Teacher';

const router = express.Router();

const teacherRepository = new MongoTeacherRepository();
const createTeacher = new CreateTeacher(teacherRepository);

router.post('',
    authMiddleware, roleMiddleware(['teacher']),
    async (req, res) => {
        const { id, name, profession, image, description, tagas, from } = req.body;
        const teacher = new Teacher(id, name, profession, image, description, tagas, from);
        await createTeacher.execute(teacher);
        res.status(201).send('Profesor registrado');
    });

router.get('',
    authMiddleware, roleMiddleware(['teacher', 'student']),
    async (req, res) => {
        const teachers = await teacherRepository.findAll();
        res.json(teachers);
    });

export default router;
