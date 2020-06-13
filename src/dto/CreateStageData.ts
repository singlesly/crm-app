/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CreateStageData
 */
import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStageData {
    @ApiProperty({
        required: true,
        type: "string",
        name: "name"
    })
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        type: "number",
        name: "order"
    })
    @IsInt()
    order: number;
}
