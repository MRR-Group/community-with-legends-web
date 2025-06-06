import EditProfileRepository from "../repositories/editProfileRepository.ts";


export class DeleteAvatarUseCase {
  private _editProfileRepository: EditProfileRepository;

  constructor(editProfileRepository: EditProfileRepository) {
    this._editProfileRepository = editProfileRepository;
  }

  public async deleteAvatar(): Promise<void> {
    return this._editProfileRepository.deleteAvatar();
  }
}