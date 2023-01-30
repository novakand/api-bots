import { Body, Controller, Get, Post, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import CategoryEntity from '../model/category.entity';
import CreateCategoryDto from '../model/create-category.dto';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() categoryEntry: CreateCategoryDto, @Request() req): Observable<any> {
        console.log(req.user, 'create')
        const user = req.user;
        return this.categoryService.create(user, categoryEntry);
    }

    @ApiOperation({ description: 'Get all  category' })
    @Get()
    findBlogEntries(): Observable<CategoryEntity[]> {
        return this.categoryService.findAll();
    }

    @ApiOperation({ description: 'Delete a product' })
    @ApiCreatedResponse({ description: 'Product delete successfully' })
    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.categoryService.deleteOne(id);
    }
}



