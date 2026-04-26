"use client";

import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ColumnsModalData } from "../../types/document-page";

type ColumnsModalProps = {
  data: ColumnsModalData;
  onClose: () => void;
};

export function ColumnsModal({ data, onClose }: ColumnsModalProps) {
  return (
    <div className="documents-modal-backdrop documents-modal-backdrop-top fixed inset-0 z-50 grid place-items-start bg-slate-900/35 backdrop-blur-[5px]">
      <div className="documents-columns-modal mx-auto rounded-xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)]">
        <div className="documents-modal-header flex items-center justify-between">
          <h2 className="documents-modal-title font-bold">{data.title}</h2>
          <button className="documents-modal-close text-[#6d7280]" onClick={onClose} type="button">
            <X size={22} />
          </button>
        </div>

        <div className="documents-columns-search flex items-center rounded-md border border-[var(--border)] px-3 text-[#6b7280] shadow-sm">
          <input
            className="min-w-0 flex-1 outline-none"
            placeholder={data.searchPlaceholder}
          />
          <Search size={21} />
        </div>

        <div className="documents-columns-grid grid grid-cols-2">
          <div>
            <div className="documents-columns-section-header flex items-center justify-between font-bold">
              <span>{data.unselectedLabel}</span>
              <button className="flex items-center gap-2 text-[var(--primary)]" type="button">
                {data.addAllLabel} <ChevronRight size={16} />
              </button>
            </div>
            <div className="documents-columns-empty grid place-items-center rounded-lg border border-[var(--border-soft)] bg-[#f5f5f7] text-center text-[#737885]">
              {data.emptyMessage}
            </div>
          </div>

          <div>
            <div className="documents-columns-section-header flex items-center justify-between font-bold">
              <span>{data.selectedLabel}</span>
              <button className="flex items-center gap-2 text-[var(--primary)]" type="button">
                <ChevronLeft size={16} /> {data.removeAllLabel}
              </button>
            </div>
            <div className="documents-columns-list">
              {data.selectedColumns.map((column) => (
                <div
                  className="documents-columns-item flex items-center rounded-lg border border-[var(--border-soft)] bg-[#f5f5f7] font-bold text-[#545b68]"
                  key={column}
                >
                  <ChevronLeft className="mr-4" size={16} />
                  <span>{column}</span>
                  <span className="ml-auto flex gap-5 text-[#6c7280]">↑ ↓</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="documents-modal-footer flex justify-end">
          <Button onClick={onClose} type="button" variant="ghost">
            {data.cancelLabel}
          </Button>
          <Button onClick={onClose} type="button">
            {data.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
