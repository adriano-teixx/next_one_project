"use client";

import { Bell, CircleHelp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="app-topbar fixed inset-x-0 top-0 z-30 flex items-center border-b border-[var(--border)] bg-[var(--topbar-bg)] px-7">
      <a aria-label="Qive" className="qive-logo" href="#">
        <span className="qive-logo-mark" />
        ive
      </a>

      <div className="ml-auto flex items-center gap-4">
        <button
          aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          className="topbar-icon-button text-[var(--topbar-icon)]"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          type="button"
        >
          {isDark ? (
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
          TT
        </button>
      </div>
    </header>
  );
}
