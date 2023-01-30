import { SellerEntity } from "src/seller/model/seller.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinTable } from "typeorm";

@Entity('company_entry')
export class CompanyEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({default: ''})
    description: string;
    
    @OneToMany(type => UserEntity, user => user.company,{
        eager: true,
        cascade: true
      })
    @JoinTable()
    users: UserEntity[];

    @OneToMany(type => SellerEntity, seller => seller.company,{
        eager: true,
        cascade: true
      })
    @JoinTable()
    sellers: SellerEntity[];

    constructor(obj?: Partial<CompanyEntity>) {
        Object.assign(this, obj);
      }

}
