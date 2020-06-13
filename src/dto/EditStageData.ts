/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class EditStageData
 */
import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditStageData {
    @ApiProperty({
        required: true,
        name: "id",
        type: "string"
    })
    @IsString()
    id: string;

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
