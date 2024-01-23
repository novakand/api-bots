import { Body, Controller, Get, Post, Delete, Param, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TaxonService } from '../services/taxon-service';
import { TaxonEntity } from '../entities/taxon-entity';
import { FilterRequest } from '../models/filter-taxon.dto';

@Controller('taxon')
export class TaxonController {

    constructor(private taxonService: TaxonService) { }

    @ApiOperation({ description: 'Get all  taxons' })
    @Post('filter')
    public filter(@Body() filterRequest: FilterRequest): Observable<any> {
        return this.taxonService.filterRequest(filterRequest);
    }

    @ApiOperation({ description: 'Get all  taxons' })
    @Get()
    public findAll(): Observable<TaxonEntity[]> {
        return this.taxonService.findAll();
    }

    @ApiQuery({ required: false, name: 'page' })
    @ApiQuery({ required: false, name: 'limit' })
    @ApiQuery({ required: false, name: 'typeId' })
    @Get('autocomplete')
    public autoComplete(
        @Query('query') query: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('typeId') typeId: number = null,
    ) {
        return this.taxonService.autoComplete(
            { page: Number(page), limit: Number(limit) }, { query, typeId }
        )
    }

    @Get('countries')
    public indexByCountries() {
        return this.taxonService.indexByCountries();
    }

    @Get('countries:id')
    public indexByCountriesId(@Param('id') id: number) {
        return this.taxonService.idByCountries(id);
    }

    @Get('countries/:ids')
    public indexByCountriesIds(@Param('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[]) {
        return this.taxonService.idsByCountries(ids);
    }

    @Get(':id')
    public findOne(@Param('id') id: number): Observable<TaxonEntity> {
        return this.taxonService.findOne(id);
    }

    @Get('findBy/:ids')
    public findByIds(
        @Param('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
        ids: number[],
    ) {
        return this.taxonService.findByIds(ids);
    }

    @ApiOperation({ description: 'Taxon delete' })
    @ApiCreatedResponse({ description: 'Taxon delete successfully' })
    @Delete(':id')
    public deleteOne(@Param('id') id: number): Observable<any> {
        return this.taxonService.deleteOne(id);
    }
}



