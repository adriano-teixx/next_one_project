import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export type DocumentTableSort = {
  direction: SortDirection;
  key: string;
};

export type DataTableColumn<TRow> = {
  align?: "center";
  key: string;
  label: string;
  renderCell?: (row: TRow, context: DataTableCellContext) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: TRow) => string;
  width: number;
};

export type DataTableCellContext = {
  dispatchAction: (actionKey: string) => void;
};

export type DataTableRowAction = {
  disabled?: boolean;
  icon: "download" | "eye" | "fileText" | "refresh" | "tag";
  key: string;
  label: string;
  menu?: boolean;
};

export type DocumentTableHeaderProps<TRow> = {
  checkboxColumnWidth: number;
  columns: DataTableColumn<TRow>[];
  onSort: (column: DataTableColumn<TRow>) => void;
  sort: DocumentTableSort;
};
