import UserRepository from '../domain/UserRepository';
import User from '../domain/User';

class GetUserById {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}

export default GetUserById;
