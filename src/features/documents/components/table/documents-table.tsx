"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { DocumentTableActionsLayer } from "./document-table-actions-layer";
import { DocumentTableHeader } from "./document-table-header";
import { DocumentTableRow } from "./document-table-row";
import type {
  DataTableColumn,
  DataTableRowAction,
  DocumentTableSort,
} from "./document-table-types";
import { useDocumentTableHoverActions } from "./use-document-table-hover-actions";

const checkboxColumnWidth = 56;

type DocumentsTableProps<TRow> = {
  columns: DataTableColumn<TRow>[];
  getRowId: (row: TRow) => string;
  initialSort: DocumentTableSort;
  onRowAction: (action: DataTableRowAction, row: TRow) => void;
  onSelectionChange?: (selectedRowIds: string[]) => void;
  rowActions: DataTableRowAction[];
  rows: TRow[];
  selectedRowIds?: string[];
};

export function DocumentsTable<TRow extends Record<string, unknown>>({
  columns,
  getRowId,
  initialSort,
  onRowAction,
  onSelectionChange,
  rowActions,
  rows,
  selectedRowIds = [],
}: DocumentsTableProps<TRow>) {
  const { activeRowId, scrollMetrics, syncScrollMetrics, tableContainerRef } =
    useDocumentTableHoverActions();
  const [sort, setSort] = useState<DocumentTableSort>(initialSort);
  const selectedRowIdSet = useMemo(
    () => new Set(selectedRowIds),
    [selectedRowIds],
  );
  const tableWidth =
    checkboxColumnWidth +
    columns.reduce((total, column) => total + column.width, 0);

  const sortedRows = useMemo(() => {
    const rowsToSort = [...rows];
    const direction = sort.direction === "asc" ? 1 : -1;

    return rowsToSort.sort((rowA, rowB) => {
      const column = columns.find((item) => item.key === sort.key);
      const valueA = getSortValue(rowA, sort.key, column);
      const valueB = getSortValue(rowB, sort.key, column);

      return valueA.localeCompare(valueB, "pt-BR", { numeric: true }) * direction;
    });
  }, [columns, rows, sort]);

  function toggleSort(column: DataTableColumn<TRow>) {
    if (!column.sortable) {
      return;
    }

    setSort((currentSort) => ({
      direction:
        currentSort.key === column.key && currentSort.direction === "desc"
          ? "asc"
          : "desc",
      key: column.key,
    }));
  }

  const activeRow = useMemo(
    () => sortedRows.find((row) => getRowId(row) === activeRowId) ?? null,
    [activeRowId, getRowId, sortedRows],
  );

  function dispatchAction(actionKey: string, row: TRow) {
    const action = rowActions.find((item) => item.key === actionKey);

    if (action) {
      onRowAction(action, row);
    }
  }

  function dispatchActiveRowAction(action: DataTableRowAction) {
    if (activeRow) {
      onRowAction(action, activeRow);
    }
  }

  function toggleRowSelection(rowId: string) {
    const nextSelected = new Set(selectedRowIdSet);

    if (nextSelected.has(rowId)) {
      nextSelected.delete(rowId);
    } else {
      nextSelected.add(rowId);
    }

    onSelectionChange?.([...nextSelected]);
  }

  function toggleVisibleRowsSelection() {
    const visibleRowIds = sortedRows.map((row) => getRowId(row));
    const hasSelectedEveryVisibleRow = visibleRowIds.every((rowId) =>
      selectedRowIdSet.has(rowId),
    );
    const nextSelected = new Set(selectedRowIdSet);

    visibleRowIds.forEach((rowId) => {
      if (hasSelectedEveryVisibleRow) {
        nextSelected.delete(rowId);
      } else {
        nextSelected.add(rowId);
      }
    });

    onSelectionChange?.([...nextSelected]);
  }

  const isAllVisibleRowsSelected =
    sortedRows.length > 0 &&
    sortedRows.every((row) => selectedRowIdSet.has(getRowId(row)));
  const isPartiallySelected =
    !isAllVisibleRowsSelected &&
    sortedRows.some((row) => selectedRowIdSet.has(getRowId(row)));

  return (
    <div
      className="documents-table relative overflow-x-auto overflow-y-hidden rounded-lg border-t border-[var(--border-soft)]"
      onScroll={syncScrollMetrics}
      ref={tableContainerRef}
      style={
        {
          "--dt-client-width": `${scrollMetrics.clientWidth}px`,
          "--dt-scroll-left": `${scrollMetrics.scrollLeft}px`,
        } as CSSProperties
      }
    >
      <table
        className="table-fixed border-collapse text-left"
        style={{ minWidth: tableWidth, width: tableWidth }}
      >
        <colgroup>
          <col style={{ width: checkboxColumnWidth }} />
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>
        <DocumentTableHeader
          checkboxColumnWidth={checkboxColumnWidth}
          columns={columns}
          isAllSelected={isAllVisibleRowsSelected}
          isPartiallySelected={isPartiallySelected}
          onSort={toggleSort}
          onToggleSelectAll={toggleVisibleRowsSelection}
          sort={sort}
        />
        <tbody className="text-[19px] text-[#5d6473]">
          {sortedRows.map((row, rowIndex) => (
            <DocumentTableRow
              columns={columns}
              dispatchAction={(actionKey) => dispatchAction(actionKey, row)}
              key={getRowId(row)}
              onToggleSelection={() => toggleRowSelection(getRowId(row))}
              row={row}
              rowId={getRowId(row)}
              rowIndex={rowIndex}
              selected={selectedRowIdSet.has(getRowId(row))}
            />
          ))}
        </tbody>
      </table>
      <DocumentTableActionsLayer
        actions={rowActions}
        onAction={dispatchActiveRowAction}
      />
    </div>
  );
}

function getSortValue<TRow extends Record<string, unknown>>(
  row: TRow,
  key: string,
  column?: DataTableColumn<TRow>,
) {
  return column?.sortValue?.(row) ?? String(row[key] ?? "");
}
