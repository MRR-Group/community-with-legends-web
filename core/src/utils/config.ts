export class Config {
  public static get apiUrl(){
    return import.meta.env.VITE_API;
  }
}