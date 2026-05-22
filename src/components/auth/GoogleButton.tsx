import GoogleIcon from "@/components/icons/icon-google_Icon.svg";
import { cn } from "@/lib/cn";

type GoogleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>;
};

export function GoogleButton({
  className,
  type = "button",
  children = "Google 계정으로 로그인",
  ref,
  ...props
}: GoogleButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-gray-70 bg-white px-4 py-3 text-label-emphasis-17 text-gray-10 hover:bg-gray-90 active:bg-gray-80",
        className
      )}
      {...props}
    >
      <GoogleIcon className="size-6 shrink-0" />
      {children}
    </button>
  );
}
