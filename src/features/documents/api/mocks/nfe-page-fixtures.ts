import type {
  CompanySelectorData,
  DocumentPreviewData,
  FilterDrawerData,
  FilterFieldGroup,
} from "../../types/document-page";

export const companySelectorData: CompanySelectorData = {
  billingNotice: {
    actionHref: "#",
    actionLabel: "Ver boletos",
    amount: "R$ 8.143,35",
    label: "Cerca de",
    suffix: "a pagar.",
  },
  companies: [
    {
      id: "05.280.269/0001-92",
      label:
        "PR [05.280.269/0001-92] TECNOMYL BRASIL DISTRIBUIDORA DE PRODUTOS AGRICOLAS LTDA",
    },
    {
      id: "05.280.269/0002-73",
      label:
        "GO [05.280.269/0002-73] TECNOMYL BRASIL DISTRIBUIDORA DE PRODUTOS AGRICOLAS LTDA",
    },
    {
      id: "05.280.269/0003-54",
      label:
        "MT [05.280.269/0003-54] TECNOMYL BRASIL DISTRIBUIDORA DE PRODUTOS AGRICOLAS LTDA",
    },
  ],
  hiddenCompaniesCount: 25,
  primaryActionLabel: "Consulta completa",
  settingsAriaLabel: "Abrir configurações da consulta",
};

const filterFieldGroups: FilterFieldGroup[] = [
  [
    { input: "select", label: "Status" },
    { input: "select", label: "Origem" },
  ],
  [
    { input: "select", label: "Presença de desacordo" },
    { input: "select", label: "Presença de CCe" },
  ],
  [{ input: "select", label: "Tipo do CT-e" }],
  [
    { input: "date", label: "Criadas na Qive a partir de" },
    { input: "date", label: "Criadas na Qive até" },
  ],
  [
    { input: "select", label: "Etiquetadas com" },
    { input: "select", label: "Sincronização ERP" },
  ],
];

export const filterDrawerData: FilterDrawerData = {
  applyLabel: "Aplicar Filtros",
  clearLabel: "Limpar Filtros",
  fieldGroups: filterFieldGroups,
  selectPlaceholder: "Selecione",
  title: "Filtros",
};

export const documentPreviewData: DocumentPreviewData = {
  accessKeyRows: [
    [
      "TIPO DO CTE\nNormal",
      "TIPO DO SERVIÇO\nNormal",
      "CHAVE DE ACESSO\n5126 0424 3158 6700 0951 5700 8000 0504 4410 0556 9199",
    ],
    [
      "TOMADOR DO SERVIÇO\n",
      "FORMA DE PAGAMENTO\n-",
      "Consulta de autenticidade no portal nacional da CT-e\nwww.cte.fazenda.gov.br ou no site da Sefaz Autorizadora",
    ],
    [
      "CFOP - NATUREZA DA PRESTAÇÃO\n5352 - Prestacao de servico de transporte a estabelecimento industr.",
      "PROTOCOLO DE AUTORIZAÇÃO DE USO\n151260936187826 - 25/04/2026, 08:59:02",
    ],
    ["INÍCIO DA PRESTAÇÃO\nCUIABA - MT", "TÉRMINO DA PRESTAÇÃO\nCANARANA - MT"],
    [
      "REMETENTE\nTECNOMYL BRASIL DIST PRODUTOS AGRICOLAS LTDA - FIL\nENDEREÇO\nRODOVIA A RODOVIA DOS IMIGRANTES KM 05, 0, SALA 07\nAREA RURAL DE CUIABA",
      "DESTINATÁRIO\nBOM FUTURO AGRICOLA LTDA\nENDEREÇO\nFAZ COCALMT 110 KM 94 MAR ESQ R TANGURU, 0, -\nZONA RURAL",
    ],
  ],
  actionLabels: {
    comments: "Comentários na nota",
    download: "Baixar e compartilhar",
    tags: "Etiquetas",
  },
  barcodeValue: "||||||||||||||||||||||||||||||||||||||||||||||||",
  dacteSubtitle: "Documento Auxiliar do Conhecimento de Transporte Eletrônico",
  dacteTitle: "DACTE",
  documentRows: [],
  headerTitle: "CT-e nº 50444",
  issuerAddress: [
    "COMANDO LOG E TRANSPORTES LTDA",
    "A RODOVIA DOS IMIGRANTES, 0, KM 05 GALPAO 01 AREA DE EXP URB SUL",
    "AREA RURAL DE CUIABA - 78099899 - CUIABA - MT",
    "FONE/FAX: (15) 3263-8090",
    "CNPJ/CPF: 24.315.867/0009-51",
    "Insc. Estadual: 139116974",
  ],
  metaCells: [
    "MODELO\n57",
    "SÉRIE\n8",
    "NÚMERO\n50444",
    "FL\n1/1",
    "DATA E HORA DE EMISSÃO\n25/04/2026, 08:53:49",
  ],
  modal: "Rodoviário",
  modalLabel: "MODAL",
  suframaLabel: "INSC. SUFRAMA DO DESTINATÁRIO",
  tagsLabel: "Etiquetas",
  tabs: ["Ver DACTe", "Nota Completa", "Histórico de eventos"],
};
