/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageGateway
 */
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets";
import { StageService } from "../service/StageService";
import { Stage } from "../entity/Stage";
import { Logger } from "@nestjs/common";

@WebSocketGateway(1337)
export class StageGateway implements OnGatewayInit {

    private readonly logger: Logger = new Logger(StageGateway.name);

    constructor(
        private readonly stageService: StageService
    ) {}

    @SubscribeMessage("stages")
    public async list(): Promise<WsResponse<Stage[]>> {
        const stages = await this.stageService.list();
        return {
            data: stages,
            event: "stages"
        }
    }

    afterInit(server: any): any {
        this.logger.log(`${StageGateway.name} initialized`);
    }

}
