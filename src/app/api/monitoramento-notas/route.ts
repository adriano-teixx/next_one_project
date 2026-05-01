import { NextResponse } from "next/server";
import type {
  MonitoringBranch,
  MonitoringDayStatus,
  MonitoringMetric,
  MonitoringResponse,
} from "@/features/monitoring/types/monitoring";

const days = Array.from({ length: 28 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);

const branchSeeds = [
  ["001", "TECNOMYL FL01", "FOZ DO IGUAÇU", "PR", "green"],
  ["002", "TECNOMYL FL02", "APGO", "GO", "yellow"],
  ["003", "TECNOMYL FL03", "CUIABÁ", "MT", "blue"],
  ["004", "TECNOMYL FL04", "EMBU DAS ARTES", "SP", "purple"],
  ["005", "TECNOMYL FL05", "CAMBÉ", "PR", "red"],
  ["006", "TECNOMYL FL06", "IBIPORÃ", "PR", "cyan"],
  ["007", "TECNOMYL FL07", "CARAZINHO", "RS", "orange"],
] as const;

const metrics: MonitoringMetric[] = [
  {
    icon: "document",
    id: "total",
    label: "Total de dias no período",
    tone: "blue",
    value: 248,
  },
  {
    icon: "clock",
    id: "pending",
    label: "Pendentes",
    tone: "yellow",
    value: 18,
    variation: "7,26% do total",
  },
  {
    icon: "error",
    id: "error",
    label: "Com erro",
    tone: "red",
    value: 6,
    variation: "2,42% do total",
  },
  {
    icon: "success",
    id: "integrated",
    label: "Integrados",
    tone: "green",
    value: 224,
    variation: "90,32% do total",
  },
  {
    icon: "sap",
    id: "waiting",
    label: "Aguardando SAP",
    tone: "purple",
    value: 14,
    variation: "5,65% do total",
  },
];

export function GET() {
  const branches = branchSeeds.map(([code, name, city, uf, theme], index) =>
    createBranch(code, name, city, uf, theme, index)
  );

  return NextResponse.json<MonitoringResponse>({
    branches,
    days,
    metrics,
    monthLabel: "02/2026",
    updatedAgo: "Atualizado há 2 min",
  });
}

function createBranch(
  code: string,
  name: string,
  city: string,
  uf: string,
  theme: MonitoringBranch["theme"],
  index: number
): MonitoringBranch {
  const branchDays = days.map((day) => ({
    day,
    ...getStatusForDay(index, Number(day)),
  }));

  return {
    city,
    code,
    days: branchDays,
    id: code,
    name,
    summary: {
      errors: branchDays.filter((item) => item.status === "error").length,
      integrated: branchDays.filter((item) => item.status === "finished")
        .length,
      pending: branchDays.filter((item) => item.status === "not_finished")
        .length,
      waitingSap: branchDays.filter((item) => item.status === "waiting_sap")
        .length,
    },
    theme,
    uf,
  };
}

function getStatusForDay(
  branchIndex: number,
  day: number
): { details?: string; status: MonitoringDayStatus } {
  const key = `${branchIndex}-${day}`;

  const special: Record<
    string,
    { details?: string; status: MonitoringDayStatus }
  > = {
    "0-9": { details: "Falha no retorno SEFAZ", status: "error" },
    "0-10": { details: "Chave sem evento de autorização", status: "error" },
    "1-12": { details: "Importação em processamento", status: "not_finished" },
    "2-12": {
      details: "Documento não importado no dia",
      status: "not_imported",
    },
    "2-13": {
      details: "Documento não importado no dia",
      status: "not_imported",
    },
    "3-5": {
      details: "Aguardando finalização do lote",
      status: "not_finished",
    },
    "3-6": {
      details: "Aguardando finalização do lote",
      status: "not_finished",
    },
    "3-7": {
      details: "Aguardando finalização do lote",
      status: "not_finished",
    },
    "3-8": {
      details: "Aguardando finalização do lote",
      status: "not_finished",
    },
    "3-9": {
      details: "Aguardando finalização do lote",
      status: "not_finished",
    },
    "4-16": { details: "Erro de integração com ERP", status: "error" },
    "5-11": { details: "Pendente de De-Para", status: "depara" },
    "5-12": { details: "Aguardando integração SAP", status: "waiting_sap" },
    "5-13": { details: "Aguardando integração SAP", status: "waiting_sap" },
    "6-2": { details: "Importação em processamento", status: "not_finished" },
  };

  return special[key] ?? { status: "finished" };
}
