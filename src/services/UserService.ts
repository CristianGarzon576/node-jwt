import CreateUser from "../application/CreateUser";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import GetUserById from "../application/GetUserById";
import AuthUser from "../application/AuthUser";

class UserService {
    private _userRepository: UserRepository;
    private _createUser: CreateUser;
    private _getUserById: GetUserById;
    private _authUser: AuthUser;

    private validTokens: string[] = [];

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
        this._createUser = new CreateUser(this._userRepository);
        this._getUserById = new GetUserById(this._userRepository);
        this._authUser = new AuthUser(this._userRepository);
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            const user = await this._getUserById.execute(id);
            return user;
        } catch (e) {
            throw new Error(`the user is not found`);
        }
    }

    async createUser(user: User): Promise<void> {
        try {
            await this._createUser.execute(user);
        } catch (e) {
            throw new Error(`the user can't created`);
        }
    }

    validateToken(token: string): boolean {
        const oldToken = this.validTokens.find(t => t == token);
        if (!oldToken) {
            this.validTokens.push(token);
            return true;
        }
        return false;
    }

    async authUser(username: string, password: string): Promise<string> {
        try {
            const token = await this._authUser.execute(username, password);
            if (this.validateToken(token)) {
                return token;
            }
            throw new Error(`the user is not valid`);
        } catch (e) {
            throw new Error(`the user is not found`);
        }
    }
}

export default UserService;
