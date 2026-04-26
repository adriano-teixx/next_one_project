import {
  ChevronDown,
  Columns3,
  Download,
  FileSearch,
  Tag,
} from "lucide-react";
import { InlineAction } from "@/components/ui/tabs";
import type { DocumentsToolbarAction } from "../../types/document-page";

type DocumentBulkActionsProps = {
  actions: DocumentsToolbarAction[];
  onOpenColumns: () => void;
  selectedCount: number;
  selectAllLabel: string;
  totalDocuments: number;
};

export function DocumentBulkActions({
  actions,
  onOpenColumns,
  selectedCount,
  selectAllLabel,
  totalDocuments,
}: DocumentBulkActionsProps) {
  return (
    <div className="documents-actions flex h-[103px] items-end gap-7 overflow-hidden pb-4 text-[20px] font-bold text-[#606672]">
      <button
        className="documents-select-all flex h-[45px] shrink-0 items-center gap-3 rounded-lg border border-[var(--border)] bg-[#f7f7f9] px-4"
        type="button"
      >
        {selectAllLabel}
        <span className="rounded-full bg-[#e7e9ed] px-3 py-1">
          {selectedCount} / {totalDocuments.toLocaleString("pt-BR")}
        </span>
      </button>
      {actions.map((action) => (
        <ToolbarActionButton
          action={action}
          key={action.key}
          onOpenColumns={onOpenColumns}
        />
      ))}
    </div>
  );
}

function ToolbarActionButton({
  action,
  onOpenColumns,
}: {
  action: DocumentsToolbarAction;
  onOpenColumns: () => void;
}) {
  const Icon = toolbarActionIcons[action.icon];

  return (
    <InlineAction
      disabled={action.disabled}
      onClick={action.key === "columns" ? onOpenColumns : undefined}
    >
      <Icon size={22} />
      {action.label}
      {action.menu ? <ChevronDown size={16} /> : null}
    </InlineAction>
  );
}

const toolbarActionIcons = {
  columns: Columns3,
  download: Download,
  fileSearch: FileSearch,
  tag: Tag,
};
