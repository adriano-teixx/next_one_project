import type { ReactNode } from "react";
import type { DataTableColumn } from "./document-table-types";

type DocumentTableCellProps<TRow> = {
  column: DataTableColumn<TRow>;
  dispatchAction: (actionKey: string) => void;
  row: TRow;
};

export function DocumentTableCell<TRow extends Record<string, unknown>>({
  column,
  dispatchAction,
  row,
}: DocumentTableCellProps<TRow>): ReactNode {
  return column.renderCell?.(row, { dispatchAction }) ?? String(row[column.key] ?? "");
}
