import type { ReactNode } from "react";
import { appLayoutConfig } from "@/config/app-layout";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-[var(--foreground)]">
      <Topbar />
      <div className="app-shell-grid">
        <Sidebar data={appLayoutConfig.sidebar} />
        <div className="app-shell-main">{children}</div>
      </div>
    </div>
  );
}
