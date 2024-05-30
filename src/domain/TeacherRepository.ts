import Teacher from './Teacher';

interface TeacherRepository {
    save(teacher: Teacher): Promise<void>;
    findById(id: string): Promise<Teacher | null>;
    findByName(name: string): Promise<Teacher | null>;
    findAll(): Promise<Teacher[]>
}

export default TeacherRepository;
