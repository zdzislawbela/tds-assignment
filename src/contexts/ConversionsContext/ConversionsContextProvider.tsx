import { useRecentConversions, type RecentConversion } from '@/hooks/useRecentConversions';
import React from 'react';
import { ConversionsContext } from './ConversionsContext';

interface Props {
  children: React.ReactNode;
}

export interface Context {
  conversionHistory: RecentConversion[];
  add: (input: Omit<RecentConversion, 'id' | 'createdAt'>) => void;
  clearAll: () => void;
}

export const ConversionsContextProvider = ({ children }: Props) => {
  const { conversionHistory, add, clearAll } = useRecentConversions();

  const context = {
    conversionHistory,
    add,
    clearAll,
  };

  return <ConversionsContext.Provider value={context}>{children}</ConversionsContext.Provider>;
};
