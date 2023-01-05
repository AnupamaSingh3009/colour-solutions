import { IsNotEmpty } from 'class-validator';
import { ProductResponse } from './product.dto';

export class CategoryPayload {
  @IsNotEmpty()
  name: string;

  description: string;
  createdBy: string;
  lastUpdatedBy: string;
}

export class UpdateCategoryPayload extends CategoryPayload {
  id: string;
  isActive: boolean;
  isArchived: boolean;
}

export interface CategoryStatus {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isArchived: boolean;
}

export interface CategoryProduct {
  category: CategoryStatus;

  products: ProductResponse[];
}
