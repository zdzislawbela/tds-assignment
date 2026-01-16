import { useConversionsContext } from '@/contexts/ConversionsContext';
import { useFavouritesContext } from '@/contexts/FavouritesContext';
import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import { Card } from './Card';

export function RecentConversions() {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const { conversionHistory, clearAll } = useConversionsContext();
  const { toggle, isFavourite } = useFavouritesContext();
  const hasHistory = conversionHistory.length > 0;

  return (
    <Card title="Recent conversions" isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
      {hasHistory ?
        <>
          <ol className="space-y-2">
            {conversionHistory.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
              >
                <div className="text-sm text-slate-200">
                  {formatCurrency(item.fromAmount)} {item.fromCurrency} →{' '}
                  {formatCurrency(item.toAmount)} {item.toCurrency}
                </div>

                <button
                  className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-100 transition-colors hover:bg-slate-700"
                  onClick={() => toggle(item.fromCurrency, item.toCurrency)}
                  type="button"
                  aria-label={
                    isFavourite(item.fromCurrency, item.toCurrency) ?
                      `Remove ${item.fromCurrency} to ${item.toCurrency} from favourites`
                    : `Add ${item.fromCurrency} to ${item.toCurrency} to favourites`
                  }
                  title={
                    isFavourite(item.fromCurrency, item.toCurrency) ?
                      'Remove from favourites'
                    : 'Add to favourites'
                  }
                >
                  {isFavourite(item.fromCurrency, item.toCurrency) ? '★' : '☆'}
                </button>
              </li>
            ))}
          </ol>

          <button
            className="my-2 w-full rounded-sm p-0.5 transition-colors hover:cursor-pointer hover:bg-amber-700"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        </>
      : <div className="text-slate-200">No recent conversions.</div>}
    </Card>
  );
}
