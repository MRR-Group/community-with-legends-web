import InvalidEmailException from "../exceptions/invalidEmailException.ts";

export class Email {
  public readonly value: string;

  public constructor(value: string) {
    if(!this.isValidEmail(value)) {
      throw new InvalidEmailException();
    }

    this.value = value;
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }
}