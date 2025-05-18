import {AuthService} from "../services/authService.ts";
import AuthRepository from "../repositories/authRepository.ts";

export class LogoutUseCase {
  private _authService: AuthService;
  private _authRepository: AuthRepository;

  constructor(authService: AuthService, authRepository: AuthRepository) {
    this._authService = authService;
    this._authRepository = authRepository;
  }

  public async logout(): Promise<void> {
    await this._authService.logout();
    this._authRepository.clear();
  }
}