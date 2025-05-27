import CustomException from "./customException.ts";

export default class CannotPostException extends CustomException {
    public constructor() {
        super('Something went wrong');
    }
}