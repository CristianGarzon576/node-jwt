import mongoose from 'mongoose';
import User from '../domain/User';
import UserRepository from '../domain/UserRepository';
import { usersData } from '../mocks/users';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], default: 'student' },
});

const UserModel = mongoose.model('User', userSchema);

class MongoUserRepository implements UserRepository {

    async save(user: User): Promise<void> {
        if (!process.env.USE_MONGO) {
            await usersData.push(user);
        }
        const userModel = new UserModel(user);
        await userModel.save();
    }

    async findByUsername(username: string): Promise<User | null> {
        if (!process.env.USE_MONGO) {
            return new Promise((resolve) => {
                const users = usersData;
                const user = users.find((userEntry) => userEntry.username.trim().toLocaleLowerCase() == username.trim().toLocaleLowerCase())
                if (user != undefined) resolve(user);
                else resolve(null);
            })
        }
        return await UserModel.findOne({ username });
    }

    async findById(id: string): Promise<User | null> {
        if (!process.env.USE_MONGO) {
            return new Promise((resolve) => {
                const users = usersData;
                const user = users.find((userEntry) => userEntry.id == id);
                if (user != undefined) resolve(user);
                else resolve(null);
            })
        }
        return await UserModel.findOne({ id });
    }
}

export default MongoUserRepository;
