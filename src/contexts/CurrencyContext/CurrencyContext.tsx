import React from 'react';
import type { Context } from './CurrencyContextProvider';

export const CurrencyContext = React.createContext<Context | null>(null);
