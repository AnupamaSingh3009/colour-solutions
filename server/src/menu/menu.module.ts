import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { CategoryModule } from '../category/category.module';
import { PageModule } from '../page/page.module';

@Module({
  imports: [CategoryModule, PageModule],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule {}
