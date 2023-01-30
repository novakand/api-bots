import { Controller, Post, Body, Request, UseGuards, Get, Query, Param, Delete, Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { CreateProjectDto, IProject } from '../model/create-project.dto';

import { ProjectEntity } from '../model/project.entity';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService) { }

    @ApiOperation({ description: 'Get all  projects' })
    @Get()
    findBlogEntries(): Observable<ProjectEntity[]> {
        return this.projectService.findAll();
    }

    @ApiOperation({ description: 'Creates a new project' })
    @ApiCreatedResponse({ description: 'Project created successfully' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() blogEntry: CreateProjectDto, @Request() req): Observable<IProject> {
        const user = req.user;
        return this.projectService.create(user, blogEntry);
    }

}
