import {Permission, User} from "../entities/user.ts";

export default interface UserDto {
  id: number;
  roles: string[];
  email: string;
  name: string;
  avatar: string;
  permissions: Permission[];
  created_at: string;
  hasPassword: boolean,
  hasTwitchAccount: boolean,
}
export function userDtoToEntity(data: UserDto):User {
  return new User(data.id, data.name, data.email, data.avatar, data.permissions, data.hasPassword, data.hasTwitchAccount);
}