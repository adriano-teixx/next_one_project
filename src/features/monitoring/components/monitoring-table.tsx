import { ChevronRight } from "lucide-react";
import type { MonitoringBranch } from "../types/monitoring";
import { BranchAvatar, SummaryStatus, TimelineDot } from "./monitoring-status";

type MonitoringTableProps = {
  branches: MonitoringBranch[];
  days: string[];
};

export function MonitoringTable({ branches, days }: MonitoringTableProps) {
  return (
    <section
      className="monitoring-table-card"
      aria-label="Monitoramento por filial"
    >
      <div className="monitoring-table-head">
        <strong>Filiais</strong>
        <div className="monitoring-days-head">
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <strong>Resumo do período</strong>
      </div>

      <div className="monitoring-table-body">
        {branches.map((branch) => (
          <article className="monitoring-row" key={branch.id}>
            <div className="monitoring-branch-cell">
              <BranchAvatar theme={branch.theme} />
              <div>
                <strong>
                  {branch.code} - {branch.name}
                </strong>
                <span>
                  {branch.city} - {branch.uf}
                </span>
              </div>
            </div>

            <div className="monitoring-timeline">
              {branch.days.map((day, index) => (
                <TimelineDot
                  day={day}
                  key={`${branch.id}-${day.day}-${index}`}
                />
              ))}
            </div>

            <div className="monitoring-summary-cell">
              <SummaryStatus
                count={branch.summary.integrated}
                status="finished"
              />
              <SummaryStatus
                count={branch.summary.pending}
                status="not_finished"
              />
              <SummaryStatus count={branch.summary.errors} status="error" />
              {branch.summary.waitingSap > 0 ? (
                <SummaryStatus
                  count={branch.summary.waitingSap}
                  status="waiting_sap"
                />
              ) : null}
              <ChevronRight aria-hidden size={22} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
