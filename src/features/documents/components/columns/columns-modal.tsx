"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ButtonHTMLAttributes, DragEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { ColumnsModalData } from "../../types/document-page";

export type ColumnsModalColumn = {
  key: string;
  label: string;
};

type ColumnsModalProps = {
  columns: ColumnsModalColumn[];
  data: ColumnsModalData;
  onApply: (selectedColumnKeys: string[]) => void;
  onClose: () => void;
  selectedColumnKeys: string[];
};

type ColumnsModalActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function ColumnsModalBulkAction({
  children,
  className,
  ...props
}: ColumnsModalActionProps) {
  return (
    <button
      className={cn("documents-columns-bulk-action", className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

function ColumnsModalIconAction({
  children,
  className,
  ...props
}: ColumnsModalActionProps) {
  return (
    <button
      className={cn("documents-columns-icon-action", className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function ColumnsModal({
  columns,
  data,
  onApply,
  onClose,
  selectedColumnKeys: initialSelectedColumnKeys,
}: ColumnsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumnKeys, setSelectedColumnKeys] = useState(
    () => initialSelectedColumnKeys
  );
  const [draggedColumnKey, setDraggedColumnKey] = useState<string | null>(null);
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("pt-BR");
  const columnByKey = useMemo(
    () => new Map(columns.map((column) => [column.key, column])),
    [columns]
  );
  const selectedKeySet = useMemo(
    () => new Set(selectedColumnKeys),
    [selectedColumnKeys]
  );
  const selectedColumns = selectedColumnKeys
    .map((columnKey) => columnByKey.get(columnKey))
    .filter((column): column is ColumnsModalColumn => Boolean(column));
  const unselectedColumns = columns.filter(
    (column) => !selectedKeySet.has(column.key)
  );
  const filteredUnselectedColumns = filterColumns(
    unselectedColumns,
    normalizedSearchTerm
  );
  const filteredSelectedColumns = filterColumns(
    selectedColumns,
    normalizedSearchTerm
  );

  function addColumn(columnKey: string) {
    setSelectedColumnKeys((currentKeys) =>
      currentKeys.includes(columnKey)
        ? currentKeys
        : [...currentKeys, columnKey]
    );
  }

  function addAllColumns() {
    setSelectedColumnKeys(columns.map((column) => column.key));
  }

  function removeColumn(columnKey: string) {
    setSelectedColumnKeys((currentKeys) =>
      currentKeys.filter((currentKey) => currentKey !== columnKey)
    );
  }

  function removeAllColumns() {
    setSelectedColumnKeys([]);
  }

  function moveColumn(columnKey: string, direction: -1 | 1) {
    setSelectedColumnKeys((currentKeys) => {
      const currentIndex = currentKeys.indexOf(columnKey);
      const nextIndex = currentIndex + direction;

      if (
        currentIndex < 0 ||
        nextIndex < 0 ||
        nextIndex >= currentKeys.length
      ) {
        return currentKeys;
      }

      return moveItem(currentKeys, currentIndex, nextIndex);
    });
  }

  function handleSelectedDrop(
    event: DragEvent<HTMLDivElement>,
    targetColumnKey?: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    const columnKey =
      draggedColumnKey || event.dataTransfer.getData("text/plain");

    if (!columnKey) {
      return;
    }

    setDraggedColumnKey(null);
    setSelectedColumnKeys((currentKeys) => {
      const nextKeys = currentKeys.filter(
        (currentKey) => currentKey !== columnKey
      );
      const targetIndex = targetColumnKey
        ? nextKeys.indexOf(targetColumnKey)
        : nextKeys.length;

      if (targetIndex < 0) {
        nextKeys.push(columnKey);
      } else {
        nextKeys.splice(targetIndex, 0, columnKey);
      }

      return nextKeys;
    });
  }

  function handleUnselectedDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const columnKey =
      draggedColumnKey || event.dataTransfer.getData("text/plain");

    if (columnKey) {
      removeColumn(columnKey);
    }

    setDraggedColumnKey(null);
  }

  function handleDragStart(
    event: DragEvent<HTMLDivElement>,
    columnKey: string
  ) {
    setDraggedColumnKey(columnKey);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", columnKey);
  }

  function allowDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function confirmColumns() {
    onApply(selectedColumnKeys);
  }

  return (
    <div className="documents-modal-backdrop documents-modal-backdrop-top fixed inset-0 z-50 grid place-items-start bg-slate-900/35 backdrop-blur-[5px]">
      <div className="documents-columns-modal mx-auto rounded-xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)]">
        <div className="documents-modal-header flex items-center justify-between">
          <h2 className="documents-modal-title font-bold">{data.title}</h2>
          <button
            className="documents-modal-close text-[#6d7280]"
            onClick={onClose}
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        <div className="documents-columns-search flex items-center rounded-md border border-[var(--border)] px-3 text-[#6b7280] shadow-sm">
          <input
            className="min-w-0 flex-1 outline-none"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={data.searchPlaceholder}
            value={searchTerm}
          />
          <Search size={21} />
        </div>

        <div className="documents-columns-grid grid grid-cols-2">
          <div>
            <div className="documents-columns-section-header flex items-center justify-between font-bold">
              <span>{data.unselectedLabel}</span>
              <ColumnsModalBulkAction
                aria-label={data.addAllLabel}
                onClick={addAllColumns}
              >
                <span>{data.addAllLabel}</span>
                <ChevronRight />
              </ColumnsModalBulkAction>
            </div>
            <div
              className="documents-columns-list documents-columns-drop-zone"
              onDragOver={allowDrop}
              onDrop={handleUnselectedDrop}
            >
              {filteredUnselectedColumns.length > 0 ? (
                filteredUnselectedColumns.map((column) => (
                  <div
                    className="documents-columns-item flex items-center rounded-lg border border-[var(--border-soft)] bg-[#f5f5f7] font-bold text-[#545b68]"
                    draggable
                    key={column.key}
                    onDragEnd={() => setDraggedColumnKey(null)}
                    onDragStart={(event) => handleDragStart(event, column.key)}
                  >
                    <span>{column.label}</span>
                    <ColumnsModalIconAction
                      aria-label={`Adicionar coluna ${column.label}`}
                      className="ml-auto"
                      onClick={() => addColumn(column.key)}
                    >
                      <ChevronRight />
                    </ColumnsModalIconAction>
                  </div>
                ))
              ) : (
                <div className="documents-columns-empty grid place-items-center rounded-lg border border-[var(--border-soft)] bg-[#f5f5f7] text-center text-[#737885]">
                  {data.emptyMessage}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="documents-columns-section-header flex items-center justify-between font-bold">
              <span>{data.selectedLabel}</span>
              <ColumnsModalBulkAction
                aria-label={data.removeAllLabel}
                onClick={removeAllColumns}
              >
                <ChevronLeft />
                <span>{data.removeAllLabel}</span>
              </ColumnsModalBulkAction>
            </div>
            <div
              className="documents-columns-list documents-columns-drop-zone"
              onDragOver={allowDrop}
              onDrop={(event) => handleSelectedDrop(event)}
            >
              {filteredSelectedColumns.map((column) => (
                <div
                  className="documents-columns-item flex items-center rounded-lg border border-[var(--border-soft)] bg-[#f5f5f7] font-bold text-[#545b68]"
                  draggable
                  key={column.key}
                  onDragEnd={() => setDraggedColumnKey(null)}
                  onDragOver={allowDrop}
                  onDragStart={(event) => handleDragStart(event, column.key)}
                  onDrop={(event) => handleSelectedDrop(event, column.key)}
                >
                  <ColumnsModalIconAction
                    aria-label={`Remover coluna ${column.label}`}
                    className="mr-4"
                    onClick={() => removeColumn(column.key)}
                  >
                    <ChevronLeft />
                  </ColumnsModalIconAction>
                  <span>{column.label}</span>
                  <span className="documents-columns-order-actions ml-auto flex text-[#6c7280]">
                    <ColumnsModalIconAction
                      aria-label={`Mover ${column.label} para cima`}
                      onClick={() => moveColumn(column.key, -1)}
                    >
                      <ArrowUp />
                    </ColumnsModalIconAction>
                    <ColumnsModalIconAction
                      aria-label={`Mover ${column.label} para baixo`}
                      onClick={() => moveColumn(column.key, 1)}
                    >
                      <ArrowDown />
                    </ColumnsModalIconAction>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="documents-modal-footer flex justify-end">
          <Button onClick={onClose} type="button" variant="secondary">
            {data.cancelLabel}
          </Button>
          <Button className="ml-4" onClick={confirmColumns} type="button">
            {data.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function filterColumns(
  columns: ColumnsModalColumn[],
  normalizedSearchTerm: string
) {
  if (!normalizedSearchTerm) {
    return columns;
  }

  return columns.filter((column) =>
    column.label.toLocaleLowerCase("pt-BR").includes(normalizedSearchTerm)
  );
}

function moveItem<TItem>(items: TItem[], fromIndex: number, toIndex: number) {
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);

  return nextItems;
}
