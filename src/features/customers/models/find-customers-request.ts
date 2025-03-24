import { PaginatedRequest } from '@/shared/models/paginated-request';

export class FindCustomersRequest extends PaginatedRequest {
  name: string;

  constructor(skip: number = 0, take: number = 10, name: string = '') {
    super({ skip, take });
    this.name = name;
  }
}
