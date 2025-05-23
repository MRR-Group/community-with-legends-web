import {Email} from "./email.ts";
import {Password} from "./password.ts";

export class Credential {
    private _email: Email;
    private _password: Password;

    public constructor(email: string, password: string) {
        this._email = new Email(email);
        this._password = new Password(password);
    }

    public get email(): string {
        return this._email.value;
    }

    public get password(): string {
        return this._password.value;
    }
}