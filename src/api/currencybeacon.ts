const API_KEY = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;
const BASE_URL = 'https://api.currencybeacon.com/v1';

export const ENDPOINTS = {
  currencies: `${BASE_URL}/currencies`,
  convert: (from: string, to: string, amount: number) =>
    `${BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}`,
};

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
