import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { CompanyEntity } from '../model/company.entity';
import { CreateCompanyDto } from '../model/create-company.dto';
import { CompanyService } from '../service/company.service';

@Controller('company')
export class CompanyController {

    constructor(private projectService: CompanyService) { }

    @ApiOperation({ description: 'TEST2' })
    @ApiCreatedResponse({ description: 'Test2' })
  //  @ApiBearerAuth()
   

    @ApiOperation({ description: 'Get all  projects' })
    @Get()
    findBlogEntries(): Observable<CompanyEntity[]> {
        return this.projectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('on')
    getPro(@Request() req) {
      //  return {}
        console.log(req.user,'req.user')
        return req.user
       // return from(req.user) ;
    }

    @ApiOperation({ description: 'Creates a new project' })
    @ApiCreatedResponse({ description: 'Project created successfully' })
   // @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() companyEntry: CreateCompanyDto,): Observable<CompanyEntity> {
        return this.projectService.create(companyEntry);
    }

    @ApiOperation({ description: 'TEST' })
    @ApiCreatedResponse({ description: 'Test' })
    @Get(':id')
    findOne(@Param('id') id: number): Observable<any> {
        return this.projectService.findOne(id);
    }

    // @Request() req
    
   
}
