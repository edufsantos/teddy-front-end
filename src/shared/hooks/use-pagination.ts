import { useCallback, useEffect } from 'react';
import { useQueryString } from './use-query-string';

interface UsePagination {
  page: number;
  pages: number;
  skip: number;
  take: number;
  nextPage: () => void;
  prevPage: () => void;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
}

const usePagination = (count: number): UsePagination => {
  const [query, setQueryString] = useQueryString<{
    take: number;
    skip: number;
  }>();
  const take = Number(query.take ?? 16);
  const skip = Number(query.skip ?? 0);

  useEffect(() => {
    setQueryString({ ...query, skip, take });
  }, []);

  const setTake = useCallback(
    (take: number) => {
      setQueryString({ ...query, take });
    },
    [query],
  );

  const setSkip = useCallback(
    (skip: number) => {
      setQueryString({ ...query, skip, take });
    },
    [query],
  );

  const nextPage = useCallback(() => {
    setSkip(skip + take);
  }, [query]);

  const prevPage = useCallback(() => {
    setSkip(Math.max(skip - take, 0));
  }, [query]);

  return {
    page: skip / take + 1,
    pages: Math.ceil(count / take),
    skip,
    take,
    nextPage,
    prevPage,
    setSkip,
    setTake,
  };
};

export default usePagination;
