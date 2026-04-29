import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("ui-skeleton", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}
