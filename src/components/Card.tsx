import { cn } from '@/utils/cn';

interface Props {
  title?: string;
  isExpanded?: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Card = ({
  children,
  title,
  isExpanded = true,
  setIsExpanded,
}: React.PropsWithChildren<Props>) => {
  const handleClick = () => {
    setIsExpanded?.(!isExpanded);
  };
  return (
    <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className={cn('flex w-full justify-between overflow-hidden')}>
        {title && <h1 className="mb-6 text-center text-2xl font-semibold text-white">{title}</h1>}
        <button onClick={handleClick}>{isExpanded ? 'Close' : 'Open'}</button>
      </div>
      <div
        className={cn(
          'max-h-[1000px] scale-100 overflow-hidden opacity-100 transition-all duration-300 ease-in-out',
          {
            'pointer-events-none max-h-0 scale-95 opacity-0': !isExpanded,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
