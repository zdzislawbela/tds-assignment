import type { Currency } from '@/types';

interface Props {
  currencies: Currency[];
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export function CurrencySelect({ currencies, value, onChange, disabled }: Props) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="min-w-[100px] rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
    >
      <option value="">Select</option>
      {currencies.map(c => (
        <option key={c.id} value={c.short_code}>
          {c.short_code} - {c.name}
        </option>
      ))}
    </select>
  );
}
