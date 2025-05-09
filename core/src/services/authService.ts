import {RegisterService} from "../useCases/register.ts";
import {Credential} from "../entities/credential.ts";
import axios from "axios";
import {LoginService} from "../useCases/login.ts";

export class AuthService implements RegisterService, LoginService {
    public async register(name: string, credential: Credential): Promise<void> {
        await axios.post(`/api/auth/register`, {
            name: name,
            email: credential.email,
            password: credential.password
        });
    }

    public async login(credential: Credential): Promise<number> {
        const response = await axios.post(`/api/auth/login`, {
            email: credential.email,
            password: credential.password
        });

        return response.data.user_id;
    }
}