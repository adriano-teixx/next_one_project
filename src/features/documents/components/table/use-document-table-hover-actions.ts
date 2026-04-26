import { useCallback, useEffect, useRef, useState } from "react";

export function useDocumentTableHoverActions() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [scrollMetrics, setScrollMetrics] = useState({
    clientWidth: 0,
    scrollLeft: 0,
  });

  const syncScrollMetrics = useCallback(() => {
    const tableContainer = tableContainerRef.current;

    if (!tableContainer) {
      return;
    }

    tableContainer.style.setProperty(
      "--dt-scroll-left",
      `${tableContainer.scrollLeft}px`,
    );
    tableContainer.style.setProperty(
      "--dt-client-width",
      `${tableContainer.clientWidth}px`,
    );

    setScrollMetrics({
      clientWidth: tableContainer.clientWidth,
      scrollLeft: tableContainer.scrollLeft,
    });
  }, []);

  useEffect(() => {
    syncScrollMetrics();

    const tableContainer = tableContainerRef.current;
    if (!tableContainer) {
      return;
    }
    const container = tableContainer;

    let currentRow: HTMLTableRowElement | null = null;

    function clearActiveRow() {
      currentRow?.classList.remove("is-active");
      currentRow = null;
      setActiveRowId(null);
      container.removeAttribute("data-actions-active");
    }

    function activateRow(event: globalThis.MouseEvent | globalThis.PointerEvent) {
      const target = event.target as HTMLElement;
      const rowElement = target.closest<HTMLTableRowElement>(".documents-data-row");

      if (!rowElement || !container.contains(rowElement)) {
        return;
      }

      if (currentRow !== rowElement) {
        currentRow?.classList.remove("is-active");
        currentRow = rowElement;
        currentRow.classList.add("is-active");
        setActiveRowId(rowElement.dataset.rowId ?? null);
      }

      const tableRect = container.getBoundingClientRect();
      const rowRect = rowElement.getBoundingClientRect();

      container.style.setProperty(
        "--dt-action-top",
        `${rowRect.bottom - tableRect.top - 3}px`,
      );
      container.style.setProperty(
        "--dt-scroll-left",
        `${container.scrollLeft}px`,
      );
      container.style.setProperty(
        "--dt-client-width",
        `${container.clientWidth}px`,
      );
      container.setAttribute("data-actions-active", "true");
    }

    const resizeObserver = new ResizeObserver(syncScrollMetrics);
    resizeObserver.observe(container);
    container.addEventListener("mousemove", activateRow);
    container.addEventListener("pointermove", activateRow);
    container.addEventListener("mouseleave", clearActiveRow);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", activateRow);
      container.removeEventListener("pointermove", activateRow);
      container.removeEventListener("mouseleave", clearActiveRow);
    };
  }, [syncScrollMetrics]);

  return {
    activeRowId,
    scrollMetrics,
    syncScrollMetrics,
    tableContainerRef,
  };
}
