import express, { Request, Response } from 'express';
import connectDB from './config/db';
import teacherController from './interfaces/http/TeacherController';
import userController from './interfaces/http/UserController';

const app = express();

// // Conectar a la base de datos
connectDB();

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Rutas
app.use('/api/users', userController);
app.use('/api/teachers', teacherController);

// Middleware de manejo de errores
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})