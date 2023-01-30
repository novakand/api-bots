import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, forkJoin, from, map, Observable, switchMap, throwError } from 'rxjs';
import { SellerService } from 'src/seller/service/seller.service';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import CategoryEntity from '../model/category.entity';
import CreateCategoryDto from '../model/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
        private userServise: UserService,
        private sellerService: SellerService,

    ) { }

    public create(user: any, productDto: CreateCategoryDto): Observable<CategoryEntity> {
        const newCategory = new CategoryEntity({
            name: productDto.name,
        });

        return from(this.userServise.fundbyUserSeller(user))
            .pipe(
                switchMap((accountId) => {
                    return forkJoin([
                        this.sellerService.findBy(accountId),
                    ]).pipe(
                        switchMap((result: any) => {
                            console.log(result,'RESULT')
                            console.log('re',result)
                            newCategory.seller = result[0];

                            return from(this.categoryRepository.save(newCategory)).pipe(
                                map((newProduct: CategoryEntity) => {
                                    // delete newProduct.seller;
                                    // delete newProduct.author;
                                    return newCategory;

                                }),
                                catchError(err => throwError(err))
                            )
                        })
                    )
                }),

                catchError(err => throwError(err))
            )
    }

    public findAll(): Observable<CategoryEntity[]> {
        return from(this.categoryRepository.find());
    }

    public findBy(id: number): Observable<CategoryEntity> {
        return from(this.categoryRepository.findOne(id));

    }

    public deleteOne(id: number): Observable<any> {
        return from(this.categoryRepository.delete(id));
    }
}



