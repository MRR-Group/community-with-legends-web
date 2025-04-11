import {Email} from "./email.ts";

export class User {
    private _id: number;
    private _name: string;
    private _email: Email;

    public constructor(id: number, name: string, email: string) {
        this._id = id;
        this._name = name;
        this._email = new Email(email);
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email.value;
    }
}