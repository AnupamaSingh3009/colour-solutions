import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';
import Category from 'src/model/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { ProductPhotoEntity } from '../model/product-photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product, ProductPhotoEntity]),
    AuthModule,
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
