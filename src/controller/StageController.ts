/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageController
 */
import { StageService } from "../service/StageService";
import { Stage } from "../entity/Stage";
import { CreateStageData } from "../dto/CreateStageData";
import { EditStageData } from "../dto/EditStageData";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Stages")
export class StageController {
    constructor(
        private readonly stageService: StageService
    ) {}

    @Get("/stages")
    public async list(): Promise<Stage[]> {
        return await this.stageService.list();
    }

    @Post("/stage")
    public async create(@Body() data: CreateStageData): Promise<Stage> {
        return await this.stageService.create(data);
    }

    @Put("/stage")
    public async edit(@Body() data: EditStageData): Promise<Stage> {
        return await this.stageService.edit(data);
    }

    @Delete("/stage/:id")
    public async remove(@Param("id") id: string): Promise<void> {
        await this.stageService.remove(id);
    }
}
