import Teacher from "../domain/Teacher";
import TeacherRepository from "../domain/TeacherRepository";

class CreateTeacher {
    teacherRepository: TeacherRepository;

    constructor(teacherRepository: TeacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    async execute(teacher: Teacher) {
        return await this.teacherRepository.save(teacher);
    }
}

export default CreateTeacher;
