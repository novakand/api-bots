import { ApiProperty } from "@nestjs/swagger";

export  class CreateCompanyDto {
    @ApiProperty({
        description: 'The name of the account', example: 'Invisible Man'
    })
    readonly name: string;

    @ApiProperty({
        description: 'The description of the account', example: '1'
    })
    readonly description: string;

}
