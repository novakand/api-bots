import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'regionse' })
export class RegionEntity {
    @PrimaryGeneratedColumn({ name: 'Id' })
    public id: number;

    @Column({name:'RuCaption',type: 'varchar' })
    public ruCaption: string;

    @Column({name:'Caption',type: 'varchar' })
    public caption: string;

    @Column({name:'ZType'})
    public ZType: number;

    constructor(obj?: Partial<RegionEntity>) {
        Object.assign(this, obj);
    }
}