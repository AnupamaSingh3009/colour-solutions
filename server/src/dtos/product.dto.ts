import { IsNotEmpty, IsNumber } from 'class-validator';
import { CategoryStatus } from './category';
import { GenderEnum } from '../model/gender.enum';

export class ProductRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  size: string;

  color: string;

  material: string;

  category: CategoryStatus;

  @IsNumber()
  price: number;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gender: GenderEnum = GenderEnum.UNISEX;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  size: string;
  color: string;
  material: string;
  category: CategoryStatus;
  price: number;
  isActive: boolean;
  isArchived: boolean;
  photos: ProductPhotoResponse[];
  gender: GenderEnum;
  quantity: number;
  minOrderQty: number;
}

export interface ProductPhotoResponse {
  photo: string;
  fullUrl: string;
}
