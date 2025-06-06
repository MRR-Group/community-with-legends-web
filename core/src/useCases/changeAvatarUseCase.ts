import EditProfileRepository from "../repositories/editProfileRepository.ts";


export class ChangeAvatarUseCase {
  private _editProfileRepository: EditProfileRepository;

  constructor(editProfileRepository: EditProfileRepository) {
    this._editProfileRepository = editProfileRepository;
  }

  public async changeAvatar(avatar: File): Promise<void> {
    return this._editProfileRepository.changeAvatar(avatar);
  }
}