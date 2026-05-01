"use client";

import { CalendarDays, ChevronDown, Filter, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import type { MonitoringResponse } from "../types/monitoring";
import { MonitoringLegend } from "../components/monitoring-legend";
import { MonitoringSummaryCards } from "../components/monitoring-summary-cards";
import { MonitoringTable } from "../components/monitoring-table";

export function MonitoringScreen() {
  const [data, setData] = useState<MonitoringResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/monitoramento-notas")
      .then((response) => response.json())
      .then((responseData: MonitoringResponse) => {
        if (isMounted) {
          setData(responseData);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppShell>
      <main className="app-content monitoring-page">
        <header className="monitoring-header">
          <div>
            <h1>Monitoramento de Integração de Notas</h1>
            <p>
              Acompanhe o status diário da integração das notas fiscais por
              filial.
            </p>
          </div>

          <div className="monitoring-header-actions">
            <span className="monitoring-updated">
              <RefreshCw aria-hidden size={20} />
              {data?.updatedAgo ?? "Atualizando..."}
            </span>
            <button className="monitoring-filter-button" type="button">
              <CalendarDays aria-hidden size={20} />
              {data?.monthLabel ?? "02/2026"}
              <ChevronDown aria-hidden size={16} />
            </button>
            <button className="monitoring-filter-button" type="button">
              <Filter aria-hidden size={20} />
              Filtros
              <ChevronDown aria-hidden size={16} />
            </button>
          </div>
        </header>

        {data ? (
          <>
            <MonitoringSummaryCards metrics={data.metrics} />
            <MonitoringLegend />
            <MonitoringTable branches={data.branches} days={data.days} />
            <p className="monitoring-help">
              Clique em um dia para visualizar os detalhes das notas e
              ocorrências.
            </p>
          </>
        ) : (
          <div className="monitoring-loading">Carregando monitoramento...</div>
        )}
      </main>
    </AppShell>
  );
}
