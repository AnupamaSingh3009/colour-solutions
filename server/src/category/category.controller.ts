import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CategoryPayload, CategoryProduct,
  CategoryStatus,
  UpdateCategoryPayload,
} from 'src/dtos/category';
import { CategoryService } from './category.service';
import { ToUserDto } from 'src/dtos/user-dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard())
  public async createCategory(
    @Body() categoryPayload: CategoryPayload,
    @Req() req,
  ): Promise<CategoryStatus> {
    const user = req.user as ToUserDto;
    categoryPayload.createdBy = categoryPayload.lastUpdatedBy = user.id;
    return this.categoryService.createCategory(categoryPayload);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  public async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryPayload: UpdateCategoryPayload,
    @Req() req,
  ): Promise<CategoryStatus> {
    const user = req.user as ToUserDto;
    updateCategoryPayload.lastUpdatedBy = user.id;
    return this.categoryService.updateCategory(updateCategoryPayload);
  }

  @Get()
  public async getAllCategories(): Promise<CategoryStatus[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  public async getCategoryById(
    @Param('id') id: string,
  ): Promise<CategoryStatus> {
    return this.categoryService.getCategory(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public async deleteCategory(@Param('id') id: string): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }

  @Get('/name/:name')
  public async getCategoryProductsByCatName(@Param("name") name: string): Promise<CategoryProduct> {
    return this.categoryService.getCategoryProductsByCatName(name);
  }


}
