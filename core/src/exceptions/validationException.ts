import CustomException from "./customException.ts";

export default class ValidationException extends CustomException {
    public readonly category: string;

    public constructor(message: string, category: string) {
        super(message);

        this.category = category;
    }
}