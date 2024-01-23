import { VirtualColumn } from "src/app/decorators/virtual-column.decorator";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, AfterLoad, AfterInsert, AfterUpdate, Index, } from "typeorm";
import { IsOptional } from 'class-validator';

@Entity({ name: 'tax_copy_catmp', })
export class TaxonEntity {

    @PrimaryGeneratedColumn({ name: 'Id' })
    public id: number;

    @Column({ name: 'Capt' })
    public caption: string;

    @Column({ name: 'FullCapt' })
    public fullCaption: string;

    @Column({ name: 'Author' })
    public author: string;

    @Column({ name: 'Year' })
    public year: number;

    @Column({ name: 'AuthorYear' })
    public authorYear: string;

    @Column({ name: 'Tax' })
    public typeId: number;

    @Column({ name: 'ParentId' })
    public parentId: number;

    @Column({ name: 'Tree' })
    public tree: string;

    @Column({ name: 'I_Imago' })
    public image: number;

    @Column({ name: 'I_larva' })
    public images: number;

    @Column({ name: 'DaTime2', type: 'datetime',precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    public dateTime: Date;

    @VirtualColumn()
    parents: TaxonEntity[];


    constructor(obj?: Partial<TaxonEntity>) {
        Object.assign(this, obj);
    }
}