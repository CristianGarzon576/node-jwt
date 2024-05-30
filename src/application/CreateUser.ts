import UserRepository from '../domain/UserRepository';
import bcrypt from 'bcrypt';
import User from '../domain/User';
import { uuid } from 'uuidv4';

class CreateUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: User): Promise<void> {
        user.id = uuid();
        user.password = await bcrypt.hash(user.password, 10);
        await this.userRepository.save(user);
    }
}

export default CreateUser;
