import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter, from, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { ProjectEntity } from 'src/project/model/project.entity';
import { ProjectService } from 'src/project/service/project.service';
import { Repository } from 'typeorm';
import { BotEntity } from '../model/bot.entity';
import { CreateBotDto } from '../model/create-bot.dto';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class BotService implements OnModuleInit {

    private _create$ = new Subject<any>();

    constructor(
        @InjectBot('BotName')
        @InjectRepository(BotEntity)
        private readonly botRepository: Repository<BotEntity>,
        private projectService: ProjectService) {
    }

    public onModuleInit(): void {
        console.log(`Initialization...`);
    }

    public create(projectID: number, botDetails: CreateBotDto): Observable<BotEntity> {

        const bot = new BotEntity();
        bot.name = botDetails.name;
        bot.description = botDetails.description;
        bot.token = botDetails.token;
        return this.projectService.findOne(projectID).pipe(
            switchMap((project) => {
                bot.project = project;
                this._create$.next(bot)
                return from(this.botRepository.save(bot));
            })
        )

    }

    public findAll(): Observable<BotEntity[]> {
        return from(this.botRepository.find({ relations: ['project'] }));
    }




    // @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    // private authService: AuthService,
    // private accountService: AccountService

    // async create(projectID: number, botDetails: CreateBotDto): Promise<OfferEntity> {
    //     const { message, freelancerID, creationDate } = offerDetails;
    //     const offer = new OfferEntity();
    //     offer.message = message;
    //     offer.creationDate = creationDate;
    //     offer.freelancer = await FreelancerEntity.findOne(freelancerID);
    //     offer.project = await ProjectEntity.findOne(projectID);
    //     await offer.save();
    //     return offer;
    // }
}
