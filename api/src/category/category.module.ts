import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerModule } from 'src/seller/seller.module';
import { UserModule } from 'src/user/user.module';
import { CategoryController } from './controller/category.controller';
import CategoryEntity from './model/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity]),UserModule,SellerModule],
  
  controllers: [CategoryController],
  providers:[CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}

