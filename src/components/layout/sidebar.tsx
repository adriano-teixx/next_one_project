import { PanelLeftClose } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { AppLayoutConfig } from "@/config/app-layout";

type SidebarProps = {
  data: AppLayoutConfig["sidebar"];
};

export function Sidebar({ data }: SidebarProps) {
  return (
    <aside className="app-sidebar group/sidebar bg-white">
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
    </aside>
  );
}
