/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageRepository
 */
import { Stage } from "../entity/Stage";
import { Injectable, NotImplementedException } from "@nestjs/common";
import { Collection, Connection, Types } from "mongoose";
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
        const document = this.classToDocument(stage);

        const result = await this.collection.insertOne(document);
        Reflect.set(stage, "id", result.insertedId.toString());
    }

    public async update(stage: Stage): Promise<void> {
        const id = Reflect.get(stage, "id");

        if(!id) {
            throw new Error("Update can be call only on entity with id");
        }

        const document = this.classToDocument(stage);

        await this.collection.updateOne({
            _id: new Types.ObjectId(id),
        }, {
            $set: document
        });
    }

    public async get(id: string): Promise<Stage> {
        const objectId = new Types.ObjectId(id);
        const found = await this.collection.findOne({_id: objectId});
        if(!found) {
            throw new Error("Stage not found.");
        }

        return this.documentToClass(found);
    }

    public async remove(stage: Stage): Promise<void> {
        const id = Reflect.get(stage, "id");

        if(!id) {
            throw new Error("Remove can be call only on entity with id");
        }

        await this.collection.deleteOne({
            _id: new Types.ObjectId(id)
        });

    }

    public async findAll(): Promise<Stage[]> {
        const documents = await this.collection.find({}).toArray();
        return documents.map(this.documentToClass);
    }

    private documentToClass(document: any): Stage {
        const plain = {} as Stage;

        Reflect.set(plain, "id", document._id.toString());
        Reflect.set(plain, "name", document.name);
        Reflect.set(plain, "order", document.order);
        Reflect.setPrototypeOf(plain, Stage.prototype);

        return plain;
    }

    private classToDocument(stage: Stage): any {
        return {
            name: Reflect.get(stage, "name"),
            order: Reflect.get(stage, "order")
        };
    }
}
