import express from 'express';
import User from '../../domain/User';
import MongoUserRepository from '../../infrastructure/MongoUserRepository';
import { authMiddleware, roleMiddleware } from '../../infrastructure/AuthMiddleware';
import UserService from '../../services/UserService';

const router = express.Router();

const userRepository = new MongoUserRepository();
const userService = new UserService(userRepository);

router.post('/register', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const { username, password, role, name, email, phone, address, company } = req.body;
        const user = new User(username, password, role, name, email, phone, address, company);
        await userService.createUser(user);
        res.status(201).send('Usuario registrado');
    } catch (e: any) {
        res.status(401).send({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userService.authUser(username, password);
        res.header('Authorization', token).send('Autenticado');
    } catch (err) {
        res.status(400).send('Usuario o contraseña incorrectos');
    }
});

router.get('/:userId', authMiddleware, roleMiddleware(['admin', 'student', 'teacher']), async (req, res) => {
    const id = req.params.userId;
    const user = await userService.getUserById(id);
    res.status(200).send({ user });
});

router.post('/logout', authMiddleware, roleMiddleware(['admin', 'student', 'teacher']), async (req, res) => {

})

export default router;
