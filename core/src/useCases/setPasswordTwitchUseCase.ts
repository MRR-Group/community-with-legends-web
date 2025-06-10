import {AuthService} from "../services/authService.ts";
import {Password} from "../entities/password.ts";
import PasswordsDoNotMatchException from "../exceptions/passwordsDoNotMatchException.ts";

export class SetPasswordTwitchUseCase {
    private _authService: AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;
    }

    public async setPasswordTwitch(password: string, passwordConfirmation: string): Promise<void> {
        if(password !== passwordConfirmation) {
            throw new PasswordsDoNotMatchException();
        }

        await this._authService.setPasswordTwitch(
            new Password(password),
            new Password(passwordConfirmation),
        );
    }
}