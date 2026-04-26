import { CalendarDays } from "lucide-react";
import { SelectTrigger } from "@/components/ui/select-trigger";

type DocumentPeriodSummaryProps = {
  periodLabel: string;
  periodValue: string;
  totalDocuments: number;
  totalPrefix: string;
  totalSuffix: string;
  totalValue: string;
};

export function DocumentPeriodSummary({
  periodLabel,
  periodValue,
  totalDocuments,
  totalPrefix,
  totalSuffix,
  totalValue,
}: DocumentPeriodSummaryProps) {
  return (
    <div className="documents-period-bar mt-5 flex h-[68px] items-center rounded-xl bg-[var(--surface-control)] px-6 text-[20px] text-[#4f5562]">
      <SelectTrigger className="documents-period-trigger">
        <CalendarDays size={22} />
        {periodLabel}
        <span className="ml-2">{periodValue}</span>
      </SelectTrigger>
      <p className="ml-auto">
        {totalPrefix} <strong>{totalDocuments.toLocaleString("pt-BR")}</strong>{" "}
        {totalSuffix}: <strong>{totalValue}</strong>
      </p>
    </div>
  );
}
