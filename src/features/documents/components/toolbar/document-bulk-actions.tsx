"use client";

import {
  ChevronDown,
  Columns3,
  Download,
  FileSearch,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { InlineAction } from "@/components/ui/tabs";
import type { DocumentsToolbarAction } from "../../types/document-page";

type DocumentBulkActionsProps = {
  actions: DocumentsToolbarAction[];
  onOpenColumns: () => void;
  onToggleSelectAll: () => void;
  selectedCount: number;
  selectedCountOverride?: number;
  selectAllLabel: string;
  totalDocuments: number;
};

export function DocumentBulkActions({
  actions,
  onOpenColumns,
  onToggleSelectAll,
  selectedCount,
  selectedCountOverride,
  selectAllLabel,
  totalDocuments,
}: DocumentBulkActionsProps) {
  const resolvedSelectedCount = selectedCountOverride ?? selectedCount;

  return (
    <div className="documents-actions flex h-[103px] items-end gap-7 overflow-hidden pb-4 text-[20px] font-bold text-[#606672]">
      <button
        className="documents-select-all flex h-[45px] shrink-0 items-center gap-3 rounded-lg border border-[var(--border)] bg-[#f7f7f9] px-4"
        data-active={resolvedSelectedCount > 0 ? "true" : undefined}
        onClick={onToggleSelectAll}
        type="button"
      >
        {selectAllLabel}
        <span className="rounded-full bg-[#e7e9ed] px-3 py-1">
          {resolvedSelectedCount} / {totalDocuments.toLocaleString("pt-BR")}
        </span>
      </button>
      {actions.map((action) => (
        <ToolbarActionButton
          action={action}
          isSelectionActive={resolvedSelectedCount > 0}
          key={action.key}
          onOpenColumns={onOpenColumns}
        />
      ))}
    </div>
  );
}

function ToolbarActionButton({
  action,
  isSelectionActive,
  onOpenColumns,
}: {
  action: DocumentsToolbarAction;
  isSelectionActive: boolean;
  onOpenColumns: () => void;
}) {
  const Icon = toolbarActionIcons[action.icon];
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = action.key !== "columns" && action.disabled && !isSelectionActive;

  return (
    <div className="documents-toolbar-action-wrap">
      <InlineAction
        disabled={isDisabled}
        onClick={
          action.key === "columns"
            ? onOpenColumns
            : action.menu
              ? () => setIsOpen((current) => !current)
              : undefined
        }
      >
        <Icon size={22} />
        {action.label}
        {action.menu ? <ChevronDown size={16} /> : null}
      </InlineAction>
      {isOpen && action.menuItems?.length ? (
        <div className="documents-toolbar-menu">
          {action.menuItems.map((item) => (
            <button key={item} type="button">
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const toolbarActionIcons = {
  columns: Columns3,
  download: Download,
  fileSearch: FileSearch,
  tag: Tag,
};
