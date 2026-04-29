"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { SelectTrigger } from "@/components/ui/select-trigger";

type DocumentPeriodSummaryProps = {
  periodLabel: string;
  periodOptions: string[];
  periodValue: string;
  totalDocuments: number;
  totalPrefix: string;
  totalSuffix: string;
  totalValue: string;
};

export function DocumentPeriodSummary({
  periodLabel,
  periodOptions,
  periodValue,
  totalDocuments,
  totalPrefix,
  totalSuffix,
  totalValue,
}: DocumentPeriodSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(periodValue);

  return (
    <div className="documents-period-bar mt-5 flex h-[68px] items-center rounded-xl bg-[var(--surface-control)] px-6 text-[20px] text-[#4f5562]">
      <div className="documents-period-menu-wrap">
        <SelectTrigger
          className="documents-period-trigger"
          onClick={() => setIsOpen((current) => !current)}
        >
          <CalendarDays size={22} />
          {periodLabel}
          <span className="ml-2">{selectedPeriod}</span>
        </SelectTrigger>
        {isOpen ? (
          <div className="documents-period-menu">
            {periodOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedPeriod(option);
                  setIsOpen(false);
                }}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <p className="documents-period-total ml-auto">
        {totalPrefix} <strong>{totalDocuments.toLocaleString("pt-BR")}</strong>{" "}
        {totalSuffix}: <strong>{totalValue}</strong>
      </p>
    </div>
  );
}
