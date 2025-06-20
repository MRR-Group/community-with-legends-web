import {Email} from "./email.ts";
import {Entity} from "./entity.ts";

export type Permission =
  'createPost'|
  'makeComment'|
  'reactToPost'|
  'banUsers'|
  'viewUsers'|
  'deletePosts'|
  'anonymizeUsers'|
  'manageAdministrators'|
  'manageModerators'|
  'updateGames'|
  'manageReports'|
  'renameUsers'|
  'changeUsersAvatar'|
  'deleteUserHardware'|
  'viewLogs';

export class User extends Entity {
  public readonly name: string;
  public readonly email: Email;
  public readonly avatar: string;
  public readonly permissions: Permission[];
  public readonly hasPassword: boolean;
  public readonly hasTwitchAccount: boolean;

  public constructor(id: number, name: string, email: string, avatar: string, permissions: Permission[], hasPassword: boolean, hasTwitchAccount: boolean) {
    super(id);

    this.name = name;
    this.email = new Email(email);
    this.avatar = avatar;
    this.permissions = permissions;
    this.hasPassword = hasPassword;
    this.hasTwitchAccount = hasTwitchAccount;
  }

  public can(permission: Permission): boolean {
    return this.permissions.includes(permission);
  }

  public cannot(permission: Permission): boolean {
    return !this.permissions.includes(permission);
  }

  public isBanned(): boolean {
    return this.permissions.length === 0;
  }
}