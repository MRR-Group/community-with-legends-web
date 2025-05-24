import {Email} from "./email.ts";
import {Entity} from "./entity.ts";

export class User extends Entity {
    public readonly name: string;
    public readonly email: Email;

    public constructor(id: number, name: string, email: string) {
        super(id);

        this.name = name;
        this.email = new Email(email);
    }
}