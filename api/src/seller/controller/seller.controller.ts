import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateSellerDto } from '../model/create-seller.dto';
import { SellerEntity } from '../model/seller.entity';
import { SellerService } from '../service/seller.service';

@Controller('seller')
export class SellerController {

    constructor(private sellerService: SellerService) { }

    @ApiOperation({ description: 'Get all  sellers' })
    @Get()
    findBlogEntries(): Observable<SellerEntity[]> {
        return this.sellerService.findAll();
    }

    
    @ApiOperation({ description: 'Creates a new seller' })
    @ApiCreatedResponse({ description: 'Project created successfully' })
   // @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() sellerDto: CreateSellerDto,): Observable<SellerEntity> {
        return this.sellerService.create(sellerDto);
    }

    @ApiOperation({ description: 'Delete a new seller' })
    @ApiCreatedResponse({ description: 'Seller delete successfully' })
    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.sellerService.deleteOne(id);
    }
}
