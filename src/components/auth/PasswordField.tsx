"use client";

import { useId, useState } from "react";
import EyeIcon from "@/components/icons/icon-eye.svg";
import EyeOffIcon from "@/components/icons/icon-eye-off.svg";
import { cn } from "@/lib/cn";

type PasswordFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function PasswordField({ label, error, className, id, ref, ...props }: PasswordFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label htmlFor={inputId} className="flex h-5 items-center text-label-13 text-gray-10">
        {label}
      </label>
      <div
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-gray-70 bg-white p-4 focus-within:border-primary-50",
          error && "border-error-20 focus-within:border-error-20"
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "flex-1 bg-transparent text-body-17 text-black placeholder:text-gray-50 focus:outline-none",
            className
          )}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          onClick={() => setVisible((v) => !v)}
          className="ml-2 flex shrink-0 cursor-pointer items-center justify-center text-gray-50"
        >
          {visible ? <EyeIcon className="size-6" /> : <EyeOffIcon className="size-6" />}
        </button>
      </div>
      {error && (
        <p id={errorId} className="flex h-5 items-center text-label-13 text-error-20">
          {error}
        </p>
      )}
    </div>
  );
}
