import ValidationException from "./validationException.ts";

export default class InvalidEmailException extends ValidationException {
  public constructor() {
    super('Email should contain @ character', 'email');
  }
}