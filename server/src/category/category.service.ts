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
    const newCategory = this.categoryRepository.create(createCategoryPayload);
    return mapToCategoryDto(await this.categoryRepository.save(newCategory));
  }

  public async updateCategory(
    updateCategoryPayload: UpdateCategoryPayload,
  ): Promise<CategoryStatus> {
    const { id, name, description, isActive, isArchived } =
      updateCategoryPayload;
    return mapToCategoryDto(
      await this.categoryRepository.save({
        id,
        name,
        description,
        isActive,
        isArchived,
      }),
    );
  }

  public async getAllCategories(): Promise<CategoryStatus[]> {
    return (await this.categoryRepository.find({})).map((category) =>
      mapToCategoryDto(category),
    );
  }

  public async getCategory(id: string): Promise<CategoryStatus> {
    return mapToCategoryDto(
      await this.categoryRepository.findOne({ where: { id } }),
    );
  }

  public async deleteCategory(id: string): Promise<boolean> {
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
