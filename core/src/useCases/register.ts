import {Credential} from "../entities/credential.ts";

export interface RegisterService {
    register(name: string, credential: Credential): Promise<void>;
}

export class RegisterUseCase {
    private _registerService: RegisterService;

    constructor(registerService: RegisterService) {
        this._registerService = registerService;
    }

    public async register(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
        if(password !== confirmPassword) {
            throw new Error('Passwords does not match')
        }

        const credentials = new Credential(email, password);

        await this._registerService.register(name, credentials);
    }
}