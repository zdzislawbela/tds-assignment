import { CurrencyConverter } from './components/CurrencyConverter';
import { ErrorBar } from './components/ErrorBar';
import { RecentConversions } from './components/RecentConversions';
import { ConversionsContextProvider } from './contexts/ConversionsContext';
import { CurrencyContextProvider } from './contexts/CurrencyContext';

export function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-slate-950 p-4 text-gray-100">
      <CurrencyContextProvider>
        <ErrorBar />
        <ConversionsContextProvider>
          <CurrencyConverter />
          <RecentConversions />
        </ConversionsContextProvider>
      </CurrencyContextProvider>
    </div>
  );
}
