"use client";

import { DocumentTabs } from "../navigation/document-tabs";
import { DocumentBulkActions } from "./document-bulk-actions";
import { DocumentPeriodSummary } from "./document-period-summary";
import { DocumentSearchControls } from "./document-search-controls";
import type { DocumentsToolbarData } from "../../types/document-page";

type DocumentsToolbarProps = {
  data: DocumentsToolbarData;
  onOpenColumns: () => void;
  onOpenFilters: () => void;
  totalDocuments: number;
  totalValue: string;
};

export function DocumentsToolbar({
  data,
  onOpenColumns,
  onOpenFilters,
  totalDocuments,
  totalValue,
}: DocumentsToolbarProps) {
  return (
    <>
      <DocumentTabs activeTab={data.tabs[0]} tabs={data.tabs} />

      <div className="documents-controls border-t border-[var(--border)] bg-white px-6 pb-0 pt-5">
        <DocumentSearchControls
          filtersLabel={data.filtersLabel}
          onOpenFilters={onOpenFilters}
          searchKind={data.searchKind}
          searchPlaceholder={data.searchPlaceholder}
        />
        <DocumentPeriodSummary
          periodLabel={data.periodLabel}
          periodValue={data.periodValue}
          totalDocuments={totalDocuments}
          totalPrefix={data.totalPrefix}
          totalSuffix={data.totalSuffix}
          totalValue={totalValue}
        />
        <DocumentBulkActions
          actions={data.actions}
          onOpenColumns={onOpenColumns}
          selectedCount={data.selectedCount}
          selectAllLabel={data.selectAllLabel}
          totalDocuments={totalDocuments}
        />
      </div>
    </>
  );
}
