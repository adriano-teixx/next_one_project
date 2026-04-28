"use client";

import {
  ChevronDown,
  Download,
  Eye,
  FileText,
  RefreshCcw,
  Tag,
} from "lucide-react";
import { useState } from "react";
import type { DataTableRowAction } from "../table/document-table-types";

type DocumentRowActionsProps = {
  actions: DataTableRowAction[];
  onAction: (action: DataTableRowAction) => void;
};

export function DocumentRowActions({
  actions,
  onAction,
}: DocumentRowActionsProps) {
  const [openActionKey, setOpenActionKey] = useState<string | null>(null);

  return (
    <div className="documents-row-actions">
      {actions.map((action) => {
        const Icon = rowActionIcons[action.icon];
        const isOpen = openActionKey === action.key;

        return (
          <div className="documents-row-action-wrap" key={action.key}>
            <button
              data-active={isOpen ? "true" : undefined}
              disabled={action.disabled}
              onClick={() => {
                if (action.menu) {
                  setOpenActionKey((current) =>
                    current === action.key ? null : action.key,
                  );
                  return;
                }

                onAction(action);
              }}
              type="button"
            >
              <Icon size={20} />
              {action.label}
              {action.menu ? <ChevronDown size={17} /> : null}
            </button>
            {isOpen && action.menuItems?.length ? (
              <div className="documents-row-action-menu">
                {action.menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setOpenActionKey(null);
                      onAction({ ...action, key: `${action.key}:${item}` });
                    }}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
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
