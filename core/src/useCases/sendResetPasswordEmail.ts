import {AuthService} from "../services/authService.ts";
import {Email} from "../entities/email.ts";

export class SendResetPasswordEmailUseCase {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  public async sendEmail(email: string): Promise<void> {
    await this._authService.sendResetPasswordEmail(
      new Email(email)
    );
  }
}