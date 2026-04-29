export type AppLayoutConfig = {
  help: {
    ariaLabel: string;
    message: string;
  };
  sidebar: {
    activeItem: string;
    activeSection: string;
    collapseLabel: string;
    sections: Array<{
      items: string[];
      title: string;
    }>;
  };
  topbar: {
    activeNavItem: string;
    companySelector: {
      endpoint: string;
    };
    navItems: string[];
    notificationCount: number;
    promo: string;
    userInitials: string;
  };
};

export const appLayoutConfig: AppLayoutConfig = {
  help: {
    ariaLabel: "Abrir suporte",
    message: "Ajude a melhorar a Qive e con...",
  },
  sidebar: {
    activeItem: "NF-e",
    activeSection: "Documentos",
    collapseLabel: "Recolher menu",
    sections: [
      {
        title: "Principal",
        items: ["Home Qive"],
      },
      {
        title: "Documentos",
        items: [
          "NF-e",
          "NF-e em Etapas",
          "NFS-e",
          "CT-e",
          "CF-e SAT",
          "NFC-e",
          "MDF-e",
          "Outros Documentos",
        ],
      },
      {
        title: "Financeiro",
        items: ["Gestão de Pagamentos", "Boletos"],
      },
      {
        title: "Captura e Envio",
        items: ["Integrações", "Recuperar Notas", "Sincronizar Notas"],
      },
    ],
  },
  topbar: {
    activeNavItem: "Geral",
    companySelector: {
      endpoint: "/api/filiais",
    },
    navItems: ["Geral", "Fiscal", "Compras"],
    notificationCount: 30,
    promo: "Aproveite: certificado por R$109,00!",
    userInitials: "TT",
  },
};
