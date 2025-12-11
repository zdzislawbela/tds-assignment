import type { ConvertResponse } from '@/types';
import { ENDPOINTS, fetchJson } from './currencybeacon';

export async function convertCurrency(from: string, to: string, amount: number): Promise<number> {
  const data = await fetchJson<ConvertResponse>(ENDPOINTS.convert(from, to, amount));
  return data.response.value;
}
