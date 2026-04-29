export const AppRoutes = {
  home: "/",
  documents: {
    nfe: "/documentos/nfe",
    nfeStages: "/documentos/nfe-em-etapas",
    nfse: "/documentos/nfse",
    cte: "/documentos/cte",
    cfeSat: "/documentos/cfe-sat",
    nfce: "/documentos/nfce",
    mdfe: "/documentos/mdfe",
    others: "/documentos/outros",
  },
  finance: {
    payments: "/financeiro/gestao-de-pagamentos",
    boletos: "/financeiro/boletos",
  },
  capture: {
    integrations: "/captura-e-envio/integracoes",
    recoverNotes: "/captura-e-envio/recuperar-notas",
    syncNotes: "/captura-e-envio/sincronizar-notas",
  },
  help: "/ajuda",
} as const;

export const SidebarItemRoutes: Record<string, string> = {
  "Boletos": AppRoutes.finance.boletos,
  "CF-e SAT": AppRoutes.documents.cfeSat,
  "CT-e": AppRoutes.documents.cte,
  "Gestão de Pagamentos": AppRoutes.finance.payments,
  "Home Qive": AppRoutes.home,
  "Integrações": AppRoutes.capture.integrations,
  "MDF-e": AppRoutes.documents.mdfe,
  "NF-e": AppRoutes.documents.nfe,
  "NF-e em Etapas": AppRoutes.documents.nfeStages,
  "NFC-e": AppRoutes.documents.nfce,
  "NFS-e": AppRoutes.documents.nfse,
  "Outros Documentos": AppRoutes.documents.others,
  "Recuperar Notas": AppRoutes.capture.recoverNotes,
  "Sincronizar Notas": AppRoutes.capture.syncNotes,
};
