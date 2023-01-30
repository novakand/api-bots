import { Controller, Post, Body, Request, UseGuards, Get, Query, Param, Delete, Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
// import { BlogEntryEntity } from '../model/blog-entry.entity';
// import { UserIsAuthorGuard } from '../guards/user-is-author.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
// import { Image } from '../model/Image.interface';
import { join } from 'path';
import { ProductEntity } from '../model/product.entity';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../model/create-product.dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() productEntry: CreateProductDto, @Request() req): Observable<ProductEntity> {
        const user = req.user;
        return this.productService.create(user, productEntry);
    }

    @ApiOperation({ description: 'Get all  products' })
    @Get()
    findBlogEntries(): Observable<ProductEntity[]> {
        return this.productService.findAll();
    }

    @ApiOperation({ description: 'Delete a product' })
    @ApiCreatedResponse({ description: 'Product delete successfully' })
    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.productService.deleteOne(id);
    }
}
