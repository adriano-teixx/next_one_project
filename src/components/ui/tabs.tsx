import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TabsProps<T extends string> = {
  activeItem: T;
  className?: string;
  items: T[];
  onChange?: (item: T) => void;
};

export function Tabs<T extends string>({
  activeItem,
  className,
  items,
  onChange,
}: TabsProps<T>) {
  return (
    <div className={cn("ui-tabs", className)} role="tablist">
      {items.map((item) => (
        <button
          aria-selected={item === activeItem}
          className="ui-tabs__trigger"
          key={item}
          onClick={() => onChange?.(item)}
          role="tab"
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export type InlineActionProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function InlineAction({
  children,
  className,
  disabled,
  onClick,
}: InlineActionProps) {
  return (
    <button
      className={cn("ui-inline-action", className)}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
