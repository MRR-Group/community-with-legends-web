import {Credential} from "../entities/credential.ts";
import axios from "axios";

export class AuthService {
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

    public async logout(): Promise<void> {
        await axios.post(`/api/auth/logout`);
    }
}