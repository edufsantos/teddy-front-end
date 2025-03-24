import { HttpClient } from '@/shared/http/http-client';
import { LoggerInterface } from '@/shared/utils/logger';
import { FindCustomersRequest } from '../models/find-customers-request';
import { FindCustomersResponse } from '../models/find-customers-response';
import { Customer } from '../models/customer-model';

class CustomerService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: LoggerInterface,
  ) {}

  async findCustomers(
    request: FindCustomersRequest,
  ): Promise<FindCustomersResponse> {
    this.logger.debug(
      `Find customers with this params: ${JSON.stringify(request)}`,
    );

    try {
      const res = await this.httpClient.post<Record<string, unknown>>(
        '/authenticate/access-token',
        request,
      );

      const response = FindCustomersResponse.fromApiResponse<Customer>(
        res,
        (data) => data,
      );

      return response;
    } catch (error) {
      this.logger.error(`Find customers failed: ${error}`);
      throw new Error(String(error));
    }
  }
}

export { CustomerService };
