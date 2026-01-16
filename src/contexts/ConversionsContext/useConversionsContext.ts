import React from 'react';
import { ConversionsContext } from './ConversionsContext';

export const useConversionsContext = () => {
  const context = React.useContext(ConversionsContext);

  if (!context) {
    throw new Error('Context used ofside of scope');
  }
  return context;
};
