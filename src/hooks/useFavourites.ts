import { useCallback, useMemo, useState } from 'react';

export type FavouritePair = {
  /**
   * Stable id so we can de-dupe by pair and keep React list keys stable.
   * Format: `${fromCurrency}:${toCurrency}`
   */
  id: string;
  createdAt: number;
  fromCurrency: string;
  toCurrency: string;
};

type UseFavouritesOptions = {
  maxItems?: number;
  storageKey?: string;
};

const DEFAULT_MAX_ITEMS = 10;
const DEFAULT_STORAGE_KEY = 'favouritePairs';

function makeId(fromCurrency: string, toCurrency: string) {
  return `${fromCurrency}:${toCurrency}`;
}

function getStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isFavouritePairArray(value: unknown): value is FavouritePair[] {
  if (!Array.isArray(value)) return false;
  return value.every(item => {
    if (!item || typeof item !== 'object') return false;
    const r = item as Record<string, unknown>;
    return (
      typeof r.id === 'string' &&
      typeof r.createdAt === 'number' &&
      typeof r.fromCurrency === 'string' &&
      typeof r.toCurrency === 'string'
    );
  });
}

function loadInitial(storageKey: string): FavouritePair[] {
  const storage = getStorage();
  if (!storage) return [];
  const raw = storage.getItem(storageKey);
  if (!raw) return [];
  const parsed = safeParse(raw);
  return isFavouritePairArray(parsed) ? parsed : [];
}

function persist(storageKey: string, favourites: FavouritePair[]) {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(storageKey, JSON.stringify(favourites));
  } catch {
    // ignore storage quota / privacy mode failures
  }
}

export function useFavourites(options: UseFavouritesOptions = {}) {
  const maxItems = options.maxItems ?? DEFAULT_MAX_ITEMS;
  const storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;

  const [favourites, setFavourites] = useState<FavouritePair[]>(() => loadInitial(storageKey));

  const isFavourite = useCallback(
    (fromCurrency: string, toCurrency: string) => {
      const id = makeId(fromCurrency, toCurrency);
      return favourites.some(f => f.id === id);
    },
    [favourites],
  );

  const add = useCallback(
    (fromCurrency: string, toCurrency: string) => {
      if (!fromCurrency || !toCurrency) return;
      const id = makeId(fromCurrency, toCurrency);

      setFavourites(prev => {
        const exists = prev.some(f => f.id === id);
        if (exists) return prev;

        const next: FavouritePair = {
          id,
          createdAt: Date.now(),
          fromCurrency,
          toCurrency,
        };

        const updated = [next, ...prev].slice(0, maxItems);
        persist(storageKey, updated);
        return updated;
      });
    },
    [maxItems, storageKey],
  );

  const remove = useCallback(
    (fromCurrency: string, toCurrency: string) => {
      const id = makeId(fromCurrency, toCurrency);
      setFavourites(prev => {
        const updated = prev.filter(f => f.id !== id);
        persist(storageKey, updated);
        return updated;
      });
    },
    [storageKey],
  );

  const toggle = useCallback(
    (fromCurrency: string, toCurrency: string) => {
      const id = makeId(fromCurrency, toCurrency);
      setFavourites(prev => {
        const exists = prev.some(f => f.id === id);
        const updated =
          exists ?
            prev.filter(f => f.id !== id)
          : [
              {
                id,
                createdAt: Date.now(),
                fromCurrency,
                toCurrency,
              },
              ...prev,
            ].slice(0, maxItems);

        persist(storageKey, updated);
        return updated;
      });
    },
    [maxItems, storageKey],
  );

  const clearAll = useCallback(() => {
    setFavourites(() => {
      persist(storageKey, []);
      return [];
    });
  }, [storageKey]);

  const ids = useMemo(() => new Set(favourites.map(f => f.id)), [favourites]);

  return { favourites, ids, add, remove, toggle, clearAll, isFavourite, makeId };
}
