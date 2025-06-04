import UserRepository from "../repositories/userRepository.ts";


export class ReportUserUseCase {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async reportUser(id: number): Promise<void> {
    return this._userRepository.reportUser(id);
  }
}