import {Email} from "./email.ts";
import InvalidPasswordException from "../exceptions/invalidPasswordException.ts";

export class Credential {
    private _email: Email;
    private _password: string;

    public constructor(email: string, password: string) {
        if(!this.isValidPassword(password)) {
            throw new InvalidPasswordException();
        }

        this._email = new Email(email);
        this._password = password;
    }

    public get email(): string {
        return this._email.value;
    }

    public get password(): string {
        return this._password;
    }

    private isValidPassword(password: string): boolean {
        return password.length >= 8 && password.toUpperCase() !== password && password.toLowerCase() !== password;
    }
}