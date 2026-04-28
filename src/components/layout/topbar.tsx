import { Bell, ChevronDown, CircleHelp, Moon, User } from "lucide-react";

export function Topbar() {
  return (
    <header className="app-topbar fixed inset-x-0 top-0 z-30 flex items-center border-b border-[#eaecf0] bg-[#f8fafc] px-7">
      <a aria-label="Qive" className="qive-logo" href="#">
        <span className="qive-logo-mark" />
        ive
      </a>

      <div className="ml-auto flex items-center gap-4">
        <button className="topbar-icon-button text-[#3f4652]" type="button">
          <Moon size={25} strokeWidth={1.9} />
        </button>
        <button className="topbar-icon-button relative text-[#3f4652]" type="button">
          <Bell size={25} strokeWidth={1.9} />
          <span className="topbar-status-dot">0</span>
        </button>
        <button className="topbar-icon-button text-[#3f4652]" type="button">
          <CircleHelp size={25} strokeWidth={1.9} />
        </button>
        <button className="topbar-profile-button text-[#3f4652]" type="button">
          <User size={25} fill="currentColor" strokeWidth={0} />
          <span>Perfil</span>
          <ChevronDown size={20} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}
