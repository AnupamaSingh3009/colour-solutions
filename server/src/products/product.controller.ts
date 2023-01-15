import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductRequest, ProductResponse } from '../dtos/product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { ToUserDto } from '../dtos/user-dto';
import { Delete, Put } from '@nestjs/common/decorators';
import { Pagination } from '../dtos/pagination.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import { ConfigService } from '@nestjs/config/dist';
import * as process from 'process';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  public async createProduct(
    @Body() productRequest: ProductRequest,
    @Req() req,
  ): Promise<ProductResponse> {
    const user = req.user as unknown as ToUserDto;
    return await this.productService.createProduct(productRequest, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  public async updateProduct(
    @Param('id') id: string,
    @Body() productRequest: ProductRequest,
    @Req() req,
  ): Promise<ProductResponse> {
    const user = req.user as unknown as ToUserDto;
    return await this.productService.updateProduct(id, productRequest, user);
  }

  @Get()
  public async getProducts(
    @Query('page') page = 1,
    @Query('size') size = 10,
  ): Promise<Pagination> {
    return await this.productService.getProducts(page, size);
  }

  @Get(':id')
  public async getProductById(
    @Param('id') id: string,
  ): Promise<ProductResponse> {
    return await this.productService.getProductById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public async deleteProduct(@Param('id') id: string, @Req() req): Promise<boolean> {
    const user = req.user as unknown as ToUserDto;
    return await this.productService.deleteProduct(id, user.id);
  }

  @Post(':id/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          callback(null, process.env['PRODUCT_IMAGE_PATH']);
        },
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          let fileExtension = '';
          if (file.mimetype.indexOf('jpeg') > -1) {
            fileExtension = 'jpeg';
          } else if (file.mimetype.indexOf('png') > -1) {
            fileExtension = 'png';
          } else if (file.mimetype.indexOf('jpg') > -1) {
            fileExtension = 'jpg';
          } else if (file.mimetype.indexOf('gif') > -1) {
            fileExtension = 'gif';
          }
          const originalName = file.originalname.split('.')[0];
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            originalName + '-' + uniqueSuffix + '.' + fileExtension,
          );
        },
      }),
    }),
  )
  public async uploadImages(
    @Param('id') id: string,
    @UploadedFiles()
    images: Array<Express.Multer.File>,
    @Req() req,
  ): Promise<void> {
    const user = req.user as unknown as ToUserDto;
    const filenames = images.map((image) => image.filename);
    await this.productService.uploadImages(id, filenames, user);
  }

  @Delete(':id/photos')
  @UseGuards(AuthGuard())
  public async deleteProductImages(
    @Param('id') id: string,
    @Body() photos: string[],
    @Req() req,
  ) {
    const user = req.user as unknown as ToUserDto;
    return this.productService.deleteProductImages(id, photos, user.id);
  }
}
