import {Credential} from "../entities/credential.ts";
import axios from "axios";
import {Email} from "../entities/email.ts";
import {Password} from "../entities/password.ts";

export class AuthService {
    public async register(name: string, credential: Credential): Promise<void> {
        await axios.post(`/api/auth/register`, {
            name: name,
            email: credential.email.value,
            password: credential.password.value
        });
    }

    public async login(credential: Credential): Promise<number> {
        const response = await axios.post(`/api/auth/login`, {
            email: credential.email.value,
            password: credential.password.value
        });

        return response.data.user_id;
    }

    public async refresh(): Promise<number> {
        const response = await axios.post(`/api/auth/refresh`);

        return response.data.user_id;
    }

    public async logout(): Promise<void> {
        await axios.post(`/api/auth/logout`);
    }

    public async sendResetPasswordEmail(email: Email): Promise<void> {
        await axios.post(`/api/auth/forgot-password`, {
            email: email.value,
        });
    }

    public async resetPassword(email: Email, token: string, password: Password, passwordConfirmation: Password): Promise<void> {
        await axios.post(`/api/auth/reset-password`, {
            email: email.value,
            token: token,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        });
    }

    public async setPasswordTwitch(password: Password, passwordConfirmation: Password): Promise<void> {
        await axios.post(`/api/user/set-password`, {
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        });
    }
}