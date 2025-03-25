import { useMutation } from '@tanstack/react-query';

import { useServices } from '@/app/context/services-context';

export const useDeleteCustomer = () => {
  const customerService = useServices().customerService;

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => customerService.deleteCustomer(id),
  });
};
