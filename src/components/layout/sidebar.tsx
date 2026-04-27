"use client";

import { PanelLeftClose } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";
import type { AppLayoutConfig } from "@/config/app-layout";

type SidebarProps = {
  data: AppLayoutConfig["sidebar"];
};

const MIN_SCROLL_THUMB_SIZE = 64;
const MAX_SCROLL_THUMB_SIZE = 360;
const MAX_SCROLL_THUMB_RATIO = 0.72;

export function Sidebar({ data }: SidebarProps) {
  const panelRef = useRef<HTMLElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const [scrollbar, setScrollbar] = useState({
    isVisible: false,
    thumbHeight: MIN_SCROLL_THUMB_SIZE,
    thumbTop: 0,
  });

  const syncScrollbar = useCallback((forceVisible = false) => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const { clientHeight, scrollHeight, scrollTop } = panel;
    const canScroll = scrollHeight > clientHeight + 1;
    const trackHeight = scrollbarTrackRef.current?.clientHeight ?? clientHeight;
    const maxThumbHeight = Math.min(
      MAX_SCROLL_THUMB_SIZE,
      trackHeight * MAX_SCROLL_THUMB_RATIO
    );
    const proportionalHeight = canScroll
      ? (clientHeight / scrollHeight) * trackHeight
      : trackHeight;
    const thumbHeight = canScroll
      ? Math.max(
          MIN_SCROLL_THUMB_SIZE,
          Math.min(proportionalHeight, maxThumbHeight)
        )
      : trackHeight;
    const maxScrollTop = Math.max(scrollHeight - clientHeight, 1);
    const maxThumbTop = Math.max(trackHeight - thumbHeight, 0);
    const thumbTop = canScroll ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

    setScrollbar({
      isVisible: forceVisible || canScroll,
      thumbHeight,
      thumbTop,
    });
  }, []);

  useEffect(() => {
    syncScrollbar();

    const panel = panelRef.current;

    if (!panel || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(() => syncScrollbar());
    observer.observe(panel);

    return () => observer.disconnect();
  }, [syncScrollbar]);

  return (
    <aside
      className="app-sidebar group/sidebar bg-white"
      data-scrollbar-visible={scrollbar.isVisible ? "true" : undefined}
      onFocus={() => syncScrollbar(true)}
      onMouseEnter={() => syncScrollbar(true)}
      onPointerDown={() => syncScrollbar(true)}
    >
      <button
        aria-label={data.collapseLabel}
        className="sidebar-collapse-button"
        type="button"
      >
        <PanelLeftClose aria-hidden="true" />
        <span className="sidebar-collapse-tooltip" role="tooltip">
          {data.collapseLabel}
        </span>
      </button>

      <nav
        aria-label="Menu principal"
        className="app-sidebar-panel rounded-lg border border-[var(--border)] bg-[#f7f7f9] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
        onScroll={() => syncScrollbar(true)}
        ref={panelRef}
      >
        <div className="app-sidebar-content flex min-w-0 flex-col">
          {data.sections.map((section) => (
            <div key={section.title}>
              <p className="app-sidebar-section-title mb-4 text-[16px] font-bold text-[#8a8d97]">
                {section.title}
              </p>
              <ul className="app-sidebar-section-list">
                {section.items.map((item) => (
                  <li key={`${section.title}-${item}`}>
                    <a
                      className={cn(
                        "app-sidebar-link block rounded-[9px] px-3 py-2 text-[20px] font-medium leading-tight text-[#555b68] transition-colors",
                        item === data.activeItem &&
                          section.title === data.activeSection &&
                          "bg-[#dedfe3] font-bold text-[#242938]"
                      )}
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div
        aria-hidden="true"
        className="app-sidebar-scrollbar"
        ref={scrollbarTrackRef}
      >
        <div
          className="app-sidebar-scrollbar-thumb"
          style={{
            height: `${scrollbar.thumbHeight}px`,
            transform: `translateY(${scrollbar.thumbTop}px)`,
          }}
        />
      </div>
    </aside>
  );
}
