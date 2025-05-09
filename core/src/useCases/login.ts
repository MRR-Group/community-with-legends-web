import {Credential} from "../entities/credential.ts";

export interface LoginService {
  login(credential: Credential): Promise<number>;
}

export class LoginUseCase {
  private _LoginService: LoginService;

  constructor(LoginService: LoginService) {
    this._LoginService = LoginService;
  }

  public async login(email: string, password: string): Promise<number> {
    const credentials = new Credential(email, password);

    return await this._LoginService.login(credentials);
  }
}