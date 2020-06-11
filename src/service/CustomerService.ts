/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CustomerService
 */
import { Customer } from "../entity/Customer";
import { AddCustomerData } from "../dto/AddCustomerData";
import { EditCustomerData } from "../dto/EditCustomerData";
import { ListCustomerData } from "../dto/ListCustomerData";
import { CustomerRepository } from "../repository/CustomerRepository";
import { StageService } from "./StageService";
import { Contact } from "../entity/Contact";
import { FindCustomerOptions } from "../options/FindCustomerOptions";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {

    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly stageService: StageService
    ) {}

    public async list(data: ListCustomerData): Promise<Customer[]> {
        const options: FindCustomerOptions = {} as FindCustomerOptions;
        options.stages = data.stages;

        return await this.customerRepository.findBy(options);
    }

    public async add(data: AddCustomerData): Promise<Customer> {

        const stage = await this.stageService.get(data.stage);
        const contacts = data.contacts.map(contact => new Contact(contact.title, contact.channel, contact.value));

        const customer = new Customer(data.name, stage, contacts);

        await this.customerRepository.save(customer);

        return customer;
    }

    public async edit(data: EditCustomerData): Promise<Customer> {
        const customer = await this.customerRepository.get(data.id);

        const stage = await this.stageService.get(data.stage);
        customer.changeStage(stage);

        customer.rename(data.name);

        await this.customerRepository.save(customer);

        return customer;
    }
}
