import type { MonitoringMetric } from "../types/monitoring";
import { MonitoringMetricIcon } from "./monitoring-status";

type MonitoringSummaryCardsProps = {
  metrics: MonitoringMetric[];
};

export function MonitoringSummaryCards({
  metrics,
}: MonitoringSummaryCardsProps) {
  return (
    <section className="monitoring-metrics" aria-label="Resumo do período">
      {metrics.map((metric) => (
        <article className="monitoring-metric-card" key={metric.id}>
          <MonitoringMetricIcon metric={metric} />
          <div>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            {metric.variation ? (
              <small className={`is-${metric.tone}`}>{metric.variation}</small>
            ) : (
              <small>no período</small>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
