import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';
import { BotController } from './controller/bot.controller';
import { BotEntity } from './model/bot.entity';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './service/bot.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([BotEntity]),
    forwardRef(() => ProjectModule),
    TelegrafModule.forRootAsync({
      botName: 'BotName',
      useFactory: () => ({
        token: '5984288339:AAGuJ55cku6gqZtjXgjamSRz9o6RzMNUmX4',
       // middlewares: [botMiddleware],
        include: [BotModule],
      }),
    }),
  ],
  providers: [BotService],
  controllers:[BotController],
  exports:[BotService]
})
export class BotModule {}


// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntity]),
//     AuthModule, AccountModule
//   ],
//   providers: [UserService],
//   controllers: [UserController],
//   exports: [UserService]
// })
