import { CurrencyConverter } from './components/CurrencyConverter';
import { ErrorBar } from './components/ErrorBar';
import { Favourites } from './components/Favourites';
import { RecentConversions } from './components/RecentConversions';
import { ConversionsContextProvider } from './contexts/ConversionsContext';
import { CurrencyContextProvider } from './contexts/CurrencyContext';
import { FavouritesContextProvider } from './contexts/FavouritesContext';

export function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-slate-950 p-4 text-gray-100">
      <CurrencyContextProvider>
        <ErrorBar />
        <ConversionsContextProvider>
          <FavouritesContextProvider>
            <CurrencyConverter />
            <RecentConversions />
            <Favourites />
          </FavouritesContextProvider>
        </ConversionsContextProvider>
      </CurrencyContextProvider>
    </div>
  );
}
