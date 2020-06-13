/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @file cli
 */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";
import { CommandModule, CommandService } from "nestjs-command";

(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    app.select(CommandModule).get(CommandService).exec();
})();
