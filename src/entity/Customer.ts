/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class Customer
 */
import { Contact } from "./Contact";
import { Stage } from "./Stage";

export class Customer {
    private name: string;
    private contacts: Contact[];
    private stage: Stage;

    constructor(name: string, stage: Stage, contacts: Contact[] = []) {
        this.name = name;
        this.contacts = contacts;
        this.stage = stage;
    }

    public rename(name: string): void {
        this.name = name;
    }

    public changeStage(state: Stage): void {
        this.stage = state;
    }

    public addContact(contact: Contact): void {
        this.contacts.push(contact);
    }

    public removeContact(channel: string, value: string): void {
        this.contacts = this.contacts
            .filter((contact) => contact.getChannel() !== channel && contact.getValue() !== value);
    }

    public getName(): string {
        return this.name;
    }

    public getContacts(): Contact[] {
        return this.contacts;
    }

    public getStage(): Stage {
        return this.stage;
    }

}
