import type {
  DocumentListParams,
  DocumentListResponse,
} from "../types/document";
import { mockDocuments } from "./mocks/document-list-fixtures";

export async function getDocuments(
  params: DocumentListParams = {},
): Promise<DocumentListResponse> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 25;

  await wait(120);

  return {
    items: mockDocuments.slice((page - 1) * pageSize, page * pageSize),
    page,
    pageSize,
    total: 2944,
    totalValue: "R$ 1.321.859.363,26",
  };
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
