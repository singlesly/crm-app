/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageCreatedEmailListener
 */
import { AppEventEmitter } from "../event/AppEventEmitter";
import { InjectEventEmitter } from "nest-emitter";
import { Stage } from "../entity/Stage";
import { Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

export class StageCreatedEmailListener {

    private readonly logger = new Logger(StageCreatedEmailListener.name);

    constructor(
        @InjectEventEmitter() private readonly emitter: AppEventEmitter,
        private readonly mailerService: MailerService
    ) {
        this.emitter.on("stageCreated", this.listen.bind(this));
        this.logger.log("listening");
    }

    public async listen(stage: Stage): Promise<void> {
        try {
            const info = await this.mailerService.sendMail({
                to: "devsinglesly@gmail.com",
                subject: "New stage",
                from: "artem.ilinykh@cimpleo.com",
                text: `Created stage ${stage.getName()} with order ${stage.getOrder()}`
            });
            this.logger.log(info);
        } catch (e) {
            this.logger.error(e);
        }
    }
}
