import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ProjectController } from './controller/project.controller';
import { ProjectEntity } from './model/project.entity';
import { ProjectService } from './service/project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    AuthModule,
    UserModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports:[ProjectService]
})
export class ProjectModule { }


