/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ListCustomerData
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ListCustomerData {
    @ApiProperty({
        required: false,
        type: "string",
        name: "stages"
    })
    @IsOptional()
    @IsString({
        each: true
    })
    @Transform(v => typeof v === "string" ? v.split(",") : undefined)
    stages?: string[];
}
