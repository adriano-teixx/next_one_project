import { ChevronDown, FileText, Settings } from "lucide-react";
import type { CompanySelectorData } from "../../types/document-page";

type CompanySelectorProps = {
  data: CompanySelectorData;
};

export function CompanySelector({ data }: CompanySelectorProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex items-start gap-6">
        <div className="company-picker relative flex items-start rounded-lg border border-[var(--border)] bg-white px-2 py-2 shadow-sm">
          <div className="flex min-w-0 flex-col items-start gap-1 pr-14">
            {data.companies.map((company) => (
              <span
                className="max-w-full truncate rounded-full bg-[#e7e9eb] px-3 py-1 text-[18px] leading-none text-[#5a606d]"
                key={company.id}
              >
                {company.label}
              </span>
            ))}
            <span className="rounded-full bg-[#dfe2e5] px-3 py-1 text-[18px] leading-none text-[#5a606d]">
              +{data.hiddenCompaniesCount}
            </span>
          </div>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555b68]"
            size={20}
          />
        </div>

        <div className="company-due-card flex items-center gap-4 rounded-lg bg-[#fff3df] px-4 text-[20px] leading-tight text-[#66626a]">
          <FileText className="shrink-0 text-[#bd6a17]" size={26} />
          <p>
            {data.billingNotice.label} {data.billingNotice.amount}{" "}
            {data.billingNotice.suffix}
          </p>
          <a className="font-bold text-[#063cf4]" href={data.billingNotice.actionHref}>
            {data.billingNotice.actionLabel}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <button
          className="company-consult-button rounded-lg bg-[#153df2] px-5 text-[20px] font-bold text-white shadow-sm"
          type="button"
        >
          {data.primaryActionLabel}
        </button>

        <button
          aria-label={data.settingsAriaLabel}
          className="company-settings-button grid place-items-center rounded-lg border border-[var(--border)] bg-white text-[#606672]"
          type="button"
        >
          <Settings size={25} />
        </button>
      </div>
    </div>
  );
}
