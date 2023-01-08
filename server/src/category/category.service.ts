import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CategoryPayload,
  CategoryProduct,
  CategoryStatus,
  UpdateCategoryPayload,
} from 'src/dtos/category';
import Category from 'src/model/category.entity';
import { mapToCategoryDto, mapToProductResponse } from 'src/shared/mapper';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly configService: ConfigService,
  ) {}

  public async createCategory(
    createCategoryPayload: CategoryPayload,
  ): Promise<CategoryStatus> {
    const { name } = createCategoryPayload;
    // check if the category exists in the db
    const categoryInDb = await this.categoryRepository.findOne({
      where: { name },
    });
    if (categoryInDb) {
      throw new HttpException(
        'Category name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    let parentCategory = undefined;
    if (!!createCategoryPayload.parent) {
      parentCategory = await this.categoryRepository.findOne({
        where: { id: createCategoryPayload.parent },
      });
    }
    const newCategory = this.categoryRepository.create({
      ...createCategoryPayload,
      parent: parentCategory,
    });
    return mapToCategoryDto(await this.categoryRepository.save(newCategory));
  }

  public async updateCategory(
    updateCategoryPayload: UpdateCategoryPayload,
  ): Promise<CategoryStatus> {
    const { id, name, description, isActive, isArchived } =
      updateCategoryPayload;
    let parentCategory = undefined;
    if (!!updateCategoryPayload.parent) {
      parentCategory = await this.categoryRepository.findOne({
        where: { id: updateCategoryPayload.parent },
      });
    }
    return mapToCategoryDto(
      await this.categoryRepository.save({
        id,
        name,
        description,
        isActive,
        isArchived,
        parent: parentCategory,
      }),
    );
  }

  public async getAllCategories(): Promise<CategoryStatus[]> {
    const categories = await this.categoryRepository.find({
      relations: {
        products: {
          photos: true,
        },
        parent: true,
      },
    });
    const result = categories.map((category) => {
      const categoryStatus = mapToCategoryDto(category);
      for (const product of category.products) {
        categoryStatus.photo =
          product.photos &&
          `${this.configService.get('PRODUCT_IMAGE_URL')}/${
            product.photos[0].photo
          }`;
      }
      return categoryStatus;
    });

    return result;
  }

  public async getCategory(id: string): Promise<CategoryStatus> {
    return mapToCategoryDto(
      await this.categoryRepository.findOne({
        where: { id },
        relations: {
          parent: true,
        },
      }),
    );
  }

  public async deleteCategory(id: string): Promise<boolean> {
    const numOfSubCategories = await this.categoryRepository
      .createQueryBuilder('c')
      .where('c.parentId = :parentId', { parentId: id })
      .getCount();
    if (numOfSubCategories > 0) {
      throw new HttpException(
        `Delete not allowed for category. ${numOfSubCategories} subcategories are assigned to this category.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const numOfProducts = await this.productRepository
      .createQueryBuilder('p')
      .where('p.category_id = :categoryId', { categoryId: id })
      .getCount();

    if (numOfProducts > 0) {
      throw new HttpException(
        `Delete not allowed for category. ${numOfProducts} products are assigned to this category.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await this.categoryRepository.delete({ id });
    return !(await this.categoryRepository.exist({ where: { id } }));
  }

  public async getCategoryProductsByCatName(
    name: string,
  ): Promise<CategoryProduct> {
    const dbCategory = await this.categoryRepository.findOne({
      where: { name },
      relations: {
        products: {
          photos: true,
        },
      },
    });
    if (!dbCategory) {
      throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);
    }
    return {
      category: mapToCategoryDto(dbCategory),
      products: dbCategory.products.map((product) => {
        const photos = product.photos.map((photoEntity) => {
          return {
            photo: photoEntity.photo,
            fullUrl: `${this.configService.get('PRODUCT_IMAGE_URL')}/${
              photoEntity.photo
            }`,
          };
        });
        return mapToProductResponse(product, photos);
      }),
    } as CategoryProduct;
  }
}
