import {AuthService} from "../services/authService.ts";
import AuthRepository from "../repositories/authRepository.ts";
import {User} from "../entities/user.ts";
import UserRepository from "../repositories/userRepository.ts";

export class RefreshUseCase {
  private _authService: AuthService;
  private _authRepository: AuthRepository;
  private _userRepository: UserRepository;

  constructor(authService: AuthService, authRepository: AuthRepository, userRepository: UserRepository) {
    this._authService = authService;
    this._authRepository = authRepository;
    this._userRepository = userRepository;
  }

  public async refresh(): Promise<User> {

    const id = await this._authService.refresh();
    const user = await this._userRepository.byId(id);

    this._authRepository.User = user;

    return user;
  }
}