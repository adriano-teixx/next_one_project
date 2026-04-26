"use client";

import { SlidersHorizontal } from "lucide-react";
import { SearchField } from "@/components/ui/search-field";
import { SelectTrigger } from "@/components/ui/select-trigger";

type DocumentSearchControlsProps = {
  filtersLabel: string;
  onOpenFilters: () => void;
  searchKind: string;
  searchPlaceholder: string;
};

export function DocumentSearchControls({
  filtersLabel,
  onOpenFilters,
  searchKind,
  searchPlaceholder,
}: DocumentSearchControlsProps) {
  return (
    <div className="documents-search-row flex gap-3">
      <SelectTrigger className="documents-search-kind">{searchKind}</SelectTrigger>
      <SearchField
        placeholder={searchPlaceholder}
        rootClassName="documents-search-input"
      />
      <button
        className="documents-filter-button flex h-[54px] shrink-0 items-center gap-3 rounded-md border border-[var(--border)] bg-[#f7f7f9] px-5 text-[20px] font-bold text-[#555b68]"
        onClick={onOpenFilters}
        type="button"
      >
        <SlidersHorizontal size={24} /> {filtersLabel}
      </button>
    </div>
  );
}
