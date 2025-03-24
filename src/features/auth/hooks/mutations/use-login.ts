import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/app/context/services-context';
import { queryKeys } from '@/shared/constants/query-keys';

import { LoginRequest } from '../../models/login-request';

export const useLogin = () => {
  const authService = useServices().authService;
  const queryClient = useQueryClient();

  return useMutation<void, Error, LoginRequest>({
    mutationFn: (request) => authService.loginWithCredentials(request),
    onSuccess: () =>
      queryClient.refetchQueries({
        queryKey: queryKeys.users.me(),
      }),
  });
};
