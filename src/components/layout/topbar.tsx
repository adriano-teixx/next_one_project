import { Bell, CircleHelp, Rocket } from "lucide-react";
import type { AppLayoutConfig } from "@/config/app-layout";

type TopbarProps = {
  data: AppLayoutConfig["topbar"];
};

export function Topbar({ data }: TopbarProps) {
  return (
    <header className="app-topbar fixed inset-x-0 top-0 z-30 flex items-center border-b border-[var(--border)] bg-white px-7">
      <a aria-label="Qive" className="qive-logo mr-[66px]" href="#">
        <span className="qive-logo-mark" />
        ive
      </a>

      <nav className="flex h-full items-center gap-10">
        {data.navItems.map((item) => (
          <a
            className={
              item === data.activeNavItem
                ? "rounded-full bg-[var(--nav-active)] px-[20px] py-2 text-[20px] font-bold !text-white"
                : "text-[20px] font-medium text-[#555b68]"
            }
            href="#"
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-5">
        <button
          className="topbar-promo flex h-[46px] w-[407px] items-center justify-center gap-3 rounded-lg bg-[#eaf6ff] px-6 text-[20px] font-medium text-[#114d7b]"
          type="button"
        >
          <Rocket size={21} strokeWidth={2} />
          {data.promo}
        </button>
        <button className="topbar-icon-button relative text-[#545a66]" type="button">
          <Bell size={25} strokeWidth={1.8} />
          <span className="absolute -right-4 -top-4 grid size-8 place-items-center rounded-full bg-[#ff493e] text-[17px] font-bold text-white">
            {data.notificationCount}
          </span>
        </button>
        <button className="topbar-icon-button text-[#545a66]" type="button">
          <CircleHelp size={25} strokeWidth={1.8} />
        </button>
        <button
          className="topbar-user-button grid size-10 place-items-center rounded-full bg-[#dfe4ff] text-[16px] font-bold text-[#17227a]"
          type="button"
        >
          {data.userInitials}
        </button>
      </div>
    </header>
  );
}
