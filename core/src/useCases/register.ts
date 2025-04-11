import {Credential} from "../entities/credential.ts";
import {User} from "../entities/user.ts";

export interface RegisterService {
    register(name: string, credential: Credential): Promise<User>;
}

export class RegisterUseCase {
    private _registerService: RegisterService;

    constructor(registerService: RegisterService) {
        this._registerService = registerService;
    }

    public async register(name: string, email: string, password: string): Promise<User> {
        const credentials = new Credential(email, password);

        return this._registerService.register(name, credentials);
    }
}