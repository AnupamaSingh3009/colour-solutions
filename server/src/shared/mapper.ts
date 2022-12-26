import { CategoryStatus } from "src/dtos/category";
import {PageStatus, PageDto} from "src/dtos/page-dto";
import { ToUserDto } from "src/dtos/user-dto";
import Category from "src/model/category.entity";
import { Page } from "src/model/page.entity";
import { User } from "src/model/user.entity";

export const toUserDto = (data: User): ToUserDto => {
    const {id, username, firstName, lastName, 
        address, mobile, email, password} = data;

    const userDto: ToUserDto = {
        id,
        username,
        firstName,
        lastName,
        address,
        mobile,
        email
    };

    return userDto;
}

export const mapCreatePageDto = (data: Page): PageStatus => {
    const {id, title, content} = data;
    const pageDto: PageStatus = {
        id,
        title,
        content
    };
    return pageDto;
}

export const mapPageDto = (data: Page): PageDto => {
    const {id, title, content, isActive, isArchived} = data;
    const pageDto: PageDto = {
        id,
        title,
        content,
        isActive,
        isArchived
    };
    return pageDto;
}

export const mapToCategoryDto = (data: Category) => {
    const {id, name, description, isActive, isArchived} = data;
    const category: CategoryStatus = {
        id,
        name,
        description,
        isActive,
        isArchived
    };
    return category; 
}