import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpansioneEntity } from './entities/expansione.entity';
import { ExpansioneService } from './services/expansione.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ExpansioneEntity])
    ],
    providers: [ExpansioneService],
    exports: [ExpansioneService]

})
export class ExpansioneModule { }
