export const Loader = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span
        className="inline-block h-4 w-4 rounded-full border-2 border-slate-300 border-t-slate-900 animate-spin"
        aria-hidden="true"
      />
      <span>Loading...</span>
    </div>
  );
};
