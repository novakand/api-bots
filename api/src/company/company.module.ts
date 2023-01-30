import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controller/company.controller';
import { CompanyEntity } from './model/company.entity';
import { CompanyService } from './service/company.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([CompanyEntity]),
    //   AuthModule,
    //   UserModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports:[CompanyService]
  })
export class CompanyModule {}






