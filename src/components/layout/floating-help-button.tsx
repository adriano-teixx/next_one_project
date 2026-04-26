import { ChevronUp, MessageCircle } from "lucide-react";
import type { AppLayoutConfig } from "@/config/app-layout";

type FloatingHelpButtonProps = {
  data: AppLayoutConfig["help"];
};

export function FloatingHelpButton({ data }: FloatingHelpButtonProps) {
  return (
    <div className="help-widget fixed bottom-0 right-8 z-40 h-[92px] w-[430px]">
      <div className="help-widget-bar absolute bottom-0 right-0 flex h-[62px] w-full items-center justify-between rounded-t-lg bg-[#e8e8e9] px-7 text-[22px] font-bold text-black shadow-[0_-10px_32px_rgba(15,23,42,0.12)]">
        <span className="max-w-[340px] truncate">{data.message}</span>
        <ChevronUp size={25} fill="currentColor" />
      </div>
      <button
        aria-label={data.ariaLabel}
        className="help-widget-button absolute -top-2 right-0 grid size-[68px] place-items-center rounded-full bg-[#ff3b25] text-white shadow-[0_14px_36px_rgba(255,59,37,0.34)]"
        type="button"
      >
        <span className="qive-logo qive-logo-small text-white">
          <span className="qive-logo-mark border-white" />
        </span>
        <span className="absolute right-2 top-2 size-3 rounded-full border-2 border-white bg-[#ff3b25]" />
        <MessageCircle
          className="absolute -bottom-1 -right-1 opacity-0"
          size={1}
        />
      </button>
    </div>
  );
}
