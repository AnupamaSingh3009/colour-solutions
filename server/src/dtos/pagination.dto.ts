import { BaseEntity } from 'src/model/base.entity';

export interface Pagination {
  content: BaseEntity[];
  count: number;
  page: number;
  size: number;
}
