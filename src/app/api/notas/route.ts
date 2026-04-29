import { NextRequest, NextResponse } from "next/server";
import type {
  DocumentListResponse,
  DocumentPurpose,
  DocumentRow,
} from "@/features/documents/types/document";

const purposes = new Set<DocumentPurpose>([
  "citadas",
  "emitidas",
  "recebidas",
  "transporte",
]);

const purposeTotal: Record<DocumentPurpose, number> = {
  citadas: 218,
  emitidas: 764,
  recebidas: 1000,
  transporte: 143,
};

const purposeSeed: Record<DocumentPurpose, number> = {
  citadas: 41,
  emitidas: 23,
  recebidas: 11,
  transporte: 67,
};

const purposeType: Record<DocumentPurpose, string> = {
  citadas: "Citada",
  emitidas: "Saída",
  recebidas: "Entrada",
  transporte: "Transporte",
};

const issuerDocuments = [
  "24.315.867/0009-51",
  "03.052.564/0003-28",
  "05.691.238/0001-24",
  "71.145.668/0004-18",
  "38.662.110/0010-85",
  "56.912.380/0012-45",
];

const phones = [
  "(45) 3132-6060",
  "(77) 98115-0703",
  "(65) 3021-1072",
  "(11) 4020-1198",
  "(51) 3330-8841",
  "(81) 3184-2270",
];

const states = ["PR", "GO", "MT", "SP", "RS", "BA", "MG", "PE", "CE", "SC"];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = toPositiveInteger(searchParams.get("page"), 1);
  const pageSize = Math.min(toPositiveInteger(searchParams.get("pageSize"), 25), 100);
  const purpose = parsePurpose(searchParams.get("purpose"));
  const total = purposeTotal[purpose];
  const startIndex = (page - 1) * pageSize;
  const items = Array.from({ length: pageSize }, (_, offset) => startIndex + offset)
    .filter((index) => index < total)
    .map((index) => createDocument(index, purpose));
  const totalValue = formatCurrency(
    Array.from({ length: total }, (_, index) => getValueInCents(index, purpose))
      .reduce((total, value) => total + value, 0),
  );

  await wait(260);

  return NextResponse.json<DocumentListResponse>({
    items,
    page,
    pageSize,
    total,
    totalValue,
  });
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function createDocument(index: number, purpose: DocumentPurpose): DocumentRow {
  const seed = purposeSeed[purpose];
  const number = String(300000 + seed * 1000 + index).padStart(6, "0");
  const valueInCents = getValueInCents(index, purpose);
  const issuer = issuerDocuments[(index + seed) % issuerDocuments.length];
  const phone = phones[(index + seed) % phones.length];
  const originUf = states[(index + seed) % states.length];
  const destinationUf = states[(index + seed + 3) % states.length];
  const issuedAt = createDate(index, seed);

  return {
    accessKey: createAccessKey(index, seed, number),
    annotations: "-",
    cce: index % 5 !== 0,
    comments: index % 7 === 0,
    createdAt: issuedAt,
    destinationUf,
    erpSync: index % 4 === 0 ? "Pendente" : "-",
    issuedAt,
    issuer,
    labels: "-",
    manifestationMonth: issuedAt.slice(3),
    model: "55 - NF-e",
    number,
    origin: "SEFAZ",
    originUf,
    phone,
    protocolled: index % 9 === 0 ? "NÃO" : "SIM",
    sender: purpose === "emitidas" ? "05.280.269/0001-92" : issuer,
    status: "AUTORIZADAS",
    taker: purpose === "transporte" ? "05.280.269/0002-73" : issuer,
    type: purposeType[purpose],
    value: formatCurrency(valueInCents),
  };
}

function createAccessKey(index: number, seed: number, number: string) {
  const stateCode = String(11 + ((index + seed) % 17)).padStart(2, "0");
  const cnpj = String(5280269000100 + ((index + seed) % 900)).padStart(14, "0");
  const serial = String((index % 899) + 100).padStart(3, "0");
  const randomCode = String(10000000 + seed * 1000 + index).padStart(8, "0");

  return `${stateCode}2604${cnpj}55001${serial}${number}${randomCode}`.slice(0, 44);
}

function createDate(index: number, seed: number) {
  const day = 1 + ((index + seed) % 28);
  const month = 1 + ((index + seed) % 4);

  return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/2026`;
}

function getValueInCents(index: number, purpose: DocumentPurpose) {
  const seed = purposeSeed[purpose];
  const base = 43500 + ((index * 7919 + seed * 997) % 1250000);

  return base + (purpose === "transporte" ? 18000 : 0);
}

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(valueInCents / 100);
}

function parsePurpose(value: string | null): DocumentPurpose {
  return value && purposes.has(value as DocumentPurpose)
    ? (value as DocumentPurpose)
    : "recebidas";
}

function toPositiveInteger(value: string | null, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
}
