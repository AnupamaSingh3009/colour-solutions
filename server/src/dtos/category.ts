import { IsNotEmpty } from "class-validator";

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