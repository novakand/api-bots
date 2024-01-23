import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { RegionEntity } from '../entities/region.entity';

@Injectable()
export class RegionService {

    constructor(
        @InjectRepository(RegionEntity) private readonly regionRepository: Repository<RegionEntity>,
    ) { }


    public findOne(id: number): Observable<any> {
        return from(this.regionRepository.findOne({ where: { id: id, } }));
    }
  
    public findAll(): Observable<RegionEntity[]> {
        return from(this.regionRepository.find({ where: { ZType: 1 } }));

    }

    public deleteOne(id: number): Observable<any> {
        return from(this.regionRepository.delete(id));
    }

    public findAndCount(options){
        return from(this.regionRepository.findAndCount(options));
    }
}
