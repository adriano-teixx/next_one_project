import type {
  ColumnsModalData,
  DocumentsEmptyHintData,
  DocumentsFooterCopy,
  DocumentsPageData,
  DocumentsToolbarData,
} from "../types/document-page";

export const documentsPageData: DocumentsPageData = {
  title: "NF-e (Nota Fiscal Eletrônica)",
};

export const documentsToolbarData: DocumentsToolbarData = {
  actions: [
    { icon: "columns", key: "columns", label: "Colunas" },
    { icon: "tag", key: "labels", label: "Etiquetas", menu: true },
    {
      disabled: true,
      icon: "fileSearch",
      key: "reports",
      label: "Relatórios",
      menu: true,
    },
    {
      disabled: true,
      icon: "download",
      key: "download",
      label: "Baixar e compartilhar",
      menu: true,
    },
    {
      disabled: true,
      icon: "fileSearch",
      key: "manifest",
      label: "Manifestar",
      menu: true,
    },
  ],
  filtersLabel: "Filtros",
  periodLabel: "Período de emissão:",
  periodValue: "Últimos 90 dias",
  searchKind: "Conteúdo da NF-e",
  searchPlaceholder: "Busque por qualquer informação dentro da NF-e",
  selectedCount: 0,
  selectAllLabel: "Selecionar todas",
  tabs: ["Recebidas", "Emitidas", "Transporte", "Citadas"],
  totalPrefix: "Valor total das",
  totalSuffix: "notas",
};

export const selectedColumnLabels = [
  "Ver Nota",
  "Emissão",
  "Número",
  "Chave de acesso",
  "Status",
  "Etiquetas",
  "Valor",
  "CCe",
  "Desacordo",
  "CNPJ ou CPF Emitente",
];

export const columnsModalData: ColumnsModalData = {
  addAllLabel: "Adicionar todas",
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
  emptyMessage: "Arraste colunas para cá ou use os botões de seta",
  removeAllLabel: "Remover todas",
  searchPlaceholder: "Encontre colunas digitando aqui",
  selectedColumns: selectedColumnLabels,
  selectedLabel: "Selecionadas",
  title: "Organizar colunas",
  unselectedLabel: "Não Selecionadas",
};

export const documentsEmptyHintData: DocumentsEmptyHintData = {
  actionHref: "#",
  actionLabel: "recuperação de notas",
  message: "ⓘ Não encontra um documento específico? Tente utilizar a",
};

export const documentsFooterCopy: DocumentsFooterCopy = {
  copyright:
    "© 2026 Qive. Todos os direitos reservados. Desenvolvido em São Carlos, a Capital da Tecnologia",
  nextLabel: "Próxima",
  pageSizeLabel: "Resultados por página",
  previousLabel: "Anterior",
  rangePrefix: "Mostrando",
  termsHref: "#",
  termsLabel: "Termos de Serviço",
  totalLabel: "notas totais",
};
