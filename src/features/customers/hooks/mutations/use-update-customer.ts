import { useMutation } from '@tanstack/react-query';

import { useServices } from '@/app/context/services-context';

import {} from '../../models/create-customers-request';
import { UpdateCustomerRequest } from '../../models/update-customers-request';
export const useUpdateCustomer = () => {
  const customerService = useServices().customerService;

  return useMutation<void, Error, UpdateCustomerRequest>({
    mutationFn: (request) => customerService.updateCustomer(request),
  });
};
