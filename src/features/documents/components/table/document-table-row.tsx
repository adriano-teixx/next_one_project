import type { CSSProperties } from "react";
import { DocumentTableCell } from "./document-table-cell";
import type { DataTableColumn } from "./document-table-types";

type DocumentTableRowProps<TRow> = {
  columns: DataTableColumn<TRow>[];
  dispatchAction: (actionKey: string) => void;
  onToggleSelection: () => void;
  rowId: string;
  row: TRow;
  rowIndex: number;
  selected: boolean;
};

export function DocumentTableRow<TRow extends Record<string, unknown>>({
  columns,
  dispatchAction,
  onToggleSelection,
  rowId,
  row,
  rowIndex,
  selected,
}: DocumentTableRowProps<TRow>) {
  return (
    <tr
      className="documents-data-row h-[64px] border-t border-[var(--border-soft)] bg-[var(--surface)] transition-colors"
      data-row-id={rowId}
      data-selected={selected ? "true" : undefined}
      style={
        {
          "--row-index": rowIndex,
        } as CSSProperties
      }
    >
      <td className="px-3">
        <button
          aria-checked={selected}
          className="documents-row-check grid place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)]"
          onClick={onToggleSelection}
          role="checkbox"
          type="button"
        />
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
