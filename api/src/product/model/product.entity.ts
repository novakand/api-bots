import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "src/user/models/user.entity";
import { SellerEntity } from "src/seller/model/seller.entity";
import CategoryEntity from "src/category/model/category.entity";

@Entity('product_entry')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({ default: '' })
    description: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @Column({ nullable: true })
    headerImage: string;

    @Column({ nullable: true })
    publishedDate: Date;

    @Column({ nullable: true })
    isPublished: boolean;

    @ManyToOne(type => SellerEntity, seller => seller.products, {})
    @JoinColumn()
    seller: SellerEntity;

    @ManyToOne(type => UserEntity, user => user, {
        eager: true,
        cascade: true
    })
    @JoinTable()
    author: UserEntity;

    @ManyToOne(type => CategoryEntity, seller => seller.seller, {
        eager: true,
        cascade: true
    })
    @JoinTable()
    category: CategoryEntity;

    constructor(obj?: Partial<ProductEntity>) {
        Object.assign(this, obj);
    }
}