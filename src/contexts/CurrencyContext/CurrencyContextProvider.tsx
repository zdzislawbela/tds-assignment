import { useCurrencies } from '@/hooks/useCurrencies';
import type { Currency } from '@/types';
import React from 'react';
import { CurrencyContext } from './CurrencyContext';

interface Props {
  children: React.ReactNode;
}

export interface Context {
  currencies: Currency[];
  loadingCurrencies: boolean;
  currenciesError: Error | null;
}

export const CurrencyContextProvider = ({ children }: Props) => {
  const {
    data: currencies = [],
    isLoading: loadingCurrencies,
    error: currenciesError,
  } = useCurrencies();

  const context = {
    currencies,
    loadingCurrencies,
    currenciesError,
  };

  return <CurrencyContext.Provider value={context}>{children}</CurrencyContext.Provider>;
};
