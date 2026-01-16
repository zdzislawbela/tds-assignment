import React from 'react';
import type { Context } from './ConversionsContextProvider';

export const ConversionsContext = React.createContext<Context | null>(null);
