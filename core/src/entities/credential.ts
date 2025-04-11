import {Email} from "./email.ts";

export class Credential {
    private _email: Email;
    private _password: string;

    public constructor(email: string, password: string) {
        if(!this.isValidPassword(password)) {
            throw new Error('Password must be of 8 characters, contain lower case and upper case letter');
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