import { HttpClient } from '@/shared/http/http-client';
import { LoggerInterface } from '@/shared/utils/logger';
import { FindCustomersRequest } from '../models/find-customers-request';
import { FindCustomersResponse } from '../models/find-customers-response';
import { Customer } from '../models/customer-model';
import { CreateCustomersRequest } from '../models/create-customers-request';
import { UpdateCustomerRequest } from '../models/update-customers-request';

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
      const res = await this.httpClient.get<FindCustomersResponse>(
        '/customers',
        {
          params: request,
        },
      );

      const response = FindCustomersResponse.fromApiResponse<Customer>(
        res,
        (data) => data,
      );

      this.logger.debug(`Find customers success: ${JSON.stringify(response)}`);

      return response;
    } catch (error) {
      this.logger.error(`Find customers failed: ${error}`);
      throw new Error(String(error));
    }
  }

  async createCustomer(request: CreateCustomersRequest): Promise<void> {
    this.logger.debug(
      `Create customer with this params: ${JSON.stringify(request)}`,
    );

    try {
      await this.httpClient.post('/customers', request);
      this.logger.debug(`Create customer success`);
    } catch (error) {
      this.logger.error(`Create customer failed: ${error}`);
      throw new Error(String(error));
    }
  }

  async updateCustomer(customer: UpdateCustomerRequest): Promise<void> {
    this.logger.debug(
      `Update customer with this params: ${JSON.stringify(customer)}`,
    );

    try {
      await this.httpClient.patch(`/customers/${customer.id}`, customer);
      this.logger.debug(`Update customer success`);
    } catch (error) {
      this.logger.error(`Update customer failed: ${error}`);
      throw new Error(String(error));
    }
  }

  async deleteCustomer(id: number): Promise<void> {
    this.logger.debug(`Delete customer with this id: ${id}`);

    try {
      await this.httpClient.delete(`/customers/${id}`);
      this.logger.debug(`Delete customer success`);
    } catch (error) {
      this.logger.error(`Delete customer failed: ${error}`);
      throw new Error(String(error));
    }
  }
}

export { CustomerService };
