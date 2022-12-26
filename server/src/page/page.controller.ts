import { Body, Controller, Post } from '@nestjs/common';
import {CreatePagePayload, UpdatePagePayload} from '../dtos/page-payload';
import { PageService } from './page.service';
import { Get, Param, Put, Req, UseGuards } from '@nestjs/common/decorators';
import { mapPageDto } from 'src/shared/mapper';
import { PageDto } from 'src/dtos/page-dto';
import { AuthGuard } from '@nestjs/passport';
import { ToUserDto } from 'src/dtos/user-dto';

@Controller('pages')
export class PageController {

    constructor(private readonly pageService: PageService){}

    @Post()
    @UseGuards(AuthGuard())
    public async createPage(@Body() pageDto: CreatePagePayload, @Req() req: any) {
        const user = req.user as unknown as ToUserDto;
        pageDto.createdBy=user.id;
        pageDto.lastUpdatedBy=user.id;
        return this.pageService.createPage(pageDto);
    }

    @Put(":id")
    @UseGuards(AuthGuard())
    public async updatePage(@Param("id") id: string, @Body() updatePagePayload: UpdatePagePayload, @Req() req: any) {
        const user = req.user as unknown as ToUserDto;
        updatePagePayload.lastUpdatedBy=user.id;
        return this.pageService.updatePage(id, updatePagePayload);
    }

    @Get()
    public async getAll(): Promise<PageDto[]> {
        return this.pageService.findAll();
    }

    @Get(":id")
    public async getPage(@Param("id") id: string): Promise<PageDto> {
        return this.pageService.findOne(id);
    }

}
