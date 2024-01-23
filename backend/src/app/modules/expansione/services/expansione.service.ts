import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { ExpansioneEntity } from '../entities/expansione.entity';


@Injectable()
export class ExpansioneService {

    constructor(
        @InjectRepository(ExpansioneEntity) private readonly expansioneRepository: Repository<ExpansioneEntity>,
    ) { }

    public findAll(): Observable<ExpansioneEntity[]> {
        return from(this.expansioneRepository.find());
    }

    public deleteOne(id: number): Observable<any> {
        return from(this.expansioneRepository.delete(id));
    }

    public findAndCount(options) {
        return from(this.expansioneRepository.findAndCount(options));
    }

    public find(options) {
        return from(this.expansioneRepository.find(options));
    }
}
