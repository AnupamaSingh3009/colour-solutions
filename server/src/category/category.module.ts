import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';
import Category from 'src/model/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
