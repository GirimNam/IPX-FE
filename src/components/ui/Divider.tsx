type DividerProps = {
  children?: React.ReactNode;
};

export function Divider({ children }: DividerProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <hr className="h-px flex-1 border-0 bg-gray-70" />
      {children && <span className="text-label-15 text-gray-50">{children}</span>}
      <hr className="h-px flex-1 border-0 bg-gray-70" />
    </div>
  );
}
