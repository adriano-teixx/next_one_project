import { NextResponse } from "next/server";
import type { CompanyBranchesResponse } from "@/shared/types/company-branch";

const branches: CompanyBranchesResponse["branches"] = [
  {
    document: "05.280.269/0001-92",
    id: "pr-matriz",
    name: "TECNOMYL BRASIL DISTRIBUIDORA DE PRODUTOS LTDA",
    state: "PR",
  },
  {
    document: "05.280.269/0002-73",
    id: "go-apgo",
    name: "TECNOMYL FL02 - APGO - GO",
    state: "GO",
  },
  {
    document: "05.280.269/0003-54",
    id: "mt-cuiaba",
    name: "TECNOMYL BRASIL DISTRIBUIDORA DE PRODUTOS LTDA",
    state: "MT",
  },
  {
    document: "05.280.269/0004-35",
    id: "sp-campinas",
    name: "TECNOMYL CAMPINAS DISTRIBUICAO E LOGISTICA LTDA",
    state: "SP",
  },
  {
    document: "05.280.269/0005-16",
    id: "rs-canoas",
    name: "TECNOMYL CANOAS CENTRO DE DISTRIBUICAO LTDA",
    state: "RS",
  },
  {
    document: "05.280.269/0006-05",
    id: "ba-salvador",
    name: "TECNOMYL SALVADOR OPERACOES FISCAIS LTDA",
    state: "BA",
  },
  {
    document: "05.280.269/0007-88",
    id: "mg-contagem",
    name: "TECNOMYL CONTAGEM DISTRIBUIDORA LTDA",
    state: "MG",
  },
  {
    document: "05.280.269/0008-69",
    id: "pe-recife",
    name: "TECNOMYL RECIFE PRODUTOS E SERVICOS LTDA",
    state: "PE",
  },
  {
    document: "05.280.269/0009-40",
    id: "ce-fortaleza",
    name: "TECNOMYL FORTALEZA ARMAZENAGEM LTDA",
    state: "CE",
  },
  {
    document: "05.280.269/0010-84",
    id: "sc-itajai",
    name: "TECNOMYL ITAJAI IMPORTACAO E DISTRIBUICAO LTDA",
    state: "SC",
  },
];

export function GET() {
  return NextResponse.json<CompanyBranchesResponse>({ branches });
}
