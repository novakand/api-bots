import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxonEntity } from './entities/taxon-entity';
import { TaxonController } from './controller/taxon-controller';
import { TaxonService } from './services/taxon-service';
import { RegionModule } from '../region/region.module';
import { ExpansioneModule } from '../expansione/expansione.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TaxonEntity]), RegionModule, ExpansioneModule],
    providers: [TaxonService],
    controllers: [TaxonController],

})
export class TaxonModule { }
