import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';

export function useCurrentUser() {
  return useSWR('/api/user', fetcher);
}

export function getUsers() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSWR('/api/users', fetcher);
}
export function useUser(id) {
  return useSWR(`/api/users/${id}`, fetcher);
}

export function useSettings() {
  return useSWR('/api/settings', fetcher);
}
