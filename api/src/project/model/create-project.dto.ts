import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/models/user.interface";

export  class CreateProjectDto {
    @ApiProperty({
        description: 'The name of the account', example: 'Invisible Man'
    })
    readonly name: string;

    @ApiProperty({
        description: 'The description of the account', example: '1'
    })
    readonly description: string;

}


// @PrimaryGeneratedColumn()
// id?: number;

// @Column()
// name: string;

// @Column({default: ''})
// description: string;

// @ManyToOne(type => UserEntity, user => user.projectEntries)
// author: UserEntity;

export interface IProject{
    name:string;
    description: string;
    author?: User;
}
