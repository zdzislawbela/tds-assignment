import { useConvertCurrency } from '@/hooks/useConvertCurrency';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useEffect, useState } from 'react';
import { CurrencyInput } from './CurrencyInput';

type Record = {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
};

type CandidateRecord = Omit<Partial<Record>, 'toCurrency'> | null;

// const getIsEmptyString = (candidate: string) => candidate.length === 0;

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('1');
  const [records, setRecords] = useState<Record[]>([]);
  const [recordCandidate, setRecordCandidate] = useState<CandidateRecord>({
    fromAmount: '1',
  });
  console.log({ recordCandidate, records });
  const numAmount = parseFloat(amount) || 0;

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
    amount: numAmount,
  });

  useEffect(() => {
    //
  }, [result]);

  const getShouldAddToList = (cadidate: CandidateRecord) => {
    return cadidate && Object.keys(cadidate).length === 3;
  };

  const handleSetFromCurrency = (code: string) => {
    setFromCurrency(code);
    setRecordCandidate(prev => ({ ...prev, fromCurrency: code }));
    const shouldAddToList = getShouldAddToList(recordCandidate);

    if (shouldAddToList && result) {
      setRecords(prev => [...prev, { ...(recordCandidate as Record), toAmounnt: result }]);
    }
  };

  const handleSetToCurrency = (code: string) => {
    setToCurrency(code);
    setRecordCandidate(prev => ({ ...prev, to: code }));
    const shouldAddToList = getShouldAddToList(recordCandidate);

    if (shouldAddToList && result) {
      setRecords(prev => [...prev, { ...(recordCandidate as Record), toAmounnt: result }]);
    }
  };

  const handleSetFromAmount = (value: string) => {
    setAmount(value);
    setRecordCandidate(prev => ({ ...prev, fromAmount: value }));
    const shouldAddToList = getShouldAddToList(recordCandidate);

    if (shouldAddToList && result) {
      setRecords(prev => [...prev, { ...(recordCandidate as Record), toAmounnt: result }]);
    }
  };

  const error = currenciesError || convertError;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-white">Currency Converter</h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-300">
            {error.message}
          </div>
        )}

        <div className="space-y-4">
          <CurrencyInput
            label="From"
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onCurrencyChange={handleSetFromCurrency}
            disabled={loadingCurrencies}
          >
            <input
              type="number"
              value={amount}
              onChange={e => handleSetFromAmount(e.target.value)}
              placeholder="Amount"
              min="0"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </CurrencyInput>

          <CurrencyInput
            label="To"
            currencies={currencies}
            selectedCurrency={toCurrency}
            onCurrencyChange={handleSetToCurrency}
            disabled={loadingCurrencies}
          >
            <div className="flex w-full items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white">
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
      <ol className="h-full min-h-2">
        {records.map(item => {
          return <li>{item.fromAmount}</li>;
        })}
      </ol>
    </div>
  );
}
