import InvalidEmailException from "../exceptions/invalidEmailException.ts";

export class Email {
    private _value: string;

    public constructor(value: string) {
        if(!this.isValidEmail(value)) {
            throw new InvalidEmailException();
        }

        this._value = value;
    }

    private isValidEmail(email: string): boolean {
        return email.includes('@');
    }

    public get value(): string {
        return this._value;
    }
}