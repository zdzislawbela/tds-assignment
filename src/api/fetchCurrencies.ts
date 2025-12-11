import type { CurrenciesResponse, Currency } from '@/types';
import { ENDPOINTS, fetchJson } from './currencybeacon';

export async function fetchCurrencies(): Promise<Currency[]> {
  const data = await fetchJson<CurrenciesResponse>(ENDPOINTS.currencies);

  return data.response;
}
