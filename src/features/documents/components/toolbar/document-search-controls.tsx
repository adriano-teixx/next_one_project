"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { SearchField } from "@/components/ui/search-field";
import { SelectTrigger } from "@/components/ui/select-trigger";

type DocumentSearchControlsProps = {
  filtersLabel: string;
  onOpenFilters: () => void;
  searchKind: string;
  searchKindOptions: string[];
  searchPlaceholder: string;
};

export function DocumentSearchControls({
  filtersLabel,
  onOpenFilters,
  searchKind,
  searchKindOptions,
  searchPlaceholder,
}: DocumentSearchControlsProps) {
  const [isSearchKindOpen, setSearchKindOpen] = useState(false);
  const [selectedSearchKind, setSelectedSearchKind] = useState(searchKind);

  return (
    <div className="documents-search-row flex gap-3">
      <div className="documents-search-combo">
        <div className="documents-search-kind-wrap">
          <SelectTrigger
            aria-expanded={isSearchKindOpen}
            className="documents-search-kind"
            onClick={() => setSearchKindOpen((isOpen) => !isOpen)}
          >
            {selectedSearchKind}
          </SelectTrigger>
          {isSearchKindOpen ? (
            <div className="documents-search-kind-menu">
              {searchKindOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedSearchKind(option);
                    setSearchKindOpen(false);
                  }}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <SearchField
          placeholder={searchPlaceholder}
          rootClassName="documents-search-input"
        />
      </div>
      <button
        className="documents-filter-button flex h-[54px] shrink-0 items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-5 text-[20px] font-bold text-[var(--muted)]"
        onClick={onOpenFilters}
        type="button"
      >
        <SlidersHorizontal size={24} /> {filtersLabel}
      </button>
    </div>
  );
}
