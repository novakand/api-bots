import CategoryEntity from "src/category/model/category.entity";
import { CompanyEntity } from "src/company/model/company.entity";
import { ProductEntity } from "src/product/model/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from "typeorm";

@Entity('seller_entry')
export class SellerEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(type => CompanyEntity, company => company.sellers, {
    //  eager: true,
    //  cascade: false
  })
  @JoinTable()
  company: CompanyEntity;

  @OneToMany(type => ProductEntity, product => product.seller, {
    eager: true,
    cascade: true
  })
  @JoinTable()
  products: ProductEntity[];

  @OneToMany(type => CategoryEntity, category => category.seller, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  category: CategoryEntity[];

  @Column('boolean', { default: true })
  isSelected: boolean = true;

  constructor(obj?: Partial<SellerEntity>) {
    Object.assign(this, obj);
  }

}
