import { User } from "../entities/user.ts";
import {RegisterService} from "../useCases/register.ts";
import {Credential} from "../entities/credential.ts";

export class AuthService implements RegisterService {
    public register(name: string, email: string, password: string, confirmPassword: string): Promise<User> {
        if(password !== confirmPassword) {
            throw new Error('Passwords does not match')
        }

        const credential = new Credential(email, password)

        return Promise.resolve(new User(0, name, email));
    }
}