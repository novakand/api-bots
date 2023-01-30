import { BotEntity } from "src/bot/model/bot.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinTable } from "typeorm";

@Entity('project_entry')

export class ProjectEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({default: ''})
    description: string;

    @OneToMany(type => BotEntity, bot => bot.project)
    bots: BotEntity[];

    // @ManyToOne(type => UserEntity, user => user.projectEntries)
    // @JoinTable()
    // author: UserEntity;

}