export default class CustomException extends Error {
  public constructor(message: string) {
    super(message);
  }
}