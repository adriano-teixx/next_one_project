"use client";

import { DocumentTabs } from "../navigation/document-tabs";
import { DocumentBulkActions } from "./document-bulk-actions";
import { DocumentPeriodSummary } from "./document-period-summary";
import { DocumentSearchControls } from "./document-search-controls";
import type { DocumentsToolbarData } from "../../types/document-page";

type DocumentsToolbarProps = {
  activeTab: string;
  data: DocumentsToolbarData;
  onOpenColumns: () => void;
  onOpenFilters: () => void;
  onTabChange: (tab: string) => void;
  onToggleSelectAll: () => void;
  selectedCount: number;
  totalDocuments: number;
  totalValue: string;
};

export function DocumentsToolbar({
  activeTab,
  data,
  onOpenColumns,
  onOpenFilters,
  onTabChange,
  onToggleSelectAll,
  selectedCount,
  totalDocuments,
  totalValue,
}: DocumentsToolbarProps) {
  return (
    <>
      <DocumentTabs activeTab={activeTab} onTabChange={onTabChange} tabs={data.tabs} />

      <div className="documents-controls border-t border-[var(--border)] bg-[var(--surface)] px-6 pb-0 pt-5">
        <DocumentSearchControls
          filtersLabel={data.filtersLabel}
          onOpenFilters={onOpenFilters}
          searchKind={data.searchKind}
          searchKindOptions={data.searchKindOptions}
          searchPlaceholder={data.searchPlaceholder}
        />
        <DocumentPeriodSummary
          periodLabel={data.periodLabel}
          periodOptions={data.periodOptions}
          periodValue={data.periodValue}
          totalDocuments={totalDocuments}
          totalPrefix={data.totalPrefix}
          totalSuffix={data.totalSuffix}
          totalValue={totalValue}
        />
        <DocumentBulkActions
          actions={data.actions}
          onOpenColumns={onOpenColumns}
          onToggleSelectAll={onToggleSelectAll}
          selectedCount={data.selectedCount}
          selectedCountOverride={selectedCount}
          selectAllLabel={data.selectAllLabel}
          totalDocuments={totalDocuments}
        />
      </div>
    </>
  );
}
