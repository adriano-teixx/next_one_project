import { ArrowDown, ArrowUp } from "lucide-react";
import type { DocumentTableHeaderProps } from "./document-table-types";

export function DocumentTableHeader<TRow>({
  checkboxColumnWidth,
  columns,
  isAllSelected,
  isPartiallySelected,
  onSort,
  onToggleSelectAll,
  sort,
}: DocumentTableHeaderProps<TRow>) {
  return (
    <thead>
      <tr className="h-[68px] bg-[var(--surface-muted)] text-[18px] font-bold text-[var(--muted-strong)]">
        <th className="px-3" style={{ width: checkboxColumnWidth }}>
          <button
            aria-checked={isPartiallySelected ? "mixed" : Boolean(isAllSelected)}
            className="documents-row-check grid place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)]"
            data-partial={isPartiallySelected ? "true" : undefined}
            data-selected={isAllSelected ? "true" : undefined}
            onClick={onToggleSelectAll}
            role="checkbox"
            type="button"
          />
        </th>
        {columns.map((column) => (
          <th
            aria-sort={
              sort.key === column.key
                ? sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : undefined
            }
            className={column.align === "center" ? "px-3 text-center" : "px-3"}
            key={column.key}
          >
            <button
              className="documents-column-sort"
              disabled={!column.sortable}
              onClick={() => onSort(column)}
              type="button"
            >
              <span className="truncate">{column.label}</span>
              {column.sortable && sort.key === column.key ? (
                sort.direction === "asc" ? (
                  <ArrowUp size={22} />
                ) : (
                  <ArrowDown size={22} />
                )
              ) : null}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}
