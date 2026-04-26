"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Tag,
  X,
} from "lucide-react";
import type { DocumentPreviewData } from "../types/document-page";

type DocumentPreviewModalProps = {
  onClose: () => void;
  preview: DocumentPreviewData;
};

export function DocumentPreviewModal({
  onClose,
  preview,
}: DocumentPreviewModalProps) {
  return (
    <div className="documents-modal-backdrop documents-preview-backdrop fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-[5px]">
      <div className="documents-preview-modal mx-auto h-full overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.34)]">
        <div className="documents-preview-shell flex h-full flex-col">
          <div className="documents-preview-header flex items-center border-b border-[var(--border)]">
            <div className="documents-preview-title flex items-center font-bold">
              <FileText size={30} />
              {preview.headerTitle}
            </div>
            <div className="documents-preview-actions ml-auto flex items-center font-bold text-[#5d6370]">
              <button className="flex items-center" type="button">
                <Tag size={25} /> {preview.actionLabels.tags}{" "}
                <ChevronDown size={18} />
              </button>
              <button type="button">{preview.actionLabels.comments}</button>
              <button className="flex items-center" type="button">
                <Download size={26} /> {preview.actionLabels.download}{" "}
                <ChevronDown size={18} />
              </button>
              <span className="documents-preview-divider border-l border-[var(--border)]" />
              <button type="button">
                <ChevronLeft size={26} />
              </button>
              <button type="button">
                <ChevronRight size={26} />
              </button>
              <button onClick={onClose} type="button">
                <X size={32} />
              </button>
            </div>
          </div>

          <div className="documents-preview-tabs flex border-b border-[var(--border)] text-[#555b68]">
            {preview.tabs.map((tab, index) => (
              <button
                className={
                  index === 0
                    ? "border-b-4 border-[var(--primary)] pb-4 font-bold"
                    : "pb-4"
                }
                key={tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="documents-preview-tag-row flex items-center overflow-hidden rounded-lg border border-[var(--border)]">
            <div className="documents-preview-tag-label flex h-full items-center bg-[var(--surface-control)] font-bold">
              {preview.tagsLabel}
            </div>
          </div>

          <div className="documents-preview-scroll min-h-0 flex-1 overflow-auto">
            <div className="documents-preview-document border border-[#404040] text-[#606672]">
              <div className="grid grid-cols-[1fr_1fr_0.36fr] border-b border-[#404040]">
                <div className="documents-preview-issuer grid place-items-center border-r border-[#404040] text-center">
                  <div className="documents-preview-issuer-text font-bold leading-relaxed">
                    {preview.issuerAddress.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="border-r border-[#404040]">
                  <div className="documents-preview-dacte-header grid place-items-center border-b border-[#404040] text-center">
                    <div>
                      <p className="documents-preview-dacte-title font-bold">{preview.dacteTitle}</p>
                      <p className="documents-preview-dacte-subtitle">{preview.dacteSubtitle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 border-b border-[#404040] text-center">
                    {preview.metaCells.map(
                      (cell) => (
                        <div
                          className="documents-preview-meta-cell border-r border-[#404040] last:border-r-0"
                          key={cell}
                        >
                          {cell.split("\n").map((line, index) => (
                            <p
                              className={
                                index === 0
                                  ? "documents-preview-meta-label"
                                  : "documents-preview-meta-value"
                              }
                              key={line}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                  <div className="documents-preview-suframa border-b border-[#404040]">
                    {preview.suframaLabel}
                  </div>
                  <div className="documents-preview-barcode grid place-items-center text-center font-bold tracking-[3px] text-black">
                    {preview.barcodeValue}
                  </div>
                </div>
                <div className="documents-preview-modal-cell grid place-items-center border-b border-[#404040] text-center">
                  <div>
                    <p className="documents-preview-modal-label font-bold">{preview.modalLabel}</p>
                    <p className="documents-preview-modal-value">{preview.modal}</p>
                  </div>
                </div>
              </div>

              {preview.accessKeyRows.map((row, index) => (
                <div
                  className="documents-preview-access-row grid grid-cols-2 border-b border-[#404040] last:border-b-0"
                  key={index}
                >
                  {row.map((cell) => (
                    <div
                      className="documents-preview-access-cell border-r border-[#404040] last:border-r-0"
                      key={cell}
                    >
                      {cell.split("\n").map((line, lineIndex) => (
                        <p
                          className={
                            lineIndex % 2 === 1
                              ? "documents-preview-access-value font-bold leading-tight"
                              : "documents-preview-access-label"
                          }
                          key={`${cell}-${lineIndex}`}
                        >
                          {line || "\u00a0"}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
