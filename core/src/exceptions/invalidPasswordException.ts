import ValidationException from "./validationException.ts";

export default class InvalidPasswordException extends ValidationException {
    public constructor() {
        super('Password must be of 8 characters, contain lower and upper case letter', 'password');
    }
}