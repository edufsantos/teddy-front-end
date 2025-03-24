import { useQuery } from '@tanstack/react-query';

import { useServices } from '@/app/context/services-context';
import { queryKeys } from '@/shared/constants/query-keys';

import { User } from '../../models/user-model';

export const useMe = () => {
  const userService = useServices().userService;

  return useQuery<User>({
    queryKey: queryKeys.users.me(),
    queryFn: () => userService.me(),
    retry: 0,
    staleTime: Infinity,
  });
};
