import { ApiProperty } from "@nestjs/swagger";

export  class CreateSellerDto {
    @ApiProperty({
        description: 'The name of the seller', example: 'Invisible Man'
    })
    readonly name: string;

    @ApiProperty({
        description: 'The description of the seller', example: '1'
    })
    readonly description: string;

    @ApiProperty({
        description: 'The companyIDs of the seller', example: 1
    })
    readonly companyIDs: number;

}
