import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductPhotoEntity } from '../model/product-photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductPhotoEntity]),
    AuthModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('PRODUCT_IMAGE_PATH'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductsModule {}
