import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex h-11 min-w-[112px] items-center justify-center gap-2 rounded-lg border border-transparent px-5 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-95 focus-visible:outline-[var(--primary)]",
        secondary:
          "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-slate-50 focus-visible:outline-[var(--border)]",
        ghost:
          "bg-transparent text-[var(--muted-strong)] hover:bg-[var(--surface-control-hover)] focus-visible:outline-[var(--border)]",
      },
      size: {
        sm: "h-9 min-w-20 rounded-md px-3 text-sm",
        md: "h-11 min-w-[112px] rounded-lg px-5 text-base",
        lg: "h-12 min-w-[128px] rounded-lg px-6 text-lg",
        icon: "size-10 min-w-0 rounded-lg px-0",
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
