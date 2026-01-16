import { useConversionsContext } from '@/contexts/ConversionsContext';
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import { Card } from './Card';

export function RecentConversions() {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const { conversionHistory, clearAll } = useConversionsContext();
  const hasHistory = conversionHistory.length > 0;

  return (
    <Card title="Recent conversions" isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
      {hasHistory ?
        <>
          <ol className="space-y-2">
            {conversionHistory.map(item => (
              <li
                key={item.id}
                className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
              >
                <div className="text-sm text-slate-200">
                  {formatCurrency(item.fromAmount)} {item.fromCurrency} →{' '}
                  {formatCurrency(item.toAmount)} {item.toCurrency}
                </div>
              </li>
            ))}
          </ol>

          <button
            className="my-2 w-full rounded-sm p-0.5 transition-colors hover:cursor-pointer hover:bg-amber-700"
            onClick={clearAll}
          >
            Clear all
          </button>
        </>
      : <div className="text-slate-200">No recent conversions.</div>}
    </Card>
  );
}
