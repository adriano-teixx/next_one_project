import {
  ChevronDown,
  Download,
  Eye,
  FileText,
  RefreshCcw,
  Tag,
} from "lucide-react";
import type { DataTableRowAction } from "../table/document-table-types";

type DocumentRowActionsProps = {
  actions: DataTableRowAction[];
  onAction: (action: DataTableRowAction) => void;
};

export function DocumentRowActions({
  actions,
  onAction,
}: DocumentRowActionsProps) {
  return (
    <div className="documents-row-actions">
      {actions.map((action) => {
        const Icon = rowActionIcons[action.icon];

        return (
          <button
            disabled={action.disabled}
            key={action.key}
            onClick={() => onAction(action)}
            type="button"
          >
            <Icon size={20} />
            {action.label}
            {action.menu ? <ChevronDown size={17} /> : null}
          </button>
        );
      })}
    </div>
  );
}

const rowActionIcons = {
  download: Download,
  eye: Eye,
  fileText: FileText,
  refresh: RefreshCcw,
  tag: Tag,
};
