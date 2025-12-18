import { expect, test } from '@playwright/test';

const CURRENCIES_URL = 'https://api.currencybeacon.com/v1/currencies';
const CONVERT_URL_GLOB = 'https://api.currencybeacon.com/v1/convert?*';

const mockCurrencies = {
  meta: { code: 200, disclaimer: 'mock' },
  response: [
    {
      id: 1,
      name: 'US Dollar',
      short_code: 'USD',
      code: '840',
      precision: 2,
      subunit: 100,
      symbol: '$',
      symbol_first: true,
      decimal_mark: '.',
      thousands_separator: ',',
    },
    {
      id: 2,
      name: 'Euro',
      short_code: 'EUR',
      code: '978',
      precision: 2,
      subunit: 100,
      symbol: '€',
      symbol_first: true,
      decimal_mark: '.',
      thousands_separator: ',',
    },
    {
      id: 3,
      name: 'Polish Zloty',
      short_code: 'PLN',
      code: '985',
      precision: 2,
      subunit: 100,
      symbol: 'zł',
      symbol_first: false,
      decimal_mark: '.',
      thousands_separator: ',',
    },
  ],
};

test('loads currencies and shows default result', async ({ page }) => {
  await page.route(CURRENCIES_URL, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockCurrencies),
    }),
  );

  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Currency Converter' })).toBeVisible();
  await expect(page.getByTestId('converted-value')).toContainText('0.00');

  // Options appear after currencies load
  await expect(page.getByTestId('from-currency-select')).toContainText('USD');
  await expect(page.getByTestId('to-currency-select')).toContainText('EUR');
});

test('converts when from/to/amount are set (happy path)', async ({ page }) => {
  await page.route(CURRENCIES_URL, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockCurrencies),
    }),
  );

  await page.route(CONVERT_URL_GLOB, async route => {
    const url = new URL(route.request().url());
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const amount = url.searchParams.get('amount');

    expect(from).toBe('USD');
    expect(to).toBe('EUR');
    expect(amount).toBe('10');

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        response: {
          timestamp: 0,
          date: '2025-01-01',
          from,
          to,
          amount: Number(amount),
          value: 20,
        },
      }),
    });
  });

  await page.goto('/');

  await page.getByTestId('amount-input').fill('10');
  await page.getByTestId('from-currency-select').selectOption('USD');
  await page.getByTestId('to-currency-select').selectOption('EUR');

  // Locale can be "20.00" or "20,00"
  await expect(page.getByTestId('converted-value')).toHaveText(/20[.,]00/);
});

test('does not call convert endpoint when amount is 0', async ({ page }) => {
  await page.route(CURRENCIES_URL, route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockCurrencies),
    }),
  );

  let convertCalled = false;
  await page.route(CONVERT_URL_GLOB, async route => {
    convertCalled = true;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        response: {
          timestamp: 0,
          date: '2025-01-01',
          from: 'USD',
          to: 'EUR',
          amount: 0,
          value: 999,
        },
      }),
    });
  });

  await page.goto('/');

  await page.getByTestId('amount-input').fill('0');
  await page.getByTestId('from-currency-select').selectOption('USD');
  await page.getByTestId('to-currency-select').selectOption('EUR');

  // Give React Query a tick; should not run because enabled: amount > 0
  await page.waitForTimeout(300);

  expect(convertCalled).toBe(false);
  await expect(page.getByTestId('converted-value')).toContainText('0.00');
});
