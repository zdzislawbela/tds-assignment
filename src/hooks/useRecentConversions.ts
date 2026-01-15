import { useCallback, useState } from 'react';

export type RecentConversion = {
  id: string;
  createdAt: number;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
};

type UseRecentConversionsOptions = {
  maxItems?: number;
  storageKey?: string;
};

const DEFAULT_MAX_ITEMS = 5;
const DEFAULT_STORAGE_KEY = 'recentConversions';

function createId() {
  try {
    return crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
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

function isRecentConversionArray(value: unknown): value is RecentConversion[] {
  if (!Array.isArray(value)) return false;
  return value.every(item => {
    if (!item || typeof item !== 'object') return false;
    const r = item as Record<string, unknown>;
    return (
      typeof r.id === 'string' &&
      typeof r.createdAt === 'number' &&
      typeof r.fromAmount === 'number' &&
      typeof r.fromCurrency === 'string' &&
      typeof r.toAmount === 'number' &&
      typeof r.toCurrency === 'string'
    );
  });
}

function loadInitial(storageKey: string): RecentConversion[] {
  const storage = getStorage();
  if (!storage) return [];
  const raw = storage.getItem(storageKey);
  if (!raw) return [];
  const parsed = safeParse(raw);
  return isRecentConversionArray(parsed) ? parsed : [];
}

function persist(storageKey: string, conversions: RecentConversion[]) {
  const storage = getStorage();

  if (!storage) return;
  try {
    storage.setItem(storageKey, JSON.stringify(conversions));
  } catch {
    // ignore storage quota / privacy mode failures
  }
}

export function useRecentConversions(options: UseRecentConversionsOptions = {}) {
  const maxItems = options.maxItems ?? DEFAULT_MAX_ITEMS;
  const storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;

  const [conversionHistory, setConversionHistory] = useState<RecentConversion[]>(() =>
    loadInitial(storageKey),
  );

  const add = useCallback(
    (input: Omit<RecentConversion, 'id' | 'createdAt'>) => {
      const next: RecentConversion = {
        ...input,
        id: createId(),
        createdAt: Date.now(),
      };

      setConversionHistory(prev => {
        const updated = [next, ...prev].slice(0, maxItems);
        persist(storageKey, updated);
        return updated;
      });
    },
    [maxItems, storageKey],
  );

  const clear = useCallback(() => {
    setConversionHistory(() => {
      persist(storageKey, []);
      return [];
    });
  }, [storageKey]);

  return { conversionHistory, add, clear, maxItems };
}
