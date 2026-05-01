import { ArrowLeftRight, CheckCircle2, Clock3, Timer } from "lucide-react";
import type { ReactNode } from "react";

export function MonitoringLegend() {
  return (
    <section className="monitoring-legend" aria-label="Legenda dos status">
      <LegendLine tone="not-imported" label="Não importado" />
      <LegendLine tone="not-finished" label="Não finalizado" />
      <LegendLine tone="finished" label="Finalizado" />
      <LegendLine tone="error" label="Com erro" />
      <span className="monitoring-legend-divider" />
      <LegendIcon
        icon={<ArrowLeftRight size={22} />}
        label="Pendente de De-Para"
      />
      <LegendIcon
        icon={<Clock3 size={22} />}
        label="Aguardando integração SAP"
      />
      <LegendIcon icon={<CheckCircle2 size={22} />} label="Integrado SAP" />
      <LegendIcon icon={<Timer size={22} />} label="Aguardando SAP" />
    </section>
  );
}

function LegendLine({ label, tone }: { label: string; tone: string }) {
  return (
    <span className="monitoring-legend-item">
      <i className={`monitoring-legend-line is-${tone}`} />
      {label}
    </span>
  );
}

function LegendIcon({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="monitoring-legend-item">
      <i className="monitoring-legend-icon">{icon}</i>
      {label}
    </span>
  );
}
