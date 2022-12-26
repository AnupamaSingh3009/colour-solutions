import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryPayload, CategoryStatus, UpdateCategoryPayload } from 'src/dtos/category';
import Category from 'src/model/category.entity';
import { mapToCategoryDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
        
    }

    public async createCategory(createCategoryPayload: CategoryPayload): Promise<CategoryStatus> {
        const {name} = createCategoryPayload;
        // check if the category exists in the db
        const categoryInDb = await this.categoryRepository.findOne({ where: { name } });
        if (categoryInDb) {
            throw new HttpException('Page already exists', HttpStatus.BAD_REQUEST);
        }
        const newCategory = this.categoryRepository.create(createCategoryPayload);
        return mapToCategoryDto(await this.categoryRepository.save(newCategory));
    }

    public async updateCategory(updateCategoryPayload: UpdateCategoryPayload): Promise<CategoryStatus> {
        const {id, name, description, isActive, isArchived} = updateCategoryPayload;
        return mapToCategoryDto(await this.categoryRepository.save({
                id,
                name,
                description,
                isActive,
                isArchived
        }));
    }

    public async getAllCategories(): Promise<CategoryStatus[]> {
        return (await this.categoryRepository.find({}))
        .map(category => mapToCategoryDto(category));
    }

    public async getCategory(id: string): Promise<CategoryStatus> {
        return mapToCategoryDto(await this.categoryRepository.findOne({where: {id}}));
    }
}
