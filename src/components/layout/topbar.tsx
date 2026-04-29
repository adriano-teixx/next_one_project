"use client";

import { Bell, CircleHelp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { AppLayoutConfig } from "@/config/app-layout";
import { TopbarCompanySelector } from "./topbar-company-selector";

function subscribeToHydration(callback: () => void) {
  queueMicrotask(callback);
  return () => {};
}

type TopbarProps = {
  data: AppLayoutConfig["topbar"];
};

export function Topbar({ data }: TopbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const isDark = isHydrated && resolvedTheme === "dark";
  const themeLabel = isDark ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <header className="app-topbar fixed inset-x-0 top-0 z-30 flex items-center bg-[var(--background)] px-7">
      <a aria-label="Qive" className="qive-logo" href="#">
        <span className="qive-logo-mark" />
        ive
      </a>

      <TopbarCompanySelector data={data.companySelector} />

      <div className="topbar-actions flex items-center gap-4">
        <button
          aria-label={themeLabel}
          className="topbar-icon-button text-[var(--topbar-icon)]"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          type="button"
          suppressHydrationWarning
        >
          {isHydrated && isDark ? (
            <Sun size={25} strokeWidth={1.9} />
          ) : (
            <Moon size={25} strokeWidth={1.9} />
          )}
        </button>
        <button className="topbar-icon-button relative text-[var(--topbar-icon)]" type="button">
          <Bell size={25} strokeWidth={1.9} />
          <span className="topbar-status-dot">0</span>
        </button>
        <button className="topbar-icon-button text-[var(--topbar-icon)]" type="button">
          <CircleHelp size={25} strokeWidth={1.9} />
        </button>
        <button className="topbar-profile-button" type="button">
          {data.userInitials}
        </button>
      </div>
    </header>
  );
}
