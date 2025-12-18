export const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      {children}
    </div>
  );
};
