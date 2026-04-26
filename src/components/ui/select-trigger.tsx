import { ChevronDown } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SelectTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SelectTrigger({
  children,
  className,
  ...props
}: SelectTriggerProps) {
  return (
    <button
      className={cn("ui-select-trigger", className)}
      type="button"
      {...props}
    >
      {children}
      <ChevronDown aria-hidden size={20} />
    </button>
  );
}
