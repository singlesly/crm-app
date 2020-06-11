/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CustomerRepository
 */
import { Injectable, NotImplementedException } from "@nestjs/common";
import { Customer } from "../entity/Customer";
import { FindCustomerOptions } from "../options/FindCustomerOptions";
import { Collection, Connection, Types } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { Stage } from "../entity/Stage";
import { Contact } from "../entity/Contact";
import { doc } from "prettier";
import { formatWithOptions } from "util";

@Injectable()
export class CustomerRepository {

    private readonly collection: Collection = this.connection.collection("customers");

    constructor(
        @InjectConnection() private readonly connection: Connection
    ) {}

    public async findBy(options: FindCustomerOptions): Promise<Customer[]> {

        const filter = {} as any;

        if(Array.isArray(options.stages)) {
            filter.stage = {
                $in: options.stages.map(id => new Types.ObjectId(id))
            };
        }

        const documents = await this.collection.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "stages",
                    localField: "stage",
                    foreignField: "_id",
                    as: "stage"
                }
            },
            { $unwind: "$stage" },
        ]).toArray();

        return documents.map(this.documentToClass);
    }

    public async save(customer: Customer): Promise<void> {
        const id = Reflect.get(customer, "id");
        const document = this.classToDocument(customer);
        const result = await this.collection.updateOne({
            _id: new Types.ObjectId(id),
        }, {
            $set: document
        });
        if(!id) {
            Reflect.set(customer, "id", result.upsertedId);
        }
    }

    public async get(id: string): Promise<Customer> {
        const found = (await this.collection.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "stages",
                    localField: "stage",
                    foreignField: "_id",
                    as: "stage"
                }
            },
            { $unwind: "$stage" },
            { $limit: 1 }
        ]).toArray())[0];

        if(!found) {
            throw new Error("Customer not found.");
        }

        return this.documentToClass(found);
    }

    private documentToClass(document: any): Customer {
        const customer = {} as Customer;
        const stage = {} as Stage;
        Reflect.set(stage, "id", document.stage._id.toString());
        Reflect.set(stage, "name", document.stage.name);
        Reflect.set(stage, "order", document.stage.order);
        Reflect.setPrototypeOf(stage, Stage.prototype);

        Reflect.set(customer, "id", document._id.toString());
        Reflect.set(customer, "name", document.name);
        Reflect.set(customer, "stage", stage);

        Reflect.set(customer, "contacts", document.contacts.map(contact => {
            Reflect.setPrototypeOf(contact, Contact.prototype);
            return contact;
        }));
        Reflect.setPrototypeOf(customer, Customer.prototype);

        return customer;
    }

    private classToDocument(customer: Customer): any {
        const contacts: Contact[] = Reflect.get(customer, "contacts");
        const stage = Reflect.get(customer, "stage");
        const stageId = Reflect.get(stage, "id");

        return {
            name: Reflect.get(customer, "name"),
            contacts: contacts.map(contract => ({
                title: Reflect.get(contract, "title"),
                channel: Reflect.get(contract, "channel"),
                value: Reflect.get(contract, "value"),
            })),
            stage: new Types.ObjectId(stageId),
        };
    }
}
