import {AuthService} from "../services/authService.ts";
import {Email} from "../entities/email.ts";
import {Password} from "../entities/password.ts";
import PasswordsDoNotMatchException from "../exceptions/passwordsDoNotMatchException.ts";

export class ResetPasswordUseCase {
    private _authService: AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;
    }

    public async resetPassword(email: string, token: string, password: string, passwordConfirmation: string): Promise<void> {
        if(password !== passwordConfirmation) {
            throw new PasswordsDoNotMatchException();
        }

        await this._authService.resetPassword(
            new Email(email),
            token,
            new Password(password),
            new Password(passwordConfirmation),
        );
    }
}