import { useMutation } from '@tanstack/react-query';

import { useServices } from '@/app/context/services-context';

import { CreateCustomersRequest } from '../../models/create-customers-request';

export const useCreateCustomer = () => {
  const customerService = useServices().customerService;

  return useMutation<void, Error, CreateCustomersRequest>({
    mutationFn: (request) => customerService.createCustomer(request),
  });
};
