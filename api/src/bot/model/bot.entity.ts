import { ProjectEntity } from "src/project/model/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class BotEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    token: string;

    @Column({default: ''})
    description: string;

    @ManyToOne(type => ProjectEntity, project => project.bots)
    project: any;

}