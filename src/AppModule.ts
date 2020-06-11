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
import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";

@Module({
    imports: [
        MongooseCoreModule.forRoot("mongodb://mongo:27017", {
            useNewUrlParser: true,
            retryAttempts: 1,
            connectTimeoutMS: 3000,
            authSource: "admin",
            user: "root",
            pass: "1234",
            authMechanism: "DEFAULT",
        })
    ],
    providers: [
        StageRepository,
        CustomerRepository,
        StageService,
        CustomerService,
    ]
})
export class AppModule {
}
