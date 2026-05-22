import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg py-4 text-label-emphasis-17 transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-50 text-white hover:bg-primary-40 active:bg-primary-30 disabled:bg-gray-80 disabled:text-gray-30",
        secondary:
          "border border-gray-70 bg-white text-gray-20 hover:bg-gray-90 active:bg-gray-80 disabled:border-transparent disabled:bg-gray-80 disabled:text-gray-30",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
