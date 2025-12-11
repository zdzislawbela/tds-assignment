import { convertCurrency } from '@/api/convertCurrency';
import { useQuery } from '@tanstack/react-query';

interface UseConvertCurrencyParams {
  from: string;
  to: string;
  amount: number;
}

export function useConvertCurrency({ from, to, amount }: UseConvertCurrencyParams) {
  return useQuery({
    queryKey: ['convert', from, to, amount],
    queryFn: () => convertCurrency(from, to, amount),
    enabled: Boolean(from && to && amount > 0),
  });
}
