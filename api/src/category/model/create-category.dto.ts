import { ApiProperty } from "@nestjs/swagger";

export default class CreateCategoryDto {
    @ApiProperty({
        description: 'The name of the category', example: 'Name Category'
    })
    readonly name: string;

}