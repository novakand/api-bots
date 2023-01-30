import { ApiProperty } from "@nestjs/swagger";

export  class CreateBotDto {
    @ApiProperty({
        description: 'The name of the bot', example: 'Name Bot'
    })
    readonly name: string;

    @ApiProperty({
        description: 'The description of the account', example: 'text'
    })
    readonly description: string;

    @ApiProperty({
        description: 'The token of the account', example: '22ThhhOoaoaoaoao'
    })
    readonly token: string;

}