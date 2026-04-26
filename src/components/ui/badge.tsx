import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant = "success" | "neutral" | "teal" | "pink" | "orange";

const variants: Record<BadgeVariant, string> = {
  success: "bg-[var(--success-bg)] text-[var(--success-fg)]",
  neutral: "bg-[#e7e9ed] text-[#4f5562]",
  teal: "bg-[#40c9b7] text-[#184e4b]",
  pink: "bg-[#f92884] text-white",
  orange: "bg-[#f79919] text-[#513414]",
};

export function Badge({
  children,
  className,
  variant = "neutral",
}: {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={cn(
        "status-badge inline-flex h-7 items-center rounded-[5px] px-3 text-[15px] font-bold uppercase leading-none",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
