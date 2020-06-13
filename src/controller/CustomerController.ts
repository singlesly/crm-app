/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CustomerController
 */
import { Controller, Get, Post, Put, Query } from "@nestjs/common";
import { CustomerService } from "../service/CustomerService";
import { Customer } from "../entity/Customer";
import { EditCustomerData } from "../dto/EditCustomerData";
import { AddCustomerData } from "../dto/AddCustomerData";
import { ListCustomerData } from "../dto/ListCustomerData";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Customers")
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    @Get("/customers")
    public async list(@Query() data: ListCustomerData): Promise<Customer[]> {
        console.log('data', data);
        return await this.customerService.list(data);
    }

    @Post("/customer")
    public async add(data: AddCustomerData): Promise<Customer> {
        return await this.customerService.add(data);
    }

    @Put("/customer")
    public async edit(data: EditCustomerData): Promise<Customer> {
        return await this.customerService.edit(data);
    }
}
