"use client";

import { CalendarDays, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilterDrawerData } from "../../types/document-page";

type FilterDrawerProps = {
  data: FilterDrawerData;
  onClose: () => void;
};

export function FilterDrawer({ data, onClose }: FilterDrawerProps) {
  return (
    <div className="documents-modal-backdrop fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-[2px]">
      <aside className="documents-filter-drawer ml-auto flex h-full flex-col rounded-l-xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)]">
        <header className="documents-drawer-header flex items-center border-b border-[var(--border)]">
          <h2 className="documents-drawer-title font-bold">{data.title}</h2>
          <button className="documents-modal-close ml-auto text-[#6d7280]" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </header>

        <div className="documents-filter-grid grid grid-cols-2">
          {data.fieldGroups.map((row) =>
            row.map((field) => (
              <label
                className={row.length === 1 ? "col-span-2" : ""}
                key={field.label}
              >
                <span className="documents-filter-label block font-bold text-[#555b68]">
                  {field.label}
                </span>
                <span className="documents-filter-field flex items-center rounded-md border border-[var(--border)] bg-white text-[#8a8f9a] shadow-sm">
                  {field.input === "date" ? "" : data.selectPlaceholder}
                  {field.input === "date" ? (
                    <CalendarDays className="ml-auto" size={18} />
                  ) : (
                    <span className="ml-auto">⌄</span>
                  )}
                </span>
              </label>
            ))
          )}
        </div>

        <footer className="documents-drawer-footer mt-auto flex items-center justify-end border-t border-[var(--border)]">
          <button
            className="documents-filter-clear flex items-center gap-2 font-medium text-[#555b68]"
            type="button"
          >
            <Trash2 size={15} /> {data.clearLabel}
          </button>
          <Button disabled size="sm" type="button">
            {data.applyLabel}
          </Button>
        </footer>
      </aside>
    </div>
  );
}
