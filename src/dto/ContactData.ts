/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ContactData
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ContactData {
    @ApiProperty({
        required: true,
        name: "title",
        type: "string"
    })
    @IsString()
    title: string;

    @ApiProperty({
        required: true,
        name: "channel",
        type: "string"
    })
    @IsString()
    channel: string;

    @ApiProperty({
        required: true,
        name: "value",
        type: "string"
    })
    @IsString()
    value: string;
}
