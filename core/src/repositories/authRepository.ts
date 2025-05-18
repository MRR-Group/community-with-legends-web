import {User} from "../entities/user.ts";

export default class AuthRepository {
  private _user?:User;

  public get User():User|undefined {
    return this._user;
  }

  public set User(user:User) {
    this._user = user;
  }

  public get isLogged():boolean {
    return this._user !== undefined;
  }

  public clear() {
    this._user = undefined;
  }
}