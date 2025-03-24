import { PaginatedResponse } from '@/shared/models/paginated-response';
import { Customer } from './customer-model';

export class FindCustomersResponse extends PaginatedResponse<Customer> {}
