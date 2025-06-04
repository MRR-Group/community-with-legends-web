import UserRepository from "../repositories/userRepository.ts";


export class BanUserUseCase {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async banUser(id: number): Promise<void> {
    return this._userRepository.banUser(id);
  }
}