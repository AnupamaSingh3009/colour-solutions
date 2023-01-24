import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { PageService } from '../page/page.service';

@Injectable()
export class MenuService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly pageService: PageService,
  ) {}

  public async getMenus(): Promise<MenuDto> {
    const dbCategories = await this.categoryService.getParentCategories();

    const dbPages = await this.pageService.findAll();

    return {
      categories: dbCategories.map((category) => category.name),
      pages: dbPages.map((page) => {
        return { link: page.link, title: page.title } as PageMenu;
      }),
    } as MenuDto;
  }
}
