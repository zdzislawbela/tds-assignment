import { useFavourites, type FavouritePair } from '@/hooks/useFavourites';
import React from 'react';
import { FavouritesContext } from './FavouritesContext';

interface Props {
  children: React.ReactNode;
}

export interface Context {
  favourites: FavouritePair[];
  add: (fromCurrency: string, toCurrency: string) => void;
  remove: (fromCurrency: string, toCurrency: string) => void;
  toggle: (fromCurrency: string, toCurrency: string) => void;
  clearAll: () => void;
  isFavourite: (fromCurrency: string, toCurrency: string) => boolean;
}

export const FavouritesContextProvider = ({ children }: Props) => {
  const { favourites, add, remove, toggle, clearAll, isFavourite } = useFavourites();

  const context = {
    favourites,
    add,
    remove,
    toggle,
    clearAll,
    isFavourite,
  };

  return <FavouritesContext.Provider value={context}>{children}</FavouritesContext.Provider>;
};

