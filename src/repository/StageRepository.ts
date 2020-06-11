/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class StageRepository
 */
import { Stage } from "../entity/Stage";
import { Injectable, NotImplementedException } from "@nestjs/common";

@Injectable()
export class StageRepository {
    public async save(stage: Stage): Promise<void> {
        throw new NotImplementedException();
    }

    public async update(stage: Stage): Promise<void> {
        throw new NotImplementedException();
    }

    public async get(id: string): Promise<Stage> {
        throw new NotImplementedException();
    }

    public async remove(stage: Stage): Promise<void> {
        throw new NotImplementedException();
    }

    public async findAll(): Promise<Stage[]> {
        throw new NotImplementedException();
    }
}
