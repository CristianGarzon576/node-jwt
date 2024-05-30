import User from './User';

interface UserRepository {
    save(user: User): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
    findById(id: string): Promise<User | null>
}

export default UserRepository;
