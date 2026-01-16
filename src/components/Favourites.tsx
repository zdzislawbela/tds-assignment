import { useFavouritesContext } from '@/contexts/FavouritesContext';
import React from 'react';
import { Card } from './Card';

export function Favourites() {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { favourites, clearAll, remove } = useFavouritesContext();

  const hasFavourites = favourites.length > 0;

  return (
    <Card title="Favourites" isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
      {hasFavourites ?
        <>
          <ol className="space-y-2">
            {favourites.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
              >
                <div className="text-sm text-slate-200">
                  {item.fromCurrency} → {item.toCurrency}
                </div>

                <button
                  className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-100 transition-colors hover:bg-slate-700"
                  onClick={() => remove(item.fromCurrency, item.toCurrency)}
                  aria-label={`Remove ${item.fromCurrency} to ${item.toCurrency} from favourites`}
                  title="Remove"
                  type="button"
                >
                  Remove
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
      : <div className="text-slate-200">No favourites yet.</div>}
    </Card>
  );
}
