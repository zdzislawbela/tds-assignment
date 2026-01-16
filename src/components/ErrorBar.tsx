import { useCurrencyContext } from '@/contexts/CurrencyContext';

export const ErrorBar = () => {
  const { currenciesError } = useCurrencyContext();

  if (currenciesError) {
    return (
      <div className="fixed top-0 m-4 w-full animate-pulse rounded-lg bg-red-500/10 p-3 text-center text-red-300">
        {currenciesError.message}
      </div>
    );
  }

  return null;
};
