/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class AppModule
 */
import { ClassSerializerInterceptor, Module, ValidationPipe } from "@nestjs/common";
import { StageRepository } from "./repository/StageRepository";
import { CustomerRepository } from "./repository/CustomerRepository";
import { StageService } from "./service/StageService";
import { CustomerService } from "./service/CustomerService";
import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { StageController } from "./controller/StageController";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { CustomerController } from "./controller/CustomerController";
import { CommandModule } from "nestjs-command";
import { StageCommand } from "./command/StageCommand";

@Module({
    controllers: [
        StageController,
        CustomerController,
    ],
    imports: [
        MongooseCoreModule.forRoot("mongodb://mongo:27017", {
            useNewUrlParser: true,
            retryAttempts: 1,
            connectTimeoutMS: 3000,
            authSource: "admin",
            user: "root",
            pass: "1234",
            authMechanism: "DEFAULT",
        }),
        CommandModule,
    ],
    providers: [
        StageCommand,
        StageRepository,
        CustomerRepository,
        StageService,
        CustomerService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
            }),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        }
    ]
})
export class AppModule {
}
