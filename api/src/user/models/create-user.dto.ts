import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "./user.interface";

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user', example: 'name'
    })
    readonly name: string;

    @ApiProperty({
        description: 'The username of the user', example: 'username'
    })
    readonly username: string;


    @ApiProperty({
        description: 'The email of the user', example: 'email@.com'
    })
    readonly email: string;

    @ApiProperty({
        description: 'The password of the user', example: '0000'
    })
    readonly password: string;

    @ApiProperty({
        description: 'The UserRole of the user', example: UserRole.USER
    })
    readonly role: UserRole;

    @ApiProperty({
        description: 'The companyIDs of the user', example: 1
    })
    readonly companyIDs: number;

}

