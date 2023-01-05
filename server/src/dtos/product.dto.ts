import { IsNotEmpty, IsNumber } from 'class-validator';
import { CategoryStatus } from './category';

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
}

export interface ProductPhotoResponse {
  photo: string;
  fullUrl: string;
}