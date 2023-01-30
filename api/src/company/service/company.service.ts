import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, map, tap, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../model/company.entity';
import { CreateCompanyDto } from '../model/create-company.dto';

@Injectable()
export class CompanyService {

    constructor(
        @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>,
    ) { }

    public create(companyDto: CreateCompanyDto): Observable<CompanyEntity> {
        return from(this.companyRepository.save(companyDto));
    }

    public findAll(): Observable<CompanyEntity[]> {
        return from(this.companyRepository.find());
    }

    public findBy(id: number): Observable<CompanyEntity> {
        return from(this.companyRepository.findOne(id));

    }

    public findOne(id: number): Observable<CompanyEntity> {
        return from(this.companyRepository.findOne({ id }, { relations: ['users'] }));
    }

    public test(id) {
        return from(this.companyRepository.find({
            where: {
                id: 3
            },
            relations: ['sellers']
        })).pipe(map((tt: any) => tt ))


        // map((user: User) => {
        //     const { password, ...result } = user;
        //     return newUser;
        // }),



    }
   

}
