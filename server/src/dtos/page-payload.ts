import { IsNotEmpty } from "class-validator";

export class CreatePagePayload {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    createdBy: string;

    lastUpdatedBy: string;
}

export class UpdatePagePayload extends CreatePagePayload{

    isActive: boolean;

    isArchived: boolean;

}