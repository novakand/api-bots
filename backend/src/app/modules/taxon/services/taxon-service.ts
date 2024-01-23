import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, of, forkJoin, defer } from 'rxjs';
import { switchMap, map, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { FindManyOptions, In, Like, Not, Repository } from 'typeorm';
import { TaxonEntity } from '../entities/taxon-entity';
import { RegionService } from '../../region/services/region.service';
import { ExpansioneService } from '../../expansione/services/expansione.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ExpansioneEntity } from '../../expansione/entities/expansione.entity';
import { FilterRequest } from '../models/filter-taxon.dto';

@Injectable()
export class TaxonService {

    constructor(
        @InjectRepository(TaxonEntity) private readonly taxonRepository: Repository<TaxonEntity>,
        private regionService: RegionService,
        private expansioneService: ExpansioneService
    ) {
    }

    public findAll(): Observable<any[]> {
        return from(this.taxonRepository.find({ where: { typeId: 10 } }));
    }

    public deleteOne(id: number): Observable<any> {
        return from(this.taxonRepository.delete(id));
    }

    public indexByCountries() {
        return this.regionService.findAll();
    }

    public buildOptionsExpansione(filterRequest: FilterRequest) {
        const { countryIds } = filterRequest;
        const where = countryIds?.map((item) => { return { [item]: Not(0) } }) || null;
        return {
            order: { id: "ASC" }, select: ['taxId'], where
        }
    }

    public bindOptions(filterRequest: FilterRequest, taxonIds?: any[]): FindManyOptions<any> {
        const { countryIds } = filterRequest;
        const isTaxonName = Boolean(filterRequest.taxonName);
        const isCountry = Boolean(Array.isArray(countryIds) && countryIds.length);

        const where = {
            typeId: 10,
            ...(isCountry && { id: In(taxonIds) }),
            ...(isTaxonName && { caption: Like(`%${filterRequest.taxonName}%`) }),
        };

        return {
            skip: (Number(filterRequest.pagination.pageIndex) - 1) * Number(filterRequest.pagination.pageSize) || 0,
            take: Number(filterRequest.pagination.pageSize) || 10,
            order: { dateTime: "DESC" },
            where
        }
    }

    public filterRequest(filterRequest: FilterRequest) {
        return defer(() => (
            Boolean(Array.isArray(filterRequest.countryIds) && filterRequest.countryIds.length)
                ? this.expansioneService.findAndCount(this.buildOptionsExpansione(filterRequest))
                    .pipe(
                        map(([ids, total]) => ids?.map((item) => Number(item.taxId))),
                    )
                : of(null)
        )).pipe(
            concatMap((taxonIds: any) => from(this.taxonRepository.findAndCount(this.bindOptions(filterRequest, taxonIds)))),
            mergeMap(([taxons, totalTaxons]) => {
                return forkJoin(
                    taxons?.map((item) => this.findOne(item.parentId)
                        .pipe(
                            map((data) => ({ ...item, parents: data })),
                        ),
                    ),
                ).pipe(
                    switchMap((items) => {
                        return of({
                            items, meta:
                            {
                                currentPage: Number(filterRequest.pagination.pageIndex),
                                itemCount: taxons.length,
                                itemsPerPage: Number(filterRequest.pagination.pageSize),
                                total: totalTaxons,
                                totalPages: Math.ceil(totalTaxons / Number(filterRequest.pagination.pageSize))
                            }
                        })
                    }),
                )

            }),
            switchMap((data) => {
                return forkJoin(
                    data?.items?.map((item) => this.findByIds(item.tree.split(',').map(Number))
                        .pipe(
                            map((data) => ({ ...item, parents: [item.parents, data[0]] })),
                        ),
                    ),
                ).pipe(
                    switchMap((items) => { return of({ items: items, meta: data.meta }) }),
                )
            }),
            catchError(err => {
                console.log('caught rethrown error, providing fallback value');
                return of([]);
            })
        )
        
    }

    public idByCountries(id: number): Observable<[ExpansioneEntity[], number]> {
        return this.expansioneService.findAndCount({ order: { id: "ASC" }, select: ['taxId'], where: [{ [id]: Not(0) }] });
    }

    public idsByCountries(ids: number[]): Observable<[ExpansioneEntity[], number]> {
        const where = ids?.map((item: number) => { return { [item]: Not(0) } }) || null;
        return this.expansioneService.findAndCount({ order: { id: "ASC" }, select: ['taxId'], where });
    }

    public autoComplete(options: IPaginationOptions, params: any) {
        const { query, typeId } = params;
        return from(this.taxonRepository.findAndCount({
            skip: (Number(options.page) - 1) * Number(options.limit) || 0,
            take: Number(options.limit) || 10,
            order: { caption: "ASC" },
            where: {
                typeId: Not(10),
                caption: Like(`%${query}%`),
                fullCaption: Like(`%${query}%`),
            },
        })).pipe(
            map(([data, total]) => {
                const dataItems: Pagination<any> = {
                    items: data,
                    meta: {
                        query,
                        currentPage: Number(options.page),
                        itemCount: data.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: total,
                        totalPages: Math.ceil(total / Number(options.limit))
                    }
                };
                return dataItems;
            })
        )
    }


    public findOne(id: number): Observable<any> {
        return from(this.taxonRepository.findOne({ where: { id: id, } }));
    }

    public findByIds(ids: number[]): Observable<any> {
        return from(this.taxonRepository.find({ where: { id: In(ids), typeId: 25 } }));
    }

    public findAndCount(options: any): Observable<any> {
        return from(this.taxonRepository.findAndCount(options));
    }
}
