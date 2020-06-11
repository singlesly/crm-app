/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageRepository
 */
import { Stage } from "../entity/Stage";
import { Injectable, NotImplementedException } from "@nestjs/common";
import { Collection, Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";

/*

    {
        name:
        order:
        changeName()
    }

    { name, order }

 */

@Injectable()
export class StageRepository {

    private readonly collection: Collection = this.connection.collection("stages");

    constructor(
        @InjectConnection() private readonly connection: Connection
    ) {
    }

    public async save(stage: Stage): Promise<void> {
        const document = {
            name: Reflect.get(stage, "name"),
            order: Reflect.get(stage, "order")
        };

        const result = await this.collection.insertOne(document);
        Reflect.set(stage, "id", result.insertedId.toString());
    }

    public async update(stage: Stage): Promise<void> {
        throw new NotImplementedException();
    }

    public async get(id: string): Promise<Stage> {
        throw new NotImplementedException();
    }

    public async remove(stage: Stage): Promise<void> {
        throw new NotImplementedException();
    }

    public async findAll(): Promise<Stage[]> {
        throw new NotImplementedException();
    }
}
