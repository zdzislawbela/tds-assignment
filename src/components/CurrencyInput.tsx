import type { Currency } from '@/types';
import type { ReactNode } from 'react';
import { CurrencySelect } from './CurrencySelect';

interface Props {
  label: string;
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencyChange: (code: string) => void;
  disabled?: boolean;
  currencySelectTestId?: string;
  children: ReactNode;
}

export function CurrencyInput({
  label,
  currencies,
  selectedCurrency,
  onCurrencyChange,
  disabled,
  currencySelectTestId,
  children,
}: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-slate-400">{label}</label>
      <div className="flex gap-2">
        {children}
        <CurrencySelect
          currencies={currencies}
          value={selectedCurrency}
          onChange={onCurrencyChange}
          disabled={disabled}
          testId={currencySelectTestId}
        />
      </div>
    </div>
  );
}
