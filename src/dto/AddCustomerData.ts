/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class AddCustomerData
 */
import { ContactData } from "./ContactData";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

export class AddCustomerData {
    @ApiProperty({
        required: true,
        name: "name",
        type: "string"
    })
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        name: "stage",
        type: "string"
    })
    @IsString()
    stage: string;

    @ApiProperty({
        required: true,
        name: "contacts",
        type: ContactData,
        isArray: true
    })
    @ValidateNested({
        each: true
    })
    contacts: ContactData[];
}
