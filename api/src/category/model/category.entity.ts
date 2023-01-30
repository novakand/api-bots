import { SellerEntity } from 'src/seller/model/seller.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';

@Entity('category_entry')
export default class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => SellerEntity, seller => seller.category, {})
    @JoinTable()
    seller: SellerEntity;

    constructor(obj?: Partial<CategoryEntity>) {
        Object.assign(this, obj);
    }

}