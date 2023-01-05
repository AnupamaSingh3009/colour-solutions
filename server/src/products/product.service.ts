import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Pagination } from 'src/dtos/pagination.dto';
import {
  ProductPhotoResponse,
  ProductRequest,
  ProductResponse,
} from 'src/dtos/product.dto';
import { ToUserDto } from 'src/dtos/user-dto';
import { Product } from 'src/model/product.entity';
import { mapToProductResponse } from 'src/shared/mapper';
import { Repository } from 'typeorm';
import { ProductPhotoEntity } from '../model/product-photo.entity';
import { ConfigService } from '@nestjs/config/dist';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductPhotoEntity)
    private readonly productPhotoRepository: Repository<ProductPhotoEntity>,
    private readonly configService: ConfigService,
  ) {}

  public async createProduct(
    payload: ProductRequest,
    user: ToUserDto,
  ): Promise<ProductResponse> {
    const { name } = payload;
    // check if the product exists in the db
    const productInDb = await this.productRepository.findOne({
      where: { name },
    });
    if (productInDb) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }
    const newProduct = this.productRepository.create(payload);
    newProduct.createdBy = newProduct.lastUpdatedBy = user.id;
    return mapToProductResponse(await this.productRepository.save(newProduct));
  }

  public async updateProduct(
    id: string,
    payload: ProductRequest,
    user: ToUserDto,
  ): Promise<ProductResponse> {
    const productInDb = await this.productRepository.findOne({ where: { id } });
    if (!productInDb) {
      throw new HttpException('Product not exists', HttpStatus.BAD_REQUEST);
    }
    const updateProduct = { ...payload } as Product;
    updateProduct.id = id;
    updateProduct.lastUpdatedBy = user.id;
    return mapToProductResponse(
      await this.productRepository.save(updateProduct),
    );
  }

  public async getProducts(
    page: number,
    pageSize: number,
  ): Promise<Pagination> {
    const [products, count] = await this.productRepository.findAndCount({
      order: {
        lastChangedDateTime: 'DESC',
      },
      relations: {
        category: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      content: products,
      count,
      page,
      size: pageSize,
    };
  }

  public async getProductById(id: string): Promise<ProductResponse> {
    const dbProduct = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        photos: true,
      },
    });

    const photos: ProductPhotoResponse[] = dbProduct.photos.map(
      (photoEntity) => {
        return {
          photo: photoEntity.photo,
          fullUrl: `${this.configService.get('PRODUCT_IMAGE_URL')}/${
            photoEntity.photo
          }`,
        };
      },
    );

    return mapToProductResponse(dbProduct, photos);
  }

  public async deleteProduct(id: string, userid: string): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } ,relations:{photos: true}});
    await this.deleteProductImages(
      product.id,
      product.photos.map((p) => p.photo),
      userid,
    );
    await this.productRepository.delete({ id });
    return !(await this.productRepository.exist({ where: { id } }));
  }

  public async uploadImages(id: string, images: string[], user: ToUserDto) {
    const dbProduct = await this.productRepository.findOne({ where: { id } });
    if (!dbProduct) {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }
    for (const filename of images) {
      const photoEntity = {
        product: dbProduct,
        photo: filename,
        createdBy: user.id,
        lastUpdatedBy: user.id,
      } as unknown as ProductPhotoEntity;
      const newPhotoEntity = await this.productPhotoRepository.create(
        photoEntity,
      );
      await this.productPhotoRepository.save(newPhotoEntity);
    }
  }

  public async deleteProductImages(
    productId: string,
    photos: string[],
    userId: string,
  ) {
    const dbProduct = await this.productRepository.findOne({
      where: { id: productId },
      relations: { photos: true },
    });
    if (!dbProduct) {
      throw new HttpException('Product Not found', HttpStatus.BAD_REQUEST);
    }
    const result = [];
    const deletePhotoEntities = dbProduct.photos.filter((photoEntity) => {
      return photos.indexOf(photoEntity.photo) !== -1;
    });
    const dir = this.configService.get('PRODUCT_IMAGE_PATH');
    for (const { id, photo } of deletePhotoEntities) {
      try {
        const filePath = `${dir}/${photo}`;
        fs.unlinkSync(filePath);
        await this.productPhotoRepository.delete({ id });
        result.push(photo);
      } catch (err) {
        throw new HttpException(
          'Failed to Delete file',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return result;
  }
}
