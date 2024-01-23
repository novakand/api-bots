
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxonModule } from './modules/taxon/taxon.module';
import './utils/pollyfill';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './', 'frontend'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '93.183.104.7',
      port: 3306,
      username: 'u54',
      password: 'uI6zV3iX2z8739d',
      database: 'catmp',
       entities: [__dirname + '/../**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: false
    }),
    TaxonModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
