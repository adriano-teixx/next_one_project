import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "relative inline-flex min-h-[32px] select-none items-center justify-center gap-2 rounded-lg border border-transparent px-3 py-1 text-sm font-semibold leading-5 transition-colors [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[rgba(12,60,247,1)] text-white hover:bg-[#0a2fbf] active:bg-[rgba(12,60,247,1)] focus-visible:outline-[rgba(12,60,247,1)]",
        secondary:
          "bg-transparent text-[rgba(4,14,35,0.64)] hover:bg-[#e9eaec] active:bg-[rgba(0,0,0,0)] focus-visible:outline-[var(--border)]",
        ghost:
          "bg-transparent text-[rgba(4,14,35,0.64)] hover:bg-[#e9eaec] active:bg-[rgba(0,0,0,0)] focus-visible:outline-[var(--border)]",
      },
      size: {
        sm: "min-h-[32px] px-3 py-1 text-sm",
        md: "min-h-[32px] px-3 py-1 text-sm",
        lg: "min-h-[32px] px-3 py-1 text-sm",
        icon: "size-8 min-h-0 px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
