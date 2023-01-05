import { CategoryStatus } from 'src/dtos/category';
import { PageStatus, PageDto } from 'src/dtos/page-dto';
import { ProductPhotoResponse, ProductResponse } from 'src/dtos/product.dto';
import { ToUserDto } from 'src/dtos/user-dto';
import Category from 'src/model/category.entity';
import { Page } from 'src/model/page.entity';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entity';

export const toUserDto = (data: User): ToUserDto => {
  const {
    id,
    username,
    firstName,
    lastName,
    address,
    mobile,
    email,
    password,
  } = data;

  const userDto: ToUserDto = {
    id,
    username,
    firstName,
    lastName,
    address,
    mobile,
    email,
  };

  return userDto;
};

export const mapCreatePageDto = (data: Page): PageStatus => {
  const { id, title, content } = data;
  const pageDto: PageStatus = {
    id,
    title,
    content,
  };
  return pageDto;
};

export const mapPageDto = (data: Page): PageDto => {
  const { id, title, content, isActive, isArchived, link } = data;
  const pageDto: PageDto = {
    id,
    title,
    content,
    isActive,
    isArchived,
    link,
  };
  return pageDto;
};

export const mapToCategoryDto = (data: Category) => {
  const { id, name, description, isActive, isArchived } = data;
  const category: CategoryStatus = {
    id,
    name,
    description,
    isActive,
    isArchived,
  };
  return category;
};

export const mapToProductResponse = (
  data: Product,
  photos: ProductPhotoResponse[] = [],
) => {
  const {
    id,
    name,
    description,
    isActive,
    isArchived,
    price,
    size,
    color,
    material,
    category,
  } = data;

  const product: ProductResponse = {
    id,
    name,
    description,
    isActive,
    isArchived,
    price,
    size,
    color,
    material,
    category,
    photos,
  };

  return product;
};
