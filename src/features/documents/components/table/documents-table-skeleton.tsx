import type { CSSProperties } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { DataTableColumn } from "./document-table-types";

const checkboxColumnWidth = 56;

type DocumentsTableSkeletonProps<TRow> = {
  columns: DataTableColumn<TRow>[];
  rows?: number;
};

export function DocumentsTableSkeleton<TRow>({
  columns,
  rows = 10,
}: DocumentsTableSkeletonProps<TRow>) {
  const tableWidth =
    checkboxColumnWidth +
    columns.reduce((total, column) => total + column.width, 0);

  return (
    <div
      aria-busy="true"
      aria-label="Carregando notas"
      className="documents-table documents-table-skeleton relative overflow-x-auto overflow-y-hidden rounded-lg border-t border-[var(--border-soft)]"
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
        <thead>
          <tr>
            <th aria-label="Selecionar" />
            {columns.map((column) => (
              <th key={column.key}>
                <Skeleton
                  className="documents-table-skeleton-heading"
                  style={
                    {
                      "--skeleton-width": `${Math.min(column.width - 32, 170)}px`,
                    } as CSSProperties
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <Skeleton className="documents-table-skeleton-check" />
              </td>
              {columns.map((column, columnIndex) => (
                <td key={column.key}>
                  <Skeleton
                    className="documents-table-skeleton-cell"
                    style={
                      {
                        "--skeleton-width": `${getCellSkeletonWidth(
                          column.width,
                          columnIndex,
                          rowIndex,
                        )}px`,
                      } as CSSProperties
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getCellSkeletonWidth(
  columnWidth: number,
  columnIndex: number,
  rowIndex: number,
) {
  const maxWidth = Math.max(columnWidth - 32, 44);
  const widthRatio = 0.56 + (((columnIndex + rowIndex) % 3) * 0.11);

  return Math.round(Math.min(maxWidth, columnWidth * widthRatio));
}
