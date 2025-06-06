import EditProfileRepository from "../repositories/editProfileRepository.ts";


export class ChangeNameUseCase {
  private _editProfileRepository: EditProfileRepository;

  constructor(editProfileRepository: EditProfileRepository) {
    this._editProfileRepository = editProfileRepository;
  }

  public async changeName(name: string): Promise<void> {
    return this._editProfileRepository.changeName(name);
  }
}