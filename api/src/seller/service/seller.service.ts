import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, switchMap, tap } from 'rxjs';
import { CompanyEntity } from 'src/company/model/company.entity';
import { CompanyService } from 'src/company/service/company.service';
import { Repository } from 'typeorm';
import { CreateSellerDto } from '../model/create-seller.dto';
import { SellerEntity } from '../model/seller.entity';

@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(SellerEntity) private readonly sellerRepository: Repository<SellerEntity>,
        private companyService: CompanyService,
    ) { }

    public create(sellerDto: CreateSellerDto): Observable<SellerEntity> {
        const newSeller = new SellerEntity({
            name: sellerDto.name,
            description: sellerDto.description,

        });

        return from(this.companyService.findBy(sellerDto.companyIDs).
            pipe(
                switchMap((company: CompanyEntity) => {
                    newSeller.company = company;
                    return from(this.sellerRepository.save(newSeller))
                })
            ))
    }


    public findAll(): Observable<SellerEntity[]> {
        return from(this.sellerRepository.find());
    }

    public findBy(id: number): Observable<SellerEntity> {
        return from(this.sellerRepository.findOne(id));

    }

    public deleteOne(id: number): Observable<any> {
        return from(this.sellerRepository.delete(id));
    }

    public test(user){
       // this.companyService.test()
    }
}

