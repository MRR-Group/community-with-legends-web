import {Entity} from "./entity.ts";

export default class Game extends Entity {
    public readonly name: string;
    public readonly cover: string;

    public constructor(id: number, name: string, cover: string) {
        super(id);

        this.name = name;
        this.cover = cover;
    }
}