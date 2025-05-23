import ValidationException from "./validationException.ts";

export default class PasswordsDoNotMatchException extends ValidationException {
    public constructor() {
        super('Passwords does not match', 'password');
    }
}