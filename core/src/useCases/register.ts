import {Credential} from "../entities/credential.ts";
import {AuthService} from "../services/authService.ts";

export class RegisterUseCase {
    private _authService: AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;
    }

    public async register(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
        if(password !== confirmPassword) {
            throw new Error('Passwords does not match')
        }

        const credentials = new Credential(email, password);

        await this._authService.register(name, credentials);
    }
}