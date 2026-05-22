"use client";

import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type CellProps = {
  value: string;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  ref: React.Ref<HTMLInputElement>;
};

function Cell({ value, error, ref, ...handlers }: CellProps) {
  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      className={cn(
        "h-20.5 w-[73.333px] rounded-md border-[1.5px] border-gray-80 bg-gray-100 text-center text-headline-emphasis-32 text-black focus:outline-none",
        error && "border-error-20"
      )}
      {...handlers}
    />
  );
}

type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
  autoFocus?: boolean;
};

export function CodeInput({ value, onChange, length = 6, error, autoFocus }: CodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = value.padEnd(length, " ").split("");
    arr[i] = digit || " ";
    onChange(arr.join("").trimEnd());
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <Cell
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={value[i] ?? ""}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
          autoFocus={autoFocus && i === 0}
          error={error}
        />
      ))}
    </div>
  );
}
