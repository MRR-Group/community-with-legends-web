import {Credential} from "../entities/credential.ts";
import {AuthService} from "../services/authService.ts";
import AuthRepository from "../repositories/authRepository.ts";
import {User} from "../entities/user.ts";
import UserRepository from "../repositories/userRepository.ts";

export class LoginUseCase {
  private _authService: AuthService;
  private _authRepository: AuthRepository;
  private _userRepository: UserRepository;

  constructor(authService: AuthService, authRepository: AuthRepository, userRepository: UserRepository) {
    this._authService = authService;
    this._authRepository = authRepository;
    this._userRepository = userRepository;
  }

  public async login(email: string, password: string): Promise<User> {
    const credentials = new Credential(email, password);

    const id = await this._authService.login(credentials);
    const user = await this._userRepository.byId(id);

    this._authRepository.User = user;

    return user;
  }
}