import { useQuery } from '@tanstack/react-query';

import { useServices } from '@/app/context/services-context';
import { FindCustomersResponse } from '../../models/find-customers-response';
import { queryKeys } from '@/shared/constants/query-keys';
import { FindCustomersRequest } from '../../models/find-customers-request';

export const useFindCustomers = (params: FindCustomersRequest) => {
  const customerServices = useServices().customerService;

  return useQuery<FindCustomersResponse>({
    queryKey: queryKeys.customers.all(params.skip, params.take, params.name),
    queryFn: () => customerServices.findCustomers(params),
  });
};
