import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, throwError, of, forkJoin } from 'rxjs';
import { switchMap, map, catchError, tap, take, pluck, filter } from 'rxjs/operators';
import slugify from 'slugify';
import { CategoryService } from 'src/category/services/category.service';
import { CompanyService } from 'src/company/service/company.service';
import { SellerService } from 'src/seller/service/seller.service';
import { CreateUserDto } from 'src/user/models/create-user.dto';
import { UserEntity } from 'src/user/models/user.entity';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../model/create-product.dto';
import { ProductEntity } from '../model/product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        private sellerService: SellerService,
        private userServise: UserService,
        private categoryService: CategoryService

    ) { }

    public create2(user: UserEntity, productDto: CreateProductDto): Observable<any> {
        console.log(user, 'user')

       
        return from(this.userServise.fundbyUserSeller(user))
            .pipe(
                switchMap((accountId) => {
                    return forkJoin([
                        this.sellerService.findBy(accountId),
                        this.generateSlug(productDto.name),
                        this.categoryService.findBy(productDto.categoryId)
                    ]).pipe(
                        switchMap((result: any) => {
                            const newProduct = new ProductEntity({
                                name: productDto.name,
                                description: productDto.description,
                                author: user,
                    
                            });
                            console.log('result,',result)
                            newProduct.seller = result[0];
                            newProduct.slug = result[1];
                            newProduct.category = result[2];

                            return from(this.productRepository.save(newProduct)).pipe(
                                map((newProduct: ProductEntity) => {
                                    delete newProduct.seller;
                                    delete newProduct.author;
                                    return newProduct;

                                }),
                                catchError(err => throwError(err))
                            )
                        })
                    )
                }),
                
                catchError(err => throwError(err))
            )

    }

    public create(user: UserEntity, productDto: CreateProductDto): Observable<ProductEntity> {

        // return from(this.create2(user))
        return this.create2(user, productDto)
        // const newProduct = new ProductEntity({
        //     name: productDto.name,
        //     description: productDto.description,
        //     author: user,

        // });

        // return forkJoin([
        //     this.sellerService.findBy(productDto.sellerID),
        //     this.generateSlug(productDto.name)
        // ]).pipe(
        //     switchMap((result: any) => {
        //         newProduct.seller = result[0];
        //         newProduct.slug = result[1];

        //         return from(this.productRepository.save(newProduct)).pipe(

        //             map((user: ProductEntity) => {

        //                 return newProduct;
        //             }),
        //             catchError(err => throwError(err))
        //         )
        //     })
        // )
    }

    public findAll(): Observable<ProductEntity[]> {
        return from(this.productRepository.find());
    }

    public deleteOne(id: number): Observable<any> {
        return from(this.productRepository.delete(id));
    }


    public generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }
}
