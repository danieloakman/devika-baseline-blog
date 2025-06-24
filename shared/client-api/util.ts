import type { Query, QueryKey } from '@tanstack/react-query';

export const NAMED_QUERY_KEYS = [
  'get-blogs',
  'get-blog',
  'create-blog',
  'update-blog',
  'delete-blog',
  'publish-blog',
] as const;

export type NamedQueryKey = typeof NAMED_QUERY_KEYS[number];

export const createQueryKey = (key: NamedQueryKey, ...extra: QueryKey) => {
  return [key, ...extra] as QueryKey;
};

export const hasQueryKeys =
  (...keys: NamedQueryKey[]) =>
  (query: Query): boolean =>
    query.queryKey.some((k) => typeof k === 'string' && keys.includes(k as NamedQueryKey));
