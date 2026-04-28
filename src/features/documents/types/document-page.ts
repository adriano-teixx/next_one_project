export type BillingNotice = {
  actionHref: string;
  actionLabel: string;
  amount: string;
  label: string;
  suffix: string;
};

export type CompanyOption = {
  id: string;
  label: string;
};

export type CompanySelectorData = {
  billingNotice: BillingNotice;
  companies: CompanyOption[];
  hiddenCompaniesCount: number;
  primaryActionLabel: string;
  settingsActions: string[];
  settingsAriaLabel: string;
};

export type DocumentsPageData = {
  title: string;
};

export type DocumentsEmptyHintData = {
  actionHref: string;
  actionLabel: string;
  message: string;
};

export type DocumentsFooterCopy = {
  copyright: string;
  nextLabel: string;
  pageSizeLabel: string;
  previousLabel: string;
  rangePrefix: string;
  termsHref: string;
  termsLabel: string;
  totalLabel: string;
};

export type DocumentsFooterData = DocumentsFooterCopy & {
  pageSize: number;
  rangeEnd: number;
  rangeStart: number;
  total: number;
};

export type DocumentsToolbarAction = {
  disabled?: boolean;
  icon: "columns" | "download" | "fileSearch" | "tag";
  key: string;
  label: string;
  menu?: boolean;
  menuItems?: string[];
};

export type DocumentsToolbarData = {
  actions: DocumentsToolbarAction[];
  filtersLabel: string;
  periodLabel: string;
  periodOptions: string[];
  periodValue: string;
  searchKind: string;
  searchKindOptions: string[];
  searchPlaceholder: string;
  selectedCount: number;
  selectAllLabel: string;
  tabs: string[];
  totalPrefix: string;
  totalSuffix: string;
};

export type FilterField = {
  input: "date" | "select";
  label: string;
};

export type FilterFieldGroup = FilterField[];

export type FilterDrawerData = {
  applyLabel: string;
  clearLabel: string;
  fieldGroups: FilterFieldGroup[];
  selectPlaceholder: string;
  title: string;
};

export type ColumnsModalData = {
  addAllLabel: string;
  cancelLabel: string;
  confirmLabel: string;
  emptyMessage: string;
  searchPlaceholder: string;
  selectedLabel: string;
  selectedColumns: string[];
  title: string;
  unselectedLabel: string;
  removeAllLabel: string;
};

export type DocumentPreviewData = {
  accessKeyRows: string[][];
  actionLabels: {
    comments: string;
    download: string;
    tags: string;
  };
  barcodeValue: string;
  dacteSubtitle: string;
  dacteTitle: string;
  documentRows: string[][];
  headerTitle: string;
  issuerAddress: string[];
  modalLabel: string;
  metaCells: string[];
  modal: string;
  suframaLabel: string;
  tagsLabel: string;
  tabs: string[];
};
