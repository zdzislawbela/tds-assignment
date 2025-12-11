import { fetchCurrencies } from '@/api/fetchCurrencies';
import { useQuery } from '@tanstack/react-query';

export function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
  });
}
