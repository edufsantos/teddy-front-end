import qs from 'qs';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

type UseQuery<T> = [
  query: T,
  setQuery: (data: T) => void,
  resetQuery: () => void,
];

const useQueryString = <T = object>(defaultQuery?: T): UseQuery<T> => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const query = useMemo(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search],
  ) as T;

  const setQuery = useCallback((data: T) => {
    navigate({ pathname, search: qs.stringify(data) }, { replace: true });
  }, []);

  const resetQuery = useCallback(() => {
    navigate({ pathname, search: qs.stringify(null) }, { replace: true });
  }, []);

  useEffect(() => {
    if (!search && defaultQuery) {
      setQuery(defaultQuery);
    }
  }, []);

  return [query, setQuery, resetQuery];
};

export { useQueryString };
