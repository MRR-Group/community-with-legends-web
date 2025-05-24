import InvalidPasswordException from "../exceptions/invalidPasswordException.ts";

export class Password {
    public readonly value: string;

    public constructor(value: string) {
        if(!this.isValidPassword(value)) {
            throw new InvalidPasswordException();
        }

        this.value = value;
    }

    private isValidPassword(password: string): boolean {
        return password.length >= 8 && password.toUpperCase() !== password && password.toLowerCase() !== password;
    }
}