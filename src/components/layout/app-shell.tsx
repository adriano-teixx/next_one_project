import type { ReactNode } from "react";
import { appLayoutConfig } from "@/config/app-layout";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell min-h-dvh text-[var(--foreground)]">
      <div className="app-shell-grid">
        <Sidebar data={appLayoutConfig.sidebar} />
        <div className="app-shell-main">
          <Topbar data={appLayoutConfig.topbar} />
          {children}
        </div>
      </div>
    </div>
  );
}
