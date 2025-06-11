import {Email} from "./email.ts";
import {Password} from "./password.ts";

export class Credential {
  public readonly email: Email;
  public readonly password: Password;

  public constructor(email: string, password: string) {
    this.email = new Email(email);
    this.password = new Password(password);
  }
}