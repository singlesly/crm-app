/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageCommand
 */
import { Injectable, Logger } from "@nestjs/common";
import { StageService } from "../service/StageService";
import { Command, Positional } from "nestjs-command";
import * as inquirer from "inquirer";
import { switchAll } from "rxjs/operators";

@Injectable()
export class StageCommand {

    private readonly logger = new Logger(StageCommand.name);

    constructor(
        private readonly stageService: StageService
    ) {}

    @Command({
        command: "stage:delete",
        describe: "Stage deletion",
        autoExit: true
    })
    public async delete(): Promise<void> {

        const stages = await this.stageService.list();

        const answers = await inquirer.prompt([
            {
                name: "ids",
                message: "Choose stages",
                type: "checkbox",
                choices: stages.map(stage => ({
                    name: `Name: ${stage.getName()} Order: ${stage.getOrder()}`,
                    value: stage.getId(),
                }))
            }
        ]);

        for(const id of answers.ids) {
            await this.stageService.remove(id);
            this.logger.log(`Stage ${id} removed successfully`);
        }
    }
}
