export type MonitoringDayStatus =
  | "not_imported"
  | "not_finished"
  | "finished"
  | "error"
  | "depara"
  | "waiting_sap"
  | "integrated_sap";

export type MonitoringDay = {
  day: string;
  details?: string;
  status: MonitoringDayStatus;
};

export type MonitoringBranch = {
  city: string;
  code: string;
  days: MonitoringDay[];
  id: string;
  name: string;
  summary: {
    errors: number;
    integrated: number;
    pending: number;
    waitingSap: number;
  };
  theme: "blue" | "cyan" | "green" | "orange" | "purple" | "red" | "yellow";
  uf: string;
};

export type MonitoringMetric = {
  icon: "clock" | "document" | "error" | "sap" | "success";
  id: string;
  label: string;
  tone: "blue" | "green" | "purple" | "red" | "yellow";
  value: number;
  variation?: string;
};

export type MonitoringResponse = {
  branches: MonitoringBranch[];
  days: string[];
  metrics: MonitoringMetric[];
  monthLabel: string;
  updatedAgo: string;
};
