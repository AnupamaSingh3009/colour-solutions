import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuSerivce: MenuService) {}

  @Get()
  public async getMenu(): Promise<MenuDto> {
    return this.menuSerivce.getMenus();
  }
}
