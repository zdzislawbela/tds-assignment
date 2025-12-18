import { useConvertCurrency } from '@/hooks/useConvertCurrency';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useState } from 'react';
import { CurrencyInput } from './CurrencyInput';

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('1');

  const numAmount = parseFloat(amount) || 0;
  const debouncedAmount = useDebouncedValue(numAmount, 300);

  const {
    data: currencies = [],
    isLoading: loadingCurrencies,
    error: currenciesError,
  } = useCurrencies();

  const {
    data: result,
    isFetching: converting,
    error: convertError,
  } = useConvertCurrency({
    from: fromCurrency,
    to: toCurrency,
    amount: debouncedAmount,
  });

  const error = currenciesError || convertError;

  return (
    <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-semibold text-white">Currency Converter</h1>

      {error && (
        <div
          data-testid="error-message"
          className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-300"
        >
          {error.message}
        </div>
      )}

      <div className="space-y-4">
        <CurrencyInput
          label="From"
          currencies={currencies}
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          disabled={loadingCurrencies}
          currencySelectTestId="from-currency-select"
        >
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onKeyDown={e => {
              // Avoid scientific notation / sign characters in number input (e/E/+/-)
              if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder="Amount"
            min="0"
            data-testid="amount-input"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </CurrencyInput>

        <CurrencyInput
          label="To"
          currencies={currencies}
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
          disabled={loadingCurrencies}
          currencySelectTestId="to-currency-select"
        >
          <div
            data-testid="converted-value"
            className="flex w-full items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
          >
            {converting ?
              <span className="text-slate-400">Converting...</span>
            : result !== undefined ?
              result.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })
            : <span className="text-slate-500">0.00</span>}
          </div>
        </CurrencyInput>
      </div>
    </div>
  );
}
