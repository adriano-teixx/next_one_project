import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function IconButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={cn(
        "inline-grid size-10 place-items-center rounded-md border border-[var(--border)] bg-white text-[#5d6370] transition-colors hover:bg-[#f5f6f8]",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
