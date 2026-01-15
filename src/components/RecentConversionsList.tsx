import type { RecentConversion } from '@/hooks/useRecentConversions';
import { Wrapper } from './Wrapper';

function formatNumber(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
}

export function RecentConversionsList({
  conversions,
  maxItems,
}: {
  conversions: RecentConversion[];
  maxItems: number;
}) {
  if (conversions.length === 0) return null;

  return (
    <Wrapper>
      <h2 className="mb-3 text-lg font-semibold text-white">Recent conversions (last {maxItems})</h2>

      <ol className="space-y-2">
        {conversions.map(item => (
          <li key={item.id} className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2">
            <div className="text-sm text-slate-200">
              {formatNumber(item.fromAmount)} {item.fromCurrency} → {formatNumber(item.toAmount)}{' '}
              {item.toCurrency}
            </div>
          </li>
        ))}
      </ol>
    </Wrapper>
  );
}

