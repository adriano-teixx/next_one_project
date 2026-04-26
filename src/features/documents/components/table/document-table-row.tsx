import type { CSSProperties } from "react";
import { DocumentTableCell } from "./document-table-cell";
import type { DataTableColumn } from "./document-table-types";

type DocumentTableRowProps<TRow> = {
  columns: DataTableColumn<TRow>[];
  dispatchAction: (actionKey: string) => void;
  rowId: string;
  row: TRow;
  rowIndex: number;
};

export function DocumentTableRow<TRow extends Record<string, unknown>>({
  columns,
  dispatchAction,
  rowId,
  row,
  rowIndex,
}: DocumentTableRowProps<TRow>) {
  return (
    <tr
      className="documents-data-row h-[64px] border-t border-[var(--border-soft)] bg-white transition-colors"
      data-row-id={rowId}
      style={
        {
          "--row-index": rowIndex,
        } as CSSProperties
      }
    >
      <td className="px-3">
        <span className="documents-row-check block size-[23px] rounded-md border border-[var(--border)] bg-white" />
      </td>
      {columns.map((column) => (
        <td
          className={column.align === "center" ? "px-3 text-center" : "truncate px-3"}
          key={column.key}
        >
          <DocumentTableCell
            column={column}
            dispatchAction={dispatchAction}
            row={row}
          />
        </td>
      ))}
    </tr>
  );
}
