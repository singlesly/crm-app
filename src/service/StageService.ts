/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageService
 */
import { CreateStageData } from "../dto/CreateStageData";
import { EditStageData } from "../dto/EditStageData";
import { Stage } from "../entity/Stage";
import { StageRepository } from "../repository/StageRepository";
import { Injectable } from "@nestjs/common";
import { AppEventEmitter } from "../event/AppEventEmitter";
import { InjectEventEmitter } from "nest-emitter";

@Injectable()
export class StageService {

    constructor(
        private readonly stageRepository: StageRepository,
        @InjectEventEmitter() private readonly emitter: AppEventEmitter
    ) {}

    public async get(id: string): Promise<Stage> {
        return await this.stageRepository.get(id);
    }

    public async list(): Promise<Stage[]> {
        return await this.stageRepository.findAll();
    }

    public async create(data: CreateStageData): Promise<Stage> {
        const stage = new Stage(data.name, data.order);

        await this.stageRepository.save(stage);
        this.emitter.emit("stageCreated", stage);

        return stage;
    }

    public async edit(data: EditStageData): Promise<Stage> {
        const stage = await this.stageRepository.get(data.id);

        stage.rename(data.name);
        stage.changeOrder(data.order);

        await this.stageRepository.update(stage);

        return stage;
    }

    public async remove(id: string): Promise<void> {
        const stage = await this.stageRepository.get(id);
        await this.stageRepository.remove(stage);
    }
}
