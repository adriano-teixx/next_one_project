import {
  ArrowLeftRight,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Store,
  Timer,
  AlertCircle,
} from "lucide-react";
import type {
  MonitoringDay,
  MonitoringDayStatus,
  MonitoringMetric,
} from "../types/monitoring";

export const statusMeta: Record<
  MonitoringDayStatus,
  { label: string; tone: string }
> = {
  depara: { label: "Pendente de De-Para", tone: "depara" },
  error: { label: "Com erro", tone: "error" },
  finished: { label: "Finalizado", tone: "finished" },
  integrated_sap: { label: "Integrado SAP", tone: "integrated-sap" },
  not_finished: { label: "Não finalizado", tone: "not-finished" },
  not_imported: { label: "Não importado", tone: "not-imported" },
  waiting_sap: { label: "Aguardando integração SAP", tone: "waiting-sap" },
};

export function MonitoringMetricIcon({ metric }: { metric: MonitoringMetric }) {
  const Icon = {
    clock: Clock3,
    document: FileText,
    error: AlertCircle,
    sap: ArrowLeftRight,
    success: Check,
  }[metric.icon];

  return (
    <span className={`monitoring-metric-icon is-${metric.tone}`}>
      <Icon aria-hidden size={28} />
    </span>
  );
}

export function BranchAvatar({
  theme,
}: {
  theme: "blue" | "cyan" | "green" | "orange" | "purple" | "red" | "yellow";
}) {
  return (
    <span className={`monitoring-branch-avatar is-${theme}`}>
      <Store aria-hidden size={20} />
    </span>
  );
}

export function TimelineDot({ day }: { day: MonitoringDay }) {
  const meta = statusMeta[day.status];

  return (
    <button
      aria-label={`${meta.label} em ${day.day}/02`}
      className={`monitoring-dot is-${meta.tone}`}
      type="button"
    >
      <span className="monitoring-dot-tooltip">
        <strong>{meta.label}</strong>
        <small>
          {day.day}/02{day.details ? ` - ${day.details}` : ""}
        </small>
      </span>
      {day.status === "waiting_sap" ? <Timer aria-hidden size={14} /> : null}
      {day.status === "integrated_sap" ? (
        <CheckCircle2 aria-hidden size={14} />
      ) : null}
    </button>
  );
}

export function SummaryStatus({
  count,
  status,
}: {
  count: number;
  status: Extract<
    MonitoringDayStatus,
    "error" | "finished" | "not_finished" | "waiting_sap"
  >;
}) {
  const meta = statusMeta[status];

  return (
    <span className={`monitoring-summary-pill is-${meta.tone}`}>
      {status === "finished" ? <CheckCircle2 size={16} /> : null}
      {status === "not_finished" ? <Clock3 size={16} /> : null}
      {status === "error" ? <AlertCircle size={16} /> : null}
      {status === "waiting_sap" ? <Timer size={16} /> : null}
      {count}
    </span>
  );
}
