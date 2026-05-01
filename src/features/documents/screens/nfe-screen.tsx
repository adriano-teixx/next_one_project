"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AppRoutes } from "@/config/app-routes";
import { ColumnsModal } from "../components/columns/columns-modal";
import { CompanySelector } from "../components/company/company-selector";
import { DocumentPreviewModal } from "../components/document-preview-modal";
import { DocumentsEmptyHint } from "../components/feedback/documents-empty-hint";
import { DocumentsFooter } from "../components/feedback/documents-footer";
import { FilterDrawer } from "../components/filters/filter-drawer";
import { DocumentPageTitle } from "../components/page/document-page-title";
import { DocumentsTable } from "../components/table/documents-table";
import { DocumentsTableSkeleton } from "../components/table/documents-table-skeleton";
import { DocumentsToolbar } from "../components/toolbar/documents-toolbar";
import {
  columnsModalData,
  documentsEmptyHintData,
  documentsFooterCopy,
  documentsPageData,
  documentsToolbarData,
} from "../config/document-page-config";
import {
  nfeInitialTableSort,
  nfeRowActions,
  nfeTableColumns,
} from "../adapters/nfe-table-adapter";
import type { DataTableRowAction } from "../components/table/document-table-types";
import type { DocumentPurpose, DocumentRow } from "../types/document";
import { useDocumentsQuery } from "../hooks/use-documents-query";
import { useNfePageData } from "../hooks/use-nfe-page-data";

type ActiveOverlay = "columns" | "filters" | "document" | null;

export function NfeScreen() {
  const [activeTab, setActiveTab] = useState(documentsToolbarData.tabs[0]);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState(() =>
    nfeTableColumns.map((column) => column.key)
  );
  const [isAllCurrentPurposeSelected, setAllCurrentPurposeSelected] =
    useState(false);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const { companySelectorData, documentPreviewData, filterDrawerData } =
    useNfePageData();
  const activePurpose = getPurposeByTab(activeTab);
  const documentsQuery = useDocumentsQuery({
    page: 1,
    pageSize: 25,
    purpose: activePurpose,
  });
  const documents = documentsQuery.data?.items ?? [];
  const visibleDocumentIds = documents.map((document) => document.number);
  const resolvedSelectedDocumentIds = isAllCurrentPurposeSelected
    ? visibleDocumentIds
    : selectedDocumentIds;
  const totalDocuments = documentsQuery.data?.total ?? 0;
  const totalValue = documentsQuery.data?.totalValue ?? "R$ 0,00";
  const visibleColumns = visibleColumnKeys
    .map((columnKey) =>
      nfeTableColumns.find((column) => column.key === columnKey)
    )
    .filter((column): column is (typeof nfeTableColumns)[number] =>
      Boolean(column)
    );

  function handleRowAction(action: DataTableRowAction, row: DocumentRow) {
    if (action.key === "view") {
      void row;
      setActiveOverlay("document");
    }
  }

  function toggleSelectAllDocuments() {
    setAllCurrentPurposeSelected((isSelected) => {
      const nextSelectedState = !isSelected;
      setSelectedDocumentIds(nextSelectedState ? visibleDocumentIds : []);
      return nextSelectedState;
    });
  }

  function handleSelectionChange(nextSelectedDocumentIds: string[]) {
    setAllCurrentPurposeSelected(false);
    setSelectedDocumentIds(nextSelectedDocumentIds);
  }

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setAllCurrentPurposeSelected(false);
    setSelectedDocumentIds([]);
  }

  return (
    <AppShell>
      <main className="app-content overflow-hidden">
        <div className="mx-auto w-full max-w-none">
          <DocumentPageTitle
            breadcrumbItems={[
              { href: AppRoutes.home, label: "Home" },
              { label: "Documentos" },
              { label: "NF-e" },
            ]}
            title={documentsPageData.title}
          />

          <CompanySelector data={companySelectorData} showPicker={false} />

          <section className="documents-panel mt-6 overflow-hidden rounded-lg border border-[var(--border)]">
            <DocumentsToolbar
              activeTab={activeTab}
              data={documentsToolbarData}
              onOpenColumns={() => setActiveOverlay("columns")}
              onOpenFilters={() => setActiveOverlay("filters")}
              onTabChange={handleTabChange}
              onToggleSelectAll={toggleSelectAllDocuments}
              selectedCount={
                isAllCurrentPurposeSelected
                  ? totalDocuments
                  : selectedDocumentIds.length
              }
              totalDocuments={totalDocuments}
              totalValue={totalValue}
            />
            {documentsQuery.isLoading ? (
              <DocumentsTableSkeleton columns={visibleColumns} rows={25} />
            ) : (
              <DocumentsTable
                columns={visibleColumns}
                getRowId={(row) => row.number}
                initialSort={nfeInitialTableSort}
                onSelectionChange={handleSelectionChange}
                onRowAction={handleRowAction}
                rowActions={nfeRowActions}
                rows={documents}
                selectedRowIds={resolvedSelectedDocumentIds}
              />
            )}
            <DocumentsEmptyHint data={documentsEmptyHintData} />
          </section>

          <DocumentsFooter
            data={{
              ...documentsFooterCopy,
              pageSize: documentsQuery.data?.pageSize ?? 25,
              rangeEnd: documents.length,
              rangeStart: 1,
              total: totalDocuments,
            }}
          />
        </div>
      </main>

      {activeOverlay === "columns" ? (
        <ColumnsModal
          columns={nfeTableColumns.map((column) => ({
            key: column.key,
            label: column.label,
          }))}
          data={columnsModalData}
          onApply={(nextVisibleColumnKeys) => {
            setVisibleColumnKeys(nextVisibleColumnKeys);
            setActiveOverlay(null);
          }}
          onClose={() => setActiveOverlay(null)}
          selectedColumnKeys={visibleColumnKeys}
        />
      ) : null}
      {activeOverlay === "filters" ? (
        <FilterDrawer
          data={filterDrawerData}
          onClose={() => setActiveOverlay(null)}
        />
      ) : null}
      {activeOverlay === "document" ? (
        <DocumentPreviewModal
          onClose={() => setActiveOverlay(null)}
          preview={documentPreviewData}
        />
      ) : null}
    </AppShell>
  );
}

function getPurposeByTab(tab: string): DocumentPurpose {
  const purposeByTab: Record<string, DocumentPurpose> = {
    Citadas: "citadas",
    Emitidas: "emitidas",
    Recebidas: "recebidas",
    Transporte: "transporte",
  };

  return purposeByTab[tab] ?? "recebidas";
}
