import { DocumentRowActions } from "../actions/document-row-actions";
import type { DataTableRowAction } from "./document-table-types";

type DocumentTableActionsLayerProps = {
  actions: DataTableRowAction[];
  onAction: (action: DataTableRowAction) => void;
};

export function DocumentTableActionsLayer({
  actions,
  onAction,
}: DocumentTableActionsLayerProps) {
  return (
    <div className="documents-row-actions-layer">
      <DocumentRowActions actions={actions} onAction={onAction} />
    </div>
  );
}
