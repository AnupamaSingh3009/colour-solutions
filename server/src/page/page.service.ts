import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePagePayload, UpdatePagePayload } from '../dtos/page-payload';
import { PageDto, PageStatus } from '../dtos/page-dto';
import { Page } from '../model/page.entity';
import { mapCreatePageDto, mapPageDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  private readonly PAGE_HOME_NAME = 'home';
  constructor(
    @InjectRepository(Page) private readonly pageRepository: Repository<Page>,
  ) {}

  public async createPage(pagePayload: CreatePagePayload): Promise<PageStatus> {
    const { title } = pagePayload;
    if (title.toLowerCase() === this.PAGE_HOME_NAME) {
      throw new HttpException(
        `Invalid page name. Can't use '${this.PAGE_HOME_NAME}' as page name`,
        HttpStatus.BAD_REQUEST,
      );
    }
    // check if the page exists in the db
    const pageInDb = await this.pageRepository.findOne({ where: { title } });
    if (pageInDb) {
      throw new HttpException('Page already exists', HttpStatus.BAD_REQUEST);
    }
    pagePayload.link = title.replace(' ', '_').toLowerCase();
    const newPage = this.pageRepository.create(pagePayload);
    return mapCreatePageDto(await this.pageRepository.save(newPage));
  }

  public async updatePage(
    id: string,
    pagePayload: UpdatePagePayload,
  ): Promise<PageStatus> {
    const page = await this.pageRepository.findOne({ where: { id } });
    if (!page) {
      throw new HttpException('Page not found', HttpStatus.BAD_REQUEST);
    }
    pagePayload.link = pagePayload.title.replace(' ', '_').toLowerCase();
    const updatePage = await this.pageRepository.save({
      id,
      title: pagePayload.title,
      link: pagePayload.link,
      content: pagePayload.content,
      isActive: pagePayload.isActive,
      isArchived: pagePayload.isArchived,
    });

    return mapCreatePageDto(updatePage);
  }

  public async findAll(): Promise<PageDto[]> {
    const pages = await this.pageRepository.find({});
    return pages.map((page) => mapPageDto(page));
  }

  public async findOne(id: string): Promise<PageDto> {
    const page = await this.pageRepository.findOne({ where: { id } });
    if (!page) {
      throw new HttpException('Page not found', HttpStatus.BAD_REQUEST);
    }
    return mapPageDto(page);
  }

  public async findByLink(link: string): Promise<PageDto> {
    const page = await this.pageRepository.findOne({ where: { link } });
    if (!page) {
      throw new HttpException('Page not found', HttpStatus.BAD_REQUEST);
    }
    return mapPageDto(page);
  }

  public async delete(id: string): Promise<boolean> {
    this.pageRepository.delete({ id });
    return !(await this.pageRepository.exist({ where: { id } }));
  }
}
