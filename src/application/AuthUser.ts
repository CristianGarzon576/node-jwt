import UserRepository from '../domain/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secreto'

class AuthUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(username: string, password: string): Promise<string> {
        const user = await this.userRepository.findByUsername(username);
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Autenticación fallida');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        return token;
    }
}

export default AuthUser;
