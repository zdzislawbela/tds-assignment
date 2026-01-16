import React from 'react';
import { FavouritesContext } from './FavouritesContext';

export const useFavouritesContext = () => {
  const context = React.useContext(FavouritesContext);

  if (!context) {
    throw new Error('Context used ofside of scope');
  }

  return context;
};

