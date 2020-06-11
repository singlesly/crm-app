/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CustomerRepository
 */
import { NotImplementedException } from "@nestjs/common";
import { Customer } from "../entity/Customer";
import { FindCustomerOptions } from "../options/FindCustomerOptions";

export class CustomerRepository {
    public async findBy(options: FindCustomerOptions): Promise<Customer[]> {
        throw new NotImplementedException();
    }

    public async save(customer: Customer): Promise<void> {
        throw new NotImplementedException();
    }

    public async get(id: string): Promise<Customer> {
        throw new NotImplementedException();
    }
}
