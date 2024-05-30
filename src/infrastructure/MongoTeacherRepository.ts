import mongoose from 'mongoose';
import Teacher from '../domain/Teacher';
import TeacherRepository from '../domain/TeacherRepository';

const teacherSchema = new mongoose.Schema({
    name: String,
});

const TeacherModel = mongoose.model('Teacher', teacherSchema);

class MongoTeacherRepository implements TeacherRepository {

    async findById(id: string): Promise<Teacher | null> {
        throw new Error('Method not implemented.');
    }
    async findByName(name: string): Promise<Teacher | null> {
        throw new Error('Method not implemented.');
    }
    async save(teacher: Teacher) {
        if (!process.env.USE_MONGO) {
            await null;
        }
        const teacherModel = new TeacherModel(teacher);
        await teacherModel.save();
    }

    async findAll(): Promise<Teacher[]> {
        console.log('aca entro a preguntar')
        if (!process.env.USE_MONGO) {
            return await [];
        }
        return await TeacherModel.find();
    }
}

export default MongoTeacherRepository;
