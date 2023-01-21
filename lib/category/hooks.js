import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useCategoryPages({ creatorId, limit = 10 } = {}) {
  const { categoryData, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.categories.length === 0)
        return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (creatorId) searchParams.set('by', creatorId);

      if (index !== 0) {
        const before = new Date(
          new Date(
            previousPageData.categories[
              previousPageData.categories.length - 1
            ].createdAt
          ).getTime()
        );

        searchParams.set('before', before.toJSON());
      }

      return `/api/categories?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !categoryData && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && categoryData && typeof categoryData[size - 1] === 'undefined');
  const isEmpty = categoryData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (categoryData &&
      categoryData[categoryData.length - 1]?.categories?.length < limit);

  return {
    categoryData,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
