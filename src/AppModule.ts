/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class AppModule
 */
import { Module } from "@nestjs/common";
import { StageRepository } from "./repository/StageRepository";
import { CustomerRepository } from "./repository/CustomerRepository";
import { StageService } from "./service/StageService";
import { CustomerService } from "./service/CustomerService";

@Module({
    providers: [
        StageRepository,
        CustomerRepository,
        StageService,
        CustomerService,
    ]
})
export class AppModule {
}
