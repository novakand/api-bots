import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CompanyModule } from 'src/company/company.module';
import { SellerModule } from 'src/seller/seller.module';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './controller/product.controller';
import { ProductEntity } from './model/product.entity';
import { ProductService } from './service/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    SellerModule,UserModule,CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
