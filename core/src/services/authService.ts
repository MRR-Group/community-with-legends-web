import {RegisterService} from "../useCases/register.ts";
import {Credential} from "../entities/credential.ts";
import axios from "axios";

export class AuthService implements RegisterService {
    public async register(name: string, credential: Credential): Promise<void> {
        await axios.post(`/api/auth/register`, {
            name: name,
            email: credential.email,
            password: credential.password
        });
    }
}