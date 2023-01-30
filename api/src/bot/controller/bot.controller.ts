import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { BotEntity } from '../model/bot.entity';
import { CreateBotDto } from '../model/create-bot.dto';
import { BotService } from '../service/bot.service';

@Controller('bot')
export class BotController {

    constructor(private botService: BotService) { }

    @ApiOperation({ description: 'Creates a new bot' })

    @ApiCreatedResponse({ description: 'Bot created successfully' })
    
    @Post('projects/:projectID/bot')
    createOffer(@Param('projectID') projectID: number, @Body() bot: CreateBotDto) {
        return this.botService.create(projectID, bot);
    }

    @ApiOperation({ description: 'Get all  bots' })
    @Get()
    findBlogEntries(): Observable<BotEntity[]> {
        return this.botService.findAll();
    }

}
