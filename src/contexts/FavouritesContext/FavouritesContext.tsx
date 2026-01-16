import React from 'react';
import type { Context } from './FavouritesContextProvider';

export const FavouritesContext = React.createContext<Context | null>(null);

