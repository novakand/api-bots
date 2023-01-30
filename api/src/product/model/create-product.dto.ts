import { ApiProperty } from "@nestjs/swagger";
import CategoryEntity from "src/category/model/category.entity";

export  class CreateProductDto {
    @ApiProperty({
        description: 'The name of the seller', example: 'Invisible Man'
    })
    readonly name: string;

    @ApiProperty({
        description: 'The description of the seller', example: '1'
    })
    readonly description: string;

    @ApiProperty({
        description: 'The sellerID of the product', example: 1
    })
    readonly categoryId: number;

}
