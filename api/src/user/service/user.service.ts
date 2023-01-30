import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, Like } from 'typeorm';
import { User, UserRole } from '../models/user.interface';
import { Observable, from, throwError, of, forkJoin } from 'rxjs';
import { switchMap, map, catchError, tap, take, pluck, filter } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CompanyService } from 'src/company/service/company.service';
import { CreateUserDto } from '../models/create-user.dto';
import { CompanyEntity } from 'src/company/model/company.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private companyService: CompanyService,
        private authService: AuthService,
    ) { }

    public create(user: CreateUserDto): Observable<User> {
        const newUser = new UserEntity({
            name: user.name,
            username: user.username,
            email: user.email,
            role: UserRole.USER
        });

        return forkJoin([
            this.companyService.findBy(user.companyIDs),
            this.authService.hashPassword(user.password)
        ]).pipe(
            switchMap((result: any) => {
                newUser.password = result[1];
                newUser.company = result[0];

                return from(this.userRepository.save(newUser)).pipe(

                    map((user: User) => {
                        const { password, ...result } = user;
                        return newUser;
                    }),
                    catchError(err => throwError(err))
                )
            })

        )
    }

    public findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({ id }, { relations: ['blogEntries'] })).pipe(
            map((user: User) => {
                const { password, ...result } = user;
                return result;
            })
        )
    }

    public findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) { delete v.password });
                return users;
            })
        );
    }

    paginate(options: IPaginationOptions): Observable<Pagination<UserEntity>> {

        return from(paginate<UserEntity>(this.userRepository, options)).pipe(
            map((usersPageable: Pagination<UserEntity>) => {
                usersPageable.items.forEach(function (v) { delete v.password });
                // this.companyService.findOne(1)
                // .pipe(
                //     tap((u)=> console.log(u,'UUU'))
                // )
                return usersPageable;
            })
        )
    }

    paginate2(user: UserEntity): Observable<any> {
        return from(this.userRepository.find({
            where: {
                id: user.id
            },
            relations: ['company']
        })).pipe(map((tt: any) => { return tt }))
    }

    public fundbyUserSeller(user) {
        return from(this.userRepository.find({
            where: {
                id: user.id
            },
            relations: ['company']
        })).pipe(
            map((account: any) => this.fundSeller(account)))
    }

    public fundSeller(account): number {
        const sellerSelected = account[0]?.company?.sellers.filter((n) => n.isSelected)
        const sellerId = sellerSelected[0].id;
        return sellerId;
    }


    paginateFilterByUsername(options: IPaginationOptions, user: User): Observable<Pagination<User>> {
        console.log(user, 'user')
        return from(this.userRepository.findAndCount({
            skip: Number(options.page) * Number(options.limit) || 0,
            take: Number(options.limit) || 10,
            order: { id: "ASC" },
            select: ['id', 'name', 'username', 'email', 'role'],
            where: [
                { username: Like(`%${user.username}%`) }

            ]
        })).pipe(
            map(([users, totalUsers]) => {
                const usersPageable: Pagination<User> = {
                    items: users,
                    links: {
                        first: options.route + `?limit=${options.limit}`,
                        previous: options.route + ``,
                        next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
                        last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUsers / Number(options.limit))}`
                    },
                    meta: {
                        currentPage: Number(options.page),
                        itemCount: users.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: totalUsers,
                        totalPages: Math.ceil(totalUsers / Number(options.limit))
                    }
                };
                return usersPageable;
            })
        )
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    public updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;

        return from(this.userRepository.update(id, user)).pipe(
            switchMap(() => this.findOne(id))
        );
    }

    updateRoleOfUser(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => JSON.stringify({ access_token: jwt, user })));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepository.findOne({ email }, { select: ['id', 'password', 'name', 'username', 'email', 'role', 'profileImage'] })).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        const { password, ...result } = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        )

    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOne({ email }));
    }
}
