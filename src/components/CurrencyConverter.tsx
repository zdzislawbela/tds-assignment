import { useConversionsContext } from '@/contexts/ConversionsContext';
import { useCurrencyContext } from '@/contexts/CurrencyContext';
import { useConvertCurrency } from '@/hooks/useConvertCurrency';
import React, { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import { CurrencyField } from './CurrencyField';
import { NumberInput } from './NumberInput';

export function CurrencyConverter() {
  const [isConverterExpanded, setIsConverterExpanded] = React.useState(true);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromAmount, setFromAmount] = useState('1');
  const { currencies, loadingCurrencies } = useCurrencyContext();

  const { add } = useConversionsContext();

  const fromAmountAsNumber = parseFloat(fromAmount);

  const {
    data: result = 0,
    isFetching: isConverting,
    error: convertError,
  } = useConvertCurrency({
    from: fromCurrency,
    to: toCurrency,
    amount: fromAmountAsNumber,
  });

  const lastRecordedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!fromCurrency || !toCurrency || isConverting || fromAmount === '') return;

    const key = JSON.stringify([fromCurrency, toCurrency, fromAmountAsNumber, result]);

    const isNewKeySameAsPrevious = lastRecordedKeyRef.current === key;
    if (isNewKeySameAsPrevious) {
      return;
    }

    lastRecordedKeyRef.current = key;

    add({
      fromAmount: fromAmountAsNumber,
      fromCurrency,
      toAmount: result,
      toCurrency,
    });
  }, [add, isConverting, fromCurrency, fromAmountAsNumber, result, toCurrency, fromAmount]);

  return (
    <Card
      title="Currency Converter"
      isExpanded={isConverterExpanded}
      setIsExpanded={setIsConverterExpanded}
    >
      {convertError && (
        <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-300">
          {convertError.message}
        </div>
      )}

      <div className="space-y-4">
        <CurrencyField
          label="From"
          currencies={currencies}
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          disabled={loadingCurrencies}
        >
          <NumberInput
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            placeholder="Amount"
          />
        </CurrencyField>

        <CurrencyField
          label="To"
          currencies={currencies}
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
          disabled={loadingCurrencies}
        >
          <div className="flex w-full items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white">
            {isConverting ?
              <span className="text-slate-400">Converting...</span>
            : result.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })
            }
          </div>
        </CurrencyField>
      </div>
    </Card>
  );
}
