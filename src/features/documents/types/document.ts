export type DocumentStatus = "AUTORIZADAS";

export type DocumentPurpose = "citadas" | "emitidas" | "recebidas" | "transporte";

export type DocumentRow = {
  accessKey: string;
  annotations: string;
  cce: boolean;
  comments: boolean;
  createdAt: string;
  destinationUf: string;
  erpSync: string;
  issuedAt: string;
  issuer: string;
  labels: string;
  manifestationMonth: string;
  model: string;
  number: string;
  origin: string;
  originUf: string;
  phone: string;
  protocolled: string;
  sender: string;
  status: DocumentStatus;
  taker: string;
  type: string;
  value: string;
};

export type DocumentListResponse = {
  items: DocumentRow[];
  page: number;
  pageSize: number;
  total: number;
  totalValue: string;
};

export type DocumentListParams = {
  page?: number;
  pageSize?: number;
  purpose?: DocumentPurpose;
};
