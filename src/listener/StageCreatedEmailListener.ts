/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageCreatedEmailListener
 */
import { AppEventEmitter } from "../event/AppEventEmitter";
import { InjectEventEmitter } from "nest-emitter";
import { Stage } from "../entity/Stage";
import { Logger } from "@nestjs/common";

export class StageCreatedEmailListener {

    private readonly logger = new Logger(StageCreatedEmailListener.name);

    constructor(
        @InjectEventEmitter() private readonly emitter: AppEventEmitter
    ) {
        this.emitter.on("stageCreated", this.listen.bind(this));
        this.logger.log("listening");
    }

    public async listen(stage: Stage): Promise<void> {
        console.log("created stage", stage);
    }
}
