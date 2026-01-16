import React from 'react';
import { CurrencyContext } from './CurrencyContext';

export const useCurrencyContext = () => {
  const context = React.useContext(CurrencyContext);

  if (!context) {
    throw new Error('Context used ofside of scope');
  }
  return context;
};
