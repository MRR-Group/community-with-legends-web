import CustomException from "./customException.ts";

export default class UnauthenticatedException extends CustomException {
    public constructor() {
        super('You must be logged in to do that');
    }
}