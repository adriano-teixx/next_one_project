import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  buttonLabel?: string;
  rootClassName?: string;
};

export function SearchField({
  buttonLabel = "Buscar",
  className,
  rootClassName,
  ...props
}: SearchFieldProps) {
  return (
    <div className={cn("ui-search-field", rootClassName)}>
      <input className={cn("ui-search-field__input", className)} {...props} />
      <button
        aria-label={buttonLabel}
        className="ui-search-field__button"
        type="button"
      >
        <Search size={24} />
      </button>
    </div>
  );
}
