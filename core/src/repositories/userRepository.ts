import axios from "axios";
import Response from "../dto/response.ts";
import UserDto, {userDtoToEntity} from "../dto/userDto.ts";
import {User} from "../entities/user.ts";

export default class UserRepository {
  public async byId(id: number):Promise<User> {
    const response = await axios.get<Response<UserDto>>(`/api/users/${id}`);

    return userDtoToEntity(response.data.data);
  }

  public async reportUser(id: number): Promise<void> {
    return await axios.post(`/api/users/${id}/report`);
  }

  public async banUser(id: number): Promise<void> {
    return await axios.post(`/api/users/${id}/ban?by_ip=false`);
  }
}