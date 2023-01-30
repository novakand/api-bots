import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CompanyModule } from 'src/company/company.module';
import { SellerController } from './controller/seller.controller';
import { SellerEntity } from './model/seller.entity';
import { SellerService } from './service/seller.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerEntity]),
    CompanyModule],
  controllers: [SellerController],
  providers: [SellerService],
  exports:[SellerService]
})
export class SellerModule { }
