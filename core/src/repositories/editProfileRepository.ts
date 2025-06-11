import axios from "axios";

export default class EditProfileRepository {
  public async changeAvatar(avatar: File): Promise<void> {
    const formData = new FormData();

    formData.append('avatar', avatar);

    return await axios.post(`/api/user/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  public async deleteAvatar(): Promise<void> {
    return await axios.delete(`/api/user/avatar`);
  }

  public async changeName(name: string): Promise<void> {
    return await axios.post(`/api/user/name`, {name});
  }
}