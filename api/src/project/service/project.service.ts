import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { Repository } from 'typeorm';
import { CreateProjectDto, IProject } from '../model/create-project.dto';

import { ProjectEntity } from '../model/project.entity';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
    ) { }


    public create(user: User, blogEntry: IProject): Observable<IProject> {
        blogEntry.author = user;
        return from(this.projectRepository.save(blogEntry));
    }

    public findOne(projectID:number): Observable<IProject>{
       return from(this.projectRepository.findOne(projectID));
    }

    public findAll(): Observable<ProjectEntity[]> {
        return from(this.projectRepository.find({ relations: ['author'] }));
    }
    
}
